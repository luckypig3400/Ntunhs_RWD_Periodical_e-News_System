import React, { useState, useEffect } from "react";
import { Button, TextField } from "@mui/material";
import {putCategoryName} from "../axios/putAxios.js";


const CreateCategory = () => {
    const [createCategoryID, setCreateCategoryID] = useState("");
    const [createCategoryName, setCreateCategoryName] = useState("");
    return (
        <div style={{ marginTop: "20px" }}>
            <h3 style={{ paddingBottom: "10px" }}>類別代號:C00</h3>
            <TextField
                id="outlined-basic"
                label="類別代號:C00"
                variant="outlined"
                value={createCategoryID}
                onChange={(event) => {
                    setCreateCategoryID(event.target.value);
                }}
                sx={{ marginRight: "20px" , width:"100%",marginBottom: "20px"}}
            />
            <h3 style={{ paddingBottom: "10px" }}>類別名稱</h3>
            <TextField
                id="outlined-basic"
                label="類別名稱"
                variant="outlined"
                value={createCategoryName}
                onChange={(event) => {
                    setCreateCategoryName(event.target.value);
                }}
                sx={{ marginRight: "20px",width:"100%" }}
            />
            <Button
                variant="contained"
                sx={{ height: "55px", width: "100%", marginRight: "20px",marginTop: "20px" }}
                onClick={() => {
                    putCategoryName(createCategoryID, createCategoryName);
                    alert("新增成功");
                    window.location.reload();
                }}
            >
                新增
            </Button>
        </div>
    );
};

export default CreateCategory;
