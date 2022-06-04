import React, { useState, useEffect } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { Button } from "@mui/material";
import CarouselModal from "./CarouselModal";

const CarouselDataGrid = () => {
    const [pageSize, setPageSize] = useState(10);
    const [modalShow, setModalShow] = useState(false);
    const [onClickID, setOnClickID] = useState("");

    const columns = [
        { field: "periodNumber", headerName: "期數", width: 100 },
        {
            field: "sum",
            headerName: "數量",
            width: 100,
            sortable: false,
            disableColumnMenu: true,
        },
        {
            field: "CarouselArray",
            headerName: "輪播編號",
            width: 500,
            sortable: false,
            disableColumnMenu: true,
        },
        {
            field: "Edit",
            headerName: "編輯",
            renderCell: (params) => {
                const onClick = () => {
                    const api = params.api;
                    const fields = api
                        .getAllColumns()
                        .map((c) => c.field)
                        .filter((c) => c !== "__check__" && !!c);
                    const thisRow = {};

                    fields.forEach((f) => {
                        thisRow[f] = params.getValue(params.row.id, f);
                    });
                    setModalShow(true);
                    setOnClickID(thisRow.periodNumber);
                    return thisRow.periodNumber;
                };
                return (
                    <Button variant="contained" color="info" onClick={onClick}>
                        編輯
                    </Button>
                );
            },
            sortable: false,
            disableColumnMenu: true,
        },
    ];

    const rows = [{ id: 1, periodNumber: 219, sum: 5, CarouselArray: "" },{ id: 2, periodNumber: 218, sum: 5, CarouselArray: "" }];
    return (
        <div style={{ width: "100%" }}>
            <DataGrid
                rows={rows}
                columns={columns}
                pageSize={pageSize}
                onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
                rowsPerPageOptions={[5, 10, 20]}
                autoHeight={true}
                disableSelectionOnClick
            />
            <CarouselModal
                onClickID={onClickID}
                setModalShow={setModalShow}
                modalShow={modalShow}
            />
        </div>
    );
};
export default CarouselDataGrid;
