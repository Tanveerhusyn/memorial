/*eslint-disable*/
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";


  const firebaseConfig = {
    apiKey: "AIzaSyB328iGEmu911pywBjq-llpRgUORzQg2Zo",
    authDomain: "memorials-624cd.firebaseapp.com",
    projectId: "memorials-624cd",
    storageBucket: "memorials-624cd.appspot.com",
    messagingSenderId: "136609919133",
    appId: "1:136609919133:web:19f52c427f7a360a562474",
    measurementId: "G-LHRQPDVD1R"
  };
  
 

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export default app;