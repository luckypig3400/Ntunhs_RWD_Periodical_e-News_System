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
import Bulletin from "./page/Bulletin";
import Carousel from "./page/Carousel";
import MailCanva from "./page/MailCanva";
import MailCanvaPrint from "./page/MailCanvaPrint";
import CatMeme from "./component/NewCanvas/NewCanvas.js";

function App() {
    return (
        <Routes>
            <Route index element={<Login />} />
            <Route path="/MailCanvaPrint" element={<MailCanvaPrint />} />
            <Route path="/NewCanvas" element={<CatMeme />} />
            <Route path="/" element={<PageLayout />}>
                <Route path="/CreatePost" element={<CreatePost />} />
                <Route path="/PostList" element={<PostList />} />
                <Route path="/Category" element={<Category />} />
                <Route path="/EditPost" element={<EditPost />} />
                <Route path="/User" element={<User />} />
                <Route path="/Carousel" element={<Carousel />} />
                <Route path="/Bulletin" element={<Bulletin />} />
                <Route path="/MailCanva" element={<MailCanva />} />
                <Route path="/Signout" element={<Signout />} />
            </Route>

            <Route path="*" element={<Login />} />
        </Routes>
    );
}
export default App;
