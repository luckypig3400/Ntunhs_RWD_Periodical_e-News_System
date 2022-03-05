import * as React from "react";
import "./App.css";
import CreatePost from "./page/CreatePost";
import Category from "./page/Category";
import PostList from "./page/PostList";
import Login from "./page/Login";
import EditPost from "./page/EditPost";
import { Routes, Route } from "react-router-dom";
import PageLayout from "./PageLayout"

function App() {
    return (
        <Routes>
            <Route path="/" element={<PageLayout />}>
                <Route index element={<Login />} />
                <Route path="/CreatePost" element={<CreatePost />} />
                <Route path="/PostList" element={<PostList />} />
                <Route path="/Category" element={<Category />} />
                <Route path="/EditPost" element={<EditPost />} />
                <Route path="*" element={<div>404 Not Found</div>} />
            </Route>
        </Routes>
    );
}

export default App;
