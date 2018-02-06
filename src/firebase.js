import firebse from "firebase"

// Initialize Firebase
const config = {
  apiKey: "AIzaSyA-fHNdWM9j1qUdZ08sSVznLfNZKiGpDgc",
  authDomain: "office-dashboard-dfdd3.firebaseapp.com",
  databaseURL: "https://office-dashboard-dfdd3.firebaseio.com",
  projectId: "office-dashboard-dfdd3",
  storageBucket: "",
  messagingSenderId: "985294119216"
};

const fire = firebse.initializeApp(config);
export default fire