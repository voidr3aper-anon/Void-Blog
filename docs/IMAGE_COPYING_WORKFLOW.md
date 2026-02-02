# Image Copying Workflow

## Overview
This document explains how post images are automatically copied from `_posts/` directories to `assets/posts/` for use in the blog.

## Workflow: `copy-images.yml`

### Purpose
Automatically copies images from post directories to the assets directory and commits them, making them available across all branches.

### When It Runs

The workflow triggers automatically when:
- **Push to any branch** that modifies:
  - Files in `_posts/**`
  - The copy script: `.github/scripts/copy-post-images.sh`
  - The workflow itself: `.github/workflows/copy-images.yml`
- **Pull requests** targeting any branch with changes to the same paths
- **Manual trigger** via the Actions tab (workflow_dispatch)

### What It Does

1. **Checks out the repository** with full history
2. **Runs the copy script** (`.github/scripts/copy-post-images.sh`)
   - Finds all `images/` directories in `_posts/`
   - Copies supported image formats to corresponding paths in `assets/posts/`
3. **Checks for changes** in `assets/posts/`
4. **On push events**: Automatically commits and pushes the copied images
5. **On pull requests**: Comments on the PR if images need updating

### Behavior by Event Type

#### Push Events
```
Push → Copy Images → Detect Changes → Commit & Push → ✓ Done
```
The workflow automatically commits the copied images with message:
`Auto-copy post images to assets [skip ci]`

The `[skip ci]` tag prevents infinite workflow loops.

#### Pull Request Events
```
PR → Copy Images → Detect Changes → Comment on PR → Manual Update Needed
```
The workflow will comment on the PR:
> ⚠️ Post images need to be copied to assets. Please run `bash .github/scripts/copy-post-images.sh` and commit the changes.

This reminds contributors to include image updates in their PR.

### Manual Trigger

You can manually run the workflow from the GitHub Actions tab:
1. Go to **Actions** → **Copy Post Images to Assets**
2. Click **Run workflow**
3. Select the branch
4. Click **Run workflow**

## Local Development

To copy images locally before committing:

```bash
bash .github/scripts/copy-post-images.sh
git add assets/posts/
git commit -m "Update post images"
```

## Image Storage Strategy

### Where Images Live

- **Source**: `_posts/[category]/[post-slug]/images/`
  - Co-located with markdown files
  - Easy to manage alongside post content
  
- **Destination**: `assets/posts/[category]/[post-slug]/images/`
  - Served by Jekyll
  - **Committed to git** (no longer in `.gitignore`)
  - Available on all branches

### Why Images Are Committed

Previously, images in `assets/posts/` were excluded from git and only copied during Jekyll builds. This caused problems:
- Images not visible on non-main branches
- Local development required manual copying
- Preview deploys didn't show images

Now images are committed because:
✅ Available immediately on all branches
✅ No build step required to see images
✅ Works in local development out-of-the-box
✅ Proper version control of images
✅ Preview deployments work correctly

### Supported Image Formats

The copy script supports:
- PNG (`.png`)
- JPEG (`.jpg`, `.jpeg`)
- GIF (`.gif`)
- SVG (`.svg`)
- WebP (`.webp`)
- ICO (`.ico`)
- BMP (`.bmp`)
- TIFF (`.tiff`, `.tif`)

## Workflow Permissions

The workflow requires:
- `contents: write` - To commit and push copied images

## Related Files

- **Workflow**: `.github/workflows/copy-images.yml`
- **Script**: `.github/scripts/copy-post-images.sh`
- **Deployment workflow**: `.github/workflows/jekyll-gh-pages.yml`
- **Documentation**: `docs/TRAILER_IMAGE_FEATURE.md`

## Troubleshooting

### Images not showing on my branch

1. Check if the workflow ran: Go to **Actions** tab and verify the "Copy Post Images to Assets" workflow
2. Manually trigger the workflow from the Actions tab
3. Or run locally: `bash .github/scripts/copy-post-images.sh && git add assets/posts/ && git commit`

### Workflow not triggering

The workflow only triggers when files in specific paths change:
- Make sure you're modifying files in `_posts/`
- Check the workflow run logs in the Actions tab
- Verify the workflow file syntax is correct

### Image copied but not visible

1. Check the image path in your post front matter:
   ```yaml
   image: "/assets/posts/category/post-slug/images/image.png"
   ```
2. Verify the file exists in `assets/posts/` with the correct path
3. Check file permissions (should be readable)

## Examples

### Adding a New Post with Images

1. Create post directory: `_posts/category/my-post/`
2. Add markdown: `_posts/category/my-post/2024-01-01-my-post.md`
3. Add images: `_posts/category/my-post/images/trailer.png`
4. Reference in front matter:
   ```yaml
   image: "/assets/posts/category/my-post/images/trailer.png"
   ```
5. Commit and push → Workflow automatically copies images
6. Images are now available on your branch!

### Updating Post Images

1. Update images in `_posts/[category]/[post-slug]/images/`
2. Commit and push
3. Workflow automatically updates `assets/posts/`
4. Changes are committed automatically
