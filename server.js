import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import authRoutes from "./server/routes/auth.js";
import subjectRoutes from "./server/routes/subjects.js";
import testRoutes from "./server/routes/tests.js";
import questionRoutes from "./server/routes/questions.js";
import resultRoutes from "./server/routes/results.js";
import leaderboardRoutes from "./server/routes/leaderboard.js";
import adminRoutes from "./server/routes/admin.js";
async function startServer() {
  const app = express();
  const PORT = 3e3;
  app.use(express.json({ limit: "10mb" }));
  app.use(express.urlencoded({ extended: true }));
  app.get("/api/health", (req, res) => {
    res.json({
      status: "ok",
      service: "PrepZone Mock Test & Practice Engine",
      timestamp: /* @__PURE__ */ new Date().toISOString(),
    });
  });
  app.use("/api/auth", authRoutes);
  app.use("/api/subjects", subjectRoutes);
  app.use("/api/tests", testRoutes);
  app.use("/api/questions", questionRoutes);
  app.use("/api/results", resultRoutes);
  app.use("/api/leaderboard", leaderboardRoutes);
  app.use("/api/admin", adminRoutes);
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
    console.log(`PrepZone Server running on http://0.0.0.0:${PORT}`);
  });
}
startServer().catch((err) => {
  console.error("Failed to start server:", err);
});
