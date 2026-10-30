"use client";

import { useState } from "react";
import { wedding, type GiftAccount } from "@/data/wedding";
import { copyText } from "@/lib/format";
import Reveal from "../Reveal";
import { CheckIcon, CopyIcon, GiftIcon } from "../icons";
import { SectionTitle } from "../ui";

function CopyButton({ text, label, className = "" }: { text: string; label: string; className?: string }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await copyText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <button
      type="button"
      onClick={handleCopy}
      className={`inline-flex items-center gap-1.5 rounded-full px-4 py-2 text-xs font-medium transition ${
        copied ? "bg-emerald-600 text-white" : className
      }`}
    >
      {copied ? <CheckIcon width={14} height={14} /> : <CopyIcon width={14} height={14} />}
      {copied ? "Tersalin!" : label}
    </button>
  );
}

const groupDigits = (value: string) => value.replace(/(\d{4})(?=\d)/g, "$1 ");

function BankCard({ account }: { account: GiftAccount }) {
  return (
    <div className="relative aspect-[1.586/1] overflow-hidden rounded-2xl bg-gradient-to-br from-[#57493c] via-ink to-[#2a2520] p-5 text-white shadow-xl shadow-ink/25">
      <div className="absolute -right-12 -top-12 h-44 w-44 rounded-full bg-gold/25" />
      <div className="absolute -bottom-20 -left-10 h-48 w-48 rounded-full bg-white/5" />

      <div className="relative flex h-full flex-col justify-between">
        <div className="flex items-start justify-between">
          <div className="h-8 w-11 rounded-md bg-gradient-to-br from-gold-light to-gold p-1.5">
            <div className="h-full w-full rounded-sm border border-gold-dark/40" />
          </div>
          <p className="font-serif text-2xl font-semibold italic tracking-wide">{account.provider}</p>
        </div>

        <p className="font-mono text-xl tracking-[0.12em]">{groupDigits(account.number)}</p>

        <div className="flex items-end justify-between gap-3">
          <div className="min-w-0">
            <p className="text-[10px] uppercase tracking-[0.2em] text-white/55">Atas Nama</p>
            <p className="truncate text-sm font-medium">{account.holder}</p>
          </div>
          <CopyButton text={account.number} label="Salin" className="shrink-0 bg-white/15 text-white hover:bg-white/25" />
        </div>
      </div>
    </div>
  );
}

export default function Gift() {
  const { accounts, qris, address } = wedding.gift;

  return (
    <section id="hadiah" className="px-6 py-20">
      <Reveal>
        <SectionTitle eyebrow="Wedding Gift" title="Amplop Digital" />
        <p className="-mt-3 mb-10 text-center text-sm leading-relaxed text-muted">
          Doa restu Anda merupakan karunia yang sangat berarti bagi kami. Namun jika Anda ingin
          memberikan tanda kasih, Anda dapat mengirimkannya melalui:
        </p>
      </Reveal>

      <div className="space-y-5">
        {accounts.map((account, i) => (
          <Reveal key={`${account.provider}-${account.number}`} delay={i * 100}>
            <BankCard account={account} />
          </Reveal>
        ))}
      </div>

      {qris && (
        <Reveal className="mx-auto mt-8 max-w-xs text-center">
          <p className="mb-3 font-serif text-xl font-semibold">Scan QRIS</p>
          <img decoding="async" src={qris} alt="QRIS" className="w-full rounded-2xl border border-gold/30 bg-white p-4" />
        </Reveal>
      )}

      {address && (
        <Reveal className="mt-8">
          <div className="rounded-3xl border border-gold/30 bg-white/70 p-7 text-center">
            <div className="mx-auto grid h-14 w-14 place-items-center rounded-full bg-gold/10 text-gold-dark">
              <GiftIcon width={26} height={26} />
            </div>
            <p className="mt-3 font-serif text-2xl font-semibold">Kirim Kado</p>
            <p className="mt-3 font-medium">{address.recipient}</p>
            <p className="mt-1 text-sm leading-relaxed text-muted">{address.detail}</p>
            <div className="mt-5">
              <CopyButton
                text={`${address.recipient}\n${address.detail}`}
                label="Salin Alamat"
                className="bg-gold text-white hover:bg-gold-dark"
              />
            </div>
          </div>
        </Reveal>
      )}
    </section>
  );
}
