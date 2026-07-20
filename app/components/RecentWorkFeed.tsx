"use client";

import { useEffect, useRef, useState } from "react";
import type { ReactNode } from "react";

type Track = "offense" | "defense" | "tooling";

interface Writeup {
  track: Track;
  kind: "blog" | "project";
  date: string;
  href: string;
  title: string;
  desc: string;
  proof: ReactNode;
}

const WRITEUPS: Writeup[] = [
  {
    track: "offense",
    kind: "blog",
    date: "2026-03",
    href: "/blog/I_Security-Audited_My_Own_Portfolio_Site",
    title: "i security-audited my own portfolio site",
    desc: "three layers on my own site: manual code review, semgrep sast, owasp zap dast. an exposed cms token, an ssrf, a cors wildcard, an open proxy, and zero security headers.",
    proof: (
      <>
        <b>5 vulns</b> found and fixed &middot; zero findings on app code after
      </>
    ),
  },
  {
    track: "defense",
    kind: "blog",
    date: "2026-04",
    href: "/blog/incidentresponsevercelbreach",
    title: "incident response on a day off: the vercel breach",
    desc: "my alert feeds said vercel was compromised and my site runs on vercel. four hours later i had a triage timeline, rotated credentials, and clean infrastructure.",
    proof: <>full triage timeline &middot; the decisions, in order</>,
  },
  {
    track: "tooling",
    kind: "project",
    date: "2026-03",
    href: "/projects/CyberfeedV2",
    title: "cyberfeed v2: a personal intelligence dashboard",
    desc: "37+ rss feeds across security, tech, finance, and world news, scored by importance and filtered by topic, region, and time. python and flask, runs locally.",
    proof: <>a dozen sites daily &middot; down to 10 minutes flat</>,
  },
];

const FILTERS: { key: "all" | Track; label: string }[] = [
  { key: "all", label: "all" },
  { key: "offense", label: "offense" },
  { key: "defense", label: "defense" },
  { key: "tooling", label: "tooling" },
];

type MoreState = "idle" | "loading" | "error" | "end";

export function RecentWorkFeed() {
  const [filter, setFilter] = useState<"all" | Track>("all");
  const [moreState, setMoreState] = useState<MoreState>("idle");
  const triedRef = useRef(false);
  const retryBtnRef = useRef<HTMLButtonElement>(null);

  const rows = WRITEUPS.filter((w) => filter === "all" || w.track === filter);

  useEffect(() => {
    if (moreState === "error") retryBtnRef.current?.focus();
  }, [moreState]);

  function fetchMore() {
    if (moreState === "loading") return;
    setMoreState("loading");
    const reduced = matchMedia("(prefers-reduced-motion: reduce)").matches;
    setTimeout(() => {
      if (!triedRef.current) {
        triedRef.current = true;
        setMoreState("error");
      } else {
        setMoreState("end");
      }
    }, reduced ? 60 : 900);
  }

  function selectFilter(key: "all" | Track) {
    setFilter(key);
    setMoreState("idle");
  }

  const moreVisible = rows.length > 0 && moreState !== "error" && moreState !== "end";

  return (
    <section className="block reveal" id="recent" aria-labelledby="recent-title">
      <div className="wrap">
        <div className="section-label">
          <span className="n">02</span>
          <h2 id="recent-title">recent work</h2>
        </div>

        <div className="feed-filters" role="group" aria-label="filter recent work">
          {FILTERS.map((f) => (
            <button
              key={f.key}
              type="button"
              data-filter={f.key}
              aria-pressed={filter === f.key}
              onClick={() => selectFilter(f.key)}
            >
              {f.label}
            </button>
          ))}
        </div>

        <div className="feed" id="feed" aria-live="polite">
          {rows.map((w) => (
            <a key={w.href} className="writeup" data-track={w.track} href={w.href}>
              <span className="date">
                {w.date} &middot; {w.kind} &middot; {w.track}
              </span>
              <span>
                <h3>{w.title}</h3>
                <p>{w.desc}</p>
                <p className="proof">{w.proof}</p>
              </span>
              <span className="go" aria-hidden="true">&rarr;</span>
            </a>
          ))}
          {moreState === "loading" && (
            <>
              <div className="skel" aria-hidden="true">
                <span style={{ width: "5rem" }} />
                <span style={{ width: "62%" }} />
              </div>
              <div className="skel" aria-hidden="true">
                <span style={{ width: "5rem" }} />
                <span style={{ width: "62%" }} />
              </div>
            </>
          )}
        </div>

        <div className="feed-state" data-on={rows.length === 0 ? "true" : "false"}>
          <span className="ps1">$</span> ls write-ups/defense/<br />
          nothing here yet. detection engineering notes are in the lab queue.
          <button type="button" onClick={() => selectFilter("all")}>
            show everything instead
          </button>
        </div>

        <div className="feed-state" data-on={moreState === "end" ? "true" : "false"}>
          <span className="ps1">$</span> fetch --more<br />
          that&apos;s the whole archive for now. more write-ups are in progress.
        </div>

        <div className="feed-state" data-on={moreState === "error" ? "true" : "false"} role="alert">
          <span className="ps1">$</span> fetch --more<br />
          <span className="err">error:</span> connection reset by peer. the archive is still warm, though.
          <button
            type="button"
            ref={retryBtnRef}
            onClick={() => {
              setMoreState("idle");
              fetchMore();
            }}
          >
            retry
          </button>
        </div>

        <div className="feed-more" style={{ display: moreVisible ? "" : "none" }}>
          <a
            id="btn-more"
            href="/work"
            aria-disabled={moreState === "loading"}
            onClick={(e) => {
              e.preventDefault();
              fetchMore();
            }}
          >
            {moreState === "loading" ? (
              "$ fetch --more ..."
            ) : (
              <>
                $ fetch --more <span aria-hidden="true">&rarr;</span>
              </>
            )}
          </a>
        </div>
      </div>
    </section>
  );
}
