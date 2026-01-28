# Void Blog - Network Analysis, Hacking & GFW Bypass

[![GitHub Pages](https://img.shields.io/badge/GitHub%20Pages-Live-success)](https://voidr3aper-anon.github.io/Void-Blog/)
[![Jekyll](https://img.shields.io/badge/Jekyll-4.x-red)](https://jekyllrb.com/)
[![License](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)

A comprehensive blog dedicated to network analysis, ethical hacking, bypassing internet restrictions (including the Great Firewall), and online privacy. Built with Jekyll and hosted on GitHub Pages.

## Live Site

Visit the blog: [https://voidr3aper-anon.github.io/Void-Blog/](https://voidr3aper-anon.github.io/Void-Blog/)

## Features

### Mobile & PWA Support
- Progressive Web App - Install as native app on any device
- Offline Mode - Read cached content without internet
- Mobile Navigation - Responsive hamburger menu for mobile devices
- Touch Gestures - Swipe, double-tap, and haptic feedback
- Mobile Optimized - Touch-friendly buttons and smooth interactions
- Schema Markup - Rich search results on mobile search engines
- Fast & Lightweight - Optimized for mobile networks

### Enhanced Blog Functionality
- Client-side Search - Fast, real-time search across all blog posts
- Category Filtering - Browse posts by category (GFW bypass, VPN, security, etc.)
- Archive Page - All posts organized by date and category
- RSS Feed - Subscribe to get latest updates
- Reading Time - Automatic calculation for each post
- Table of Contents - Auto-generated TOC for long posts
- Related Posts - Discover similar content at the end of each post
- Social Sharing - Share posts on Twitter, Reddit, Facebook, LinkedIn

### Visual Enhancements
- Dark Cybersecurity Theme - Professional dark theme with red accents
- Video Background - Animated background in hero section
- Responsive Design - Mobile-friendly layout
- Smooth Animations - Scroll animations and transitions
- Back-to-Top Button - Quick navigation to top of page
- Copy Code Buttons - Easy code snippet copying

### Tools & Resources
- 40+ Security Tools documented with descriptions and links
- Comprehensive Tutorials on VPNs, proxies, encryption, Tor
- Code Examples for Wireshark, tcpdump, nmap, and more
- Cheat Sheets for common security commands
- Best Practices for privacy and anonymity

### Content Categories
- Network Analysis - Traffic analysis, monitoring, Wireshark
- GFW Bypass - VPNs, proxies, Shadowsocks, V2Ray, Tor
- Security & Privacy - Encryption, anonymity, OPSEC
- Ethical Hacking - Penetration testing, security research
- Tools & Technologies - Tool reviews and tutorials

### Legal & Security
- Privacy Policy - Clear privacy guidelines
- Security Notice - Legal disclaimers and ethical guidelines
- Educational Focus - All content for legal, authorized use only

## Blog Structure

```
Void-Blog/
├── _posts/              # Blog posts (Markdown)
├── _layouts/            # Page templates
│   ├── default.html     # Main layout with navigation
│   ├── post.html        # Blog post layout
│   └── page.html        # Static page layout
├── assets/
│   ├── css/
│   │   └── style.scss   # Custom styling
│   └── js/
│       ├── search.js    # Search functionality
│       └── features.js  # Enhanced features
├── tools.md             # Tools directory
├── resources.md         # Tutorials and guides
├── archive.md           # Post archive
├── about.md             # About page
├── privacy.md           # Privacy policy
├── security.md          # Security notice
└── _config.yml          # Jekyll configuration
```

## Quick Start

### Prerequisites
- Ruby 2.7+
- Bundler

### Local Development

1. Clone the repository
   ```bash
   git clone https://github.com/voidr3aper-anon/Void-Blog.git
   cd Void-Blog
   ```

2. Install dependencies
   ```bash
   bundle install
   ```

3. Run locally
   ```bash
   bundle exec jekyll serve
   ```

4. View in browser
   ```
   http://localhost:4000/Void-Blog/
   ```

## Adding New Posts

Create a new file in `_posts/` with format: `YYYY-MM-DD-title.md`

```markdown
---
layout: post
title: "Your Post Title"
date: 2024-12-10 10:00:00 -0000
categories: network-analysis security vpn
---

# Your Post Title

Your content here...
```

### Front Matter Options
- `layout`: post, page, or default
- `title`: Post title
- `date`: Publication date
- `categories`: Space-separated categories
- `excerpt`: Custom excerpt (optional)

## Customization

### Theme Colors
Edit `assets/css/style.scss`:
- Primary: `#dc2626` (red)
- Secondary: `#ef4444` (bright red)
- Background: `#0B0F14` (dark blue-black)
- Text: `#E5E7EB` (light gray)

### Navigation
Edit `_layouts/default.html` to add/remove navigation buttons.

### Homepage
Edit `index.md` to customize the homepage content and featured sections.

## Plugins Used

- `jekyll-remote-theme` - Use themes from GitHub
- `jekyll-feed` - Generate RSS feed
- `jekyll-seo-tag` - SEO optimization
- `jekyll-sitemap` - Generate sitemap.xml

## Blog Posts

### Current Posts (8 total)

1. Complete Guide to Bypassing the Great Firewall (GFW)
   - Shadowsocks, V2Ray, WireGuard, Tor
   - Domain fronting, obfuscation techniques
   - Best practices and troubleshooting

2. Advanced Network Traffic Analysis with Wireshark
   - Packet capture and analysis
   - Security threat detection
   - Performance troubleshooting

3. Ultimate Guide to Online Privacy and Anonymity
   - Privacy stack from OS to communications
   - Encrypted messaging, email, file storage
   - Operational security (OPSEC)

4. Getting Started with Network Monitoring
5. Monitor Your Internet Connection
6. Top 5 Free Network Monitoring Tools
7. VPN vs Proxy vs Direct Connection
8. Understanding Internet Protocols

## Tools Featured

### VPN & Proxy Tools
- OpenVPN, WireGuard, Shadowsocks, V2Ray, Tor Browser, Privoxy

### Network Analysis Tools
- Wireshark, tcpdump, Nmap, Netcat, iftop, ntop

### Security Testing Tools
- Kali Linux, Metasploit, Burp Suite, OWASP ZAP, Aircrack-ng, John the Ripper

### Network Monitoring
- Nagios, Zabbix, Prometheus, Grafana

### Encryption & Privacy
- GnuPG, VeraCrypt, Signal, OpenSSL

## Mobile Integration

Void Blog is fully optimized for mobile devices with Progressive Web App capabilities.

### Quick Start on Mobile
1. Visit the site on your phone browser
2. Install as app - Look for "Add to Home Screen" or "Install" prompt
3. Enjoy offline reading - Content cached automatically
4. Use touch gestures - Swipe, double-tap, and haptic feedback

### Mobile Features
- PWA Support - Install and run as native app
- Offline Mode - Read cached content without internet
- Touch Optimized - 44px minimum tap targets
- Responsive Layout - Adapts to any screen size
- Hamburger Menu - Mobile-friendly navigation
- Schema Markup - Rich mobile search results
- Fast Loading - Optimized for mobile networks
- iOS & Android - Full support for both platforms

## Contributing

Contributions are welcome! Here's how:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Content Guidelines
- All content must be for educational purposes
- Include legal disclaimers where appropriate
- Provide practical, tested examples
- Use clear, accessible language
- Cite sources and provide references

## Legal Notice

**This blog is for educational and informational purposes only.**

- All techniques discussed are for legal, authorized use only
- Users are responsible for complying with local laws
- Unauthorized access to systems is illegal
- Use knowledge ethically and responsibly

See [Security Notice](https://voidr3aper-anon.github.io/Void-Blog/security/) for complete guidelines.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Resources

- [Jekyll Documentation](https://jekyllrb.com/docs/)
- [GitHub Pages](https://pages.github.com/)
- [Markdown Guide](https://www.markdownguide.org/)
- [EFF Surveillance Self-Defense](https://ssd.eff.org/)
- [PrivacyTools.io](https://www.privacytools.io/)

## Contact

- GitHub: [@voidr3aper-anon](https://github.com/voidr3aper-anon)
- Issues: [GitHub Issues](https://github.com/voidr3aper-anon/Void-Blog/issues)

---

**Empowering digital freedom through knowledge and security.**

*Stay Anonymous. Stay Secure. Stay Free.*
