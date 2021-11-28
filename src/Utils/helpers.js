import { useContext } from "react";

import { auth, db, storage } from "../firebase.config";
import {
  collection,
  addDoc,
  setDoc,
  doc,
  getDocs,
  updateDoc,
  getDoc,
} from "@firebase/firestore";
import { UploadFile } from "@mui/icons-material";
import { getDownloadURL, ref, uploadBytesResumable } from "@firebase/storage";
import { FilesContext } from "../FilesCtx";
import { createUserWithEmailAndPassword } from "@firebase/auth";

export const helperFunctions = {
  CreateUser: async (email, password) => {
    return await createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const { uid } = userCredential.user;
        return { status: true, message: uid };
      })
      .catch((e) => {
        return { status: false, message: e };
      });
  },
  GenerateUserData: async (uid, name, lastname, email) => {
    console.log(uid, name, lastname, email);
    const data = {
      name,
      lastname,
      email,
      userLevel: 1,
      creationDate: helperFunctions.GetTodayDate(),
      isActive: false,
      isAdmin: false,
    };

    const userRef = doc(db, "users", uid);
    console.log(userRef);
    const res = await setDoc(userRef, data)
      .then((res) => {
        console.log(res);
        return true;
      })
      .catch((e) => {
        console.log(e);
        return false;
      });

    return res;
  },
  GetFileExt: (file) => {
    var temp = file.name.split(".");
    var ext = temp.slice(0, 1).join(".");

    return /[.]/.exec(file.name) ? /[^.]+$/.exec(file.name) : undefined;
  },
  GetFileName: (file) => {
    var temp = file.name.split(".");
    var fname = temp.slice(0, -1).join(".");
    return fname;
  },
  GetTodayDate: () => {
    const date = new Date();
    var dd = String(date.getDate()).padStart(2, "0");
    var mm = String(date.getMonth() + 1).padStart(2, "0"); //January is 0!
    var yyyy = date.getFullYear();

    const today = mm + "/" + dd + "/" + yyyy;
    return today;
  },

  UploadFile: async (userId, docName, docToUpload, metaData) => {
    const dbRef = ref(storage, `/files/${userId}/${docName}`);
    return await uploadBytesResumable(dbRef, docToUpload, metaData)
      .then((snapshot) => {
        var fileType = helperFunctions.GetFileExt(docToUpload)[0];
        snapshot.metadata = { fileType, ...snapshot.metadata };
        console.log(snapshot);
        return snapshot;
      })
      .catch((e) => {
        console.log(e);
        return false;
      });
  },
  SaveFileData: async (snapshot, userId, userName, userLastname, userLevel) => {
    return await getDownloadURL(snapshot.ref).then(async (downloadURL) => {
      // console.log("File available at", downloadURL);
      const { name, size, timeCreated, updated, fileType } = snapshot.metadata;
      const res = await addDoc(collection(db, `files`), {
        path: downloadURL,
        name,
        size,
        fileType,
        createdAt: timeCreated,
        lastModify: updated,
        archived: false,
        userId,
        userName,
        userLastname,
        userLevel,
      })
        .then((data) => data)
        .catch((e) => {
          console.log(e);

          return false;
        });

      return res;
    });
  },
  GetUsersList: async () => {
    var users = [];

    const querySnapshot = await getDocs(collection(db, `users`));

    querySnapshot.forEach((doc) => {
      // doc.data() is never undefined for query doc snapshots
      users.push({ uid: doc.id, ...doc.data() });
    });

    console.log(users);
    return users;
  },

  SetUserActive: async (uid, status) => {
    const dbRef = doc(db, "users", uid);
    return await updateDoc(dbRef, { isActive: status });
  },
  ChangeLevelUser: async (uid, userLevel) => {
    const dbRef = doc(db, "users", uid);
    return await updateDoc(dbRef, { userLevel });
  },
  ChangeUserType: async (uid, isAdmin) => {
    const dbRef = doc(db, "users", uid);
    return await updateDoc(dbRef, { isAdmin });
  },
  GetUserNameAndLevelById: async (uid) => {
    const userDocRef = doc(db, "users", uid);
    const docSnap = await getDoc(userDocRef);

    if (docSnap.exists()) {
      const { name, lastname, userLevel } = await docSnap.data();
      console.log(name, lastname, userLevel);
      return { name, lastname, userLevel };
    } else {
      console.log("Doc not found");
    }
  },

  GetFiles: async () => {
    console.log("getting files");
    var filesArr = [];

    const querySnapshot = await getDocs(collection(db, `/files`));

    querySnapshot.forEach(async (doc) => {
      filesArr.push({
        uid: doc.id,

        ...doc.data(),
      });
    });

    return filesArr;
  },
  GetUserData: async (uid) => {
    const userDocRef = doc(db, "users", uid);
    const docSnap = await getDoc(userDocRef);

    if (docSnap.exists()) {
      return { ...docSnap.data() };
    } else {
      console.log("Doc not found");
    }
  },
  SearchFile: (files, search) => {
    console.log(files.filter((file) => file.name.includes(search)));
    return files.filter((file) =>
      file.name
        .toLowerCase()
        .replace(/[^a-zA-Z ]/g, "")
        .includes(search.toLowerCase().replace(/[^a-zA-Z ]/g, ""))
    );
  },
  DeleteFile: async (fileId) => {
    const dbRef = doc(db, "files", fileId);
    return await updateDoc(dbRef, { archived: true });
  },
  RestoreFile: async (fileId) => {
    const dbRef = doc(db, "files", fileId);
    return await updateDoc(dbRef, { archived: false });
  },
};
