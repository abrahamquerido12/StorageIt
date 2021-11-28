const express = require("express");
const cors = require("cors");
const fs = require("fs");
const { firebase } = require("./firebase");

const app = express();
app.use(cors());

const port = process.env.PORT || 3000;

//host
const host = process.env.HOST || "127.0.0.1";

app.post("/", async (req, res) => {
  try {
    // const { string } = req.body;
    const filesRef = firebase.firestore().collection("files");
    const snapshot = await filesRef.where("fileType", "==", "txt").get();

    if (snapshot.empty) {
      console.log("No matching documents.");
      res.status(404).json({ message: "No txt files" });
      return;
    }

    console.log(snapshot);

    snapshot.forEach((doc) => {
      var filename = doc.data().path;

      fs.readFile(filename, "utf8", function (err, data) {
        if (err) throw err;
        console.log("OK: " + filename);
        console.log(data);
      });
    });

    res.status(201).json({ message: "exito" });
  } catch (e) {
    console.log(e);
    res.status(500).json({ message: "error", e });
  }
});

app.listen(3000, host, () => {
  console.log(`el servidor esta funcionando en el puerto ${port}`);
});
