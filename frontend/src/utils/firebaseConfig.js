/*eslint-disable*/
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";


  const firebaseConfig = {
    apiKey: "AIzaSyAFRVzlX3QWgGBjEN01A9zOnXDRnkeNRrI",
    authDomain: "willalwaysloveu-504a9.firebaseapp.com",
    projectId: "willalwaysloveu-504a9",
    storageBucket: "willalwaysloveu-504a9.appspot.com",
    messagingSenderId: "439261961524",
    appId: "1:439261961524:web:d1be54a3adbc78284fd961",
    measurementId: "G-VLC0X81WQV"
  };
  
 

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export default app;