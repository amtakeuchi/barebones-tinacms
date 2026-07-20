"use client";

import { useEffect, useRef } from "react";

const GLYPHS = "!<>-_\\/[]{}—=+*^?#________";
function rglyph() {
  return GLYPHS[Math.floor(Math.random() * GLYPHS.length)];
}

/**
 * Streams `text` into `el` char by char, each character flickering through
 * a couple of random glyphs before locking. Ported 1:1 from the v14 mockup.
 * Returns a cancel function so the caller can bail out of pending timeouts.
 */
function streamGlitch(
  el: HTMLElement,
  text: string,
  opts: { speed?: number; scrambleMs?: number; onDone?: () => void }
) {
  const speed = opts.speed ?? 12;
  const scrambleMs = opts.scrambleMs ?? 28;
  el.textContent = "";
  let i = 0;
  let cancelled = false;
  const timers: ReturnType<typeof setTimeout>[] = [];

  function next() {
    if (cancelled) return;
    if (i >= text.length) {
      opts.onDone?.();
      return;
    }
    const ch = text[i];
    i++;

    if (ch === " ") {
      el.textContent += " ";
      timers.push(setTimeout(next, speed));
      return;
    }

    const span = document.createElement("span");
    span.className = "dud";
    span.textContent = rglyph();
    el.appendChild(span);

    let swaps = 0;
    const maxSwaps = 1 + Math.floor(Math.random() * 2);
    const swapInterval = scrambleMs / maxSwaps;

    function doSwap() {
      if (cancelled) return;
      swaps++;
      if (swaps >= maxSwaps) {
        const node = document.createTextNode(ch);
        span.replaceWith(node);
        timers.push(setTimeout(next, speed));
        return;
      }
      span.textContent = rglyph();
      timers.push(setTimeout(doSwap, swapInterval));
    }
    timers.push(setTimeout(doSwap, swapInterval));
  }

  next();
  return () => {
    cancelled = true;
    timers.forEach(clearTimeout);
  };
}

const DECODE_LINES = [
  { key: "name", text: "adam takeuchi.", delay: 1100 },
  { key: "role", text: "cybersecurity analyst.", delay: 1200 },
  { key: "hook", text: "i break things to learn how they hold, then build them back harder.", delay: 1300 },
] as const;

export function Hero() {
  const kanjiRef = useRef<HTMLSpanElement>(null);
  const typeRef = useRef<HTMLSpanElement>(null);
  const h1Ref = useRef<HTMLHeadingElement>(null);
  const subRef = useRef<HTMLParagraphElement>(null);
  const nameFxRef = useRef<HTMLSpanElement>(null);
  const roleFxRef = useRef<HTMLSpanElement>(null);
  const hookFxRef = useRef<HTMLSpanElement>(null);
  const proofRef = useRef<HTMLElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const reduced = matchMedia("(prefers-reduced-motion: reduce)").matches;
    const timers: ReturnType<typeof setTimeout>[] = [];
    const cancels: Array<() => void> = [];
    let kanjiInterval: ReturnType<typeof setTimeout> | undefined;

    if (reduced) return;

    // whoami typer
    if (typeRef.current) {
      const word = typeRef.current.textContent ?? "";
      typeRef.current.textContent = "";
      let ti = 0;
      timers.push(
        setTimeout(function tick() {
          if (!typeRef.current) return;
          typeRef.current.textContent = word.slice(0, ++ti);
          if (ti < word.length) timers.push(setTimeout(tick, 32));
        }, 120)
      );
    }

    // stream-decode the three hero lines, then reveal proof + cta
    const fxRefs = { name: nameFxRef, role: roleFxRef, hook: hookFxRef };
    const containerRefs = { name: h1Ref, role: h1Ref, hook: subRef };
    let maxTime = 0;

    DECODE_LINES.forEach((line) => {
      const fx = fxRefs[line.key].current;
      if (!fx) return;
      const nonSpace = line.text.replace(/\s/g, "").length;
      const estTime = line.delay + nonSpace * 15 + nonSpace * 25;
      if (estTime > maxTime) maxTime = estTime;

      timers.push(
        setTimeout(() => {
          const container = containerRefs[line.key].current;
          if (container) container.style.opacity = "1";
          const cancel = streamGlitch(fx, line.text, {
            speed: 10,
            scrambleMs: 25,
            onDone: () => {
              fx.classList.add("settled");
              timers.push(setTimeout(() => fx.classList.remove("settled"), 400));
            },
          });
          cancels.push(cancel);
        }, line.delay)
      );
    });

    timers.push(
      setTimeout(() => {
        proofRef.current?.classList.add("reveal");
        ctaRef.current?.classList.add("reveal");
      }, maxTime + 60)
    );

    // kanji rgb-split glitch: first hit ~1.1s in, then every 3.2-4.9s
    const kanji = kanjiRef.current;
    if (kanji) {
      const fire = () => {
        kanji.classList.add("glitch");
        timers.push(setTimeout(() => kanji.classList.remove("glitch"), 480));
        kanjiInterval = setTimeout(fire, 3200 + Math.random() * 1700);
      };
      kanjiInterval = setTimeout(fire, 1100);
    }

    return () => {
      timers.forEach(clearTimeout);
      cancels.forEach((c) => c());
      if (kanjiInterval) clearTimeout(kanjiInterval);
    };
  }, []);

  return (
    <section className="hero" id="top" aria-labelledby="hero-title">
      <span className="kanji" id="kanji" ref={kanjiRef} aria-hidden="true">
        <span className="kanji-glyph">安</span>
      </span>
      <span className="kanji-caption" aria-hidden="true">竹内</span>
      <div className="wrap hero-inner">
        <p className="hero-prompt rise rise-1">
          <span className="ps1">adam@securi-tee:~$</span>{" "}
          <span ref={typeRef}>whoami</span>
          <span className="cursor" aria-hidden="true"></span>
        </p>
        <h1 id="hero-title" className="scramble-line" ref={h1Ref}>
          <span className="decode">
            <span className="sr-only">adam takeuchi.</span>
            <span className="decode-fx" aria-hidden="true" ref={nameFxRef}>adam takeuchi.</span>
          </span>
          <span className="role">
            <span className="decode">
              <span className="sr-only">cybersecurity analyst.</span>
              <span className="decode-fx" aria-hidden="true" ref={roleFxRef}>cybersecurity analyst.</span>
            </span>
          </span>
        </h1>
        <p className="hero-sub scramble-line" ref={subRef}>
          <span className="decode">
            <span className="sr-only">i break things to learn how they hold, then build them back harder.</span>
            <span className="decode-fx" aria-hidden="true" ref={hookFxRef}>
              i break things to learn how they hold, then build them back harder.
            </span>
          </span>
        </p>
        <nav className="hero-proof" aria-label="recent work" ref={proofRef}>
          <a data-track="offense" href="/blog/ssrf-past-the-allowlist">
            <span className="mark" aria-hidden="true">offense</span>
            ssrf variant research: past the allowlist
            <span className="arrow" aria-hidden="true">&rarr;</span>
          </a>
          <a data-track="offense" href="/blog/silentchain-xss-juice-shop">
            <span className="mark" aria-hidden="true">offense</span>
            silentchain: an xss hunt on owasp juice shop
            <span className="arrow" aria-hidden="true">&rarr;</span>
          </a>
          <a data-track="tooling" href="/projects/autonomous-recon">
            <span className="mark" aria-hidden="true">tooling</span>
            autonomous recon: a pipeline that hunts while i sleep
            <span className="arrow" aria-hidden="true">&rarr;</span>
          </a>
        </nav>
        <div className="hero-contact" ref={ctaRef}>
          <a className="text-link" href="#contact">
            get in touch <span className="arrow" aria-hidden="true">&rarr;</span>
          </a>
        </div>
      </div>
    </section>
  );
}
