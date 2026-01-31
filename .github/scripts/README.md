# Post Images Workflow

This workflow automatically organizes and copies images from post directories to the assets folder.

## How It Works

1. **You create posts** with images in `_posts/category-name/post-slug/images/`
2. **GitHub Actions automatically** copies images to `assets/posts/category-name/post-slug/images/`
3. **Jekyll builds** using the images from `assets/posts/`

## Benefits

✅ **Easier Organization**: Keep images with your posts for simpler management
✅ **Automatic Copying**: No manual file moving required
✅ **Works with GitHub Pages**: Images in assets directory work with Jekyll
✅ **Flexible**: Can still add images directly to assets if preferred

## Script Details

The `copy-post-images.sh` script:
- Scans all `_posts` subdirectories for `images/` folders
- Copies all image files to corresponding `assets/posts/` locations
- Preserves directory structure
- Provides a summary of copied files

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
