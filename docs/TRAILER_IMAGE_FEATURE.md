# Trailer Image Feature Documentation

## Overview

The blog includes a **trailer hero image feature** for report pages that displays a background image behind the post title in a cinematic, "glimmy" format with blur and overlay effects.

## How It Works

### Visual Effect
- **Background Image**: Displayed as a full-width background behind the post title
- **Blur Effect**: 3px blur applied for a cinematic feel
- **Darkness**: 30% brightness to ensure text readability
- **Gradient Overlay**: Dark gradient overlay for enhanced contrast
- **Text Styling**: Title and excerpt float above with shadow effects

### Implementation

The feature uses three layered elements:

1. `.post-header-hero` (z-index: 0) - The blurred, darkened background image
2. `.post-header-overlay` (z-index: 1) - Dark gradient overlay
3. `.post-header` (z-index: 2) - Post title and excerpt on top

## Using the Feature

### In Your Post Front Matter

Add the `image` field to your post's YAML front matter:

```yaml
---
layout: post
title: "Your Report Title"
image: "/assets/posts/category/post-slug/images/trailer.png"
excerpt: "Brief description"
---
```

### Image Location

1. **Store images** in `_posts/category/post-slug/images/` alongside your post
2. **Reference images** as `/assets/posts/category/post-slug/images/filename.png`
3. The GitHub Actions workflow automatically copies images during deployment

## Local Development

### Running Locally

When developing locally, you must run the image copy script before serving Jekyll:

```bash
# From repository root
bash .github/scripts/copy-post-images.sh

# Then serve Jekyll
bundle exec jekyll serve
```

### Why This Step?

- Images are stored in `_posts/` for co-location with content
- Jekyll needs them in `assets/posts/` for serving
- The `.gitignore` excludes `assets/posts/*` since they're generated files
- GitHub Actions runs this automatically during deployment

## Deployment

The GitHub Actions workflow (`.github/workflows/jekyll-gh-pages.yml`) automatically:

1. ✅ Checks out the repository
2. ✅ Runs `copy-post-images.sh` to copy all images
3. ✅ Builds the Jekyll site with images in place
4. ✅ Deploys to GitHub Pages

No manual intervention needed for deployment!

## CSS Customization

The styling can be customized in `assets/css/style.scss`:

```scss
.post-header-hero {
  filter: blur(3px) brightness(0.3);  // Adjust blur and brightness
  transform: scale(1.1);               // Prevents blur edges
}

.post-header-overlay {
  background: linear-gradient(...);    // Customize gradient
}
```

## Image Recommendations

- **Format**: PNG or JPEG
- **Size**: 1200px × 600px or larger
- **Aspect Ratio**: 2:1 (landscape)
- **File Size**: Keep under 5MB for performance
- **Content**: High-contrast images work best (will be darkened)

## Responsive Design

The feature is fully responsive:

- **Desktop**: Full hero with sidebar offset
- **Tablet**: Adjusted spacing for smaller sidebar
- **Mobile**: Full-width with reduced height (250px min)

## Troubleshooting

### Image Not Showing?

1. **Check the image path** in front matter matches the actual location
2. **Run the copy script** if testing locally: `bash .github/scripts/copy-post-images.sh`
3. **Verify the image exists** in `_posts/.../images/`
4. **Check GitHub Actions logs** for the "Copy post images to assets" step

### Image Too Dark?

The image is intentionally darkened (`brightness(0.3)`) for text readability. Adjust in CSS:

```scss
.post-header-hero {
  filter: blur(3px) brightness(0.5);  // Increase to 0.5 for lighter
}
```

### Image Not Blurred?

Ensure browser supports the `filter` CSS property (all modern browsers do).

## Example

See the Iran GFW report for a live example:
- Post: `_posts/network-monitoring/Iran-GFw-reports/2026-01-26-report-of-state/`
- Image: `trailer.png` (network infrastructure diagram)
- Result: Cinematic hero background with blurred, darkened effect

## Technical Details

### File Structure
```
_posts/
  category/
    post-slug/
      post-slug.md          # Post content
      images/
        trailer.png         # Source image (committed to git)

assets/posts/               # Generated during build
  category/
    post-slug/
      images/
        trailer.png         # Copied image (not committed)
```

### Workflow Steps
```yaml
- name: Copy post images to assets
  run: |
    chmod +x .github/scripts/copy-post-images.sh
    ./.github/scripts/copy-post-images.sh
```

The script finds all `images/` directories in `_posts/` and copies them to `assets/posts/`.

## Support

For issues or questions:
1. Check GitHub Actions logs for deployment errors
2. Review this documentation
3. Open an issue in the repository
