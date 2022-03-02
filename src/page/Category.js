import React, { useState, useEffect } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { Button } from "@mui/material";
import axios from "axios";
const config = require("../config/default.json");

const apiURL = config.apiURL;

function Category() {
    const [category, setCategory] = useState([]);
    const [editCategory, setEditCategory] = useState([]);
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

    function checkEditCategory() {}
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
                                if (message == true) {
                                    alert("OK");
                                    setEditCategory({
                                      id: data.id,
                                      name: data.value,
                                  })
                                } else {
                                    alert("Not");
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
