import React from "react";
import Logo from "../../assets/images/logo.png";
import HomeIcon from "@mui/icons-material/Home";
import InsertDriveFileIcon from "@mui/icons-material/InsertDriveFile";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";

import { Link } from "react-router-dom";
import { ref, uploadBytesResumable, getDownloadURL } from "@firebase/storage";
import { collection, addDoc } from "@firebase/firestore";

import { storage, db } from "../../firebase.config";
import { helperFunctions } from "../../Utils/helpers";

const date = new Date();
var dd = String(date.getDate()).padStart(2, "0");
var mm = String(date.getMonth() + 1).padStart(2, "0"); //January is 0!
var yyyy = date.getFullYear();

const today = mm + "/" + dd + "/" + yyyy;

export default function Sidebar({ getFiles }) {
  const [docUrl, setDocUrl] = React.useState({});

  const upload = async (e) => {
    var files = e.target.files;

    var docToUpload = files[0];

    const metaData = {
      contentType: docToUpload.type,
    };

    const dbRef = ref(storage, `/pruebas/${docToUpload.name}`);
    const uploadTask = uploadBytesResumable(dbRef, docToUpload, metaData);
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        // Observe state change events such as progress, pause, and resume
        // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log("Upload is " + progress + "% done");
        switch (snapshot.state) {
          case "paused":
            console.log("Upload is paused");
            break;
          case "running":
            console.log("Upload is running");
            break;
        }
      },
      (error) => {
        // Handle unsuccessful uploads
      },
      () => {
        // Handle successful uploads on complete
        // For instance, get the download URL: https://firebasestorage.googleapis.com/...
        getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
          // console.log("File available at", downloadURL);
          const { name, size, timeCreated, updated, type } =
            uploadTask.snapshot.metadata;
          console.log(name, size, timeCreated, updated, type);
          const res = await addDoc(collection(db, "files"), {
            path: downloadURL,
            name,
            size,
            fileType: type,
            createdAt: timeCreated,
            lastModify: updated,
            archived: false,
          })
            .then(() => {
              getFiles();
            })
            .catch((e) => console.log(e));
        });
      }
    );
  };

  return (
    <div className="sidebar">
      <img src={Logo} alt="logo" />
      {/*  */}
      <div className="sidebar__btn-container">
        <label className="btn sidebar__upload-btn">
          <input
            type="file"
            className="btn sidebar__upload-btn"
            onChange={upload}
          />
          <AddIcon /> Subir Archivo
        </label>
      </div>

      <ul className="sidebar__nav-links">
        <li>
          <a href="">
            <HomeIcon /> Inicio{" "}
          </a>
        </li>
        <li>
          <a href="">
            {" "}
            <InsertDriveFileIcon />
            Archivos{" "}
          </a>
        </li>
        <li>
          <a href="">
            {" "}
            <DeleteIcon />
            Eliminados{" "}
          </a>
        </li>
      </ul>
    </div>
  );
}
