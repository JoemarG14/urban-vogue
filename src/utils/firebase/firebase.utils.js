// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { 
    getAuth, 
    signInWithPopup, 
    GoogleAuthProvider, 
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut,
    onAuthStateChanged,
} from 'firebase/auth';

import { 
    getFirestore, 
    doc, 
    getDoc, 
    setDoc,
    collection,
    writeBatch,
    query,
    getDocs
} from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBhHpwV3EHmFp1eyUTNnXo7Nlee0w0wp0o",
  authDomain: "urban-vogue-db.firebaseapp.com",
  projectId: "urban-vogue-db",
  storageBucket: "urban-vogue-db.appspot.com",
  messagingSenderId: "264056355105",
  appId: "1:264056355105:web:cdef5a2a08cd993ddde660"
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

// Initialize sign in with google pop up
const googleProvider = new GoogleAuthProvider();
googleProvider.setCustomParameters({
    prompt: "select_account"
})
export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup(auth, googleProvider);

// Initialize Cloud Firestore and get a reference to the service
export const db = getFirestore(firebaseApp);

// will add all data from shop-data.js to firestore
export const addCollectionAndDocuments = async (collectionKey, objectsToAdd) => {
    const collectionRef = collection(db, collectionKey);
    const batch = writeBatch(db);

    objectsToAdd.forEach((object) => {
        const docRef = doc(collectionRef, object.title.toLocaleLowerCase());
        batch.set(docRef, object);
    });

    await batch.commit();
    console.log('done');
}

// will pull all category data from firestore
export const getCollectionAndDocuments = async () => {
    const collectionRef = collection(db, 'categories');
    const q= query(collectionRef);

    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map((docSnapshot) => docSnapshot.data());
}

// function for saving user info thru sign in with google pop up
export const createUserFromAuth = async (userAuth, additionalInformation = {}) => {
    if(!userAuth) return;

    const userRef = doc(db, 'users', userAuth.uid);
    const userSnapShot = await getDoc(userRef);

    if(!userSnapShot.exists()) {
        const { displayName, email } = userAuth;
        const createdAt = new Date();

        try {
            await setDoc(userRef, {
                displayName,
                email,
                createdAt,
                ...additionalInformation
            }).then(() => console.log('User successfully created'))
        } catch (err) {
            console.log('Error on creating the user', err.message);
        }
    }

    return userRef;
}

// Initialize sign up thru email and password
export const signUpWithEmailAndPassword = async (email, password) => {
    if(!email || !password) return;

    return await createUserWithEmailAndPassword(auth, email, password);
}

// Initialize sign in thru email and password
export const signInUserWithEmailAndPassword = async (email, password) => {
    if(!email || !password) return;

    return await signInWithEmailAndPassword(auth, email, password);
}

// sign out user
export const signOutUser = async () => await signOut(auth);

//check auth state of user
export const userAuthStateListener = (callback) => onAuthStateChanged(auth, callback);