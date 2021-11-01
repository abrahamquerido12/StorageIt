import { initializeApp, getApps } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyCGGUsCPw6Ho1pW6tdgGeWFp8f8HP98oPE",
  authDomain: "storageit-48a03.firebaseapp.com",
  databaseURL: "https://storageit-48a03-default-rtdb.firebaseio.com",
  projectId: "storageit-48a03",
  storageBucket: "storageit-48a03.appspot.com",
  messagingSenderId: "15928426555",
  appId: "1:15928426555:web:9d1e62b5a8eb38d3835c1e",
};

const app = initializeApp(firebaseConfig);

const db = getFirestore(app);
const auth = getAuth(app);
const storage = getStorage(app);

export { db, auth, storage };
