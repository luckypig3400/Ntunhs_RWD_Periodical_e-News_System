import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import { DataGrid } from "@mui/x-data-grid";
import Modal from "@mui/material/Modal";
import { getPostList } from "../../axios";
import { Button } from "@mui/material";
import SouthIcon from "@mui/icons-material/South";
import NorthIcon from "@mui/icons-material/North";
import IconButton from "@mui/material/IconButton";

const styleModal = {
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
    const pageSize = 10;
    const handleClose = () => props.setModalShow(false);
    const [postsArray, setPostsArray] = useState([]);
    const [postIDArray, setPostsIDArray] = useState([1941, 1939, 1945]);
    useEffect(async () => {
        setPostsArray(await getPostList());
    }, []);
    // useEffect(() => {
    //     console.log(postIDArray);
    // }, [postIDArray]);

    function getperiodNumberPostList() {
        const getPost = postsArray.filter(
            (post) => post.periodNumber === props.onClickID.toString()
        );
        getPost.map((post) => {
            const Arrayaddress = postIDArray.indexOf(post.id) + 1;
            if (Arrayaddress === 0) {
                post.sort = 6;
            } else {
                post.sort = Arrayaddress;
            }
            return post;
        });

        return getPost;
    }

    //限制Array的長度
    if (postIDArray[5]) {
        postIDArray.splice(5);
    }

    const periodNumberPost = getperiodNumberPostList();
    const columns = [
        {
            field: "sort",
            headerName: "排序",
            width: 100,
            disableColumnMenu: true,
            renderCell: (params) => {
                if (params.value === 6) {
                    return "X";
                }
            },
        },
        {
            field: "Edit",
            headerName: "編輯",
            renderCell: (params) => {
                //向下排序
                const onClickNorth = () => {
                    const api = params.api;
                    const fields = api
                        .getAllColumns()
                        .map((c) => c.field)
                        .filter((c) => c !== "__check__" && !!c);
                    const thisRow = {};

                    fields.forEach((f) => {
                        thisRow[f] = params.getValue(params.row.id, f);
                    });
                    //判斷排序是否已經滿了
                    if (postIDArray.length < 5) {
                        if (params.row.sort < 5) {
                            //第一筆不能再往上換
                            if (params.row.sort === 1) {
                                console.log("sort is 1~!");
                            } else {
                                //排序法sort為array.index+1
                                console.log("have sort~!");
                                const newPostIDArray = postIDArray;
                                const temp =
                                    newPostIDArray[params.row.sort - 2];
                                newPostIDArray[params.row.sort - 2] =
                                    params.row.id;
                                newPostIDArray[params.row.sort - 1] = temp;
                                setPostsIDArray([...newPostIDArray]);
                            }
                        } else {
                            setPostsIDArray([...postIDArray, params.row.id]);
                        }
                    } else if (postIDArray.length > 4) {
                        if (params.row.sort === 1) {
                            //第一筆不能再往上換
                            console.log("sort is 1~!");
                        } else {
                            //排序法sort為array.index+1
                            const newPostIDArray = postIDArray;
                            const temp = newPostIDArray[params.row.sort - 2];
                            newPostIDArray[params.row.sort - 2] = params.row.id;
                            newPostIDArray[params.row.sort - 1] = temp;
                            setPostsIDArray([...newPostIDArray]);
                        }
                    }

                    return thisRow.periodNumber;
                };

                //向下排序
                const onClickSouth = () => {
                    const api = params.api;
                    const fields = api
                        .getAllColumns()
                        .map((c) => c.field)
                        .filter((c) => c !== "__check__" && !!c);
                    const thisRow = {};

                    fields.forEach((f) => {
                        thisRow[f] = params.getValue(params.row.id, f);
                    });

                    //判斷下一個是否為空
                    if (postIDArray[params.row.sort]) {
                        //排序法sort為array.index+1
                        const newPostIDArray = postIDArray;
                        const temp = newPostIDArray[params.row.sort];
                        newPostIDArray[params.row.sort] =
                            newPostIDArray[params.row.sort - 1];
                        newPostIDArray[params.row.sort - 1] = temp;
                        setPostsIDArray([...newPostIDArray]);
                    } else {
                        console.log("this sort is end~!");
                    }

                    return thisRow.periodNumber;
                };

                return (
                    <>
                        <IconButton
                            aria-label="delete"
                            size="large"
                            onClick={onClickNorth}
                        >
                            <NorthIcon fontSize="small" />
                        </IconButton>
                        <IconButton
                            aria-label="delete"
                            size="large"
                            onClick={onClickSouth}
                        >
                            <SouthIcon fontSize="small" />
                        </IconButton>
                    </>
                );
            },
            sortable: false,
            disableColumnMenu: true,
        },
        {
            field: "categoryID",
            headerName: "類別",
            width: 100,
            sortable: false,
            disableColumnMenu: true,
        },
        {
            field: "id",
            headerName: "ID",
            width: 100,
            sortable: false,
            disableColumnMenu: true,
        },
        {
            field: "subject",
            headerName: "標題",
            width: 500,
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
                <Box sx={styleModal}>
                    <h3 style={{ paddingBottom: "10px" }}>
                        期數：{props.onClickID}
                    </h3>
                    <DataGrid
                        rows={periodNumberPost}
                        columns={columns}
                        pageSize={pageSize}
                        rowsPerPageOptions={[5, 10, 20]}
                        autoHeight={true}
                        initialState={{
                            sorting: {
                                sortModel: [{ field: "sort", sort: "ASC" }],
                            },
                        }}
                    />
                    <Box
                        sx={{
                            width: "100%",
                            marginTop: "10px",
                        }}
                        display="flex"
                        justifyContent="right"
                    >
                        <Button
                            variant="contained"
                            color="success"
                            onClick={() => {
                                sentCarouseChange(props.onClickID, postIDArray);
                                handleClose();
                            }}
                        >
                            儲存
                        </Button>

                        <Button
                            variant="outlined"
                            color="error"
                            sx={{ marginLeft: "10px" }}
                            onClick={() => window.location.reload()}
                        >
                            取消
                        </Button>
                    </Box>
                </Box>
            </Modal>
        </div>
    );
}

const sentCarouseChange = (id, postIDArray) => {
    console.log(id, postIDArray);
};
