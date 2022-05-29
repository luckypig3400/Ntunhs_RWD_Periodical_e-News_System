import React, { useState, useEffect } from "react";
import { DataGrid } from "@mui/x-data-grid";
import {
    Button,
    TextField,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    Modal,
    Box,
} from "@mui/material";
import { getCategory } from "../axios";
import { deleteCategory, putCategoryName } from "../axios/putAxios";
import CreateCategory from "./CreateCategory";

function Category() {
    const [category, setCategory] = useState([]);
    const [open, setOpen] = React.useState(false);

    useEffect(async () => {
        setCategory(await getCategory());
    }, []);

    const handleOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
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
        {
            field: "action",
            headerName: "操作",
            sortable: false,
            renderCell: (params) => {
                const onClick = () => {
                    const api = params.api;
                    const fields = api
                        .getAllColumns()
                        .map((c) => c.field)
                        .filter((c) => c !== "__check__" && !!c);
                    const thisRow = {};

                    fields.forEach((f) => {
                        thisRow[f] = params.getValue(params.id, f);
                    });
                    deleteCategory(thisRow.id);
                    window.location.reload();
                    return alert(`成功刪除：${thisRow.id}-${thisRow.name}`);
                };
                return (
                    <Button variant="outlined" color="error" onClick={onClick}>
                        刪除
                    </Button>
                );
            },
        },
    ];

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
                                    putCategoryName(data.id, data.value);
                                    handleClose();
                                } else {
                                    alert("取消更新");
                                    window.location.reload();
                                }
                            }}
                        />
                    </div>
                </div>

                <Modal
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="parent-modal-title"
                    aria-describedby="parent-modal-description"
                >
                    <Box sx={{ ...style, width: 400 }}>
                        <CreateCategory />
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
                <Button
                    variant="contained"
                    sx={{
                        marginTop: "20px",
                        height: "55px",
                        width: "100px",
                        marginRight: "20px",
                    }}
                    onClick={() => {
                        handleOpen();
                    }}
                >
                    新增類別
                </Button>
            </div>
        </>
    );
}
export default Category;
