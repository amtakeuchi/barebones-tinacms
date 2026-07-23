import type { ReactNode } from "react";

export type Track = "offense" | "defense" | "tooling";

export interface Writeup {
  track: Track;
  kind: "blog" | "project";
  date: string;
  href: string;
  title: string;
  desc: string;
  proof: ReactNode;
}

export const WRITEUPS: Writeup[] = [
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
