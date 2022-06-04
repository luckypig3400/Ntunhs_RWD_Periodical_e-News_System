import React, { useState, useEffect } from "react";
import {
    DataGrid,
    gridPageCountSelector,
    gridPageSelector,
    useGridApiContext,
    useGridSelector,
} from "@mui/x-data-grid";
import { Pagination } from "@mui/material";
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { getPostList } from "../axios";
const config = require("../config/default.json");

const PostList = () => {
    const [posts, setPosts] = useState([]);
    const [pageSize, setPageSize] = React.useState(10);
    useEffect(async () => {
        setPosts(await getPostList());
    }, []);

    function CustomPagination() {
        const apiRef = useGridApiContext();
        const page = useGridSelector(apiRef, gridPageSelector);
        const pageCount = useGridSelector(apiRef, gridPageCountSelector);


        const handleChange = (event) => {
            setPageSize(event.target.value);
        };
        return (
            <>
                <Pagination
                    color="primary"
                    count={pageCount}
                    page={page + 1}
                    onChange={(event, value) =>
                        apiRef.current.setPage(value - 1)
                    }
                />
                <FormControl variant="standard">
                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={pageSize}
                        label="Size"
                        onChange={handleChange}
                    >
                        <MenuItem value={10}>10</MenuItem>
                        <MenuItem value={20}>20</MenuItem>
                        <MenuItem value={30}>30</MenuItem>
                        <MenuItem value={40}>40</MenuItem>
                        <MenuItem value={50}>50</MenuItem>
                    </Select>
                </FormControl>
            </>
        );
    }

    const columns = [
        { field: "periodNumber", headerName: "期別", width: 90 },
        {
            field: "subject",
            headerName: "標題",
            width: 400,
        },
        {
            field: "categoryID",
            headerName: "類別",
            width: 150,
        },
        {
            field: "posttime",
            headerName: "更新日期",
            type: "datatime",
            width: 200,
        },
    ];

    return (
        <>
            <div className="headerTitle">期刊管理</div>
            <div className="pagecontent">
                <div style={{ display: "flex", height: "100%" }}>
                    <div style={{ flexGrow: 1 }}>
                        <DataGrid
                            rows={posts}
                            columns={columns}
                            pageSize={pageSize}
                            autoHeight={true}
                            onRowClick={(rowData) => {
                                window.location.href = `./${config.hashRouter}/EditPost?PostID=${rowData.id}`;
                            }}
                            //Pagination={CustomPagination}
                            components={{
                                Pagination: CustomPagination,
                            }}
                        />
                    </div>
                </div>
            </div>
        </>
    );
};

export default PostList;
