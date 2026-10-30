import DesktopPanel from "@/components/DesktopPanel";
import InvitationShell from "@/components/InvitationShell";
import Couple from "@/components/sections/Couple";
import Events from "@/components/sections/Events";
import Footer from "@/components/sections/Footer";
import Gallery from "@/components/sections/Gallery";
import Gift from "@/components/sections/Gift";
import Hero from "@/components/sections/Hero";
import PhotoBreak from "@/components/sections/PhotoBreak";
import Quote from "@/components/sections/Quote";
import Story from "@/components/sections/Story";
import Wishes from "@/components/sections/Wishes";
import { wedding } from "@/data/wedding";

export default function Home() {
  const [afterCouple, afterEvents] = wedding.interludes;

  return (
    <InvitationShell>
      <div className="lg:flex">
        <DesktopPanel />

        {/* Kolom undangan: lebar penuh di HP, kolom kanan 480px di desktop */}
        <div className="relative mx-auto w-full max-w-[480px] overflow-hidden bg-cream shadow-2xl shadow-ink/20 lg:mx-0 lg:w-[480px] lg:shrink-0">
          <main>
            <Hero />
            <Quote />
            <Couple />
            <PhotoBreak interlude={afterCouple} />
            <Story />
            <Events />
            <PhotoBreak interlude={afterEvents} />
            <Gallery />
            <Gift />
            <Wishes />
          </main>
          <Footer />
        </div>
      </div>
    </InvitationShell>
  );
}
