import * as firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import "firebase/storage";

const config = {
  apiKey: "AIzaSyAu4SMLsofpnCLutL8NVW_VXYv58CaVfd4",
  authDomain: "album-baeb8.firebaseapp.com",
  databaseURL: "https://album-baeb8.firebaseio.com",
  projectId: "album-baeb8",
  storageBucket: "album-baeb8.appspot.com",
  messagingSenderId: "707004152258",
  appId: "1:707004152258:web:9c346f77cb6aea3f47fe5b",
  measurementId: "G-2Y27DNE7GJ"
};

firebase.initializeApp(config);

export const auth = firebase.auth();

export const db = firebase.firestore();

export const storage = firebase.storage();

export function snapshotToArray(snapshot) {
  const updated_array = [];
  snapshot.forEach(x => {
    const data = x.data();
    data.id = x.id;
    updated_array.push(data);
  });
  return updated_array;
}
