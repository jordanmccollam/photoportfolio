require("dotenv").config();

const DROPBOX_TOKEN = process.env.DROPBOX_TOKEN;

(async () => {
  try {
    // SEE IF PATH IS WORKING - TEST

    if (!DROPBOX_TOKEN) throw new Error("Dropbox token not set");

    const response = await fetch("https://api.dropboxapi.com/2/files/list_folder", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${DROPBOX_TOKEN}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ path: "/CARLSPHOTOSTEST/PHOTOS" }),
    });

    const data = await response.json();
    console.log("Dropbox response:", data);





    // SEE ALL FOLDERS IN ROOT - TEST

    // const response = await fetch("https://api.dropboxapi.com/2/files/list_folder", {
    // method: "POST",
    // headers: {
    //     "Authorization": `Bearer ${DROPBOX_TOKEN}`,
    //     "Content-Type": "application/json",
    // },
    // body: JSON.stringify({ path: "" }) // empty string = root
    // });

    // const data = await response.json();
    // console.log(data);


  } catch (err) {
    console.error("Error:", err);
  }
})();

