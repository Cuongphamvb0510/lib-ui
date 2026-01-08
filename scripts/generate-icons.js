import { readdir, readFile, writeFile, mkdir } from "fs/promises";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const rootDir = join(__dirname, "..");
const svgDir = join(rootDir, "src", "assets", "svgs");
const iconDir = join(rootDir, "src", "components", "Icon");

// Convert tên file thành tên component
function toComponentName(filename) {
  // ic_close.svg -> IcClose
  return filename
    .replace(/\.svg$/, "")
    .split("_")
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join("");
}

// Extract viewBox từ SVG
function extractViewBox(svgContent) {
  const viewBoxMatch = svgContent.match(/viewBox=["']([^"']+)["']/i);
  if (viewBoxMatch) {
    return viewBoxMatch[1];
  }
  // Fallback: extract từ width và height
  const widthMatch = svgContent.match(/width=["'](\d+)["']/i);
  const heightMatch = svgContent.match(/height=["'](\d+)["']/i);
  if (widthMatch && heightMatch) {
    return `0 0 ${widthMatch[1]} ${heightMatch[1]}`;
  }
  return "0 0 24 24";
}

// Extract content từ SVG (bỏ đi thẻ svg wrapper)
function extractContent(svgContent) {
  // Remove XML declaration và comments
  let content = svgContent
    .replace(/<\?xml[^>]*>/g, "")
    .replace(/<!--[\s\S]*?-->/g, "")
    .trim();

  // Extract nội dung bên trong thẻ <svg>
  const svgMatch = content.match(/<svg[^>]*>([\s\S]*)<\/svg>/i);
  if (svgMatch) {
    content = svgMatch[1].trim();
  }

  // Convert attributes từ kebab-case sang camelCase cho React
  content = content
    .replace(/fill-rule=/g, "fillRule=")
    .replace(/clip-rule=/g, "clipRule=")
    .replace(/stroke-width=/g, "strokeWidth=")
    .replace(/stroke-linecap=/g, "strokeLinecap=")
    .replace(/stroke-linejoin=/g, "strokeLinejoin=");

  // Thay thế fill và stroke bằng currentColor nếu có giá trị cụ thể
  content = content.replace(/fill="[^"]*"/g, (match) => {
    const fillValue = match.match(/fill="([^"]*)"/)[1];
    if (fillValue && fillValue !== "none") {
      return 'fill="currentColor"';
    }
    return match;
  });

  content = content.replace(/stroke="[^"]*"/g, (match) => {
    const strokeValue = match.match(/stroke="([^"]*)"/)[1];
    if (strokeValue && strokeValue !== "none") {
      return 'stroke="currentColor"';
    }
    return match;
  });

  // Xử lý opacity trong fill (như fill="#FCE9E9" -> fill="currentColor" opacity="0.1")
  content = content.replace(/fill="[^"]*"/g, (match) => {
    // Nếu là màu background nhạt, thêm opacity
    // Logic này có thể cần điều chỉnh tùy theo nhu cầu
    return match;
  });

  return content;
}

// Generate icon component
function generateIconComponent(filename, svgContent) {
  const componentName = toComponentName(filename);
  const viewBox = extractViewBox(svgContent);
  const content = extractContent(svgContent);

  // Convert SVG content thành JSX
  // Đơn giản hóa: wrap content trong fragment
  const jsxContent = content
    .split("\n")
    .map((line) => line.trim())
    .filter((line) => line.length > 0)
    .map((line) => `    ${line}`)
    .join("\n");

  return `import React from "react";
import { createIcon } from "./utils";

export const ${componentName} = createIcon(
  "${componentName}",
  "${viewBox}",
  <>
${jsxContent}
  </>
);
`;
}

async function generateIcons() {
  try {
    // Đảm bảo thư mục Icon tồn tại
    await mkdir(iconDir, { recursive: true });

    // Đọc tất cả SVG files
    const files = await readdir(svgDir);
    const svgFiles = files.filter((file) => file.endsWith(".svg"));

    console.log(`Found ${svgFiles.length} SVG files`);

    const generatedIcons = [];

    for (const file of svgFiles) {
      const svgPath = join(svgDir, file);
      const svgContent = await readFile(svgPath, "utf-8");
      const componentName = toComponentName(file);
      const componentCode = generateIconComponent(file, svgContent);
      const componentPath = join(iconDir, `${componentName}.tsx`);

      await writeFile(componentPath, componentCode, "utf-8");
      console.log(`✓ Generated ${componentName}.tsx`);
      generatedIcons.push(componentName);
    }

    // Generate index file để export tất cả icons
    const indexContent = `// Auto-generated icon exports
${generatedIcons
  .map((name) => `export { ${name} } from "./${name}";`)
  .join("\n")}
`;

    await writeFile(join(iconDir, "index.ts"), indexContent, "utf-8");
    console.log(`✓ Generated index.ts with ${generatedIcons.length} icons`);

    console.log("\n✓ All icons generated successfully!");
  } catch (error) {
    console.error("Error generating icons:", error);
    process.exit(1);
  }
}

generateIcons();

