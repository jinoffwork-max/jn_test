import express from "express";
import { createServer as createViteServer } from "vite";
import path from "path";
import axios from "axios";
import fs from "fs";

async function startServer() {
  const app = express();
  const PORT = 3000;

  // 비디오 서버 주소
  const VIDEO_SERVER_URL = "https://clovamotion.com:459/";

  // API: 비디오 목록 자동 스캔 (Private API 방식)
  app.get("/api/videos", async (req, res) => {
    try {
      console.log("Fetching video list via private scanner with sorting...");
      
      const SCANNER_URL = `${VIDEO_SERVER_URL}tsl_scanner.php?key=tsl_secure_sync_2024`;
      const response = await axios.get(SCANNER_URL, { timeout: 5000 });
      
      if (Array.isArray(response.data)) {
        // 수정 시간(mtime) 기준 내림차순 정렬 (최신순)
        const sortedVideos = response.data
          .sort((a: any, b: any) => b.mtime - a.mtime)
          .map((v: any) => v.path); // 프론트엔드에는 경로만 전달

        console.log(`Successfully synced and sorted ${sortedVideos.length} videos.`);
        return res.json(sortedVideos);
      }
      
      throw new Error("Invalid response from scanner");

    } catch (error: any) {
      console.warn("Private scan failed, falling back to local list:", error.message);
      
      try {
        const jsonPath = path.join(process.cwd(), "public", "video-list.json");
        if (fs.existsSync(jsonPath)) {
          return res.json(JSON.parse(fs.readFileSync(jsonPath, "utf-8")));
        }
      } catch (e) {}
      
      res.status(500).json({ error: "Scanner connection failed" });
    }
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
