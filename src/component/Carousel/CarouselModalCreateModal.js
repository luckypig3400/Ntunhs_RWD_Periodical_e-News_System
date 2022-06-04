import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Button from "@mui/material/Button";

import { getPostList } from "../../axios";

const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "60%",
    height: "70%",
    bgcolor: "background.paper",
    borderRadius: "10px",
    boxShadow: 24,
    pt: 2,
    px: 4,
    pb: 3,
};

const CarouselModalCreateModal = (props) => {
    const [postsArray, setPostsArray] = useState([]);
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };
    useEffect(async () => {
        setPostsArray(await getPostList());
    }, []);

    //透過父層傳遞的值，抓取資料庫符合相對應期數的資料
    function getperiodNumberPostList() {
        const getPost = postsArray.filter(
            (post) => post.periodNumber === props.periodNumber.toString()
        );
        return getPost;
    }
    console.log(getperiodNumberPostList())

    return (
        <React.Fragment>
            <Button
                style={{ marginLeft: "10px" }}
                variant="contained"
                color="success"
                onClick={handleOpen}
            >
                新增文章至輪播
            </Button>

            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="child-modal-title"
                aria-describedby="child-modal-description"
            >
                <Box sx={{ ...style, width: 200 }}>
                    <h2 id="child-modal-title">Text in a child modal</h2>
                    <p id="child-modal-description">
                        Lorem ipsum, dolor sit amet consectetur adipisicing
                        elit.
                    </p>
                    <Button onClick={handleClose}>關閉視窗</Button>
                </Box>
            </Modal>
        </React.Fragment>
    );
};

export default CarouselModalCreateModal;
