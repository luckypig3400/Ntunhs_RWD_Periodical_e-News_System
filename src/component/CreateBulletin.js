import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

const CreateBulletin = ({ setBulletin, bulletin }) => {
    const [newBulletin, setNewBulletin] = useState("");
    return (
        <Box
            component="form"
            sx={{
                width: "100%",
                height: "50px",
                marginBottom: "50px",
            }}
            noValidate
            autoComplete="off"
        >
            <TextField
                id="outlined-basic"
                label="內容"
                value={newBulletin}
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
                    setBulletin((bulletin) => [...bulletin, newBulletin]);
                }}
            >
                新增
            </Button>
        </Box>
    );
};

export default CreateBulletin;
