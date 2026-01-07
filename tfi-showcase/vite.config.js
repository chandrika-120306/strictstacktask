import { defineConfig } from "vite";
import nunjucks from "nunjucks";
import fs from "fs";
import path from "path";

export default defineConfig({
  root: "src",
  build: {
    outDir: "../dist",
    emptyOutDir: true,
    rollupOptions: {
      // ✅ Point to the dummy JS file so Vite has an entry
      input: path.resolve(__dirname, "src/assets/js/main.js")
    }
  },
  plugins: [
    {
      name: "nunjucks-build",
      closeBundle() {
        const env = new nunjucks.Environment(
          new nunjucks.FileSystemLoader("src/templates")
        );

        const pages = ["index", "about", "gallery", "contact"];
        const outDir = path.resolve("dist");

        if (!fs.existsSync(outDir)) {
          fs.mkdirSync(outDir, { recursive: true });
        }

        pages.forEach(page => {
          const html = env.render(`pages/${page}.njk`);
          fs.writeFileSync(path.join(outDir, `${page}.html`), html);
        });

        console.log("✅ Nunjucks pages built successfully!");
      }
    }
  ]
});
