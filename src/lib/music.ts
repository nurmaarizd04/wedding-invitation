/**
 * Pemutar musik latar. Mendukung dua sumber:
 * - file audio (mp3) di folder public, contoh: "/music/song.mp3"
 * - link YouTube, diputar lewat player YouTube tersembunyi (tanpa mengunduh lagunya)
 */

export type MusicController = {
  play: () => void;
  pause: () => void;
  destroy: () => void;
};

type YTPlayer = {
  playVideo(): void;
  pauseVideo(): void;
  destroy(): void;
  setVolume(volume: number): void;
  unMute(): void;
};
type YTNamespace = {
  Player: new (el: HTMLElement, options: object) => YTPlayer;
  PlayerState: { ENDED: number; PLAYING: number; PAUSED: number };
};

declare global {
  interface Window {
    YT?: YTNamespace;
    onYouTubeIframeAPIReady?: () => void;
    webkitAudioContext?: typeof AudioContext;
  }
}

export function getYouTubeId(url: string) {
  const match = url.match(/(?:youtube\.com\/(?:watch\?(?:.*&)?v=|embed\/|shorts\/)|youtu\.be\/)([\w-]{11})/);
  return match?.[1] ?? null;
}

let youTubeApi: Promise<YTNamespace> | null = null;

function loadYouTubeApi() {
  if (window.YT?.Player) return Promise.resolve(window.YT);
  youTubeApi ??= new Promise((resolve) => {
    const previous = window.onYouTubeIframeAPIReady;
    window.onYouTubeIframeAPIReady = () => {
      previous?.();
      resolve(window.YT!);
    };
    const script = document.createElement("script");
    script.src = "https://www.youtube.com/iframe_api";
    document.head.appendChild(script);
  });
  return youTubeApi;
}

function createAudioMusic(
  src: string,
  onPlayingChange: (playing: boolean) => void,
  boost: number,
): MusicController {
  const audio = new Audio(src);
  audio.loop = true;
  audio.preload = "auto";
  audio.addEventListener("play", () => onPlayingChange(true));
  audio.addEventListener("pause", () => onPlayingChange(false));

  // Penguat suara via Web Audio: gain × boost, lalu limiter agar tidak pecah.
  // Dibuat saat play pertama karena browser hanya mengizinkan audio setelah interaksi pengguna.
  let context: AudioContext | null = null;
  const connectBoost = () => {
    if (context || boost <= 1) return;
    const AudioCtx = window.AudioContext ?? window.webkitAudioContext;
    if (!AudioCtx) return;
    context = new AudioCtx();
    const gain = context.createGain();
    gain.gain.value = boost;
    const limiter = context.createDynamicsCompressor();
    limiter.threshold.value = -2;
    limiter.knee.value = 0;
    limiter.ratio.value = 20;
    limiter.attack.value = 0.003;
    limiter.release.value = 0.25;
    context.createMediaElementSource(audio).connect(gain).connect(limiter).connect(context.destination);
  };

  return {
    play: () => {
      connectBoost();
      context?.resume();
      audio.play().catch(() => onPlayingChange(false));
    },
    pause: () => audio.pause(),
    destroy: () => {
      audio.pause();
      audio.removeAttribute("src");
      context?.close();
    },
  };
}

function createYouTubeMusic(
  videoId: string,
  container: HTMLElement,
  onPlayingChange: (playing: boolean) => void,
): MusicController {
  let player: YTPlayer | null = null;
  let ready = false;
  let wantPlay = false;
  let destroyed = false;

  const mount = document.createElement("div");
  container.appendChild(mount);

  // Player YouTube mengingat volume terakhir pengunjung di youtube.com, jadi paksa ke maksimum
  const playLoud = () => {
    player?.unMute();
    player?.setVolume(100);
    player?.playVideo();
  };

  loadYouTubeApi().then((YT) => {
    if (destroyed) return;
    player = new YT.Player(mount, {
      width: 200,
      height: 200,
      videoId,
      // playlist = videoId agar lagu diulang terus
      playerVars: { controls: 0, loop: 1, playlist: videoId, playsinline: 1, rel: 0 },
      events: {
        onReady: () => {
          ready = true;
          if (wantPlay) playLoud();
        },
        onStateChange: ({ data }: { data: number }) => {
          if (data === YT.PlayerState.PLAYING) onPlayingChange(true);
          if (data === YT.PlayerState.PAUSED || data === YT.PlayerState.ENDED) onPlayingChange(false);
        },
      },
    });
  });

  return {
    play: () => {
      wantPlay = true;
      if (ready) playLoud();
    },
    pause: () => {
      wantPlay = false;
      if (ready) player?.pauseVideo();
    },
    destroy: () => {
      destroyed = true;
      player?.destroy();
      mount.remove();
    },
  };
}

/**
 * @param boost penguat volume untuk file audio (1 = asli). Tidak berlaku untuk YouTube:
 * volume YouTube maksimal 100 dan dinormalisasi oleh YouTube sendiri.
 */
export function createMusic(
  src: string,
  container: HTMLElement,
  onPlayingChange: (playing: boolean) => void,
  boost = 1,
): MusicController {
  const videoId = getYouTubeId(src);
  return videoId
    ? createYouTubeMusic(videoId, container, onPlayingChange)
    : createAudioMusic(src, onPlayingChange, boost);
}
