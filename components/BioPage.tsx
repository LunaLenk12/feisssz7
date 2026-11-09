"use client";

import { useEffect, useRef, useState } from "react";
import { profile } from "@/lib/profile";
import { LinkIcon } from "./Icons";

function useTypewriter(lines: readonly string[], active: boolean) {
  const [text, setText] = useState("");

  useEffect(() => {
    if (!active) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) {
      setText(lines[0]);
      return;
    }
    let line = 0;
    let i = 0;
    let deleting = false;
    let t: ReturnType<typeof setTimeout>;

    const tick = () => {
      const full = lines[line];
      if (!deleting) {
        i++;
        setText(full.slice(0, i));
        if (i === full.length) {
          deleting = true;
          t = setTimeout(tick, 1800);
          return;
        }
        t = setTimeout(tick, 70);
      } else {
        i--;
        setText(full.slice(0, i));
        if (i === 0) {
          deleting = false;
          line = (line + 1) % lines.length;
          t = setTimeout(tick, 350);
          return;
        }
        t = setTimeout(tick, 35);
      }
    };
    t = setTimeout(tick, 400);
    return () => clearTimeout(t);
  }, [lines, active]);

  return text;
}

export default function BioPage() {
  const [entered, setEntered] = useState(false);
  const [avatarOk, setAvatarOk] = useState(true);
  const [videoOk, setVideoOk] = useState(true);
  const [muted, setMuted] = useState(false);
  const card = useRef<HTMLDivElement>(null);
  const video = useRef<HTMLVideoElement>(null);
  const typed = useTypewriter(profile.bio, entered);

  // Browsers only allow sound after a click, so the entry click starts the clip with audio
  const enter = () => {
    setEntered(true);
    const v = video.current;
    if (!v) return;
    v.currentTime = 0;
    v.volume = profile.background.volume;
    v.muted = false;
    v.play().catch(() => {
      v.muted = true;
      setMuted(true);
      v.play().catch(() => {});
    });
  };

  const toggleMute = () => {
    const v = video.current;
    if (!v) return;
    v.muted = !v.muted;
    setMuted(v.muted);
  };

  // Card tilts toward the cursor
  const onMove = (e: React.MouseEvent) => {
    const el = card.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width - 0.5;
    const y = (e.clientY - r.top) / r.height - 0.5;
    el.style.transform = `perspective(900px) rotateY(${x * 9}deg) rotateX(${-y * 9}deg)`;
  };
  const onLeave = () => {
    if (card.current) card.current.style.transform = "perspective(900px) rotateY(0) rotateX(0)";
  };

  return (
    <main className="relative h-full w-full overflow-hidden bg-void">
      {videoOk ? (
        <>
          <video
            ref={video}
            src={profile.background.video}
            autoPlay
            muted
            loop
            playsInline
            preload="auto"
            onError={() => setVideoOk(false)}
            className="fixed inset-0 h-full w-full object-cover"
          />
          <div className="fixed inset-0 bg-white/60" />
        </>
      ) : (
        <div className="aurora" />
      )}
      <div className="grain" />
      <div className="vignette" />

      {/* Entry screen */}
      <button
        type="button"
        onClick={enter}
        aria-hidden={entered}
        tabIndex={entered ? -1 : 0}
        className={`absolute inset-0 z-20 flex items-center justify-center bg-void/70 backdrop-blur-2xl transition-all duration-700 ${
          entered ? "pointer-events-none opacity-0" : "opacity-100"
        }`}
      >
        <span className="font-display text-sm tracking-widest text-black/70 animate-pulse">click to enter</span>
      </button>

      {/* Card */}
      <section
        className={`relative z-10 flex h-full items-center justify-center px-5 transition-all duration-1000 ${
          entered ? "scale-100 opacity-100" : "scale-95 opacity-0"
        }`}
      >
        <div
          ref={card}
          onMouseMove={onMove}
          onMouseLeave={onLeave}
          className="w-full max-w-sm rounded-[28px] border border-black/10 bg-black/[0.04] p-8 text-center shadow-[0_30px_80px_-20px_rgba(0,0,0,0.18)] backdrop-blur-xl transition-transform duration-150 ease-out"
        >
          <div className="mx-auto mb-5 h-28 w-28 rounded-full bg-gradient-to-br from-ember via-fuchsia-400 to-sky-400 p-[2px]">
            {avatarOk ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={profile.avatar}
                alt={`${profile.name} avatar`}
                onError={() => setAvatarOk(false)}
                className="h-full w-full rounded-full bg-void object-cover"
              />
            ) : (
              <div className="flex h-full w-full items-center justify-center rounded-full bg-void font-display text-3xl font-bold text-black/90">
                {profile.name.slice(0, 1)}
              </div>
            )}
          </div>

          <h1 className="shimmer font-display text-4xl font-bold">{profile.name}</h1>
          <p className="mt-1 text-sm text-black/40">{profile.domain}</p>

          <p className="caret mt-5 min-h-[1.5rem] text-sm text-black/75" aria-label={profile.bio[0]}>
            {typed}
          </p>

          <ul className="mt-8 flex flex-col gap-3">
            {profile.links.map((l) => (
              <li key={l.id}>
                <a
                  href={l.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center gap-3 rounded-2xl border border-black/10 bg-black/[0.03] px-4 py-3 text-left transition hover:border-ember/50 hover:bg-black/[0.08] focus-visible:outline focus-visible:outline-2 focus-visible:outline-ember"
                >
                  <LinkIcon id={l.id} className="h-5 w-5 shrink-0 text-black/80 transition group-hover:text-ember" />
                  <span className="flex-1 text-sm font-medium">{l.label}</span>
                  <span className="max-w-[9rem] truncate text-xs text-black/40">{l.handle}</span>
                </a>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {entered && videoOk && (
        <button
          type="button"
          onClick={toggleMute}
          aria-label={muted ? "Unmute" : "Mute"}
          className="fixed bottom-5 right-5 z-30 flex h-10 w-10 items-center justify-center rounded-full border border-black/10 bg-black/[0.06] text-black/70 backdrop-blur-md transition hover:bg-black/[0.14] focus-visible:outline focus-visible:outline-2 focus-visible:outline-ember"
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5" aria-hidden="true">
            <path d="M4 9.5v5h3.5L12 18.5v-13L7.5 9.5H4z" />
            {muted ? <path d="M16 9.5l5 5M21 9.5l-5 5" /> : <path d="M16 9a4 4 0 0 1 0 6M18.5 6.5a8 8 0 0 1 0 11" />}
          </svg>
        </button>
      )}
    </main>
  );
}
