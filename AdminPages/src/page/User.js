import React, { useState, useEffect } from "react";
import { Button, TextField, Modal, Box } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { getUser } from "../axios";
import { deleteUser, editUser } from "../axios/putAxios";
import CreateUser from "./CreateUser";

const User = () => {
    const [user, setUser] = useState([]);
    const [userEditRender, setUserEditRender] = useState(false);
    const [userContent, setUserContent] = useState({});
    useEffect(async () => {
        setUser(await getUser());
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

    const UserEditDiv = () => {
        return (
            <div style={{ marginTop: "20px" }}>
                <h3 style={{ paddingBottom: "10px" }}>姓名：</h3>
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
                    style={{ paddingBottom: "20px", width: "100%" }}
                />
                <h3 style={{ paddingBottom: "10px" }}>帳號：</h3>
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
                    style={{ paddingBottom: "20px", width: "100%" }}
                />
                <h3 style={{ paddingBottom: "10px" }}>新密碼：</h3>
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
                    style={{ paddingBottom: "20px", width: "100%" }}
                />
                <div style={{ marginTop: "20px" }}>
                    <Button
                        variant="contained"
                        sx={{
                            height: "55px",
                            width: "100%",
                            marginRight: "20px",
                        }}
                        onClick={() => {
                            editUser(userContent);
                            setUserEditRender(false);
                            window.location.reload();
                        }}
                    >
                        修改
                    </Button>
                    <Button
                        variant="contained"
                        color="error"
                        sx={{
                            height: "55px",
                            width: "100%",
                            marginTop: "20px",
                        }}
                        onClick={() => {
                            var message = window.confirm(
                                `確定要刪除${userContent.name}?`
                            );
                            if (message === true) {
                                alert("OK");
                                deleteUser(userContent);
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

    const handleClick = () => {
        setUserEditRender(true);
    };
    const handleClose = () => {
        setUserEditRender(false);
    };

    const style = {
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        width: 400,
        bgcolor: "background.paper",
        borderRadius: "10px",
        boxShadow: 24,
        pt: 2,
        px: 4,
        pb: 3,
    };

    return (
        <>
                <div style={{ display: "flex", height: "100%" }}>
                    <div style={{ flexGrow: 1 }}>
                        <DataGrid
                            rows={user}
                            columns={columns}
                            autoHeight={true}
                            onRowClick={(user) => {
                                setUserContent({
                                    ID: user.row.id,
                                    username: user.row.username,
                                    name: user.row.name,
                                });
                                handleClick();
                                setUserButton(false);
                            }}
                        />
                    </div>
                </div>
                <div style={{ paddingTop: "20px" }}></div>
                <CreateUserBox />

                <Modal
                    open={userEditRender}
                    onClose={handleClose}
                    aria-labelledby="parent-modal-title"
                    aria-describedby="parent-modal-description"
                >
                    <Box sx={{ ...style, width: 400 }}>
                        <UserEditDiv />

                        <Button
                            variant="outlined"
                            color="error"
                            sx={{
                                width: "100%",
                                height: "50px",
                                marginTop: "20px",
                            }}
                            onClick={() => {
                                handleClose();
                            }}
                        >
                            取消
                        </Button>
                    </Box>
                </Modal>
        </>
    );
};

const CreateUserBox = () => {
    const [createOpen, setcreateOpen] = React.useState(false);
    const handleOpen = () => {
        setcreateOpen(true);
    };
    const handleClose = () => {
        setcreateOpen(false);
    };

    const style = {
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        width: 400,
        bgcolor: "background.paper",
        borderRadius: "10px",
        boxShadow: 24,
        pt: 2,
        px: 4,
        pb: 3,
    };
    return (
        <div>
            <Button onClick={handleOpen} variant="contained">
                註冊新使用者
            </Button>
            <Modal
                open={createOpen}
                onClose={handleClose}
                aria-labelledby="parent-modal-title"
                aria-describedby="parent-modal-description"
            >
                <Box sx={{ ...style, width: 400 }}>
                    <CreateUser />
                    <Button
                        variant="outlined"
                        color="error"
                        sx={{
                            width: "100%",
                            height: "50px",
                            marginTop: "20px",
                        }}
                        onClick={() => {
                            handleClose();
                        }}
                    >
                        取消
                    </Button>
                </Box>
            </Modal>
        </div>
    );
};

export default User;
