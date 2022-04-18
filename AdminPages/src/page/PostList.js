import React, { useState, useEffect } from "react";
import { DataGrid } from "@mui/x-data-grid";
import axios from "axios";
import { getPostList } from "../axios";

const PostList = () => {
    const [posts, setPosts] = useState([]);
    const [pageSize, setPageSize] = React.useState(10);
    useEffect(async () => {
        setPosts(await getPostList());
    }, []);

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
                            onPageSizeChange={(newPageSize) =>
                                setPageSize(newPageSize)
                            }
                            rowsPerPageOptions={[5, 10, 20]}
                            autoHeight={true}
                            onRowClick={(rowData) => {
                                window.location.href = `/EditPost?PostID=${rowData.id}`;
                            }}
                        />
                    </div>
                </div>
            </div>
        </>
    );
};

export default PostList;
