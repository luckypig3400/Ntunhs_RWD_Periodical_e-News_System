import React, { useState, useEffect } from "react";
import {Link} from 'react-router-dom'
import axios from "axios";
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
import { DataGrid } from "@mui/x-data-grid";
const config = require("../config/default.json");

const apiURL = config.apiURL;

const User = () => {
    const [category, setCategory] = useState([]);
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
                        />
                    </div>
                </div>
                <div style={{paddingTop:"20px"}}></div>
                <Link to="/CreateUser"><Button variant="contained" >註冊新使用者</Button></Link>
            </div>
        </>
    );
};
export default User;
