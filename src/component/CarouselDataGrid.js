import * as React from "react";
import { DataGrid } from "@mui/x-data-grid";

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
        width: 100,
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
