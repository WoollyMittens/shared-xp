import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";
import { getDatabase, ref, child, set, get, push, query, onValue, orderByChild } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-database.js";

export class SharedXP {
	constructor(props) {
		this.app = initializeApp({
			apiKey: "AIzaSyDBi_MCSCj7rolI84P6kdie30gNnHrRJiY",
			authDomain: "shared-xp.firebaseapp.com",
			databaseURL: "https://shared-xp-default-rtdb.asia-southeast1.firebasedatabase.app",
			projectId: "shared-xp",
			storageBucket: "shared-xp.appspot.com",
			messagingSenderId: "692502370561",
			appId: "1:692502370561:web:969068a94f2193c4782300",
		});

		this.auth = getAuth();
		this.db = getDatabase(this.app);
		console.log("sharedXP:", this.app, this.db);

		this.existingAccount('woolly.mittens@gmail.com', 'H4r4b1b1@@', (credential) => {
			this.writeData("channel", "Lorem Ipsum", "Lorem ipsum dolor sit amet 5.");
			this.readData("channel");
		});
	}

	async newAccount(email, password, handler) {
		const credential = await createUserWithEmailAndPassword(this.auth, email, password);
		console.log("create credential", credential);
		handler(credential);
	}

	async existingAccount(email, password, handler) {
		const credential = await signInWithEmailAndPassword(this.auth, email, password);
		console.log("login credential", credential);
		handler(credential);
	}

	async writeData(lobby, username, message) {
		/*
		await set(push(ref(this.db, `posts/${lobby}`)), {
			username: username,
			message: message,
			time: new Date().getTime(),
		});
		*/
		await set(ref(this.db, `posts/${lobby}`), {
			username: username,
			message: message,
			time: new Date().getTime(),
		});
	}

	async readData(lobby) {
		onValue(
			query(ref(this.db, `posts/${lobby}`, orderByChild("time"))),
			(snapshot) => {
				snapshot.forEach((snapshot) => {
					console.log("snapshot", snapshot.key, snapshot.val());
				});
			},
			{
				onlyOnce: true,
			}
		);
	}
}

window.SharedXP = SharedXP;
