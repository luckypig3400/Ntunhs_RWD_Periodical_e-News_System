import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import { Button } from "@mui/material";
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import Modal from "@mui/material/Modal";
import { getPostList } from "../../axios";
import Grid from "@mui/material/Grid";

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

    function renderRow(props) {
        const { index, style } = props;
      
        return (
          <ListItem style={style} key={index} component="div" disablePadding>
            <ListItemButton>
              <ListItemText primary={`Item ${index + 1}`} />
            </ListItemButton>
          </ListItem>
        );
      }

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
                    </h3>
                    <Grid container spacing={2}>
                        <Grid item xs={6}>
                            a
                        </Grid>
                        <Grid item xs={6}>
                            
                        </Grid>
                    </Grid>
                </Box>
            </Modal>
        </div>
    );
}
