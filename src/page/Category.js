import React, { useState, useEffect } from "react";
import { DataGrid } from "@mui/x-data-grid";
import {
    Button,
    TextField,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
} from "@mui/material";
import axios from "axios";
import { getCategory } from "../axios";
const config = require("../config/default.json");

const apiURL = config.apiURL;

function Category() {
    const [category, setCategory] = useState([]);
    const [buttonRender, setButtonRender] = useState(true);
    const [createRender, setCreateRender] = useState(false);
    const [deleteRender, setDeleteRender] = useState(false);
    const [createCategoryID, setCreateCategoryID] = useState("");
    const [createCategoryName, setCreateCategoryName] = useState("");
    const [deleteCategoryID, setDeleteCategoryID] = useState("");

    useEffect(async () => {
        setCategory(await getCategory());
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

    function checkEditCategory(id, value) {
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

    const ButtonDiv = () => {
        return (
            <>
                <Button
                    variant="contained"
                    sx={{
                        marginTop: "20px",
                        height: "55px",
                        width: "100px",
                        marginRight: "20px",
                    }}
                    onClick={() => {
                        setButtonRender(false);
                        setCreateRender(true);
                    }}
                >
                    新增類別
                </Button>
                <Button
                    variant="outlined"
                    color="error"
                    sx={{ marginTop: "20px", height: "55px", width: "100px" }}
                    onClick={() => {
                        setButtonRender(false);
                        setDeleteRender(true);
                    }}
                >
                    刪除類別
                </Button>
            </>
        );
    };

    const CreateCategoryDiv = () => {
        return (
            <div style={{ marginTop: "20px" }}>
                <TextField
                    id="outlined-basic"
                    label="類別代號:C00"
                    variant="outlined"
                    value={createCategoryID}
                    onChange={(event) => {
                        setCreateCategoryID(event.target.value);
                    }}
                    sx={{ marginRight: "20px" }}
                />
                <TextField
                    id="outlined-basic"
                    label="類別名稱"
                    variant="outlined"
                    value={createCategoryName}
                    onChange={(event) => {
                        setCreateCategoryName(event.target.value);
                    }}
                    sx={{ marginRight: "20px" }}
                />
                <Button
                    variant="contained"
                    sx={{ height: "55px", width: "100px", marginRight: "20px" }}
                    onClick={() => {
                        checkEditCategory(createCategoryID, createCategoryName);
                        setButtonRender(true);
                        setCreateRender(false);
                        alert("新增成功");
                        window.location.reload();
                    }}
                >
                    新增
                </Button>
                <Button
                    variant="outlined"
                    color="error"
                    sx={{ height: "55px", width: "100px" }}
                    onClick={() => {
                        setButtonRender(true);
                        setCreateRender(false);
                    }}
                >
                    取消
                </Button>
            </div>
        );
    };

    const DeleteCategoryDiv = () => {
        return (
            <>
                <FormControl
                    required
                    variant="standard"
                    sx={{
                        minWidth: 200,
                        marginRight: "20px",
                        marginTop: "20px",
                    }}
                >
                    <InputLabel id="postsperiodNumber">分類</InputLabel>
                    <Select
                        id="category"
                        label="category"
                        onChange={(e) => setDeleteCategoryID(e.target.value)}
                    >
                        {category.map((name) => (
                            <MenuItem key={name.id} value={name.id}>
                                {name.name}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>
                <Button
                    variant="outlined"
                    color="error"
                    sx={{ marginTop: "20px", height: "55px", width: "100px" }}
                    onClick={() => {
                        setButtonRender(true);
                        setDeleteRender(false);
                        DeleteCategory();
                        alert(`成功刪除${deleteCategoryID}`);
                        window.location.reload();
                    }}
                >
                    刪除類別
                </Button>
            </>
        );
    };

    const DeleteCategory = () => {
        axios.defaults.withCredentials = true;
        axios
            .delete(`${apiURL}/api/Category/${deleteCategoryID}`, {
                categoryID: deleteCategoryID,
            })
            .then((response) => {
                console.log(response);
            })
            .catch((error) => {
                console.log(error.request);
            });
    };

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
                                    checkEditCategory(data.id, data.value);
                                } else {
                                    alert("取消更新");
                                    window.location.href = `./${config.hashRouter}/Category`;
                                }
                            }}
                        />
                    </div>
                </div>
                {buttonRender ? ButtonDiv() : ""}
                {createRender ? CreateCategoryDiv() : ""}
                {deleteRender ? DeleteCategoryDiv() : ""}
            </div>
        </>
    );
}
export default Category;
