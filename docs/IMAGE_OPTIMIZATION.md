# Image Optimization Guide

## Overview

This Jekyll site uses responsive image loading to optimize trailer images on the home page. This dramatically reduces page load times while maintaining image quality.

## How It Works

### 1. Responsive Image Sizes

For each `trailer.png` image in the `_posts` directory, we create multiple optimized versions:

- **400w** (mobile): ~20-30KB - for screens up to 640px
- **800w** (tablet): ~73-109KB - for screens up to 1024px  
- **1200w** (desktop): ~140-255KB - for larger screens

Original images were ~2.7-2.9MB each, resulting in **99%+ size reduction** for mobile users!

### 2. Modern Image Formats

Each size is provided in two formats:
- **WebP**: Modern format with better compression (preferred)
- **JPEG**: Fallback format for older browsers

The browser automatically selects the best format it supports.

### 3. Automatic Loading

The `index.md` file uses HTML `<picture>` elements with `srcset` to automatically:
- Load the appropriate size for the user's device
- Use WebP when supported, JPEG as fallback
- Lazy load images as users scroll
- Fade images in smoothly when loaded

## Adding New Report Images

When adding new report pages with trailer images, follow these steps:

### Option 1: Manual Process

1. Add your `trailer.png` to `_posts/.../images/`
2. Generate optimized versions:

```bash
cd /path/to/your/post/images
# Create JPEG versions
convert trailer.png -resize 400x -quality 75 -strip trailer-400w.jpg
convert trailer.png -resize 800x -quality 80 -strip trailer-800w.jpg
convert trailer.png -resize 1200x -quality 85 -strip trailer-1200w.jpg

# Create WebP versions (better compression)
convert trailer.png -resize 400x -quality 75 trailer-400w.webp
convert trailer.png -resize 800x -quality 80 trailer-800w.webp
convert trailer.png -resize 1200x -quality 85 trailer-1200w.webp
```

### Option 2: Automated Script (Recommended)

Run the optimization script for all trailer images:

```bash
./scripts/optimize-trailer-images.sh
```

This will automatically find all `trailer.png` files and create optimized versions.

## Technical Details

### CSS Enhancements

The `assets/css/style.scss` includes:
- Smooth fade-in animation for lazy-loaded images
- Proper sizing and positioning for responsive images
- Consistent behavior across all browsers

### Browser Compatibility

- **Modern browsers**: Use WebP format (smaller file size)
- **Older browsers**: Fall back to JPEG format
- **All browsers**: Load appropriate size for screen width
- **Native lazy loading**: Supported in all modern browsers

## Performance Impact

**Before optimization:**
- Mobile users downloaded 2.7-2.9MB per trailer image
- 12 reports on home page = ~32-35MB of images!
- Slow loading, poor mobile experience

**After optimization:**
- Mobile users download 20-30KB per image (WebP)
- 12 reports on home page = ~240-360KB of images
- Fast loading, smooth experience
- **99%+ bandwidth savings on mobile!**

## Future Improvements

Consider these additional optimizations:
1. Implement blur-up placeholders (show tiny blurred version first)
2. Use `loading="eager"` for first 3-4 images above the fold
3. Consider smaller sizes for very small mobile screens (200w)
4. Automate optimization in CI/CD pipeline
