const express = require("express");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 8000;

// Enable CORS for local development
const cors = require("cors");
app.use(cors());

// Helper: get Dropbox token from env
const DROPBOX_TOKEN = process.env.DROPBOX_TOKEN;

app.get("/api/photos", async (req, res) => {
  try {
    if (!DROPBOX_TOKEN) {
      return res.status(500).json({ error: "Dropbox token not set" });
    }

    // Step 1: List folder contents
    const listRes = await fetch("https://api.dropboxapi.com/2/files/list_folder", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${DROPBOX_TOKEN}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ path: "/CARLSPHOTOSTEST" }),
    });

    const listData = await listRes.json();

    if (!listData.entries || !Array.isArray(listData.entries)) {
      return res.status(500).json({ error: "No entries found or Dropbox error", details: listData });
    }

    // Step 2: Get temporary links for each file
    const files = await Promise.all(
      listData.entries.map(async (file) => {
        if (!file.path_lower) return null;

        const linkRes = await fetch("https://api.dropboxapi.com/2/files/get_temporary_link", {
          method: "POST",
          headers: {
            "Authorization": `Bearer ${DROPBOX_TOKEN}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ path: file.path_lower }),
        });

        const linkData = await linkRes.json();

        return { name: file.name, url: linkData.link || "" };
      })
    );

    // Filter out any nulls
    const safeFiles = files.filter(Boolean);

    res.json(safeFiles);
  } catch (err) {
    console.error("Error fetching photos:", err);
    res.status(500).json({ error: "Failed to fetch photos" });
  }
});

app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
