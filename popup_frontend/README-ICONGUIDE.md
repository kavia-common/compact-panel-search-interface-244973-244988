# Icon Guide for Chrome Extension

To properly package and brand your Chrome extension, place PNG icons named:
  - icon-16.png (16x16)
  - icon-32.png (32x32)
  - icon-48.png (48x48)
  - icon-128.png (128x128)

inside the popup_frontend/ directory (or build output).

These are referenced in manifest.json for display in the toolbar, Chrome Web Store, and extension management. You can use any transparent PNG, or sites like https://favicon.io/ or https://realfavicongenerator.net/ to generate.

If omitted, Chrome will use a blank or fallback icon for your extension.
