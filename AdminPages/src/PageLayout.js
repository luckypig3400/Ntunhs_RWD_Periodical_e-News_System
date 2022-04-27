import React, { useState, useEffect } from "react";
import "./App.css";
import Menu from "./component/menu";
import { Grid } from "@mui/material";
import { Outlet } from "react-router-dom";
import AuthVerify from "./component/AuthVerify";
import axios from "axios";
const config = require("./config/default.json");
const apiURL = config.apiURL;

function PageLayout() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    useEffect(() => {
        axios.defaults.withCredentials = true;
        axios
            .post(`${apiURL}/auth/verify`)
            .then((response) => {
                setIsLoggedIn(true);
            })
            .catch((error) => {
                window.location.href = `./`;
            });
    }, []);

    return (
        <Grid container style={{ width: "100%", margin: "0 auto" }}>
            <Grid item xs={2}>
                <Menu />
            </Grid>
            <Grid item xs={9} style={{ paddingTop: "40px" }}>
                <Outlet />
            </Grid>
        </Grid>
    );
}

export default PageLayout;
