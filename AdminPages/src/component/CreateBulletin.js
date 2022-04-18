import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

const CreateBulletin = ({ setBulletin, bulletin }) => {
    const [newBulletin, setNewBulletin] = useState({ value: "", time: "" });
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
                    const time = new Date().toLocaleString("zh-TW", {
                        timeZone: "Asia/Taipei",
                    });
                    setNewBulletin({ value: event.target.value, time: time });
                }}
                variant="outlined"
                sx={{ width: "80%", marginRight: "2%" }}
            />
            <Button
                variant="contained"
                color="success"
                sx={{ height: "100%", width: "18%" }}
                onClick={() => {
                    setBulletin((bulletin) => [...bulletin, newBulletin]);
                    setNewBulletin({ value: "", time: "" });
                }}
            >
                新增
            </Button>
        </Box>
    );
};

export default CreateBulletin;
