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
    date: "2026-06",
    href: "/blog/ssrf-past-the-allowlist",
    title: "ssrf variant research: past the allowlist",
    desc: "a systematic hunt through url parser disagreements, redirect chains, and dns rebinding to map how ssrf filters actually fail in the wild.",
    proof: (
      <>
        <b>14 bypass variants</b> catalogued &middot; <b>3</b> written up nowhere else
      </>
    ),
  },
  {
    track: "offense",
    kind: "blog",
    date: "2026-05",
    href: "/blog/silentchain-xss-juice-shop",
    title: "silentchain: an xss hunt on owasp juice shop",
    desc: "chaining low-noise dom sinks into working payloads on juice shop, with notes on which sanitizer assumptions broke and why.",
    proof: <>full chain documented &middot; sink to payload, step by step</>,
  },
  {
    track: "tooling",
    kind: "project",
    date: "2026-04",
    href: "/projects/autonomous-recon",
    title: "autonomous recon: a pipeline that hunts while i sleep",
    desc: "subdomain discovery, live-host triage, and change detection wired into one agent-driven pipeline that files its own findings.",
    proof: <>runs nightly &middot; findings land as structured reports</>,
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
