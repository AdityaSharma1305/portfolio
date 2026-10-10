const sharp = require('sharp');
const fs = require('fs');

async function removeBackground() {
  const inputPath = 'public/images/aditya-sharma.jpg';
  const { data, info } = await sharp(inputPath)
    .raw()
    .toBuffer({ resolveWithObject: true });

  const { width, height, channels } = info;
  console.log(`Processing image ${width}x${height}...`);

  // Create an RGBA buffer
  const rgba = Buffer.alloc(width * height * 4);
  const isBg = new Uint8Array(width * height); // 0 = fg, 1 = bg, 2 = visited

  // Helper to check if a pixel is background color (light neutral gray/white)
  const isBgColor = (x, y) => {
    const idx = (y * width + x) * channels;
    const r = data[idx];
    const g = data[idx + 1];
    const b = data[idx + 2];

    const maxVal = Math.max(r, g, b);
    const minVal = Math.min(r, g, b);
    const diff = maxVal - minVal;

    // The background is around (234, 234, 234)
    // Neutral (diff < 32) and bright (minVal > 200, average > 210)
    const avg = (r + g + b) / 3;
    return avg >= 205 && diff <= 32;
  };

  // BFS / Flood fill queue starting from top edge, left edge, and right edge
  const queue = new Int32Array(width * height);
  let qHead = 0;
  let qTail = 0;

  const push = (x, y) => {
    const idx = y * width + x;
    if (isBg[idx] === 0) {
      if (isBgColor(x, y)) {
        isBg[idx] = 1;
        queue[qTail++] = idx;
      }
    }
  };

  // Seed top row, left and right edges (up to y = 800)
  for (let x = 0; x < width; x++) {
    push(x, 0);
  }
  for (let y = 0; y < height; y++) {
    push(0, y);
    push(width - 1, y);
  }

  // Flood fill
  while (qHead < qTail) {
    const curr = queue[qHead++];
    const cx = curr % width;
    const cy = Math.floor(curr / width);

    // 4-neighborhood
    const neighbors = [
      [cx - 1, cy],
      [cx + 1, cy],
      [cx, cy - 1],
      [cx, cy + 1]
    ];

    for (let i = 0; i < 4; i++) {
      const nx = neighbors[i][0];
      const ny = neighbors[i][1];
      if (nx >= 0 && nx < width && ny >= 0 && ny < height) {
        push(nx, ny);
      }
    }
  }

  console.log(`Identified ${qTail} background pixels via flood fill.`);

  // Create smooth alpha mask with feathering / distance transition
  // Copy pixels to RGBA
  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      const pIdx = y * width + x;
      const srcIdx = pIdx * channels;
      const dstIdx = pIdx * 4;

      const r = data[srcIdx];
      const g = data[srcIdx + 1];
      const b = data[srcIdx + 2];

      rgba[dstIdx] = r;
      rgba[dstIdx + 1] = g;
      rgba[dstIdx + 2] = b;

      if (isBg[pIdx] === 1) {
        rgba[dstIdx + 3] = 0; // transparent
      } else {
        // Check if on border of bg for anti-aliasing
        let hasBgNeighbor = false;
        for (let dy = -1; dy <= 1; dy++) {
          for (let dx = -1; dx <= 1; dx++) {
            const nX = x + dx;
            const nY = y + dy;
            if (nX >= 0 && nX < width && nY >= 0 && nY < height) {
              if (isBg[nY * width + nX] === 1) {
                hasBgNeighbor = true;
                break;
              }
            }
          }
          if (hasBgNeighbor) break;
        }

        if (hasBgNeighbor) {
          // Soft edge blending
          const avg = (r + g + b) / 3;
          if (avg > 180) {
            rgba[dstIdx + 3] = Math.max(0, Math.min(255, Math.round((225 - avg) * 5)));
          } else {
            rgba[dstIdx + 3] = 230;
          }
        } else {
          rgba[dstIdx + 3] = 255; // fully opaque
        }
      }
    }
  }

  // Save full resolution cutout PNG
  await sharp(rgba, {
    raw: {
      width,
      height,
      channels: 4
    }
  })
    .png()
    .toFile('public/images/portrait-transparent.png');

  console.log('Saved public/images/portrait-transparent.png!');

  // Generate responsive WebP versions
  const sizes = [
    { name: 'portrait-1100.webp', w: Math.min(width, 1100) },
    { name: 'portrait-720.webp', w: 720 },
    { name: 'portrait-420.webp', w: 420 }
  ];

  for (const s of sizes) {
    await sharp('public/images/portrait-transparent.png')
      .resize(s.w)
      .webp({ quality: 90, alphaQuality: 100 })
      .toFile(`public/images/${s.name}`);

    // also copy to dist/images if exists
    if (fs.existsSync('dist/images')) {
      await sharp('public/images/portrait-transparent.png')
        .resize(s.w)
        .webp({ quality: 90, alphaQuality: 100 })
        .toFile(`dist/images/${s.name}`);
    }
    console.log(`Generated ${s.name}`);
  }
}

removeBackground().catch(console.error);
