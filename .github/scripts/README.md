# Post Images Workflow

This workflow automatically organizes and copies images from post directories to the assets folder.

## How It Works

1. **You create posts** with images in `_posts/category-name/post-slug/images/`
2. **Jekyll excludes** these image directories from processing (configured in `_config.yml`)
3. **GitHub Actions automatically** copies images to `assets/posts/category-name/post-slug/images/`
4. **Jekyll builds** using the images from `assets/posts/`

## Why This Approach?

Jekyll processes all files in `_posts/` by default, including binary image files, which causes build errors ("invalid byte sequence in UTF-8"). By excluding the `images/` directories in `_config.yml` and copying them to `assets/` during build, we:

- Keep images organized with their posts in the repository
- Avoid Jekyll processing errors on binary files
- Serve images from the standard assets directory
- Maintain a clean separation between source content and build artifacts
- Reduce repository size by not committing copied images (they only exist in build artifacts)

## Benefits

✅ **Easier Organization**: Keep images with your posts for simpler management
✅ **Automatic Copying**: No manual file moving required during build
✅ **Works with GitHub Pages**: Images in assets directory work with Jekyll
✅ **Flexible**: Can still add images directly to assets if preferred
✅ **Smaller Repository**: Copied images are not committed, only exist in build artifacts

## Script Details

The `copy-post-images.sh` script:
- Validates it's running from the repository root
- Scans all `_posts` subdirectories for `images/` folders
- Filters and copies only image files (png, jpg, jpeg, gif, svg, webp, ico, bmp, tiff, tif)
- Preserves directory structure
- Verifies files were copied successfully
- Provides a detailed summary of the operation

## Important: Jekyll Configuration

The `_config.yml` file must exclude image directories to prevent Jekyll from trying to process binary files:

```yaml
exclude:
  - "**/images/**"  # Exclude all images directories from processing
```

Without this exclusion, Jekyll will fail with "invalid byte sequence in UTF-8" errors when it tries to read binary image files as text.

## Usage

### For New Posts

1. Create your post structure:
   ```bash
   _posts/category-name/post-slug/
   ├── YYYY-MM-DD-post-slug.md
   └── images/
       └── your-image.png
   ```

2. Reference images in your markdown:
   ```markdown
   image: "/assets/posts/category-name/post-slug/images/your-image.png"
   ```
   or in content:
   ```markdown
   ![Description]({{ '/assets/posts/category-name/post-slug/images/your-image.png' | relative_url }})
   ```

3. Push to GitHub - images are automatically copied!

### Alternative: Direct to Assets

You can still add images directly to `assets/posts/` if you prefer. Both approaches work!

## Workflow Integration

The script runs in the GitHub Actions workflow (`jekyll-gh-pages.yml`) after checkout and before Jekyll build:

```yaml
- name: Checkout
  uses: actions/checkout@v4

- name: Copy post images to assets
  run: |
    chmod +x .github/scripts/copy-post-images.sh
    ./.github/scripts/copy-post-images.sh

- name: Setup Ruby
  # ... rest of workflow
```

## Testing Locally

You can test the script locally:

```bash
./.github/scripts/copy-post-images.sh
```

This will copy any images from `_posts/**/images/` to `assets/posts/`.
