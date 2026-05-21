import fs from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";
import projectData from "../data/projects.json" with { type: "json" };

const root = process.cwd();
const outputDir = path.join(root, "output", "social-kit");
const hashTags = [
  "#KGArtDesign",
  "#MiamiDesign",
  "#KitchenTransformation",
  "#CustomCabinets",
  "#InteriorDesign",
  "#BeforeAndAfter",
  "#LuxuryInteriors",
];

function assetPath(publicPath) {
  return path.join(root, "public", publicPath.replace(/^\//, ""));
}

function escapeXml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}

function wrapText(text, maxChars) {
  const words = text.split(/\s+/);
  const lines = [];
  let line = "";

  for (const word of words) {
    const next = line ? `${line} ${word}` : word;
    if (next.length > maxChars && line) {
      lines.push(line);
      line = word;
    } else {
      line = next;
    }
  }

  if (line) lines.push(line);
  return lines;
}

function textSvg({ width, height, eyebrow, title, body, footer, dark = true }) {
  const isFeed = height === 1080;
  const titleLines = wrapText(title, isFeed ? 20 : 22).slice(0, 3);
  const bodyLines = wrapText(body, isFeed ? 32 : 44).slice(0, 4);
  const textColor = dark ? "#ffffff" : "#050505";
  const muted = dark ? "rgba(255,255,255,0.78)" : "rgba(0,0,0,0.68)";
  const eyebrowY = isFeed ? 145 : 110;
  const titleY = isFeed ? 245 : 210;
  const titleStep = isFeed ? 68 : 78;
  const bodyY = isFeed ? 565 : 520;
  const bodyStep = isFeed ? 42 : 45;
  const titleSize = isFeed ? 62 : 70;
  const bodySize = isFeed ? 29 : 32;

  return Buffer.from(`
    <svg width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" xmlns="http://www.w3.org/2000/svg">
      <style>
        .eyebrow { font: 700 26px Arial, sans-serif; letter-spacing: 7px; fill: #fbbf24; }
        .title { font: 900 ${titleSize}px Arial, sans-serif; fill: ${textColor}; }
        .body { font: 400 ${bodySize}px Arial, sans-serif; fill: ${muted}; }
        .footer { font: 700 27px Arial, sans-serif; fill: #fbbf24; }
      </style>
      <text x="70" y="${eyebrowY}" class="eyebrow">${escapeXml(eyebrow)}</text>
      ${titleLines.map((line, index) => `<text x="70" y="${titleY + index * titleStep}" class="title">${escapeXml(line)}</text>`).join("")}
      ${bodyLines.map((line, index) => `<text x="70" y="${bodyY + index * bodyStep}" class="body">${escapeXml(line)}</text>`).join("")}
      <text x="70" y="${height - 80}" class="footer">${escapeXml(footer)}</text>
    </svg>
  `);
}

function labelSvg(width, height, projectNumber) {
  return Buffer.from(`
    <svg width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="fade" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stop-color="rgba(0,0,0,0.04)" />
          <stop offset="0.58" stop-color="rgba(0,0,0,0.1)" />
          <stop offset="1" stop-color="rgba(0,0,0,0.78)" />
        </linearGradient>
      </defs>
      <rect width="${width}" height="${height}" fill="url(#fade)" />
      <rect x="46" y="46" rx="28" ry="28" width="190" height="58" fill="rgba(0,0,0,0.72)" stroke="rgba(251,191,36,0.55)" />
      <rect x="${width - 236}" y="46" rx="28" ry="28" width="190" height="58" fill="#ffffff" />
      <text x="76" y="84" font-family="Arial" font-size="23" font-weight="800" letter-spacing="5" fill="#ffffff">BEFORE</text>
      <text x="${width - 198}" y="84" font-family="Arial" font-size="23" font-weight="800" letter-spacing="5" fill="#050505">AFTER</text>
      <text x="46" y="${height - 52}" font-family="Arial" font-size="25" font-weight="800" letter-spacing="5" fill="#fbbf24">PROJECT ${projectNumber}</text>
    </svg>
  `);
}

async function coverImage(inputPath, width, height) {
  return sharp(inputPath)
    .resize(width, height, { fit: "cover", position: "center" })
    .webp({ quality: 88 })
    .toBuffer();
}

async function createFeedPost(project) {
  const before = await coverImage(assetPath(project.before), 540, 1080);
  const after = await coverImage(assetPath(project.after), 540, 1080);
  const overlay = labelSvg(1080, 1080, String(project.id).padStart(2, "0"));
  const text = textSvg({
    width: 1080,
    height: 1080,
    eyebrow: "K & G ART DESIGN",
    title: project.title,
    body: project.socialHook,
    footer: projectData.contact.phoneDisplay,
  });

  await sharp({
    create: {
      width: 1080,
      height: 1080,
      channels: 4,
      background: "#050505",
    },
  })
    .composite([
      { input: before, left: 0, top: 0 },
      { input: after, left: 540, top: 0 },
      { input: overlay, left: 0, top: 0 },
      { input: text, left: 0, top: 0 },
    ])
    .webp({ quality: 90 })
    .toFile(path.join(outputDir, `project-${String(project.id).padStart(2, "0")}-feed.webp`));
}

async function createStoryPost(project) {
  const after = await coverImage(assetPath(project.after), 1080, 1920);
  const shade = Buffer.from(`
    <svg width="1080" height="1920" viewBox="0 0 1080 1920" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="shade" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stop-color="rgba(0,0,0,0.15)" />
          <stop offset="0.42" stop-color="rgba(0,0,0,0.36)" />
          <stop offset="1" stop-color="rgba(0,0,0,0.84)" />
        </linearGradient>
      </defs>
      <rect width="1080" height="1920" fill="url(#shade)" />
    </svg>
  `);
  const text = textSvg({
    width: 1080,
    height: 1920,
    eyebrow: "BEFORE / AFTER REVEAL",
    title: project.socialHook,
    body: project.caption,
    footer: `${projectData.contact.phoneDisplay}  |  ${projectData.contact.websiteDisplay}`,
  });

  await sharp({
    create: {
      width: 1080,
      height: 1920,
      channels: 4,
      background: "#050505",
    },
  })
    .composite([
      { input: after, left: 0, top: 0 },
      { input: shade, left: 0, top: 0 },
      { input: text, left: 0, top: 0 },
    ])
    .webp({ quality: 90 })
    .toFile(path.join(outputDir, `project-${String(project.id).padStart(2, "0")}-story.webp`));
}

function captionFor(project) {
  return `${project.socialHook}

${project.caption}

Ready to transform your space? Call ${projectData.contact.phoneDisplay}.

${hashTags.join(" ")}`;
}

async function writeCaptions() {
  const json = projectData.transformations.map((project) => ({
    id: project.id,
    title: project.title,
    hook: project.socialHook,
    caption: captionFor(project),
    feedAsset: `project-${String(project.id).padStart(2, "0")}-feed.webp`,
    storyAsset: `project-${String(project.id).padStart(2, "0")}-story.webp`,
  }));

  const markdown = json
    .map((project) => `## Project ${String(project.id).padStart(2, "0")} - ${project.title}

Feed asset: \`${project.feedAsset}\`
Story asset: \`${project.storyAsset}\`

${project.caption}
`)
    .join("\n---\n\n");

  await fs.writeFile(path.join(outputDir, "captions.json"), JSON.stringify(json, null, 2));
  await fs.writeFile(path.join(outputDir, "captions.md"), markdown);
}

await fs.mkdir(outputDir, { recursive: true });

for (const project of projectData.transformations) {
  await createFeedPost(project);
  await createStoryPost(project);
}

await writeCaptions();

console.log(`Generated ${projectData.transformations.length * 2} social images in ${path.relative(root, outputDir)}`);
console.log("Generated captions.md and captions.json");
