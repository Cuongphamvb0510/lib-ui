import { readdir, readFile, writeFile } from "fs/promises";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const rootDir = join(__dirname, "..");
const svgDir = join(rootDir, "src", "assets", "svgs");
const outputFile = join(rootDir, "src", "components", "Icon", "icons-data.ts");

// Convert tên file thành tên icon (camelCase)
function toIconName(filename) {
  return filename
    .replace(/\.svg$/, "")
    .split("_")
    .map((part, index) => {
      if (index === 0) return part;
      return part.charAt(0).toUpperCase() + part.slice(1);
    })
    .join("");
}

// Extract viewBox từ SVG
function extractViewBox(svgContent) {
  const viewBoxMatch = svgContent.match(/viewBox=["']([^"']+)["']/i);
  if (viewBoxMatch) {
    return viewBoxMatch[1];
  }
  const widthMatch = svgContent.match(/width=["'](\d+)["']/i);
  const heightMatch = svgContent.match(/height=["'](\d+)["']/i);
  if (widthMatch && heightMatch) {
    return `0 0 ${widthMatch[1]} ${heightMatch[1]}`;
  }
  return "0 0 24 24";
}

// Extract và process SVG content
function extractContent(svgContent) {
  let content = svgContent
    .replace(/<\?xml[^>]*>/g, "")
    .replace(/<!--[\s\S]*?-->/g, "")
    .trim();

  const svgMatch = content.match(/<svg[^>]*>([\s\S]*)<\/svg>/i);
  if (svgMatch) {
    content = svgMatch[1].trim();
  }

  // Giữ nguyên HTML attributes vì dùng dangerouslySetInnerHTML
  // Không cần convert sang camelCase
  return content;
}

async function generateIconsData() {
  try {
    const files = await readdir(svgDir);
    const svgFiles = files.filter((file) => file.endsWith(".svg"));

    console.log(`Found ${svgFiles.length} SVG files`);

    const iconsData = {};

    for (const file of svgFiles) {
      const svgPath = join(svgDir, file);
      const svgContent = await readFile(svgPath, "utf-8");
      const iconName = toIconName(file);
      const viewBox = extractViewBox(svgContent);
      const content = extractContent(svgContent);

      iconsData[iconName] = {
        viewBox,
        content,
      };
    }

    // Generate TypeScript file
    const typeScriptContent = `// Auto-generated icons data
export interface IconData {
  viewBox: string;
  content: string;
}

export const iconsData: Record<string, IconData> = ${JSON.stringify(iconsData, null, 2)};
`;

    await writeFile(outputFile, typeScriptContent, "utf-8");
    console.log(`✓ Generated icons-data.ts with ${Object.keys(iconsData).length} icons`);
    console.log("\n✓ All icons data generated successfully!");
  } catch (error) {
    console.error("Error generating icons data:", error);
    process.exit(1);
  }
}

generateIconsData();

