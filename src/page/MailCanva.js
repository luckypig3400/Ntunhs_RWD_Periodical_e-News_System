import React, { useState, useEffect } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { IconButton } from "@mui/material";

import { getPostList } from "../axios";
import LocalPrintshopIcon from "@mui/icons-material/LocalPrintshop";

const MailCanva = () => {
    const [postList, setPostList] = useState([]);
    const [totalPeriodNumber, setTotalPeriodNumber] = useState([]);
    const [pageSize, setPageSize] = useState(10);
    useEffect(async () => {
        setPostList(await getPostList());
    }, []);

    useEffect(() => {
        //取得所有期別
        const set = new Set();
        const result = postList.filter((item) => {
            return !set.has(item.periodNumber)
                ? set.add(item.periodNumber)
                : false;
        });

        //將新期別存入資料庫
        const NewArray = [];
        result.map((item) => {
            var inPeriodNumberPost = [];
            //將inPeriodNumberPost與數量加入inPeriodNumberPost陣列
            postList.map((post) => {
                if (post.periodNumber === item.periodNumber) {
                    inPeriodNumberPost.push(item.id);
                }
            });

            const json = {
                id: item.periodNumber,
                periodNumber: item.periodNumber,
                inPeriodNumberPost: inPeriodNumberPost.toString(),
                postSum: inPeriodNumberPost.length,
            };
            NewArray.push(json);
        });
        setTotalPeriodNumber(NewArray);
    }, [postList]);

    const columns = [
        {
            field: "periodNumber",
            headerName: "期別",
            width: 150,
        },
        {
            field: "postSum",
            headerName: "期刊數量",
            width: 150,
            sortable: false,
            disableColumnMenu: true,
        },
        {
            field: "printPoster",
            headerName: "產出海報",
            width: 100,
            sortable: false,
            disableColumnMenu: true,
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
                    var message = window.confirm("確定要刪除類別?");
                    if (message === true) {
                        deleteCategory(thisRow.id);
                        alert("已刪除");
                        handleClose();
                    } else {
                        alert("取消刪除");
                    }
                    window.location.reload();
                };
                return (
                    <IconButton aria-label="delete" color="primary">
                        <LocalPrintshopIcon />
                    </IconButton>
                );
            },
        },
        {
            field: "inPeriodNumberPost",
            headerName: "期刊編號",
            width: 500,
            sortable: false,
            disableColumnMenu: true,
        },
        {},
    ];

    return (
        <>
            <div className="headerTitle">海報管理</div>
            <div className="pagecontent">
                <DataGrid
                    rows={totalPeriodNumber}
                    columns={columns}
                    pageSize={pageSize}
                    onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
                    rowsPerPageOptions={[5, 10, 20]}
                    initialState={{
                        sorting: {
                            sortModel: [{ field: "id", sort: "desc" }],
                        },
                    }}
                    autoHeight={true}
                    disableSelectionOnClick
                />
            </div>
        </>
    );
};
export default MailCanva;
