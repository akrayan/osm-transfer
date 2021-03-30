import axios from "axios";
import { store, updateToken, updatePlayers } from "../stores/MainStore";

const positions = [
	"Attaquant",
	"Milieu",
	"Défenseur",
	"Gardien",
];

const playStyle = [
	"Offensif",
	"Polyvalent",
	"Défensif"
]

class MainRequest {
	login() {
		let qs = require("querystring");
		let config = {
			headers: {
				"Content-Type": "application/x-www-form-urlencoded",
			},
		};
		let form = {
			userName: store.login,
			grant_type: "password",
			client_id: "jPs3vVbg4uYnxGoyunSiNf1nIqUJmSFnpqJSVgWrJleu6Ak7Ga",
			client_secret: "ePOVDMfAvU8zcyfaxLMtqYSmND3n6vmmKx9ZlVnNGjGkzucMCt",
			password: store.password,
		};
		axios
			.post("https://web-api.onlinesoccermanager.com/api/token", qs.stringify(form), config)
			.then((response) => {
				//console.log("res", response);
				updateToken("Bearer " + response.data.access_token);
				this.getPlayers();
			})
			.catch((err) => console.log("err", err));
	}

	getPlayers() {
		let config = {
			headers: {
				Authorization: store.token,
			},
		};
		let promises = [];
		for (let i = 0; i < 20; i++) promises.push(axios.get("https://web-api.onlinesoccermanager.com/api/v1/leagues/39476588/teams/" + (i + 1) + "/players"));
		Promise.all(promises)
			.then((responses) => {
				let players = [];

				console.log("responses", responses);

				responses.forEach((arr, i) => {
					//console.log("arr " + i + " :", arr);
					players = players.concat(arr.data);
				});
				console.log("all players", players);
				players.forEach(p => {
					p.nation = p.nationality.name;
					p.position = positions[p.position - 1];
					p.style = playStyle[p.style - 1];
				})
                updatePlayers(players);
				//updateToken("Bearer " + response.data.access_token);
			})
			.catch((err) => console.log("err", err));
	}
}

export default new MainRequest();
