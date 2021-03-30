import { observable, action } from "mobx";

export var store = observable({
	token: null,
	login: "kabronn",
	password: "akkipuden",
	players: [],
	fltPlayers: [],
	filter: {
		name: "",
		position: "",
		style: "",
		minAge: "",
		maxAge: "",
		minDef: "",
		maxDef: "",
		minAtk: "",
		maxAtk: "",
		minOvr: "",
		maxOvr: "",
		minPrice: "",
		maxPrice: "",
		nation: "",
	},
});

/*
	{ field: "age", headerName: "Age", width: 130 },
	{ field: "position", headerName: "Position", width: 130 },
	{ field: "name", headerName: "Nom", width: 130 },
	{ field: "fitness", headerName: "Forme", width: 130 },
	{ field: "morale", headerName: "Moral", width: 130 },
	{ field: "averagePlayerGrade", headerName: "Note", width: 130 },
	{ field: "goals", headerName: "Buts", width: 130 },
	{ field: "assists", headerName: "Assist", width: 130 },
	{ field: "statAtt", headerName: "ATK", width: 130 },
	{ field: "statDef", headerName: "DEF", width: 130 },
	{ field: "statOvr", headerName: "MOY", width: 130 },
	{ field: "nation", headerName: "Nationalité", width: 130 },
	{ field: "yellowCards", headerName: "Jaune", width: 130 },
*/

function comparaisonMinMax(storeField, value) {
    let res = (store.filter["min" + storeField] == "" || parseInt(store.filter["min" + storeField]) >= value) && (store.filter["max" + storeField] == "" || parseInt(store.filter["max" + storeField]) <= value)
    //console.log("test: " + storeField + "; val: " + value, res)
    return (res);
}

function searchInStr(storeField, value) {
	return store.filter[storeField] == "" || value.toLowerCase().search(store.filter[storeField].toLowerCase()) >= 0;
}

var filter = action(() => {
	//console.log("je filtre avec :", Object.assign({}, store.filter));
	store.fltPlayers = store.players.filter(
		(val) =>
			comparaisonMinMax("Age", val.age) &&
			comparaisonMinMax("Atk", val.statAtt) &&
			comparaisonMinMax("Def", val.statDef) &&
			comparaisonMinMax("Ovr", val.statOvr) &&
			comparaisonMinMax("Price", val.value) &&
			searchInStr("name", val.name) &&
			searchInStr("nation", val.nation) &&
			searchInStr("position", val.position)
	);
});

export var updateFilter = action((fltr) => {
	store.filter = fltr;
	filter();
});

export var updatePlayers = action((players) => {
	store.players = players;
	filter();
});

export var updateToken = action((token) => {
	store.token = token;
});

export var updateLogin = action((login) => {
	store.login = "" + login;
});
export var updatePassword = action((pwd) => {
	store.password = "" + pwd;
});

export var restartAdmin = action(() => {
	store.list = [];
	store.current = {
		birthdate: null,
		city: null,
		created_at: "",
		email: "",
		firstname: "",
		id: 0,
		lastname: "",
		license_plate: { name: "" },
		phone_number: null,
		roles: [],
		updated_at: "",
		url_verification: null,
		username: "",
		verified: 0,
	};
});

export var updateList = action((newlist) => {
	//store.list = newlist;
});
