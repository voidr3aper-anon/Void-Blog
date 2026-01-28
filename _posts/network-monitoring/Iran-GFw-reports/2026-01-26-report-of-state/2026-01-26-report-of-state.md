---
layout: post
title: "The Wall of China Around Iran's Internet"
date: 2026-01-26 08:45:00 -0000
last_modified_at: 2026-01-26 08:45:00 -0000
author: "The Void"
author_link: "https://github.com/voidr3aper-anon"
categories: [Network Monitoring]
tags: [network-monitoring, report, iran]
image: "assets/posts/network-monitoring/Iran-GFw-reports/2026-01-26-report-of-state/images/trailer.png"
excerpt: "The internet state in the middle of Iran's protests"
---

As protests erupted across Iran, we have been documenting a massive internet shutdown spanning the entire nation. This shutdown remains ongoing as this article is being written.

---

## Timeline: When It All Started

> **Timeline Overview:**
> - **Jan 3-7:** Bandwidth reduction phase
> - **Jan 9:** Complete communication shutdown
> - **Jan 11:** Partial recovery (SMS/landline in work hours)
> - **Week 2:** Selective reopening of services

During the first week of protests, bandwidth reduction from January 3–7 was the initial strategy. Examination of Cloudflare analytics reveals a counterintuitive pattern: overall traffic **rose** during this period. The bot-to-human ratio is more revealing: automated traffic surged rapidly—a clear indicator of active firewall probing and testing.

![Human vs bot]({{ '/assets/posts/network-monitoring/Iran-GFw-reports/2026-01-26-report-of-state/images/human-vs-bot.png' | relative_url }})

This changed dramatically on **January 9th**. A **complete communication blackout** occurred—not merely internet restriction, but total shutdown across all channels:

- International internet: blocked
- Domestic "national internet": blocked
- Domestic messengers (Eitaa, Rubika, etc.): shut down
- SMS services: offline
- Mobile calls: offline
- Landline services: offline  
- Base station transmitters (BTS): powered down on major providers (MCCI, Rightel)

By January 11th, limited restoration began: SMS and landline services returned in select areas, but only during working hours (6 AM–6 PM).

For nearly **7 consecutive days**, there was no functional internet in Iran—not censorship, not filtering, but a **complete architectural shutdown**. Only prohibited satellite networks remained operational (detailed in a separate technical report).

Throughout the first week, shutdown remained total. By week's end, selected domestic messengers were gradually restored.

**Data Sources & Methodology**

This analysis draws from multiple authoritative sources:
- **Cloudflare Analytics** – Traffic patterns and radar data
- **NetBlocks Observatory** – Independent network monitoring  
- **OONI Probe** – Network interference testing
- **Datacenter Partners** – Arvan Cloud and related infrastructure data
- **Network OSINT** – Continuous behavioral monitoring

*Note: Some monitoring methodologies cannot be disclosed due to operational security risks. All findings have been independently verified.*

---

## Network Infrastructure Analysis

During this internet shutdown, different types of network infrastructure were affected in various ways. Let's examine how each network type behaved during the crisis:

### 1. Home Networks (ADSL, VDSL, Fiber)

During the shutdown's first two weeks, home networks were restricted to **domestic-only access**. Users couldn't obtain valid IPs from providers like Asiatech and TCI. After several days, limited local site access was permitted.

**Key Observation:** Historically, home networks recovered faster than mobile networks after previous shutdowns. This time was **strikingly different**—the opposite occurred. When authorities opened specific Google and ChatGPT IPs on mobile networks, home networks remained blocked for days longer. Starting week two, mobile network users achieved broader internet access; home networks did not.

**Conclusion:** The government shifted strategy dramatically, prioritizing mobile network restriction while maintaining stricter home network controls.

### 2. Mobile Networks

Initial shutdown: unstable BTS connectivity. By the first week, connections stabilized and domestic messengers were restored. Mobile networks showed significantly greater flexibility than home networks—some users achieved global internet access through specific techniques.

**Key Factor:** Mobile networks host the majority of Iranian users and historically offered faster connectivity (until fiber deployment). Most users maintain dual SIM cards from different providers for redundancy.

**Strategy Pattern:** The government's typical playbook:
1. Disconnect BTS registration (immediate shutdown)
2. Restore domestic internet (after 2–3 days)
3. Restore international internet (after 2–3 weeks)

This shutdown followed the same pattern but with **different timing windows**—authorities delayed full restoration longer than previous incidents. Critically, the government **did not fully restore domestic internet until whitelisting implementation was complete**.

### 3. Datacenters

From the previous incident (Aban 98), authorities learned that users could tunnel VPN traffic through datacenter proxies to bypass restrictions. This time, **datacenters were preemptively disconnected**.

However, some providers—notably **Arvan Cloud**—were operationally prepared with redundant infrastructure: independent NTP servers, domestic DNS, and domestic AI solutions. This preparation strongly suggests the government **expected these shutdowns to recur** and planned accordingly—not a temporary measure.

**Implication:** Some datacenters maintained limited connectivity during the two-week blackout (details in forthcoming reports).

### 4. Satellite Networks

Satellite connectivity (primarily Starlink, though officially prohibited in Iran) was the sole reliable external communication channel. However, it was not spared: authorities deployed active jamming with varying intensity. 

The government publicly claimed successful location-tracking of satellite users through:
- Drone-mounted infrared cameras
- WiFi MAC address and SSID identification (street-level scanning)
- Military RF signal detection

---

## Protocol-Level Analysis

Now that we've examined how different network infrastructures were affected, let's dive deeper into the protocol level. Understanding which protocols were blocked and how they were targeted gives us crucial insights into the firewall's strategy. We observed different protocols in this situation and split them into different categories:

### 1. TCP Protocol

TCP is consistently targeted as the primary protocol for international traffic. Traffic analysis shows characteristic patterns: sudden disconnections followed by brief reconnections at irregular intervals.

**Why TCP?** The protocol dominates international communication and carries both legitimate and circumvention traffic—making selective blocking nearly impossible.

**VPN Evolution on TCP:**

| Era | Protocol | Primary Focus | Firewall Response |
|-----|----------|---------------|------------------|
| 2023 | Reality (Xray) | Hide SNI | SNI blocking |
| 2023–2024 | Fragmentation | Obscure SNI in packets | Block fragmented < 100 bytes |
| January 2026 | Whitelisting | Approve specific IPs only | Redirect to filtered IP ranges |

**Technical Details:**
- **Blocked:** Fragmented TCP handshakes under 100 bytes  
- **Previously Worked:** Fragmentation at 400–800 bytes (now blocked)
- **Whitelisted Services:** ChatGPT, Google, DeepSeek (with operational restrictions)

**CDN Exploitation Attempt:**

The government discovered that ChatGPT (Cloudflare-hosted) and Google (Google Cloud) used CDN infrastructure—millions of IPs making selective blocking nearly impossible. The approach evolved:

1. **Initial Test:** Whitelisted single ChatGPT IP: `104.18.32.47`
2. **Adjustment:** Redirected all Cloudflare traffic through restricted ranges: `188.114.99.0`–`188.114.98.0` (MCCI network)
3. **Google Response:** Banned Iranian IP blocks entirely—users cannot leverage Google's CDN to bypass restrictions

**Key Takeaway:** The government encountered a fundamental architectural constraint: **CDNs cannot be partially whitelisted without enabling VPN bypass**. This remains their primary technical vulnerability.

### 2. UDP & ICMP Protocols

Both UDP and ICMP saw **near-complete blocking**—more aggressive than TCP filtering because they're less critical for daily internet use.

**Targets:**
- WireGuard and other UDP-based VPNs (blocked)
- ICMP tunneling (learned from Iran–Israel conflict in late 2024 when ICMP tunneling worked effectively)
- Home networks: **100% blocked**
- Mobile networks: **heavily jammed**

![ICMP block]({{ '/assets/posts/network-monitoring/Iran-GFw-reports/2026-01-26-report-of-state/images/icmp-block.png' | relative_url }}) 

### 3. DNS Protocol

DNS filtering has been Iran's primary censorship mechanism since 2009 (YouTube, Facebook blockages). The government's approach evolved with security technology:

**Evolution:**
- **2009–2023:** Man-in-the-middle DNS redirects (e.g., to `10.10.34.36`)
- **2023–2026:** Block secure DNS (DoH, DoT) by SNI filtering
- **January 2026:** DNS tunneling surge

**Data from Cloudflare Analytics:**

The dramatic shift in query types after January 11 is unmistakable: **TXT-based DNS queries surged sharply**, indicating widespread DNS tunneling adoption using protocols like `dnstt`.

![Cloudflare DNS report]({{ '/assets/posts/network-monitoring/Iran-GFw-reports/2026-01-26-report-of-state/images/cloudflare-radar_data-explorer-visualizer_20260107-20260126.png' | relative_url }})

**Interpretation:** The sudden spike in TXT records—normally negligible in DNS traffic—is a clear fingerprint of DNS tunneling. This technique succeeded because **authorities did not anticipate it**. The message to security teams: expect DNS tunneling to be blocked in future incidents.

**Recommendation:** Continue developing DNS tunnel variants; this architecture represents a critical long-term vulnerability for the firewall.

### 4. IP Protocol

IP blocking wasn't ever the biggest strategy for the firewall until now. Yes, we had some IP blocking on some networks (for example, Irancell blocked pornography websites using direct IP blocking), but other solutions were always prioritized. However, alongside the whitelisting strategy, authorities are now moving toward IP blocking. They understood that **blacklisting cannot work** for their goals.

**The Whitelisting Challenge:**

I assure you whitelisting won't work either. Yes, it's very powerful initially, but it requires immense resources to:
- Block all unwanted IP ranges
- Provide alternative services for blocked websites
- Maintain consistency across providers

There are always more ways to bypass whitelisting, which we'll cover in future posts.

**Implementation (January 2026):**

IP whitelisting officially started in the second week by approving these IPs:

| Service | IP Address | Status |
|---------|-----------|--------|
| **ChatGPT** | `104.18.32.47` | Later redirected to other ranges |
| **Google** | `216.239.38.120` | Blocks Iranian IPs entirely |
| **DeepSeek** | `3.160.196.89` | Limited access |

The government has **not stopped** and we expect expansion in bigger scale to implement tiered internet (differential access for people, organizations, and states). Whitelisting gives them better control than blacklisting.

**The Fundamental Challenge:**

The main issue remains CDN IPs and selective website access. People have found effective mitigations by resolving other sites behind Cloudflare using localhost file configurations. **We encourage tech teams to focus on this weakness** because it's the future of firewall strategy.

**Summary:** While IP whitelisting appears powerful, it faces the same fundamental challenge as other blocking methods: CDN infrastructure makes it nearly impossible to restrict access without breaking legitimate services. This architectural weakness, combined with the distributed nature of Iran's firewall (which we'll examine next), creates opportunities for circumvention.

---

# How the Firewall Works

Based on our observations of network behavior and protocol blocking patterns, we can now map out the firewall architecture. The outcome of the previous analysis enables us to build a profile of Iran's firewall system, though some aspects remain unclear.

The firewall of Iran is not a single point on the main infrastructure, but rather a **distributed firewall system** operating on two levels:

1. **Provider-level firewalls:** Each ISP may have its own firewall implementation
2. **Infrastructure-level firewall:** A centralized system that applies general rules

As we observed, the main infrastructure firewall is less intensive and does not apply SNI blocking and other sophisticated filtering techniques. These jobs are delegated to the providers' firewalls. That is why we observe arbitrary behavior from different providers. The infrastructure firewall is mainly used for vast blocking or whitelisting strategies, as we're seeing now.

We have carefully observed the firewall and will discuss it extensively below. We believe the best opportunity for bypassing restrictions is when the network is available from the infrastructure firewall but is controlled at the provider level. This is a weak point you can target.

Let's talk about how the biggest one—**MCCI-AS (AS197207)**, also known as Hamrah-Aval—works:

## MCCI Firewall

As the biggest and one of the most complicated firewalls and a firewall which most of the users' traffic passes from, we have observed the MCCI firewall for months. It has shown critical issues and interesting behaviors which are worth working on that we are about to discuss.

We discuss what is our perspective from it and one critical issue we have found that can be used: 

### Behavioral Analysis

The MCCI firewall has evolved from old-fashioned IP blocking and simple SNI checking to advanced packet inspection, protocol analysis, and deep packet inspection (DPI) techniques.

**Current Capabilities:**
- Active Reality protocol monitoring and blocking
- Domain-level filtering
- DPI inspection targeting: Tor, Psiphon, QUIC, WireGuard, SSH-as-VPN, and more
- Connection profiling based on multiple metrics

However, despite its sophistication, the firewall has **exploitable weaknesses** in its profiling mechanism.

### Profiling Mechanism

The firewall profiles connections based on multiple metrics:

**For TCP:**
- Server Name Indication (SNI)
- Destination port
- Source IP address
- Other source-related metadata

**For UDP-based VPNs:**
- Reserved bytes in packet headers
- Packet size patterns (handshake detection)
- Destination and source protocols

**Critical Characteristics:**
- Profiles expire and reset after several minutes
- Can be manually reset by toggling airplane mode
- Used to actively identify and block "bad users" (VPN users)
- Once a user is profiled as "bad," they face complete disconnection

**Proven Impact:** When users connect to an unobfuscated VPN and then access domestic sites like Aparat or attempt file downloads, both the VPN connection and the domestic service are simultaneously disconnected.

This mechanism mirrors techniques discovered in China's Great Firewall. However, these seemingly effective measures contain **critical vulnerabilities** we'll explore below: 

#### Issue 1: Profiling Evasion

Profiling requires time to establish. If you toggle airplane mode and reconnect, many VPNs (WireGuard, V2Ray, others) can establish connections before the firewall creates a new profile.

**Why This Works:** The NAT IP you receive from the MCCI network may change, giving you a fresh connection before profiling completes.

**Effectiveness:** This mechanism worked during the previous internet shutoff and continues to work now. 

#### Issue 2: Use Until You Can

Profiling activates when new connections establish with the firewall already active. If you connect when the firewall is down, restarted, or before rules apply, you remain connected.

**Real-World Impact:** Once Psiphon establishes a connection, disconnection becomes extremely difficult—even the firewall cannot easily terminate it.

**Observed Pattern:** VPN logs show disconnections during specific time windows throughout the day. These forced resets indicate active rule redeployment. After hard resets, users must renegotiate regardless of protocol.

**Typical Reset Windows:** Approximately 2, 6, 10 AM and 2, 4, 6, 10 PM daily (based on user reports).
#### Issue 3: Proper Timing

Profiling incurs significant resource costs, causing:
- Firewall downtime
- Performance degradation  
- Temporary rule application failures

These maintenance windows create optimal connectivity opportunities.

**Observed Windows:** Approximately:
- **10 AM–12 PM**
- **12 PM–2 AM**
- Additional sporadic windows throughout the day

*Note: Windows are not exact and vary based on user reports. Performance degradation during these periods indicates active firewall reconfiguration.* 

![MCCI firewall Down time]({{ '/assets/posts/network-monitoring/Iran-GFw-reports/2026-01-26-report-of-state/images/firewall-down-time.png' | relative_url }})

#### Issue 4: Carrier-Grade NAT Inconsistencies

The government introduced less-restricted SIM cards as part of tiered internet strategy, creating critical inconsistencies in Carrier-Grade NAT (CGNAT) firewall application.

**Network Architecture:**

```
[ Phone ]
   ↓
[ RAN / BTS ]
   ↓
[ ISP Access Router ]
   ↓
( Access-level filters )
   ↓
[ CGNAT / UPF / PGW ]
   ↓
( CGNAT-coupled DPI )
   ↓
[ ISP Core ]
   ↓
( National Firewall / IX Filtering )
   ↓
[ International Gateways ]
   ↓
[ Global Internet ]
```

**NAT Rotation Effect:**

When you toggle airplane mode offline and back online:
- Your source IP changes
- Your network route changes
- Your CGNAT pool assignment changes
- **Your firewall profile is erased**
- TCP reset injection stops

This creates opportunities to connect using protocols that normally wouldn't succeed.

**Exceptional NAT IP Ranges:**

Ranges starting with `26.230.x.x` show dramatically improved connectivity:
- Significantly lower packet loss
- Reduced jitter  
- Fewer active TCP resets
- Higher Psiphon connection success rates

Interestingly, this IP range is documented in public databases as US Department of Defense space. Whether this is intentional routing misconfiguration remains unclear.

#### Issue 5: Application Patience & Firewall Fatigue

Unlike aggressive V2Ray clients, patient VPN applications succeed through persistence.

**Applications That Work Well:**
- NapsterNet
- Psiphon
- Netmod

**Why They Succeed:** These clients use patient retry mechanisms instead of aggressive reconnection attempts. They wait for connectivity windows rather than forcing connections.

**Firewall Limitation:** The firewall cannot sustain continuous blocking—occasional downtime is inevitable due to resource constraints. Patient applications exploit these natural maintenance windows.

**Key Insight:** Client patience directly correlates with connection success. Applications that wait for the firewall to wind down have dramatically better success rates. 


# Conclusion: The Future of Internet Suppression and Resistance

## A Historic Moment in Internet Censorship

The January 2026 internet shutdown represents a watershed moment in the evolution of nation-state censorship. What we witnessed was not merely a refinement of previous blocking tactics—it was a fundamental shift toward **comprehensive architectural control** of the internet itself.

## Key Findings Summary

### Timeline & Scale
- **Duration:** ~10 days complete shutdown, followed by 2+ weeks of severe restrictions
- **Scope:** All communications channels—SMS, calls, landlines, messengers
- **Exception:** Only satellite networks remained operational (with government interference)

### Infrastructure Impact

| Network Type | Status | Recovery Time | Strategy |
|---|---|---|---|
| **Home Networks** | Complete shutdown | 2+ weeks | Now less restricted than mobile |
| **Mobile Networks** | BTS shutdown | Days | More flexible; strategic reopening |
| **Datacenters** | Preemptively blocked | Not fully recovered | Government learned from Aban 98 |
| **Satellite** | Jammed/Targeted | N/A | Continuously monitored with drones |

### Protocol Blocking Evolution

The firewall's **four-stage escalation** demonstrates sophisticated adaptation:

1. **Blacklisting** → Defeated by encryption
2. **SNI/Domain Blocking** → Bypassed with fragmentation
3. **IP Blocking** → Too resource-intensive
4. **Whitelisting** → Current strategy (now in effect)

**Key Metrics:**
- Fragmentation vulnerability: handshake packets < **100 bytes** now blocked
- Effective fragmentation range: **400–800 bytes** (previously functional)
- TCP-focused filtering: Primary protocol under attack
- UDP/ICMP: Nearly **100% blocked** on home networks
- DNS tunneling surge: Sharp rise in TXT-based DNS queries indicating successful mass adoption

### CDN: The Critical Vulnerability

The government's whitelisting strategy revealed a fatal architectural flaw: **CDN infrastructure cannot be selectively restricted without breaking legitimate services.**

**Tested IPs (January 2026):**
- ChatGPT: `104.18.32.47` → Later redirected to `188.114.99.0` and `188.114.98.0`
- Google: `216.239.38.120` (blocks Iranian IPs entirely)
- DeepSeek: `3.160.196.89`

This transition shows the government's shift from *blocking unwanted traffic* to *whitelisting approved services*—a more ambitious but equally fragile approach.

### The MCCI Firewall: Five Critical Weaknesses

The distributed firewall system reveals exploitable gaps:

#### **Issue 1: Profiling Evasion**
- Profiling resets when NAT IP changes
- Airplane mode toggle can break established profiles
- VPNs like WireGuard reconnect in the time it takes for new profiles to establish

#### **Issue 2: Use Until You Can**
- Connections established before firewall activation remain stable
- Once Psiphon connects, disconnection becomes extremely difficult
- "Only God and elevator operators can disconnect it"

#### **Issue 3: Timing Windows**
- Regular firewall downtime: approximately **10 AM–12 PM, 12 PM–2 AM**
- Additional windows around **2, 6, 10 AM and 2, 4, 6, 10 PM**
- Performance degradation during these periods indicates active reconfiguration

#### **Issue 4: Less-Restricted SIM Cards**
- Carrier-Grade NAT inconsistencies create openings
- NAT IP ranges starting with `26.230.x.x` show dramatically better connectivity
- Lower packet loss, reduced jitter, fewer active TCP resets

#### **Issue 5: Patience & Persistence**
- Applications that retry connections without aggressive reconnection (NapsterNet, Psiphon, Netmod) succeed
- Firewall resource constraints force occasional downtime
- Client patience = successful connectivity

## Practical Recommendations

### Immediate Techniques

1. **Profile Evasion via NAT Rotation**
   - Toggle airplane mode to change NAT IP allocation
   - Renegotiate with BTS to reset firewall profile
   - No device risk; purely network-level operation

2. **Exploit Timing Windows**
   - Attempt connections during known firewall downtime windows
   - Monitor for performance degradation (indicator of active rules changing)

3. **Protocol Selection**
   - Avoid UDP-based protocols (near-total blocking on fixed networks)
   - TCP with proper obfuscation (Reality protocol with fragmentation 400–800 bytes)
   - DNS tunneling for restricted networks

4. **Less-Restricted Access**
   - Prioritize less-restricted SIM cards when available
   - Understand your NAT IP range—`26.230.x.x` shows better performance
   - Rotate between providers when possible

5. **Client Strategy**
   - Use patient clients: NapsterNet, Psiphon, Netmod
   - Avoid V2Ray-style aggressive reconnection
   - Let the firewall's own resource constraints work in your favor

## The Whitelisting Paradox

The government's shift to whitelisting reveals a paradox: **comprehensive control requires comprehensive service**. To enforce a whitelist, authorities must:

- Maintain millions of IP addresses across multiple CDNs
- Prevent DNS workarounds through localhost configurations
- Block DNS tunneling while maintaining domestic internet service
- Manage tiered internet tiers without public backlash

Each of these requirements creates new failure points.

## The Role of CDNs and Global Infrastructure

As long as Cloudflare, Google, and other global CDN providers operate, they inadvertently provide infrastructure for bypass. The government's attempt to selectively whitelist CDN ranges while blocking VPN usage creates a technical impossibility: **you cannot distinguish between legitimate CDN traffic and VPN-tunneled traffic** using only IP addresses.

**We urge the tech community to:**
- Continue developing DNS tunneling and alternative protocols
- Exploit localhost file configurations to resolve blocked sites
- Document and share firewall behavioral patterns
- Focus development on CDN infrastructure weaknesses—this is the future battleground

## What This Means for Internet Censorship Worldwide

This shutdown demonstrates that modern internet suppression is **evolving from blocking specific content to controlling access architecturally**. The playbook:

1. Shift from blacklisting to whitelisting
2. Implement distributed rather than centralized control
3. Use profiling instead of crude blocking
4. Create tiered internet for differential control
5. Leverage provider-level firewalls for plausible deniability

**This pattern will spread.** Other authoritarian regimes are watching. Understanding Iran's architecture is critical for defending internet freedom globally.

## Final Word

What happened in January 2026 was unprecedented in scale but not in outcome. The people of Iran have adapted, innovated, and found ways to connect. The firewall's own complexity—the necessity to maintain multiple blocking layers, the resource constraints that cause downtime, the architectural flaws in whitelisting—these are weaknesses we can exploit.

The internet shutdown failed not because the technology couldn't achieve it, but because **no finite set of rules can simultaneously block everything unwanted while preserving legitimate services.**

The future of internet freedom depends on understanding this technical reality: **control requires oversight, and oversight creates opportunities.**

---

**Status:** This report represents observations as of January 26, 2026. The situation continues to evolve rapidly. We will update this analysis as new blocking techniques emerge and new bypass methods are discovered.

**Data Sources:** Cloudflare, NetBlocks, OONI Probe, Arvan Cloud, and continuous network monitoring from inside Iran. 