---
layout: page
title: Resources
permalink: /resources/
---

# Resources & Learning Materials

Comprehensive guides, tutorials, and documentation for network security, analysis, and bypassing restrictions.

## Getting Started

### For Beginners

<div class="tool-grid">
  <div class="tool-card">
    <span class="tool-icon"></span>
    <h3>Network Fundamentals</h3>
    <p class="tool-description">
      <strong>Topics Covered:</strong><br>
      • TCP/IP Protocol Suite<br>
      • OSI Model<br>
      • DNS & DHCP<br>
      • Routing & Switching<br>
      • Network Addressing
    </p>
  </div>

  <div class="tool-card">
    <span class="tool-icon"></span>
    <h3>Security Basics</h3>
    <p class="tool-description">
      <strong>Topics Covered:</strong><br>
      • Encryption Fundamentals<br>
      • Authentication & Authorization<br>
      • Firewalls & IDS/IPS<br>
      • Secure Communications<br>
      • Common Vulnerabilities
    </p>
  </div>

  <div class="tool-card">
    <span class="tool-icon">🛠️</span>
    <h3>Essential Tools</h3>
    <p class="tool-description">
      <strong>Topics Covered:</strong><br>
      • Command Line Basics<br>
      • Network Diagnostic Tools<br>
      • Packet Analysis<br>
      • Traffic Monitoring<br>
      • Log Analysis
    </p>
  </div>
</div>

## Bypassing Censorship & Restrictions

### VPN Configuration

**OpenVPN Setup Guide**
```bash
# Install OpenVPN
sudo apt-get update
sudo apt-get install openvpn

# Download configuration from your VPN provider
# Connect to VPN
sudo openvpn --config your-config.ovpn
```

**WireGuard Quick Setup**
```bash
# Install WireGuard
sudo apt install wireguard

# Generate keys
wg genkey | tee privatekey | wg pubkey > publickey

# Configure interface (replace with your details)
sudo nano /etc/wireguard/wg0.conf
```

### Proxy Configuration

**Setting up SOCKS5 Proxy**
```bash
# SSH SOCKS5 Proxy
ssh -D 8080 -f -C -q -N user@remote-server

# Configure browser to use localhost:8080
```

**Shadowsocks Client**
```bash
# Install shadowsocks-libev
sudo apt-get install shadowsocks-libev

# Configure client
sudo nano /etc/shadowsocks-libev/config.json

# Start client
ss-local -c /etc/shadowsocks-libev/config.json
```

## Network Analysis Techniques

### Packet Analysis with Wireshark

**Common Filters:**
```
# Filter HTTP traffic
http

# Filter specific IP
ip.addr == 192.168.1.1

# Filter TCP on specific port
tcp.port == 443

# Follow TCP stream
tcp.stream eq 0

# Filter by protocol
dns or icmp or arp
```

### Command Line Network Tools

**Network Scanning**
```bash
# Ping sweep
nmap -sn 192.168.1.0/24

# TCP SYN scan
nmap -sS target-ip

# Service detection
nmap -sV target-ip

# OS detection
nmap -O target-ip

# Comprehensive scan
nmap -A -T4 target-ip
```

**Traffic Analysis**
```bash
# Capture packets
tcpdump -i eth0 -w capture.pcap

# Read captured packets
tcpdump -r capture.pcap

# Filter by host
tcpdump host 192.168.1.1

# Filter by port
tcpdump port 80

# Monitor bandwidth usage
iftop -i eth0
```

## Security Hardening

### System Security

**Firewall Configuration (iptables)**
```bash
# Allow SSH
iptables -A INPUT -p tcp --dport 22 -j ACCEPT

# Allow HTTP/HTTPS
iptables -A INPUT -p tcp --dport 80 -j ACCEPT
iptables -A INPUT -p tcp --dport 443 -j ACCEPT

# Block specific IP
iptables -A INPUT -s 10.10.10.10 -j DROP

# Save rules
iptables-save > /etc/iptables/rules.v4
```

**SSH Hardening**
```bash
# Edit SSH config
sudo nano /etc/ssh/sshd_config

# Recommended settings:
# Port 2222 (change from default 22)
# PermitRootLogin no
# PasswordAuthentication no
# PubkeyAuthentication yes
# MaxAuthTries 3

# Restart SSH
sudo systemctl restart sshd
```

## Monitoring & Alerting

### Network Monitoring Scripts

**Bandwidth Monitor**
```bash
#!/bin/bash
# bandwidth_monitor.sh

interface="eth0"
interval=5

while true; do
    rx1=$(cat /sys/class/net/$interface/statistics/rx_bytes)
    tx1=$(cat /sys/class/net/$interface/statistics/tx_bytes)
    sleep $interval
    rx2=$(cat /sys/class/net/$interface/statistics/rx_bytes)
    tx2=$(cat /sys/class/net/$interface/statistics/tx_bytes)
    
    rx_rate=$(( ($rx2 - $rx1) / $interval ))
    tx_rate=$(( ($tx2 - $tx1) / $interval ))
    
    echo "RX: $(( $rx_rate / 1024 )) KB/s | TX: $(( $tx_rate / 1024 )) KB/s"
done
```

**Connection Monitor**
```bash
#!/bin/bash
# connection_monitor.sh

# Monitor active connections
netstat -tan | grep ESTABLISHED | awk '{print $5}' | \
    cut -d: -f1 | sort | uniq -c | sort -rn | head -10

# Monitor listening ports
netstat -tuln | grep LISTEN
```

## Privacy & Anonymity

### Tor Network

**Tor Browser Configuration**
- Download from official Tor Project website
- Use bridges if Tor is blocked in your region
- Configure SOCKS proxy: localhost:9050
- Use obfs4 bridges for censorship circumvention

**Tor with Applications**
```bash
# Torify any application
torify application-name

# Tor SOCKS proxy
proxychains application-name

# Configure proxychains
sudo nano /etc/proxychains.conf
# Add: socks5 127.0.0.1 9050
```

### DNS Security

**DNS over HTTPS (DoH)**
```bash
# Using cloudflared
wget https://github.com/cloudflare/cloudflared/releases/latest/download/cloudflared-linux-amd64
sudo mv cloudflared-linux-amd64 /usr/local/bin/cloudflared
sudo chmod +x /usr/local/bin/cloudflared

# Run as DNS proxy
cloudflared proxy-dns --port 5053 --upstream https://1.1.1.1/dns-query
```

**Encrypted DNS (DNSCrypt)**
```bash
# Install dnscrypt-proxy
sudo apt-get install dnscrypt-proxy

# Configure
sudo nano /etc/dnscrypt-proxy/dnscrypt-proxy.toml

# Start service
sudo systemctl enable dnscrypt-proxy
sudo systemctl start dnscrypt-proxy
```

## Recommended Reading

### Books
- **"The Web Application Hacker's Handbook"** by Dafydd Stuttard & Marcus Pinto
- **"Network Security Assessment"** by Chris McNab
- **"Practical Packet Analysis"** by Chris Sanders
- **"The Art of Network Penetration Testing"** by Royce Davis
- **"Hacking: The Art of Exploitation"** by Jon Erickson

### Online Resources
- [OWASP Foundation](https://owasp.org/) - Web application security
- [SANS Reading Room](https://www.sans.org/reading-room/) - Security papers
- [Krebs on Security](https://krebsonsecurity.com/) - Security news
- [EFF Surveillance Self-Defense](https://ssd.eff.org/) - Privacy guides
- [PrivacyTools.io](https://www.privacytools.io/) - Privacy tools

### Communities
- **Reddit**: r/netsec, r/privacy, r/onions, r/VPN
- **GitHub**: Security tool repositories
- **Stack Exchange**: Information Security
- **Discord**: Various InfoSec communities

## Practice Platforms

### Legal Hacking Practice
- **HackTheBox** - Penetration testing labs
- **TryHackMe** - Guided cybersecurity training
- **PentesterLab** - Web penetration testing
- **VulnHub** - Vulnerable VMs for practice
- **OverTheWire** - War games for security

<div class="alert alert-success">
  <strong>💡 Pro Tip:</strong> Always practice in legal environments. Use your own systems or authorized platforms only.
</div>

## Cheat Sheets

### Quick Reference

**Port Numbers**
```
20/21   - FTP
22      - SSH
23      - Telnet
25      - SMTP
53      - DNS
80      - HTTP
443     - HTTPS
3306    - MySQL
5432    - PostgreSQL
8080    - HTTP Alternate
```

**Common Commands**
```bash
# Network diagnostics
ping, traceroute, mtr, dig, nslookup

# Port scanning
nmap, masscan, unicornscan

# Packet capture
tcpdump, wireshark, tshark

# Traffic analysis
netstat, ss, iftop, nethogs

# Security testing
metasploit, burpsuite, sqlmap
```

---

## More Resources

- [**Tools Directory**](/Void-Blog/tools/) - Comprehensive tool listing
- [**Blog Archive**](/Void-Blog/archive/) - All tutorials and guides
- [**Latest Posts**](/Void-Blog/) - Recent articles and updates

<div class="alert alert-info">
  <strong>📬 Stay Updated:</strong> Subscribe to our <a href="/Void-Blog/feed.xml">RSS feed</a> for the latest tutorials and security news.
</div>

* Resources updated regularly with new tutorials and guides!*
