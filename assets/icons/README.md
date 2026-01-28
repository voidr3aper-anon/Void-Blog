# PWA Icon Generation

To generate PWA icons for the manifest.json, you can use one of these methods:

## ⚠️ Important Note
**For optimal iOS support, PNG icons are required.** The current SVG icons work as fallbacks but should be replaced with PNG icons for production use, especially for Apple Touch Icons.

## Method 1: Using ImageMagick (Recommended)
```bash
# Install ImageMagick
sudo apt-get install imagemagick

# Generate icons from SVG
for size in 72 96 128 144 152 180 192 384 512; do
  convert -background none -resize ${size}x${size} icon.svg icon-${size}x${size}.png
done
```

## Method 2: Using Online Tools
- Use https://realfavicongenerator.net/ to generate all required icons
- Upload the icon.svg file
- Download the generated package
- Extract icons to this directory

## Method 3: Using Python Pillow
```bash
pip install pillow
python3 generate_icons.py
```

## Required Sizes
- 72x72 (Android)
- 96x96 (Android)
- 128x128 (Android)
- 144x144 (Windows)
- 152x152 (iOS)
- 180x180 (iOS - Apple Touch Icon)
- 192x192 (Android - maskable)
- 384x384 (Android)
- 512x512 (Android - maskable)

## After Generating PNG Icons
1. Update `manifest.json` to reference the PNG files instead of SVG
2. Update `_layouts/default.html` to use PNG for apple-touch-icon
3. Test on iOS and Android devices

## Note
The icon.svg file in this directory can be used as the source for generating all PWA icons.
For production, please generate proper PNG icons using one of the methods above.
