---
title: CyberfeedV1
category: Python Projects
thumbnail: /uploads/CleanCyberThreatFeedSS.jpg
description: 'A keyword-filtered RSS aggregator built with Python and Flask that pulls cybersecurity, crypto, finance, and world news from 21 sources into a single local dashboard. My first real attempt at solving the problem of checking a dozen news sites every day. It worked, but it taught me everything I needed to know to build something significantly better.'
repoLink: 'https://github.com/amtakeuchi/cyberfeed_scraper'
---

If you work in cybersecurity, you already know the drill. Every morning starts with a rotation through half a dozen websites trying to figure out what happened overnight. BleepingComputer. Krebs. The Hacker News. CyberScoop. Then you check the finance side because crypto hacks and market movements tie into the threat landscape. Then world news because geopolitical events affect infrastructure security. By the time you've scanned everything, 45 minutes are gone and you haven't done any actual work yet.

I got tired of that. So I built CyberFeed.

## What I Built

CyberFeed V1 is a Python Flask application that pulls RSS feeds from 21 different sources, filters articles by a set of predefined keywords, and displays everything in a single browser-based dashboard running locally at 127.0.0.1. One tab, one feed, all the sources I care about in one place.

The idea was simple: instead of going to the news, the news comes to me.

I set up feeds across four categories. Ten cybersecurity sources (BleepingComputer, Krebs on Security, The Record, CyberScoop, Infosecurity Magazine, PortSwigger, and a few others), seven crypto and finance feeds (CoinTelegraph, CoinDesk, Bitcoinist, Investing.com, and more), and four world news and geopolitics sources (BBC World, Al Jazeera, UN News, and Defense News).

On top of that, I built a keyword filtering system. The app scans every article title against a list of terms I care about: things like "zero-day," "ransomware," "breach," "CVE," "privilege escalation," "nation-state," "bitcoin," "cloud security," and so on. If an article's title doesn't contain at least one keyword, it doesn't show up. This was my way of cutting noise from feeds that publish a lot of content that isn't relevant to what I'm tracking.

The frontend is a Bootstrap-based dark mode dashboard with a search bar that lets you filter visible articles by title, content, or both. There's a light/dark mode toggle that persists between sessions using localStorage. Nothing fancy, but functional.

## How It Works

The backend is straightforward. When you load the page, Flask calls the get\_articles() function, which loops through every configured RSS feed sequentially. For each feed, it sends an HTTP request using Python's requests library with a browser-like User-Agent header (some RSS servers reject requests that don't look like they're coming from a real browser). If the response comes back with a 200 status, it parses the feed with feedparser and checks each article's title against the keyword list. Matches get added to the articles array with their title, link, publication date, source name, content summary, and category.

The articles array is then passed to a Jinja2 HTML template that renders everything in a scrollable feed with Bootstrap styling.

The keyword filtering happens at the Python level during article collection, not on the frontend. This means articles that don't match any keyword never reach the browser at all. The search bar on the frontend is a secondary filter that lets you narrow down what's already been collected.

## My Reasoning Behind the Design Decisions

* Why keyword filtering instead of showing everything. RSS feeds are noisy. BleepingComputer publishes dozens of articles daily, and a lot of them are software update announcements or general tech news that has nothing to do with active threats. The keyword filter ensures I only see content that's actually relevant to my work and interests. If something doesn't mention a CVE, a breach, a threat actor, or a technology I'm tracking, I probably don't need to see it during my morning scan.
* Why a local Flask app instead of a hosted solution. I wanted something that runs on my machine, doesn't require an account, doesn't cost anything, and doesn't depend on a third-party service staying online. If Feedly goes down or changes their pricing, that's their problem. My feed runs as long as Python runs.
* Why Bootstrap for the frontend. Speed of development. I'm not a frontend developer. Bootstrap gave me a clean, responsive layout without having to write custom CSS for every element. The focus was on getting the tool functional, not winning design awards.
* Why those specific sources. Each feed was chosen for a reason. Krebs and BleepingComputer are the gold standard for breaking cybersecurity news. The Record and CyberScoop cover the policy and threat intel side. PortSwigger covers web application security specifically, which aligns with my focus on application security. The crypto feeds were included because blockchain hacks and exchange compromises are a massive part of the current threat landscape. BBC and Al Jazeera provide global coverage that helps contextualize geopolitical cyber threats.

## What I'd Improve (Hindsight Is 20/20)

After using V1 daily for a while, the cracks became obvious. Here's what I'd do differently.

* Articles were grouped by source, not sorted by time. This was the biggest usability problem. The app fetched feeds sequentially and dumped articles into the array in the order they were collected. That meant I'd see all the BleepingComputer articles in a block, then all the Krebs articles in another block, and so on. To find the most recent news across all sources, I had to scroll through the entire page. What I actually wanted was a chronological timeline mixing all sources together.
* Content was raw HTML garbage. The entry.get('summary', '') field from RSS feeds often contains HTML tags, encoded entities, and formatting artifacts. I was displaying that raw content directly in the template. It looked terrible. Some articles showed clean text, others showed a mess of \<p> tags and \&amp; entities. Proper HTML stripping and entity decoding should have been part of the pipeline from the start.
* Sequential fetching was slow. With 21 feeds and a 10-second timeout on each, worst-case page load was over 3 minutes. Average was around 20 to 30 seconds. That's painfully slow for something you're opening every morning. Parallel fetching would have cut that to a few seconds.
* No caching. Every single page load triggered a fresh fetch of all 21 feeds. If I refreshed the page 5 times in 10 minutes, that's 5 full rounds of HTTP requests to every RSS server. Wasteful and slow. A simple cache with a 15-minute expiry would have eliminated most of that.
* No deduplication. When a major story breaks, it appears in BleepingComputer, The Record, CyberScoop, and Krebs all at once. V1 shows the same story 4 times because it has no way to detect duplicates.
* Finance feeds were mostly crypto. Six of the seven finance feeds were crypto-specific. I wanted actual economic and market news too, but only had Investing.com for that. The feed selection was unbalanced.
* No importance ranking. All articles were treated equally. A zero-day being actively exploited in the wild sat at the same visual level as a minor software update. There was no way to surface high-priority stories without manually scanning every headline.
* No filtering by category, region, or time. The category label was displayed on each article but you couldn't click it to filter. If I only wanted to see cybersecurity news, I had to visually skip past everything else.
* Keyword filtering was too aggressive. The keyword system was binary: if the title contained a keyword, the article showed up. If it didn't, the article was invisible. This meant legitimate news stories with titles that didn't happen to include one of my keywords were silently dropped. A scoring-based approach (where keywords boost an article's visibility rather than acting as a hard gate) would have been more flexible.

## What I Learned

Building CyberFeed V1 taught me more about practical software development than most of my coursework did. Not because it was technically complex, but because I was building something I actually used every day. That changes the feedback loop completely. When you use your own tool, you feel every design flaw personally.

I learned that RSS feeds are wildly inconsistent in how they format content, dates, and metadata. I learned that sequential HTTP requests don't scale, even at 21 feeds. I learned that a tool's usability matters as much as its functionality, because a working tool that's annoying to use just gets abandoned.

Most importantly, I learned that building version 1 of anything is about understanding the problem. You can't design the right solution until you've lived with the wrong one long enough to know exactly where it falls short. V1 was never going to be the final product. It was the prototype that taught me what the real product needed to be.

That's exactly what it did. And that's why I'll make a V2 in future.
