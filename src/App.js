import React, { useState, useEffect } from "react";
import "./App.css";
import CreatePost from "./page/CreatePost";
import Category from "./page/Category";
import PostList from "./page/PostList";
import Login from "./page/Login";
import EditPost from "./page/EditPost";
import { Routes, Route } from "react-router-dom";
import PageLayout from "./PageLayout";
import Signout from "./component/Signout";
import User from "./page/User";
import CreateUser from "./page/CreateUser";


function App() {
    return (
        <Routes>
            <Route index element={<Login />} />

            <Route path="/" element={<PageLayout />}>
                <Route path="/CreatePost" element={<CreatePost />} />
                <Route path="/PostList" element={<PostList />} />
                <Route path="/Category" element={<Category />} />
                <Route path="/EditPost" element={<EditPost />} />
                <Route path="/User" element={<User />} />
                <Route path="/CreateUser" element={<CreateUser />} />
                <Route path="/Startposts" element={<CreateUser />} />
                <Route path="/Signout" element={<Signout />} />
            </Route>

            <Route path="*" element={<Login />} />
        </Routes>
    );
}
export default App;
