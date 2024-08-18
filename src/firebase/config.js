import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getStorage}  from "firebase/storage";
import { getFirestore } from "firebase/firestore" ;

const firebaseConfig = {
  apiKey: "AIzaSyAKChAMDkvcSmAF0yq2OqSIAeODZIMUIYA",
  authDomain: "photo-management-app-444ea.firebaseapp.com",
  projectId: "photo-management-app-444ea",
  storageBucket: "photo-management-app-444ea.appspot.com",
  messagingSenderId: "222177092805",
  appId: "1:222177092805:web:6f3ce030a1df69e0e97cac"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const storage= getStorage(app);
const db = getFirestore(app);
export { auth , storage , db };
