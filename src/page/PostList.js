import React, { useState, useEffect } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { DataGridPro, GridActionsCellItem } from "@mui/x-data-grid-pro";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import axios from "axios";
const config = require("../config/default.json");

const apiURL = config.apiURL;

const PostList = () => {
    const [posts, setPosts] = useState([]);
    const [category, setCategory] = useState([]);
    const [pageSize, setPageSize] = React.useState(10);
    useEffect(() => {
        axios
            .all([
                axios.get(`${apiURL}/api/post`),
                axios.get(`${apiURL}/api/category`),
            ])
            .then(
                //關聯post.categoryID
                axios.spread((data1, data2) => {
                    const postResult = data1.data.results;
                    const categoryResult = data2.data.results;
                    console.log(postResult);
                    postResult.forEach((item) => {
                        item.categoryID = categoryResult.find(
                            (category) => item.categoryID === category.id
                        ).name;
                    });
                    postResult.forEach((item) => {
                        item.posttime = `${item.noYear}-${item.noMonth}`;
                        console.log(item);
                    });
                    setPosts(postResult);
                    setCategory(categoryResult);
                })
            )
            .catch((err) => {
                console.log(err);
            });
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
