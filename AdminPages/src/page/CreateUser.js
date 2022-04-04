import React, { useState, useEffect } from "react";
import {
    FormControl,
    TextField,
    Stack,
    Alert,
    IconButton,
    Button,
    Collapse,
    NativeSelect,
} from "@mui/material";
import axios from "axios";
const config = require("../config/default.json");
const apiURL = config.apiURL;

const CreateUser = () => {
    function CreateUserPostToServer() {
        if (password1.length < 8) {
            alert("密碼需大於8位數");
        } else if (password1 !== password2) {
            alert("密碼驗證不相同");
        } else {
            axios.defaults.withCredentials = true;
            axios
            .post(`${apiURL}/auth/register`, {
                username: userName,
                name:name,
                password:password1
            })
            .then((response) => {
                console.log(response);
                window.location.href = `/User`;
            })
            .catch((error) => {
                console.log(error.request);
            });
        }
    }
    const [name, setName] = useState("");
    const [userName, setUserName] = useState("");
    const [password1, setPassword1] = useState("");
    const [password2, setPassword2] = useState("");

    return (
        <>
            <div className="headerTitle">新增使用者</div>
            <div className="pagecontent">
                <h3 style={{ paddingBottom: "10px" }}>請輸入使用者名稱：</h3>
                <TextField
                    id="outlined-basic"
                    label="請輸入使用者名稱"
                    variant="outlined"
                    style={{ paddingBottom: "20px" }}
                    value={name}
                    onChange={(event) => {
                        setName(event.target.value);
                    }}
                />
                <h3 style={{ paddingBottom: "10px" }}>請輸入帳號</h3>
                <TextField
                    id="outlined-basic"
                    label="請輸入帳號"
                    variant="outlined"
                    style={{ paddingBottom: "20px" }}
                    value={userName}
                    onChange={(event) => {
                        setUserName(event.target.value);
                    }}
                />
                <h3 style={{ paddingBottom: "10px" }}>請輸入密碼</h3>
                <TextField
                    id="filled-password-input"
                    label="請輸入密碼"
                    type="password"
                    autoComplete="current-password"
                    variant="filled"
                    value={password1}
                    onChange={(event) => {
                        setPassword1(event.target.value);
                    }}
                />
                <h3 style={{ paddingBottom: "10px" }}>驗證密碼</h3>
                <TextField
                    id="filled-password-input"
                    label="驗證密碼"
                    type="password"
                    autoComplete="current-password"
                    variant="filled"
                    value={password2}
                    onChange={(event) => {
                        setPassword2(event.target.value);
                    }}
                />
                <div style={{ paddingTop: "20px" }}>
                    <Button
                        variant="contained"
                        sx={{ width: "200px", height: "50px" }}
                        onClick={() => {
                            CreateUserPostToServer();
                        }}
                    >
                        註冊新使用者
                    </Button>
                </div>
            </div>
        </>
    );
};

export default CreateUser;
