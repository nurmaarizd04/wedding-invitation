import { wedding, type Person } from "@/data/wedding";
import Floral from "../Floral";
import Reveal from "../Reveal";
import { InstagramIcon } from "../icons";
import { ArchPhoto, REVEAL_ZOOM, SectionTitle } from "../ui";

function PersonCard({ person }: { person: Person }) {
  return (
    <div className="flex flex-col items-center text-center">
      <Reveal variant="curtain">
        <ArchPhoto src={person.photo} alt={person.fullName} className="h-72 w-56" imgClassName={REVEAL_ZOOM} />
      </Reveal>
      <Reveal delay={300}>
        <div className="flex flex-col items-center">
          <h3 className="mt-7 font-script text-5xl text-gold-dark">{person.nickname}</h3>
          <p className="mt-1 font-serif text-2xl font-semibold leading-snug">{person.fullName}</p>
          <p className="mt-2 max-w-[18rem] text-sm leading-relaxed text-muted">{person.parents}</p>
          {person.instagram && (
            <a
              href={`https://instagram.com/${person.instagram}`}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 inline-flex items-center gap-1.5 rounded-full bg-gold/10 px-4 py-1.5 text-sm text-gold-dark transition hover:bg-gold hover:text-white"
            >
              <InstagramIcon width={15} height={15} /> @{person.instagram}
            </a>
          )}
        </div>
      </Reveal>
    </div>
  );
}

export default function Couple() {
  const { groom, bride } = wedding;

  return (
    <section id="mempelai" className="relative overflow-hidden px-6 py-20">
      <Floral className="-left-14 top-[19rem] h-36 w-36 opacity-70" flip="y" />
      <Floral className="-right-14 bottom-44 h-36 w-36 opacity-70" flip="x" />

      <Reveal>
        <SectionTitle eyebrow="Bismillahirrahmanirrahim" title="Mempelai" />
        <p className="-mt-3 mb-12 text-center text-sm leading-relaxed text-muted">
          Dengan memohon rahmat dan ridho Allah SWT, kami bermaksud menyelenggarakan pernikahan
          putra-putri kami:
        </p>
      </Reveal>

      <div className="relative flex flex-col items-center gap-6">
        <PersonCard person={groom} />
        <Reveal variant="zoom">
          <span className="font-script text-7xl text-gold/70">&amp;</span>
        </Reveal>
        <PersonCard person={bride} />
      </div>
    </section>
  );
}
