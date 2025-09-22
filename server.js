const express = require("express");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 8000;

// Enable CORS for local development
const cors = require("cors");
app.use(cors());

// Helper: get Dropbox token from env
const DROPBOX_TOKEN = process.env.DROPBOX_TOKEN;


// API LAND --------------------------------------
let accessToken = null;
let tokenExpiry = 0;

async function getAccessToken() {
  const now = Date.now();

  // if token exists and not expired, reuse it
  if (accessToken && now < tokenExpiry) {
    return accessToken;
  }

  // otherwise, refresh it
  const params = new URLSearchParams({
    refresh_token: process.env.DROPBOX_REFRESH_TOKEN,
    grant_type: "refresh_token",
    client_id: process.env.DROPBOX_CLIENT_ID,
    client_secret: process.env.DROPBOX_CLIENT_SECRET,
  });

  const res = await fetch("https://api.dropbox.com/oauth2/token", {
    method: "POST",
    body: params,
  });

  const body = await res.json();
  accessToken = body.access_token;
  tokenExpiry = now + (body.expires_in * 1000) - 60000; // 1 min buffer

  return accessToken;
}


// NEW ROUTE
app.get("/api/photos/:folder", async (req, res) => {
  try {
    const folder = req.params.folder;
    const path = `/CDOEZFLICKS_API/${folder}`;
    const testPath = `/CARLSPHOTOSTEST`
    const token = await getAccessToken();

    // Step 1: List folder contents
    const listRes = await fetch("https://api.dropboxapi.com/2/files/list_folder", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ path: path }),
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
            "Authorization": `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ path: file.path_lower }),
        });

        const linkData = await linkRes.json();

        return { name: file.name, url: linkData.link || "" };
      })
    );

    const safeFiles = files.filter(Boolean);
    res.json(safeFiles);
  } catch (err) {
    console.error("Error fetching photos:", err);
    res.status(500).json({ error: "Failed to fetch photos" });
  }
});
// API LAND (END) --------------------------------------

// Serve React build
app.use(express.static(path.join(__dirname, "build")));

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "build", "index.html"));
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
// app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
