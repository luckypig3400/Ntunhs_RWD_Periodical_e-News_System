import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import { Button } from "@mui/material";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { DataGrid } from "@mui/x-data-grid";
import Modal from "@mui/material/Modal";
import CarouselModalCreateModal from "./CarouselModalCreateModal";
import { getPostList } from "../../axios";

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
    const [postsArray, setPostsArray] = useState([]);
    const [array, setArray] = useState([1, 2, 3, 4, 5]);

    const testCarouseArray = {
        periodNumber: 219,
        Array: [1939, 1937, 1940, 1941, 1946],
    };
    useEffect(async () => {
        setPostsArray(await getPostList());
    }, []);

    function getperiodNumberPostList() {
        const getPost = postsArray.filter(
            (post) => post.periodNumber === props.onClickID.toString()
        );
        return getPost;
    }
    const periodNumberPost = getperiodNumberPostList();

    console.log(periodNumberPost);

    const columns = [
        {
            field: "carouselArray",
            headerName: "順序",
            width: "80",
            editable: true,
            type: "singleSelect",
            valueOptions: array,
            sortable: false,
            disableColumnMenu: false,
        },
        {
            field: "id",
            headerName: "文章ID",
            width: "100",
            disableColumnMenu: true,
        },
        {
            field: "categoryID",
            headerName: "分類ID",
            width: "100",
            sortable: false,
            disableColumnMenu: true,
        },
        {
            field: "subject",
            headerName: "標題",
            width: "400",
            sortable: false,
            disableColumnMenu: true,
        },
    ];

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
                        {/* <CarouselModalCreateModal periodNumber={props.onClickID}/> */}
                    </h3>
                    <DataGrid
                        rows={periodNumberPost}
                        columns={columns}
                        pageSize={5}
                        autoHeight={true}
                        initialState={{
                            sorting: {
                                sortModel: [{ field: "id", sort: "desc" }],
                            },
                        }}
                        disableSelectionOnClick
                    />
                </Box>
            </Modal>
        </div>
    );
}
