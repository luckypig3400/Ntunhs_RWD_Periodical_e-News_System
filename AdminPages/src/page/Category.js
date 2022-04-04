import React, { useState, useEffect } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { Button } from "@mui/material";
import axios from "axios";
const config = require("../config/default.json");

const apiURL = config.apiURL;

function Category() {
    const [category, setCategory] = useState([]);
    useEffect(() => {
        axios
            .get(`${apiURL}/api/category`)
            .then((result) => {
                setCategory(result.data.results);
            })
            .catch((err) => {
                console.log(err);
            });
    }, []);

    const columns = [
        {
            field: "id",
            headerName: "類別ID",
            width: 300,
        },
        {
            field: "name",
            headerName: "類別",
            width: 300,
            editable: true,
        },
    ];

    function checkEditCategory(id,value) {
        
        axios.defaults.withCredentials = true;
        axios
            .put(`${apiURL}/api/Category/${id}`, {
                value: value,
            })
            .then((response) => {
                console.log(response);
            })
            .catch((error) => {
                console.log(error.request);
            });
    }

    return (
        <>
            <div className="headerTitle">類別管理</div>
            <div className="pagecontent">
                <div style={{ display: "flex", height: "100%" }}>
                    <div style={{ flexGrow: 1 }}>
                        <DataGrid
                            rows={category}
                            columns={columns}
                            autoHeight={true}
                            onCellEditCommit={(data) => {
                                var message = window.confirm("確定要修改類別?");
                                if (message === true) {
                                    alert("OK");
                                    checkEditCategory(data.id,data.value);
                                } else {
                                    alert("取消更新");
                                    window.location.href=`/Category`
                                }
                            }}
                        />
                    </div>
                </div>
            </div>
        </>
    );
}
export default Category;
