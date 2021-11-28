var admin = require("firebase-admin");

var serviceAccount = require("./firebase.json");

exports.firebase = admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://storageit-48a03-default-rtdb.firebaseio.com",
});
