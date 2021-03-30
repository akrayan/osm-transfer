import React, { useState, useEffect } from "react";
import { Grid, Paper, TextField, CardContent } from "@material-ui/core";
import { observer } from "mobx-react";
import { Button } from "@material-ui/core";
import axios from "axios";
import { store, updateToken } from "./stores/MainStore";
import Login from "./Components/Login";
import Home from "./Components/Home";

const Nav = observer(function Nav(props) {
    //if (store.token == null) return <Login />;
    return <Home/>
});

export default Nav;
