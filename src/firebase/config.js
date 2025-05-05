import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import env from '../../config/config.js';


const app = initializeApp(env.FIREBASE_CONFIG);
const db = getFirestore(app);
const auth = getAuth(app);

export { db, auth };
