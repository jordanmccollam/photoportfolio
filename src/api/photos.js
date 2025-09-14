// api/photos.js

export default async function handler(req, res) {
  try {
    const response = await fetch("https://api.dropboxapi.com/2/files/list_folder", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${process.env.REACT_APP_DROPBOX_TOKEN}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ path: "/CARLSPHOTOSTEST" }), // <-- folder in Dropbox
    });

    const data = await response.json();

    // Convert file entries to temporary links
    const files = await Promise.all(
      data.entries.map(async (file) => {
        const linkRes = await fetch("https://api.dropboxapi.com/2/files/get_temporary_link", {
          method: "POST",
          headers: {
            "Authorization": `Bearer ${process.env.REACT_APP_DROPBOX_TOKEN}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ path: file.path_lower }),
        });
        const linkData = await linkRes.json();
        return { name: file.name, url: linkData.link };
      })
    );

    res.status(200).json(files);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch photos" });
  }
}



// app.get("/api/photos", async (req, res) => {
//   try {
//     const response = await fetch("https://api.dropboxapi.com/2/files/list_folder", {
//       method: "POST",
//       headers: {
//         "Authorization": `Bearer ${process.env.REACT_APP_DROPBOX_TOKEN}`,
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify({ path: "/portfolio" }),
//     });

//     const data = await response.json();

//     const files = await Promise.all(
//       data.entries.map(async (file) => {
//         const linkRes = await fetch("https://api.dropboxapi.com/2/files/get_temporary_link", {
//           method: "POST",
//           headers: {
//             "Authorization": `Bearer ${process.env.REACT_APP_DROPBOX_TOKEN}`,
//             "Content-Type": "application/json",
//           },
//           body: JSON.stringify({ path: file.path_lower }),
//         });
//         const linkData = await linkRes.json();
//         return { name: file.name, url: linkData.link };
//       })
//     );

//     res.json(files);
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ error: "Failed to fetch photos" });
//   }
// });
