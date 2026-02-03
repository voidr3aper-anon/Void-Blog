---
layout: post
title: "Psiphon: The Last Bastion Against Iran's Great Firewall"
date: 2026-02-03 08:45:00 -0000
last_modified_at: 2026-02-03 08:45:00 -0000
author: "The Void"
author_link: "https://github.com/voidr3aper-anon"
categories: [Network Monitoring]
tags: [network-monitoring, report, iran, psiphon, censorship]
image: "/assets/posts/network-monitoring/Iran-GFw-reports/2026-02-03-psiphon-should-be-blocked/images/trailer.png"
excerpt: "Analytical report on Psiphon's status and the new filtering strategy to block the last tool for free internet access in Iran"
---

## Introduction

Psiphon has become one of the last bastions for users to circumvent Iran's internet filtering. This application, which came to the aid of people during recent protests in Iran and has connected millions of users to date, has now become the primary target of the filtering system to be blocked.

---

## What is Psiphon?

### Tool Overview

Psiphon 3 is a centrally managed, geographically diverse network of **thousands of proxy servers**. Most of its infrastructure is hosted with cloud providers.

Psiphon 3 is a **"one hop" architecture** with secure link encryption between clients and servers. The service offers clients for the most popular platforms:
- **Windows**
- **Android**
- **iOS** (in alpha)

Psiphon is open source and offers a strong privacy policy; there are no user accounts and user network addresses are not logged.

### How Psiphon Differs from Standard VPNs

Psiphon differs from standard VPN services in a couple of key ways:

#### Smart Server Distribution

Psiphon deploys strategies to distribute subsets of servers to users, aiming to provide each user with a handful of servers they can reach while not revealing the entire network to one user. To achieve this goal, the size of the Psiphon network — and in particular the diversity of its network addresses — isn't simply a function of traffic load.

#### Protocol Obfuscation

Psiphon uses **protocol obfuscation** to bypass DPI (Deep Packet Inspection) blocking.

### Supported Protocols

The protocol that Psiphon relies on is based on SSH that has been modified and transformed into **OSSH** (Obfuscated SSH). In addition to that, other protocols such as:

- **L2TP/IPsec**
- **HTTP Proxy**
- **Obfuscated SSH (OSSH)**
- **Meek (Domain Fronting)**

are among the protocols that Psiphon uses for its users.

### Distinguishing Features

Having multiple protocols is one of the advantages of this application. Moreover, Psiphon uses **obfuscation** techniques to hide traffic in the form of normal web usage, which allows connection even in severe filtering systems.

Psiphon also has a **Decentralized VPN Service** mechanism that allows any user anywhere in the world to act as a bridge in the middle of the route. This mechanism responds well to users even in whitelist filtering scenarios.

---

## Technical Evolution: Psiphon Since 2011

Since the project launched in 2011, major technical changes have been implemented:

### 1. Obfuscated SSH Protocol

To mitigate DPI fingerprinting, the **obfuscated SSH protocol** was added. This fully random-looking protocol is deployed with a **unique obfuscation key per Psiphon server**.

### 2. Optional HTTP Prefix

An **optional HTTP prefix** was added to the protocol to mitigate DPI-based whitelisting of HTTP traffic. This simple prefix is sufficient for regex-based DPI (nDPI and l7-filter) to classify Psiphon traffic as HTTP and was sufficient to defeat an actual adversary at the time of deployment.

### 3. Remote Server Lists

**Remote server lists** were added to augment the embedded and discovery servers concepts. While discovery happens only when connected to an existing server, remote server lists can be downloaded even when all servers are blocked.

Remote server lists are distributed on **Amazon S3** and accessed via `https://s3.amazonaws.com` without a distinguishing bucket name in the URL. In this way, it is difficult for an adversary to block the lists without blocking all of S3 or implementing HTTPS traffic analysis.

### 4. Email as Propagation Mechanism

**Email** is now a major client propagation mechanism. There is an auto-responder that returns links and attachments to custom sponsor/channel Psiphon clients depending on the email address users send to.

### 5. Android Client

The Android client was released in 2012. The first version included an embedded browser based on Android's WebView. In 2012/2013, support for **whole device tunneling** was added, which tunnels all Android apps through Psiphon:

- **iptables whole device mode** (for rooted Android 2.2+ devices)
- **VpnService mode with tun2socks** (for any Android 4+ device)

Additional features added include egress region selection and proxy chaining.

---

## Why Did Psiphon Succeed in Iran?

These distinguishing features enabled Psiphon to come to the aid of Iranian users under current internet conditions:

1. **Traffic simulation mechanisms** mimicking normal usage
2. Special protocols for **whitelist** scenarios in the network
3. **HTTP Prefix Header** protocol, which is a special scenario for the new filtering implemented in Iran

### User Statistics

To date, nearly **30 million users** have been able to connect to Psiphon.

![Psiphon User Connection Chart]({{ '/assets/posts/network-monitoring/Iran-GFw-reports/2026-02-03-psiphon-should-be-blocked/images/psiphon-user-connection.png' | relative_url }})

---

## New Filtering Strategy

### Situation Analysis

According to our research, this volume of "firewall holes" has become a challenge for them and has caused the filtering system to intensely pursue blocking this application.

### Firewall Attack Phases

In the new filtering changes, it is clear that the firewall operates with a multi-stage strategy:

#### Phase One: Blind Disruption

The firewall has been able to disrupt users' connections in the first phase to Psiphon and Conduit backends by implementing measures. This disruption was purely blind and also disrupted users' daily usage.

However, this technique was effective for Psiphon. Due to Psiphon's need for at least a moderate amount of time to search through its server list and attempt to connect to them, its sudden disconnection sometimes required long hours before users could connect.

#### Phase Two: Active Ghosting

In the second phase, Iran's firewall moved toward **Active Ghosting** and direct disruptions in Psiphon connections. The filtering method in this part is interesting:

1. **Stage One**: The firewall doesn't give you much trouble and lies in wait
2. **Stage Two**: The firewall may even allow you to connect
3. **Stage Three**: In those initial seconds of connection, the firewall blocks your connection and filters the endpoint

### Field Reports

This type of filtering is clearly being executed on TCI (Telecommunication Company of Iran) networks, and many users on TCI home internet (both ADSL and fiber) have experienced this problem.

**Common Scenario:**
- Psiphon connects
- The IP display link also shows a valid foreign IP (if you're lucky)
- But when you go to YouTube, nothing loads

### User Drop

The chart below clearly shows that the number of Psiphon users has now dropped by **more than half**. A significant portion of this decline is due to this reason.

![Psiphon User Drop Chart]({{ '/assets/posts/network-monitoring/Iran-GFw-reports/2026-02-03-psiphon-should-be-blocked/images/psiphon-user-drop.png' | relative_url }})

---

## Conclusion

Psiphon, once known as a powerful tool for circumventing filtering, is now under a targeted and multi-layered attack. Iran's firewall's new strategy shows that the filtering system has moved toward more sophisticated and intelligent methods that not only disconnect connections but also, with deceptive techniques like Active Ghosting, keep users in a semi-connected state that is practically unusable.

This report demonstrates that the need for newer and more resilient solutions for free internet access is felt more than ever.

