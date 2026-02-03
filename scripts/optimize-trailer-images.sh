#!/bin/bash
#
# Optimize Trailer Images Script
# 
# This script finds all trailer.png images in the _posts directory and creates
# optimized responsive versions in WebP and JPEG formats.
#
# Requirements:
#   - ImageMagick (convert command)
#   - WebP tools (optional, for WebP conversion)
#
# Usage:
#   ./scripts/optimize-trailer-images.sh
#
# The script creates the following optimized versions:
#   - trailer-400w.jpg/webp  (mobile, ~20-30KB)
#   - trailer-800w.jpg/webp  (tablet, ~73-109KB)
#   - trailer-1200w.jpg/webp (desktop, ~140-255KB)

set -e

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

echo -e "${GREEN}=== Trailer Image Optimization Script ===${NC}\n"

# Check if ImageMagick is installed
if ! command -v convert &> /dev/null; then
    echo -e "${RED}Error: ImageMagick is not installed.${NC}"
    echo "Install it with: sudo apt install imagemagick"
    exit 1
fi

# Check if WebP tools are installed
WEBP_AVAILABLE=false
if command -v cwebp &> /dev/null || convert -list format | grep -q WEBP; then
    WEBP_AVAILABLE=true
    echo -e "${GREEN}✓ WebP conversion available${NC}"
else
    echo -e "${YELLOW}⚠ WebP tools not found. Only JPEG versions will be created.${NC}"
    echo "  Install with: sudo apt install webp"
fi

# Find all trailer.png files
TRAILER_IMAGES=$(find _posts -name "trailer.png" -type f)

if [ -z "$TRAILER_IMAGES" ]; then
    echo -e "${YELLOW}No trailer.png images found in _posts directory.${NC}"
    exit 0
fi

# Count images
IMAGE_COUNT=$(echo "$TRAILER_IMAGES" | wc -l)
echo -e "Found ${GREEN}$IMAGE_COUNT${NC} trailer image(s) to optimize\n"

# Process each image
CURRENT=0
for img in $TRAILER_IMAGES; do
    CURRENT=$((CURRENT + 1))
    dir=$(dirname "$img")
    
    echo -e "${YELLOW}[$CURRENT/$IMAGE_COUNT]${NC} Processing: $img"
    
    # Get original file size
    ORIGINAL_SIZE=$(du -h "$img" | cut -f1)
    echo "  Original size: $ORIGINAL_SIZE"
    
    # Create JPEG versions
    echo "  Creating JPEG versions..."
    convert "$img" -resize 400x -quality 75 -strip "${dir}/trailer-400w.jpg"
    convert "$img" -resize 800x -quality 80 -strip "${dir}/trailer-800w.jpg"
    convert "$img" -resize 1200x -quality 85 -strip "${dir}/trailer-1200w.jpg"
    
    # Create WebP versions if available
    if [ "$WEBP_AVAILABLE" = true ]; then
        echo "  Creating WebP versions..."
        convert "$img" -resize 400x -quality 75 "${dir}/trailer-400w.webp"
        convert "$img" -resize 800x -quality 80 "${dir}/trailer-800w.webp"
        convert "$img" -resize 1200x -quality 85 "${dir}/trailer-1200w.webp"
    fi
    
    # Show resulting file sizes
    echo "  Optimized sizes:"
    if [ -f "${dir}/trailer-400w.jpg" ]; then
        SIZE_400=$(du -h "${dir}/trailer-400w.jpg" | cut -f1)
        echo "    • 400w JPEG: $SIZE_400"
    fi
    if [ -f "${dir}/trailer-800w.jpg" ]; then
        SIZE_800=$(du -h "${dir}/trailer-800w.jpg" | cut -f1)
        echo "    • 800w JPEG: $SIZE_800"
    fi
    if [ -f "${dir}/trailer-1200w.jpg" ]; then
        SIZE_1200=$(du -h "${dir}/trailer-1200w.jpg" | cut -f1)
        echo "    • 1200w JPEG: $SIZE_1200"
    fi
    if [ -f "${dir}/trailer-400w.webp" ]; then
        SIZE_400W=$(du -h "${dir}/trailer-400w.webp" | cut -f1)
        echo "    • 400w WebP: $SIZE_400W"
    fi
    
    echo -e "  ${GREEN}✓ Completed${NC}\n"
done

echo -e "${GREEN}=== Optimization Complete ===${NC}"
echo -e "\n${GREEN}✓ All $IMAGE_COUNT trailer image(s) have been optimized!${NC}"
echo -e "\nOptimized images are ready for use with responsive image loading."
echo -e "The home page (index.md) will automatically use these optimized versions.\n"
