import React, { useState, useEffect } from "react";
import { Grid, Paper, TextField, CardContent } from "@material-ui/core";
import { observer } from "mobx-react";
import { Button } from "@material-ui/core";
import axios from "axios";
import { store, updateToken, updateLogin, updatePassword } from "../stores/MainStore";
import request from "../Request/mainRequest"

let connect = () => {
	request.login();
};

const Login = observer(function Login(props) {
	return (
		<div>
			<Grid container direction="column" justify="center" alignItems="center">
				<Paper elevation={3}>
					<CardContent>
						<Grid container direction="column" justify="space-around" alignItems="center">
							<TextField label="Login" value={store.login} onChange={(event) => {updateLogin(event.target.value)}} variant="outlined"></TextField>
							<TextField label="Password" value={store.password} onChange={(event) => {updatePassword(event.target.value)}} type="password" variant="outlined"></TextField>
							<Button variant="contained" color="primary" onClick={connect}>
								Connexion
							</Button>
						</Grid>
					</CardContent>
				</Paper>
				{store.token ?? "Token"}
			</Grid>
		</div>
	);
});
/*{
					["userName"]: "kabronn",
					["grant_type"]: "password",
					["client_id"]: "jPs3vVbg4uYnxGoyunSiNf1nIqUJmSFnpqJSVgWrJleu6Ak7Ga",
					["client_secret"]: "ePOVDMfAvU8zcyfaxLMtqYSmND3n6vmmKx9ZlVnNGjGkzucMCt",
					["password"]: "akkipuden",
				},*/

export default Login;
