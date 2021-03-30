import React, { useState, useEffect } from "react";
import { makeStyles, Grid, Paper, TextField, CardContent, Card, Typography } from "@material-ui/core";
import { observer } from "mobx-react";
import { Button } from "@material-ui/core";
import axios from "axios";
import { store, updateFilter } from "../stores/MainStore";
import { DataGrid } from "@material-ui/data-grid";
import request from "../Request/mainRequest";

var formatCurrency = (curr) => {
	curr = curr.value;
	if (curr > 1000000) return (curr / 1000000).toString() + "M";
	if (curr > 1000) return (curr / 1000).toString() + "K";
	return curr.toString()
};

const columns = [
	{ field: "teamId", headerName: "Team", width: 130 },
	{ field: "value", headerName: "Prix", width: 130, valueFormatter: formatCurrency },
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
	/*
     age
     name
     forme / fitness
     note / averagePlayerGrade
     buts / goals
     assist
     match joués / matchesPlayed
     morale
     nationality => name
     ATK / statAtt
     DEF / statDef
     MOY / statOvr
     ?status
     ?style
     position : []
     trainingProgress
     trainingForecast
     prix / value
     Jaune / yellowCards
     */
];

const useStyles = makeStyles((theme) => ({
	root: {
		width: "100%",
		height: "100%",
	},
	card: {
		height: "500px",
	},
	form: {
		"& .MuiOutlinedInput-root": {
			color: "white",
			borderColor: "white",
		},
	},
	numberInput: {
		width: "75px",
		marginLeft: "5px",
	},
}));

var onChangeFilter = (field, value) => {
	store.filter[field] = value;
	updateFilter(store.filter);
};

const Home = observer(function Home(props) {
	const classes = useStyles();
	useEffect(() => {
		request.getPlayers();
	}, []);
	return (
		<Grid container className={classes.root} direction="row" justify="center" alignItems="stretch">
			<Grid container item direction="column" justify="space-around" alignItems="stretch" xs={11}>
				<Card>
					<CardContent>
						<Grid container spacing={4}>
							<Grid item>
								<TextField label="Name" variant="outlined" value={store.filter.name} onChange={(event) => onChangeFilter("name", event.target.value)}></TextField>
							</Grid>
							<Grid item>
								<TextField label="Position" variant="outlined" value={store.filter.position} onChange={(event) => onChangeFilter("position", event.target.value)}></TextField>
							</Grid>
							<Grid item>
								<TextField label="Pays" variant="outlined" value={store.filter.nation} onChange={(event) => onChangeFilter("nation", event.target.value)}></TextField>
							</Grid>
							<Grid item justify="center" alignItems="center">
								<Grid container direction="row" justify="center" alignItems="center" spacing={2}>
									<Typography variant="body1">Prix :</Typography>
									<TextField
										label="Min"
										className={classes.numberInput}
										variant="outlined"
										value={store.filter.minPrice}
										onChange={(event) => onChangeFilter("minPrice", event.target.value)}></TextField>
									<TextField
										label="Max"
										className={classes.numberInput}
										variant="outlined"
										value={store.filter.maxPrice}
										onChange={(event) => onChangeFilter("maxPrice", event.target.value)}></TextField>
								</Grid>
							</Grid>
							<Grid item justify="center" alignItems="center">
								<Grid container direction="row" justify="center" alignItems="center" spacing={2}>
									<Typography variant="body1">Age :</Typography>
									<TextField label="Min" className={classes.numberInput} variant="outlined" value={store.filter.minAge} onChange={(event) => onChangeFilter("minAge", event.target.value)}></TextField>
									<TextField label="Max" className={classes.numberInput} variant="outlined" value={store.filter.maxAge} onChange={(event) => onChangeFilter("maxAge", event.target.value)}></TextField>
								</Grid>
							</Grid>
							<Grid item justify="center" alignItems="center">
								<Grid container direction="row" justify="center" alignItems="center" spacing={2}>
									<Typography variant="body1">ATK :</Typography>
									<TextField label="Min" className={classes.numberInput} variant="outlined" value={store.filter.minAtk} onChange={(event) => onChangeFilter("minAtk", event.target.value)}></TextField>
									<TextField label="Max" className={classes.numberInput} variant="outlined" value={store.filter.maxAtk} onChange={(event) => onChangeFilter("maxAtk", event.target.value)}></TextField>
								</Grid>
							</Grid>
							<Grid item justify="center" alignItems="center">
								<Grid container direction="row" justify="center" alignItems="center" spacing={2}>
									<Typography variant="body1">DEF :</Typography>
									<TextField label="Min" className={classes.numberInput} variant="outlined" value={store.filter.minDef} onChange={(event) => onChangeFilter("minDef", event.target.value)}></TextField>
									<TextField label="Max" className={classes.numberInput} variant="outlined" value={store.filter.maxDef} onChange={(event) => onChangeFilter("maxDef", event.target.value)}></TextField>
								</Grid>
							</Grid>
							<Grid item justify="center" alignItems="center">
								<Grid container direction="row" justify="center" alignItems="center" spacing={2}>
									<Typography variant="body1">MOY :</Typography>
									<TextField label="Min" className={classes.numberInput} variant="outlined" value={store.filter.minOvr} onChange={(event) => onChangeFilter("minOvr", event.target.value)}></TextField>
									<TextField label="Max" className={classes.numberInput} variant="outlined" value={store.filter.maxOvr} onChange={(event) => onChangeFilter("maxOvr", event.target.value)}></TextField>
								</Grid>
							</Grid>
						</Grid>
					</CardContent>
				</Card>
				<Card>
					<CardContent className={classes.card}>
						<DataGrid className={classes.card} rows={store.fltPlayers} columns={columns} autoPageSize disableSelectionOnClick onRowClick={(row) => window.open("https://fr.onlinesoccermanager.com/Squad/39476588/" + row.data.teamId, "_blank" )} />
					</CardContent>
				</Card>
			</Grid>
		</Grid>
	);
});

/*
        name: "", str
        position: "", selct
        style: "", selct
		minAge: "", sm number
		maxAge: "", sm number
		minDef: "", sm number
		maxDef: "", sm number
		minAtk: "", sm number
		maxAtk: "", sm number
		mimOvr: "", sm number
        maxOvr: "", sm number
        minPrice: "", sm number
        maxPrice: "", sm number
        nation: "" str
*/

export default Home;
