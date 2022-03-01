import * as React from "react";
import "./App.css";
import Menu from "./component/menu";
import CreatePost from "./page/CreatePost";
import Category from "./page/Category";
import PostList from "./page/PostList";
import Login from "./page/Login";
import EditPost from './page/EditPost'
import { Grid } from "@mui/material";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

function App() {
    return (
        <Router>
            <Switch>
                <Route path="/Login" exact>
                    <Login />
                </Route>
                <Grid container style={{ width: "100%", margin: "0 auto" }}>
                    <Grid item xs={2}>
                        <Menu />
                    </Grid>
                    <Grid item xs={9} style={{ paddingTop: "40px" }}>
                        <Route path="/CreatePost" exact>
                            <CreatePost />
                        </Route>
                        <Route path="/PostList" exact>
                            <PostList />
                        </Route>
                        <Route path="/Category" exact>
                            <Category />
                        </Route>
                        <Route path="/EditPost">
                            <EditPost />
                        </Route>
                    </Grid>
                </Grid>
            </Switch>
        </Router>
    );
}

export default App;
