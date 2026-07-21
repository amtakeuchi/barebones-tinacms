"use client";

import { useState } from "react";
import Link from "next/link";
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

export function RecentWorkFeed() {
  const [filter, setFilter] = useState<"all" | Track>("all");
  const rows = WRITEUPS.filter((w) => filter === "all" || w.track === filter);

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
              onClick={() => setFilter(f.key)}
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
        </div>

        <div className="feed-more">
          <Link id="btn-more" href="/work">
            $ fetch --more <span aria-hidden="true">&rarr;</span>
          </Link>
        </div>
      </div>
    </section>
  );
}
