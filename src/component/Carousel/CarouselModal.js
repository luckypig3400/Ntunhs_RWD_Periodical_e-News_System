import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import { DataGrid } from "@mui/x-data-grid";
import Modal from "@mui/material/Modal";
import CarouselModalCreateModal from "./CarouselModalCreateModal";

const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "60%",
    height: "80%",
    bgcolor: "background.paper",
    borderRadius: "10px",
    boxShadow: 24,
    pt: 2,
    px: 4,
    pb: 3,
};

export default function CarouselModal(props) {
    const handleClose = () => props.setModalShow(false);

    const columns = [
        {
            field: "postID",
            headerName: "文章ID",
            width: "100",
            sortable: false,
            disableColumnMenu: true,
        },
        {
            field: "title",
            headerName: "標題",
            width: "400",
            sortable: false,
            disableColumnMenu: true,
        },
        {
            field: "edit",
            headerName: "排序",
            width: "100",
            sortable: false,
            disableColumnMenu: true,
        },
        {
            field: "delete",
            headerName: "刪除",
            width: "100",
            sortable: false,
            disableColumnMenu: true,
        },
    ];

    const rows = [{ id: 1, postID: 5, title: "測試" }];

    return (
        <div>
            <Modal
                open={props.modalShow}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <h3 style={{ paddingBottom: "10px" }}>
                        期數：{props.onClickID}
                        <CarouselModalCreateModal periodNumber={props.onClickID}/>
                    </h3>
                    <DataGrid
                        rows={rows}
                        columns={columns}
                        pageSize={10}
                        autoHeight={true}
                        disableSelectionOnClick
                    />
                </Box>
            </Modal>
        </div>
    );
}
