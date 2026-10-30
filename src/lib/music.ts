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

type YTPlayer = { playVideo(): void; pauseVideo(): void; destroy(): void };
type YTNamespace = {
  Player: new (el: HTMLElement, options: object) => YTPlayer;
  PlayerState: { ENDED: number; PLAYING: number; PAUSED: number };
};

declare global {
  interface Window {
    YT?: YTNamespace;
    onYouTubeIframeAPIReady?: () => void;
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

function createAudioMusic(src: string, onPlayingChange: (playing: boolean) => void): MusicController {
  const audio = new Audio(src);
  audio.loop = true;
  audio.preload = "auto";
  audio.addEventListener("play", () => onPlayingChange(true));
  audio.addEventListener("pause", () => onPlayingChange(false));

  return {
    play: () => {
      audio.play().catch(() => onPlayingChange(false));
    },
    pause: () => audio.pause(),
    destroy: () => {
      audio.pause();
      audio.removeAttribute("src");
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
          if (wantPlay) player?.playVideo();
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
      if (ready) player?.playVideo();
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

export function createMusic(
  src: string,
  container: HTMLElement,
  onPlayingChange: (playing: boolean) => void,
): MusicController {
  const videoId = getYouTubeId(src);
  return videoId
    ? createYouTubeMusic(videoId, container, onPlayingChange)
    : createAudioMusic(src, onPlayingChange);
}
