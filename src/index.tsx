import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './components/App';

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyA4bPfVNBPIzkhSgyCDsY9NxgWHOSsklck",
  authDomain: "pop-maze-b35b0.firebaseapp.com",
  projectId: "pop-maze-b35b0",
  storageBucket: "pop-maze-b35b0.appspot.com",
  messagingSenderId: "403093790813",
  appId: "1:403093790813:web:7fc1e59ad40dbe4e406db4"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const root = ReactDOM.createRoot(
	document.getElementById('root') as HTMLElement
);
root.render(
	<React.StrictMode>
		<App />
	</React.StrictMode>
);
