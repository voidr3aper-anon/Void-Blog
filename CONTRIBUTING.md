# Contributing to Void Blog

Thank you for your interest in contributing! This guide will help you add new content to the blog.

## Content Structure

Our blog uses an organized directory structure inspired by Kali Linux documentation:

```
_posts/
├── network-monitoring/     # Network monitoring and diagnostics
├── privacy-security/       # Privacy, security, and anonymity
├── gfw-bypass/            # GFW bypass techniques
└── network-analysis/      # Protocol analysis and traffic inspection
```

## Adding a New Post

### Step 1: Choose a Category

Select an existing category or create a new one if your content doesn't fit existing categories.

**Existing Categories:**
- `network-monitoring` - Network monitoring tools and techniques
- `privacy-security` - Privacy, security, and anonymity guides
- `gfw-bypass` - Great Firewall bypass methods
- `network-analysis` - Protocol analysis and packet inspection

### Step 2: Create Post Directory

Create a directory for your post with a descriptive slug:

```bash
mkdir -p _posts/category-name/your-post-slug/images
```

**Slug naming conventions:**
- Use lowercase letters
- Separate words with hyphens
- Be descriptive but concise
- Example: `advanced-wireshark-analysis`, `vpn-setup-guide`

### Step 3: Create index.md

Create `index.md` in your post directory using this template:

```yaml
---
layout: post
title: "Your Descriptive Post Title"
date: 2024-12-10 12:00:00 -0000
last_modified_at: 2024-12-10 12:00:00 -0000
author: "Your Name"
author_link: "https://github.com/yourusername"
categories: [Category Name]
tags: [tag1, tag2, tag3]
image: "images/featured-image.png"
excerpt: "A compelling 1-2 sentence description"
---

# Your Post Content Here
```

**Frontmatter Fields Explained:**

- `layout`: Always use `post`
- `title`: Descriptive title (50-60 characters ideal)
- `date`: Original publication date (format: `YYYY-MM-DD HH:MM:SS -0000`)
- `last_modified_at`: Last update date (same format)
- `author`: Your name or pseudonym
- `author_link`: Link to your GitHub, website, or social profile
- `categories`: Single category in square brackets (e.g., `[Network Monitoring]`)
- `tags`: Array of relevant tags (e.g., `[wireshark, packet-analysis, networking]`)
- `image`: Relative path to featured image (e.g., `images/featured.png`)
- `excerpt`: Brief description for SEO and social sharing (150-160 characters max)

### Step 4: Add Images

Place all images in your post's `images/` directory:

```
_posts/category-name/your-post-slug/images/
├── featured-image.png      # Main featured image
├── screenshot-1.png         # Content images
├── diagram-network.png      # Diagrams and illustrations
└── README.md               # Auto-generated
```

**Image Guidelines:**
- Use descriptive filenames: `wireshark-capture-window.png`, not `img1.png`
- Use lowercase with hyphens
- Optimize images before adding (compress PNG/JPG or use WebP)
- Recommended sizes:
  - Featured image: 1200x630px (for social sharing)
  - Content images: Max width 1000px
  - Keep file sizes under 500KB when possible

**Reference images in your post:**

```markdown
![Alt text describing the image](images/your-image.png)
```

### Step 5: Write Quality Content

**Content Guidelines:**

1. **Clear Structure**
   - Use H2 (##) for main sections
   - Use H3 (###) for subsections
   - Keep hierarchy logical

2. **Code Examples**
   - Include language identifier for syntax highlighting
   - Add comments explaining complex parts
   - Test all code examples before publishing

   ```bash
   # This is a bash example
   ping -c 4 8.8.8.8
   ```

3. **Screenshots and Diagrams**
   - Add alt text for accessibility
   - Caption complex images
   - Ensure text in images is readable

4. **Links**
   - Use descriptive link text (not "click here")
   - Open external links in new tabs when appropriate
   - Check all links before publishing

5. **SEO Optimization**
   - Include target keywords naturally
   - Use descriptive headings
   - Write compelling meta description (excerpt)
   - Add relevant internal links to other posts

### Step 6: Update Category README

If you're adding to an existing category, update its `README.md` to include your post:

```markdown
## Articles in This Category

- [Your New Post Title](your-post-slug/)
```

### Step 7: Test Locally

Before submitting, test your post locally:

```bash
bundle exec jekyll serve
```

Visit `http://localhost:4000` and verify:
- [ ] Post appears in correct category
- [ ] Images load properly
- [ ] Links work
- [ ] Code blocks have syntax highlighting
- [ ] Metadata displays correctly (author, date, tags)
- [ ] Responsive design works on mobile

### Step 8: Submit Pull Request

1. Commit your changes:
   ```bash
   git add _posts/
   git commit -m "Add post: Your Post Title"
   ```

2. Push to your fork
3. Create a pull request with:
   - Descriptive title
   - Brief description of the post
   - Any special notes or requirements

## Writing Style Guide

### Voice and Tone
- **Professional but approachable** - Technical accuracy with clear explanations
- **Instructional** - Teach readers step-by-step
- **Neutral and objective** - Avoid marketing language
- **Inclusive** - Use "we" and "you" to engage readers

### Formatting Standards
- **Headings**: Use sentence case ("Installing Wireshark" not "Installing WIRESHARK")
- **Code**: Always use code blocks with language identifiers
- **Lists**: Use bullet points for unordered lists, numbers for steps
- **Emphasis**: Use **bold** for important terms, *italics* for emphasis
- **Commands**: Use inline code for commands: `apt-get install`

### Technical Content
- **Explain acronyms** on first use
- **Provide context** before diving into technical details
- **Include warnings** for potentially dangerous commands
- **Offer alternatives** when multiple approaches exist
- **Credit sources** when referencing external materials

## Quality Checklist

Before submitting, ensure your post meets these standards:

- [ ] Frontmatter is complete and accurate
- [ ] Title is clear and SEO-friendly
- [ ] Excerpt is compelling (150-160 characters)
- [ ] Content is well-structured with logical flow
- [ ] Code examples are tested and commented
- [ ] Images are optimized and have alt text
- [ ] Internal links to related posts are included
- [ ] External links are relevant and functional
- [ ] Grammar and spelling are correct
- [ ] Post is 800+ words (for substantial guides)
- [ ] Tested locally and displays correctly
- [ ] Category README updated if needed

## Need Help?

- Check existing posts for examples
- Review `_posts/POST_TEMPLATE.md` for structure
- Read category README files for specific guidelines
- Open an issue for questions or suggestions

## Code of Conduct

- Be respectful and constructive
- Focus on technical accuracy
- Give credit where credit is due
- Follow responsible disclosure for security topics
- Ensure content is legal and ethical

---

Happy writing!
