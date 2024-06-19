import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import { getFirestore, doc, getDoc } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore-lite.js";
import { getDatabase, ref, child, set, get } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-database.js";

export class SharedXP {
	constructor(props) {
		this.app = initializeApp({
			apiKey: "AIzaSyDBi_MCSCj7rolI84P6kdie30gNnHrRJiY",
			authDomain: "shared-xp.firebaseapp.com",
			projectId: "shared-xp",
			storageBucket: "shared-xp.appspot.com",
			messagingSenderId: "692502370561",
			appId: "1:692502370561:web:969068a94f2193c4782300"
		});

		//this.db = getFirestore(this.app);

		this.db = getDatabase(this.app);

		console.log("sharedXP:", this.app, this.db);

		this.writeData('text_1', "Lorem Ipsum", "Lorem ipsum dolor sit amet 2.");

		this.readData('text_1');
	}

	async writeData(lobby, username, message) {
		const result = await set(ref(this.db, "posts/" + lobby), {
			username: username,
			message: message
		});
		console.log('result', result);
	}

	async readData(lobby) {
		const result = await get(child(ref(this.db), `posts/${lobby}`));
		console.log('result', result.val());
	}
}

window.SharedXP = SharedXP;
