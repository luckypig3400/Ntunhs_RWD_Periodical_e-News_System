import * as React from "react";
import { DataGrid } from "@mui/x-data-grid";
import { Button } from "@mui/material";

const columns = [
    { field: "id", headerName: "期數", width: 100 },
    {
        field: "sum",
        headerName: "數量",
        width: 100,
    },
    {
        field: "CarouselArray",
        headerName: "輪播編號",
        width: 500,
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
                    thisRow[f] = params.getValue(params.id, f);
                });
                deleteCategory(thisRow.id);
                window.location.reload();
                return alert(`成功刪除：${thisRow.id}-${thisRow.name}`);
            };
            return (
                <Button variant="contained" color="info" onClick={onClick}>
                    編輯
                </Button>
            );
        },
    },
];

const rows = [{ id: 1, sum: 5, CarouselArray: "" }];

const CarouselDataGrid = () => {
    const [pageSize, setPageSize] = React.useState(10);
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
        </div>
    );
};
export default CarouselDataGrid;
