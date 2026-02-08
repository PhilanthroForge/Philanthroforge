import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import type { Data } from "@measured/puck";

// TODO: Replace with your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "YOUR_API_KEY",
    authDomain: "YOUR_PROJECT_ID.firebaseapp.com",
    projectId: "YOUR_PROJECT_ID",
    storageBucket: "YOUR_PROJECT_ID.appspot.com",
    messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
    appId: "YOUR_APP_ID"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);

// Helper functions

export const saveSite = async (userId: string, siteData: Data) => {
    try {
        console.log("Attempting to save site...", { userId, siteData });
        // In a real app with valid credentials:
        // await setDoc(doc(db, "sites", userId), {
        //     content: siteData,
        //     lastUpdated: new Date()
        // }, { merge: true });

        console.log("SUCCESS: Site saved to Firestore (Simulator Mode)");
        return true;
    } catch (error) {
        console.error("Error saving site:", error);
        return false;
    }
};

export const publishSite = async (userId: string) => {
    try {
        console.log("Attempting to publish site...", { userId });
        // In a real app with valid credentials:
        // await updateDoc(doc(db, "sites", userId), {
        //     published: true,
        //     publishedAt: new Date()
        // });

        console.log("SUCCESS: Site published! (Simulator Mode)");
        return true;
    } catch (error) {
        console.error("Error publishing site:", error);
        return false;
    }
};
