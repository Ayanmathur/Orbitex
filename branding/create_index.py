import os

html_content = """<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Orbitex - Brand Identity & Asset Kit</title>
<link rel="icon" href="favicon/favicon.ico">
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap" rel="stylesheet">
<style>
  :root {
    --bg-dark: #0b0f19;
    --card-bg: rgba(21, 27, 43, 0.7);
    --border-color: rgba(255, 255, 255, 0.08);
    --accent: #d97706;
    --accent-glow: rgba(217, 119, 6, 0.25);
    --text-primary: #f3f4f6;
    --text-secondary: #9ca3af;
  }
  
  * { box-sizing: border-box; margin: 0; padding: 0; }
  
  body {
    font-family: 'Inter', sans-serif;
    background-color: var(--bg-dark);
    color: var(--text-primary);
    min-height: 100vh;
    padding-bottom: 60px;
    background-image: 
      radial-gradient(circle at 10% 20%, rgba(217, 119, 6, 0.08) 0%, transparent 40%),
      radial-gradient(circle at 90% 80%, rgba(59, 130, 246, 0.05) 0%, transparent 40%);
  }

  header {
    max-width: 1200px;
    margin: 0 auto;
    padding: 40px 24px 20px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-bottom: 1px solid var(--border-color);
  }

  .brand-title {
    display: flex;
    align-items: center;
    gap: 16px;
  }

  .brand-title img {
    height: 48px;
  }

  .brand-title h1 {
    font-size: 24px;
    font-weight: 700;
    letter-spacing: -0.5px;
    background: linear-gradient(135deg, #fbbf24, #d97706);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }

  .brand-subtitle {
    font-size: 14px;
    color: var(--text-secondary);
    margin-top: 4px;
  }

  .controls {
    display: flex;
    gap: 10px;
    align-items: center;
    background: rgba(30, 41, 59, 0.6);
    padding: 6px;
    border-radius: 10px;
    border: 1px solid var(--border-color);
  }

  .bg-btn {
    padding: 8px 14px;
    font-size: 13px;
    font-weight: 500;
    border: none;
    border-radius: 6px;
    cursor: pointer;
    background: transparent;
    color: var(--text-secondary);
    transition: all 0.2s ease;
  }

  .bg-btn.active, .bg-btn:hover {
    background: rgba(255, 255, 255, 0.1);
    color: #fff;
  }

  .container {
    max-width: 1200px;
    margin: 40px auto 0;
    padding: 0 24px;
  }

  .section-title {
    font-size: 18px;
    font-weight: 600;
    color: #fff;
    margin-bottom: 20px;
    display: flex;
    align-items: center;
    gap: 10px;
  }

  .section-title::before {
    content: '';
    width: 4px;
    height: 18px;
    background: var(--accent);
    border-radius: 2px;
  }

  .grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(360px, 1fr));
    gap: 24px;
    margin-bottom: 48px;
  }

  .asset-card {
    background: var(--card-bg);
    border: 1px solid var(--border-color);
    border-radius: 16px;
    overflow: hidden;
    transition: transform 0.25s ease, border-color 0.25s ease, box-shadow 0.25s ease;
    backdrop-filter: blur(12px);
  }

  .asset-card:hover {
    transform: translateY(-4px);
    border-color: rgba(217, 119, 6, 0.4);
    box-shadow: 0 12px 30px var(--accent-glow);
  }

  .preview-area {
    height: 240px;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 24px;
    transition: background-color 0.3s ease;
    position: relative;
  }

  .preview-area.bg-dark { background-color: #0b0f19; }
  .preview-area.bg-light { background-color: #f8fafc; }
  .preview-area.bg-grid {
    background-color: #1e293b;
    background-image: linear-gradient(45deg, #0f172a 25%, transparent 25%), 
                      linear-gradient(-45deg, #0f172a 25%, transparent 25%), 
                      linear-gradient(45deg, transparent 75%, #0f172a 75%), 
                      linear-gradient(-45deg, transparent 75%, #0f172a 75%);
    background-size: 20px 20px;
    background-position: 0 0, 0 10px, 10px -10px, -10px 0px;
  }

  .preview-area img {
    max-width: 85%;
    max-height: 80%;
    object-fit: contain;
    filter: drop-shadow(0 4px 12px rgba(0, 0, 0, 0.3));
  }

  .card-details {
    padding: 20px;
    border-top: 1px solid var(--border-color);
  }

  .asset-name {
    font-size: 16px;
    font-weight: 600;
    color: #fff;
    margin-bottom: 4px;
  }

  .asset-desc {
    font-size: 13px;
    color: var(--text-secondary);
    margin-bottom: 16px;
  }

  .download-links {
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
  }

  .dl-btn {
    padding: 6px 12px;
    font-size: 12px;
    font-weight: 500;
    border-radius: 6px;
    text-decoration: none;
    transition: all 0.2s ease;
    display: inline-flex;
    align-items: center;
    gap: 6px;
  }

  .dl-btn-svg {
    background: rgba(217, 119, 6, 0.15);
    color: #fbbf24;
    border: 1px solid rgba(217, 119, 6, 0.3);
  }
  .dl-btn-svg:hover {
    background: #d97706;
    color: #fff;
  }

  .dl-btn-png {
    background: rgba(59, 130, 246, 0.15);
    color: #60a5fa;
    border: 1px solid rgba(59, 130, 246, 0.3);
  }
  .dl-btn-png:hover {
    background: #2563eb;
    color: #fff;
  }

  .favicon-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(140px, 1fr));
    gap: 16px;
    padding: 20px;
    background: var(--card-bg);
    border: 1px solid var(--border-color);
    border-radius: 16px;
  }

  .fav-item {
    background: rgba(15, 23, 42, 0.6);
    border: 1px solid var(--border-color);
    border-radius: 12px;
    padding: 16px;
    text-align: center;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 12px;
  }

  .fav-item img {
    object-fit: contain;
  }

  .fav-name {
    font-size: 12px;
    font-weight: 500;
    color: var(--text-secondary);
  }

  footer {
    text-align: center;
    margin-top: 60px;
    font-size: 13px;
    color: var(--text-secondary);
  }
</style>
</head>
<body>

<header>
  <div class="brand-title">
    <img src="png/transparent/primary-logo.png" alt="Orbitex Logo">
    <div>
      <h1>ORBITEX Brand Kit</h1>
      <div class="brand-subtitle">Official Brand Identity & Asset Extraction Suite</div>
    </div>
  </div>
  
  <div class="controls">
    <button class="bg-btn active" onclick="setPreviewBg('bg-dark', this)">Dark</button>
    <button class="bg-btn" onclick="setPreviewBg('bg-light', this)">Light</button>
    <button class="bg-btn" onclick="setPreviewBg('bg-grid', this)">Grid</button>
  </div>
</header>

<div class="container">
  
  <div class="section-title">Logo Variations</div>
  <div class="grid">

    <!-- Primary Logo -->
    <div class="asset-card">
      <div class="preview-area bg-dark">
        <img src="png/transparent/primary-logo.png" alt="Primary Logo">
      </div>
      <div class="card-details">
        <div class="asset-name">Primary Logo</div>
        <div class="asset-desc">Main horizontal logo with icon mark and ORBITEX wordmark.</div>
        <div class="download-links">
          <a href="svg/primary-logo.svg" download class="dl-btn dl-btn-svg">SVG Vector</a>
          <a href="png/transparent/primary-logo.png" download class="dl-btn dl-btn-png">PNG Transparent</a>
          <a href="png/dark-background/primary-logo-dark.png" download class="dl-btn dl-btn-png">PNG Dark</a>
          <a href="png/light-background/primary-logo-light.png" download class="dl-btn dl-btn-png">PNG Light</a>
        </div>
      </div>
    </div>

    <!-- Vertical Up Logo -->
    <div class="asset-card">
      <div class="preview-area bg-dark">
        <img src="png/transparent/vertical-up-logo.png" alt="Vertical Up Logo">
      </div>
      <div class="card-details">
        <div class="asset-name">Vertical Logo (Up)</div>
        <div class="asset-desc">Stacked vertical orientation with Icon mark on top and Wordmark below.</div>
        <div class="download-links">
          <a href="svg/vertical-up-logo.svg" download class="dl-btn dl-btn-svg">SVG Vector</a>
          <a href="png/transparent/vertical-up-logo.png" download class="dl-btn dl-btn-png">PNG Transparent</a>
          <a href="png/dark-background/vertical-up-logo-dark.png" download class="dl-btn dl-btn-png">PNG Dark</a>
          <a href="png/light-background/vertical-up-logo-light.png" download class="dl-btn dl-btn-png">PNG Light</a>
        </div>
      </div>
    </div>

    <!-- Vertical Down Logo -->
    <div class="asset-card">
      <div class="preview-area bg-dark">
        <img src="png/transparent/vertical-down-logo.png" alt="Vertical Down Logo">
      </div>
      <div class="card-details">
        <div class="asset-name">Vertical Logo (Down)</div>
        <div class="asset-desc">Stacked vertical orientation with Wordmark on top and Icon mark below.</div>
        <div class="download-links">
          <a href="svg/vertical-down-logo.svg" download class="dl-btn dl-btn-svg">SVG Vector</a>
          <a href="png/transparent/vertical-down-logo.png" download class="dl-btn dl-btn-png">PNG Transparent</a>
          <a href="png/dark-background/vertical-down-logo-dark.png" download class="dl-btn dl-btn-png">PNG Dark</a>
          <a href="png/light-background/vertical-down-logo-light.png" download class="dl-btn dl-btn-png">PNG Light</a>
        </div>
      </div>
    </div>

    <!-- Monochrome Logo -->
    <div class="asset-card">
      <div class="preview-area bg-dark">
        <img src="png/transparent/monochrome-logo.png" alt="Monochrome Logo">
      </div>
      <div class="card-details">
        <div class="asset-name">Monochrome Logo</div>
        <div class="asset-desc">Silver/grey metallic monochrome horizontal logo for neutral surfaces.</div>
        <div class="download-links">
          <a href="svg/monochrome-logo.svg" download class="dl-btn dl-btn-svg">SVG Vector</a>
          <a href="png/transparent/monochrome-logo.png" download class="dl-btn dl-btn-png">PNG Transparent</a>
          <a href="png/dark-background/monochrome-logo-dark.png" download class="dl-btn dl-btn-png">PNG Dark</a>
          <a href="png/light-background/monochrome-logo-light.png" download class="dl-btn dl-btn-png">PNG Light</a>
        </div>
      </div>
    </div>

    <!-- Word Only Logo -->
    <div class="asset-card">
      <div class="preview-area bg-dark">
        <img src="png/transparent/word-only-logo.png" alt="Word Only Logo">
      </div>
      <div class="card-details">
        <div class="asset-name">Word Only Logo</div>
        <div class="asset-desc">Standalone ORBITEX wordmark logotype.</div>
        <div class="download-links">
          <a href="svg/word-only-logo.svg" download class="dl-btn dl-btn-svg">SVG Vector</a>
          <a href="png/transparent/word-only-logo.png" download class="dl-btn dl-btn-png">PNG Transparent</a>
          <a href="png/dark-background/word-only-logo-dark.png" download class="dl-btn dl-btn-png">PNG Dark</a>
          <a href="png/light-background/word-only-logo-light.png" download class="dl-btn dl-btn-png">PNG Light</a>
        </div>
      </div>
    </div>

    <!-- Icon Only Logo -->
    <div class="asset-card">
      <div class="preview-area bg-dark">
        <img src="png/transparent/icon-only-logo.png" alt="Icon Only Logo">
      </div>
      <div class="card-details">
        <div class="asset-name">Icon Only Logo</div>
        <div class="asset-desc">Standalone Orbit Rocket-Bird emblem logomark.</div>
        <div class="download-links">
          <a href="svg/icon-only-logo.svg" download class="dl-btn dl-btn-svg">SVG Vector</a>
          <a href="png/transparent/icon-only-logo.png" download class="dl-btn dl-btn-png">PNG Transparent</a>
          <a href="png/dark-background/icon-only-logo-dark.png" download class="dl-btn dl-btn-png">PNG Dark</a>
          <a href="png/light-background/icon-only-logo-light.png" download class="dl-btn dl-btn-png">PNG Light</a>
        </div>
      </div>
    </div>

  </div>

  <div class="section-title">Favicon & App Icon Package</div>
  <div class="favicon-grid">

    <div class="fav-item">
      <img src="favicon/favicon-32x32.png" width="32" height="32" alt="32x32 Favicon">
      <div class="fav-name">favicon.ico (Multi-res)</div>
      <a href="favicon/favicon.ico" download class="dl-btn dl-btn-png">Download .ICO</a>
    </div>

    <div class="fav-item">
      <img src="favicon/favicon-48x48.png" width="48" height="48" alt="48x48 Favicon">
      <div class="fav-name">48 x 48 PNG</div>
      <a href="favicon/favicon-48x48.png" download class="dl-btn dl-btn-png">Download PNG</a>
    </div>

    <div class="fav-item">
      <img src="favicon/apple-touch-icon.png" width="64" height="64" alt="Apple Touch Icon">
      <div class="fav-name">180 x 180 (Apple)</div>
      <a href="favicon/apple-touch-icon.png" download class="dl-btn dl-btn-png">Download PNG</a>
    </div>

    <div class="fav-item">
      <img src="favicon/android-chrome-192x192.png" width="64" height="64" alt="Android 192">
      <div class="fav-name">192 x 192 (Android)</div>
      <a href="favicon/android-chrome-192x192.png" download class="dl-btn dl-btn-png">Download PNG</a>
    </div>

    <div class="fav-item">
      <img src="favicon/android-chrome-512x512.png" width="64" height="64" alt="Android 512">
      <div class="fav-name">512 x 512 (App Icon)</div>
      <a href="favicon/android-chrome-512x512.png" download class="dl-btn dl-btn-png">Download PNG</a>
    </div>

    <div class="fav-item">
      <img src="favicon/favicon.svg" width="48" height="48" alt="Vector Favicon">
      <div class="fav-name">favicon.svg</div>
      <a href="favicon/favicon.svg" download class="dl-btn dl-btn-svg">Download SVG</a>
    </div>

  </div>

</div>

<footer>
  Orbitex Design System &copy; 2026. All rights reserved.
</footer>

<script>
  function setPreviewBg(bgClass, btn) {
    document.querySelectorAll('.preview-area').forEach(el => {
      el.className = 'preview-area ' + bgClass;
    });
    document.querySelectorAll('.bg-btn').forEach(b => {
      b.classList.remove('active');
    });
    btn.classList.add('active');
  }
</script>

</body>
</html>
"""

with open(r'D:\Projects\Orbitex\branding\index.html', 'w', encoding='utf-8') as f:
    f.write(html_content)

print('Successfully written index.html')
