import * as React from "react";
import "./App.css";
import Menu from "./component/menu";
import { Grid } from "@mui/material";
import { Outlet } from "react-router-dom";

function PageLayout() {
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
