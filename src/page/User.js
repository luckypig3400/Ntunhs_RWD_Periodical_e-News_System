import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { Button, TextField } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
const config = require("../config/default.json");

const apiURL = config.apiURL;

const User = () => {
    const [category, setCategory] = useState([]);
    const [createUserButton, setUserButton] = useState(true);
    const [userEditRender, setUserEditRender] = useState(false);
    const [userContent, setUserContent] = useState({});
    useEffect(() => {
        axios
            .get(`${apiURL}/api/user`)
            .then((result) => {
                setCategory(result.data);
            })
            .catch((err) => {
                console.log(err);
            });
    }, []);

    const columns = [
        {
            field: "name",
            headerName: "姓名",
            width: 300,
        },
        {
            field: "username",
            headerName: "帳號",
            width: 300,
        },
    ];

    const EditUser = () => {
        axios.defaults.withCredentials = true;
        axios
            .patch(`${apiURL}/api/user/${userContent.ID}`, {
                name: userContent.name,
                username: userContent.username,
                password: userContent.password,
            })
            .then((result) => {
                setCategory(result.data);
            })
            .catch((err) => {
                console.log(err);
            });
    };

    const DeleteUser = () => {
        axios.defaults.withCredentials = true;
        axios
            .delete(`${apiURL}/api/user/${userContent.ID}`)
            .then((result) => {
                setCategory(result.data);
            })
            .catch((err) => {
                console.log(err);
            });
    };

    const userEditDiv = () => {
        return (
            <div style={{ marginTop: "20px" }}>
                姓名：
                <TextField
                    id="outlined-basic"
                    value={userContent.name}
                    variant="outlined"
                    onChange={(event) => {
                        setUserContent({
                            ...userContent,
                            name: event.target.value,
                        });
                    }}
                    sx={{ marginRight: "20px" }}
                />
                帳號：
                <TextField
                    id="outlined-basic"
                    value={userContent.username}
                    variant="outlined"
                    onChange={(event) => {
                        setUserContent({
                            ...userContent,
                            username: event.target.value,
                        });
                    }}
                    sx={{ marginRight: "20px" }}
                />
                新密碼：
                <TextField
                    id="outlined-basic"
                    value={userContent.password}
                    variant="outlined"
                    onChange={(event) => {
                        setUserContent({
                            ...userContent,
                            password: event.target.value,
                        });
                        console.log(userContent);
                    }}
                    sx={{ marginRight: "20px" }}
                />
                <div style={{ marginTop: "20px" }}>
                    <Button
                        variant="contained"
                        sx={{
                            height: "55px",
                            width: "100px",
                            marginRight: "20px",
                        }}
                        onClick={() => {
                            EditUser();
                            setUserEditRender(false);
                            window.location.reload();
                        }}
                    >
                        修改
                    </Button>
                    <Button
                        variant="outlined"
                        color="error"
                        sx={{ height: "55px", width: "auto" }}
                        onClick={() => {
                            var message = window.confirm(
                                `確定要刪除${userContent.name}?`
                            );
                            if (message === true) {
                                alert("OK");
                                DeleteUser();
                                setUserEditRender(false);
                                window.location.reload();
                            } else {
                                alert("取消刪除");
                                window.location.reload();
                            }
                        }}
                    >
                        刪除使用者
                    </Button>
                </div>
            </div>
        );
    };

    return (
        <>
            <div className="headerTitle">成員管理</div>
            <div className="pagecontent">
                <div style={{ display: "flex", height: "100%" }}>
                    <div style={{ flexGrow: 1 }}>
                        <DataGrid
                            rows={category}
                            columns={columns}
                            autoHeight={true}
                            onRowClick={(user) => {
                                setUserContent({
                                    ID: user.row.id,
                                    username: user.row.username,
                                    name: user.row.name,
                                });
                                setUserEditRender(true);
                                setUserButton(false);
                            }}
                        />
                    </div>
                </div>
                <div style={{ paddingTop: "20px" }}></div>
                {createUserButton ? (
                    <Link to="/CreateUser">
                        <Button variant="contained">註冊新使用者</Button>
                    </Link>
                ) : (
                    ""
                )}
                {userEditRender ? userEditDiv() : ""}
            </div>
        </>
    );
};
export default User;
