import React, { useState, useEffect } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { Button } from "@mui/material";
import CarouselModal from "./CarouselModal";
import { getCarousel } from "../../axios";
import { getPostList } from "../../axios";
import { putCarousel,createCarousel } from "../../axios/putAxios";

const CarouselDataGrid = () => {
    CreateCarousel();
    const [pageSize, setPageSize] = useState(10);
    const [modalShow, setModalShow] = useState(false);
    const [onClickID, setOnClickID] = useState("");
    const [periodList, setPeriodList] = useState([]);
    const [postIDArray, setPostIDArray] = useState([""]);

    useEffect(async () => {
        setPeriodList(await getCarousel());
    }, []);

    useEffect(async () => {
        //location.reload()
    }, [postIDArray]);

    const columns = [
        { field: "id", headerName: "期數", width: 100 },
        {
            field: "sum",
            headerName: "數量",
            width: 100,
            sortable: false,
            disableColumnMenu: true,
        },
        {
            field: "postIDArray",
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
                    setOnClickID(thisRow.id);

                    periodList.map((period) => {
                        if (thisRow.id === period.id) {
                            setPostIDArray(period.postIDArray);
                        }
                    });

                    return thisRow.id;
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

    const rows = periodList;

    return (
        <div style={{ width: "100%" }}>
            <DataGrid
                rows={rows}
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
            <CarouselModal
                onClickID={onClickID}
                setModalShow={setModalShow}
                modalShow={modalShow}
                postIDArray={postIDArray}
                setPostsIDArray={setPostIDArray}
            />
        </div>
    );
};

export const CreateCarousel = () => {
    const [postList, setPostList] = useState([]);
    const [removeDuplicates, setremovDuplicates] = useState([]);
    const [totalCarousel, setTotalCarousel] = useState([]);
    const [carouselList, setCarouselList] = useState([]);

    useEffect(async () => {
        setPostList(await getPostList());
        setCarouselList(await getCarousel());
    }, []);

    useEffect(() => {
        const set = new Set();
        //移除重複值
        const result = postList.filter((item) =>
            !set.has(item.periodNumber) ? set.add(item.periodNumber) : false
        );
        setremovDuplicates(result);
    }, [postList]);

    useEffect(() => {
        if (removeDuplicates[0] !== undefined) {
            const totalArray = [];
            removeDuplicates.map((item) => {
                totalArray.push(item.periodNumber);
            });
            setTotalCarousel(totalArray);
        }
    }, [removeDuplicates]);

    useEffect(() => {
        if (totalCarousel[0] !== undefined) {
            let arr1 = [];
            totalCarousel.map((item) => {
                arr1.push(parseInt(item));
            });

            var arr2 = [];
            carouselList.map((item) => {
                arr2.push(item.id);
            });

            var res = arr1.filter((item) => !arr2.includes(item));
            if (res.length > 0) {
                res.map((item) => {
                    createCarousel(item);
                });
            }
        }
    }, [totalCarousel]);
};

export default CarouselDataGrid;
