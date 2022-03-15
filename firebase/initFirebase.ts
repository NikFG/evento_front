import {initializeApp} from 'firebase/app';
import {getStorage} from "@firebase/storage";
import 'firebase/storage';


const clientCredentials = {
    apiKey: "AIzaSyDw-3H5VklzyDv4PYxpvuuLeB4t0wwko2w",
    authDomain:"eventos-dados.firebaseapp.com",
    projectId:'eventos-dados',
    storageBucket: "eventos-dados.appspot.com",
    messagingSenderId: "663153003337",
    appId: "1:663153003337:web:1bc6dbadaae31413f66898",
    measurementId: "G-JXFDJFCQVK"
}


export const app = initializeApp(clientCredentials);
export const storage = getStorage(app);



/*
export const app = initializeApp(clientCredentials);
const analytics = getAnalytics(app);
export const storage = getStorage(app);*/

