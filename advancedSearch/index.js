const express = require("express");
const cors = require("cors");
const fs = require("fs");
const { firebase } = require("./firebase");
const { storage } = require("firebase-admin");
const path = require("path");

const app = express();
app.use(cors());

const port = process.env.PORT || 3000;

//host
const host = process.env.HOST || "127.0.0.1";
app.use(express.json({ extended: true }));

const downloadFile = async (fullPath, options) =>
  await firebase
    .storage()
    .bucket("storageit-48a03.appspot.com")
    .file(fullPath)
    .download(options);

const readText = async (destFilename) =>
  await fs.readFileSync(destFilename, "utf8", (err, data) => {
    if (err) throw err;
    return data;
  });

app.post("/", async (req, res) => {
  try {
    const { text } = req.body;
    console.log(text);
    const filesRef = firebase.firestore().collection("files");
    const snapshot = await filesRef.where("fileType", "==", "txt").get();

    if (snapshot.empty) {
      console.log("No matching documents.");
      res.status(404).json({ message: "No txt files" });
      return;
    }

    var resultFiles = [];

    for await (const [i, doc] of snapshot.docs.map((doc) => doc).entries()) {
      const { name, fullPath } = doc.data();
      let destFilename = `./files/${name}`;
      const options = {
        destination: destFilename,
      };

      await downloadFile(fullPath, options);
      const textInFile = await readText(destFilename);
      if (textInFile.includes(text)) {
        resultFiles.push({ ...doc.data() });
      }
    }
    console.log(resultFiles);
    if (resultFiles.length < 1) {
      res.status(404).json({ message: "no se encotnraron coincidencias" });
    } else {
      res.status(202).json({ resultFiles });
    }
  } catch (e) {
    console.log(e);
    res.status(500).json({ message: "error", e });
  }
});

app.listen(3000, host, () => {
  console.log(`el servidor esta funcionando en el puerto ${port}`);
});
