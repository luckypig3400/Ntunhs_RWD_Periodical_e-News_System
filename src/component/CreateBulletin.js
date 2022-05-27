import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { createBulletin } from "../axios/putAxios.js";

const CreateBulletin = () => {
    const [newBulletin, setNewBulletin] = useState("");

    const handleClick = () => {
        if(newBulletin.trim()){
            createBulletin(newBulletin);
        }else{
            alert("請輸入公告內容！");
        }
    };

    return (
        <Box
            component="form"
            sx={{
                width: "100%",
                height: "50px",
                marginTop: "20px",
                marginBottom: "50px",
            }}
            noValidate
            autoComplete="off"
        >
            <TextField
                id="outlined-basic"
                label="內容"
                value={newBulletin.value}
                onChange={(event) => {
                    setNewBulletin(event.target.value);
                }}
                variant="outlined"
                sx={{ width: "80%", marginRight: "2%" }}
            />
            <Button
                variant="contained"
                color="success"
                sx={{ height: "100%", width: "18%" }}
                onClick={() => {
                    handleClick();
                }}
            >
                新增
            </Button>
        </Box>
    );
};

export default CreateBulletin;
