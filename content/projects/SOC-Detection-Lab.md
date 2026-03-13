---
title: SOC Detection Lab
category: Blue Team
thumbnail: /uploads/soc-operations-dashboard.png
description: 'A 3-VM SOC environment built from scratch on a ThinkPad — ELK Stack SIEM, Tines SOAR, Atomic Red Team attack simulation, and custom detection rules covering 7+ MITRE ATT&CK techniques with sub-60-second detection latency. Built to prove I could do the job, not just talk about it.'
repoLink: 'https://github.com/amtakeuchi/soc-detection-lab'
---

This started because I got rejected.

In September 2025, I interviewed for a SOC analyst role at a company here in Winnipeg. I couldn't define SOAR. I fumbled through email header analysis. I didn't know basic investigation commands. The feedback was honest: "great security knowledge but not strong at all for SOC stuff." Fair enough. That rejection lit a fire.

So I built the thing myself.

## What It Is

A full SOC detection environment running on my ThinkPad P15 — three virtual machines simulating an enterprise network with a SIEM, a domain controller, and a compromised endpoint running real attack simulations.

The setup:

* Ubuntu VM running Elasticsearch and Kibana as the SIEM — ingesting logs, indexing events, and giving me a dashboard to hunt through
* Windows Server 2019 VM acting as a Domain Controller for the homelab.local domain, with Sysmon and Winlogbeat shipping security logs to the SIEM
* Windows 11 Pro VM as a domain-joined client running Atomic Red Team for attack simulation — this is the "compromised endpoint" that an attacker would be operating from

All three VMs run on VMware Workstation Pro with 16GB allocated and 16GB left over as buffer. Everything communicates over a NAT network on the 192.168.150.0/24 subnet with static IPs.

## The Detection Engineering

I built five detection rules from scratch, each mapped to a specific MITRE ATT\&CK technique. Every rule was validated against a real simulated attack, not just written and hoped for the best.

The techniques I covered:

* T1053.005 — Scheduled Task Creation (persistence)
* T1055.001 — Process Injection via Mavinject (defense evasion)
* T1547.001 — Registry Run Key Persistence (persistence)
* T1036.003 — Masquerading (defense evasion)
* T1082 — System Information Discovery (discovery)

Each detection uses KQL queries in Kibana filtering on specific Sysmon Event IDs. Process creation is Event ID 1, process access is Event ID 10, file creation is 11, registry modification is 13. Detection time averaged under 60 seconds, with some rules firing in under 30.

## The SOAR Pipeline

Outside of the SIEM, I set up a Tines workflow for automated incident response. The pipeline works like this: Kibana detects an attack, a webhook fires to Tines, Tines sends me an email notification with full context (MITRE technique, severity, hostname, process details), then runs a VirusTotal hash lookup for threat enrichment, and logs everything.

Getting Tines to cooperate was probably the most frustrating part of the whole build. TheHive wouldn't install. Shuffle ate all my VM resources. Tines worked but the formula syntax for referencing webhook data had me fighting it for hours. The workflow I ended up with isn't fully automated end-to-end from Kibana yet — that part's still in progress via a custom Python detection engine — but every component works and the pipeline executes in under 60 seconds.

## The Stuff That Went Wrong

A lot. Elasticsearch wouldn't accept connections from the Windows VMs because it was bound to localhost by default. Kibana threw SSL errors because I disabled security on Elasticsearch but forgot to switch the protocol from HTTPS to HTTP. Ubuntu's IP kept changing because I forgot to set it to static. Windows Server 2019 ISOs failed to install across multiple hypervisors and multiple downloads before I figured out the workaround. I accidentally removed the DNS role from my Domain Controller and broke Active Directory. Windows Defender quarantined Atomic Red Team because it contains actual attack tools. I had to switch SIEMs. My SOARs were swapped on the fly because they either refused to work or ate all my setup resources. Google Sheets wouldn't cooperate with the SOAR chain I set up.

Every single one of these problems taught me something. The troubleshooting is the experience.

## What's Next

There's more I want to do with this lab:

* A Raspberry Pi honeypot feeding real attack data into the SIEM — actual threat actors hitting an exposed endpoint, analyzed alongside my simulated attacks
* A custom Python detection engine to fully automate the Kibana-to-Tines pipeline without needing the paid Kibana tier for webhook connectors
* More MITRE ATT\&CK technique coverage, especially lateral movement and exfiltration
* Documentation of everything on my blog at securi-tee.com

The full repo with detection rules, SOAR workflows, and documentation is linked below.
