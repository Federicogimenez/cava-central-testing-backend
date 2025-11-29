import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import jsonServer from "json-server";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;

// JSON Server
const router = jsonServer.router("db.json");
app.use(jsonServer.defaults());
app.use("/api", router);

// SPA frontend
app.use((req, res, next) => {
  if (req.path.startsWith("/api")) return next(); 
  res.sendFile(path.join(__dirname, "../frontend/dist/index.html"));
});

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
