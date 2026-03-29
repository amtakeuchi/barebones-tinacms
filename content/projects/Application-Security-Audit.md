---
title: Application Security Audit
category: Application Security
thumbnail: /uploads/Gemini_Generated_Image_o86a45o86a45o86a.png
description: 'Three-layer security assessment of my portfolio site — manual code review with Claude Code, SAST scanning with Semgrep, and DAST scanning with OWASP ZAP. Found and fixed 5 vulnerabilities. Zero findings on application code after remediation.'
repoLink: 'https://github.com/amtakeuchi/portfolio-security-audit'
---

I security-audited my own portfolio site because if I'm going to call myself a cybersecurity professional, my own stuff should be locked down. I ran three layers of testing to make sure.

## Manual Code Review

I used Claude Code to go through every file in the codebase. It found five real vulnerabilities that I had missed while building the site:

An exposed CMS token that could let someone hijack my content management session. Fixed by moving it to a server-side environment variable and rotating the token.

An SSRF vulnerability through the image proxy — my image optimization endpoint was configured to accept any URL on the internet as a source. Fixed by restricting it to only the domains I actually use.

A CORS wildcard on my admin routes, allowing requests from any origin. Fixed by restricting it to the one domain that actually needs access.

An open proxy endpoint that was forwarding arbitrary requests to an external service using my app's credentials. Fixed by adding an allowlist for expected OAuth paths only.

Zero security headers at the application level. Added Strict-Transport-Security, X-Content-Type-Options, X-Frame-Options, Referrer-Policy, Permissions-Policy, and Content-Security-Policy across all routes.

## SAST — Static Application Security Testing

Ran Semgrep against the entire codebase. 246 rules across 68 files. Zero findings on my own code. The only flags were in third-party CMS-generated files that I excluded as false positives since that code isn't mine to fix.

## DAST — Dynamic Application Security Testing

Ran OWASP ZAP against the running site locally. It crawled every page for about 30 minutes, sending thousands of requests testing for SQL injection, XSS, path traversal, and dozens of other vulnerability types. Zero real findings. All alerts were informational or related to the header issue I was already fixing.

## Result

Five vulnerabilities found and fixed. Full CSP implemented with separate policies for the main site and admin panel. Clean SAST and DAST scans post-remediation. Three layers of security testing, zero remaining issues.

## Tools Used

Claude Code for manual code review. Semgrep for SAST. OWASP ZAP for DAST.
