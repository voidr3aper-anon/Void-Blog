#!/bin/bash

# Script to copy images from _posts directory to assets/posts directory
# This allows keeping images co-located with posts while Jekyll uses them from assets

set -e

echo "🖼️  Copying post images from _posts to assets/posts..."

# Find all image directories in _posts
# This looks for any directory named "images" within _posts
image_dirs=$(find _posts -type d -name "images" 2>/dev/null || true)

if [ -z "$image_dirs" ]; then
    echo "ℹ️  No image directories found in _posts"
    exit 0
fi

# Counter for tracking
copied_count=0
dir_count=0

# Process each image directory
while IFS= read -r image_dir; do
    if [ -z "$image_dir" ]; then
        continue
    fi
    
    dir_count=$((dir_count + 1))
    
    # Extract the relative path from _posts
    # e.g., _posts/category/post-slug/images -> category/post-slug/images
    relative_path="${image_dir#_posts/}"
    
    # Create destination path in assets/posts
    dest_dir="assets/posts/$relative_path"
    
    # Create destination directory if it doesn't exist
    mkdir -p "$dest_dir"
    
    # Copy all image files
    for image_file in "$image_dir"/*; do
        if [ -f "$image_file" ]; then
            filename=$(basename "$image_file")
            cp "$image_file" "$dest_dir/"
            echo "  ✓ Copied: $relative_path/$filename"
            copied_count=$((copied_count + 1))
        fi
    done
done <<< "$image_dirs"

echo ""
echo "✅ Summary:"
echo "   - Processed $dir_count image directories"
echo "   - Copied $copied_count image files"
echo "   - Destination: assets/posts/"
echo ""
