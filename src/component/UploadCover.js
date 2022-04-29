import React, { useState, useEffect } from "react";
import { Box, Button, Modal } from "@mui/material";
import DriveFolderUploadIcon from "@mui/icons-material/DriveFolderUpload";
import InsertPhotoIcon from "@mui/icons-material/InsertPhoto";
import { styled } from "@mui/material/styles";

import { coverUpload } from "../axios/onUpload";
const config = require("../config/default.json");
const imageURL = config.imageURL;

const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    borderRadius: "10px",
    boxShadow: 24,
    p: 4,
};

const UploadCover = (props) => {
    const Input = styled("input")({
        display: "none",
    });

    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const _onUpload = async (fd, resolve, type) => {
        const response = await coverUpload(fd);
        resolve(
            `${imageURL}/${response}`,
            props.setCover(response),
            props.setCoverLink(`${imageURL}/image/${response}`)
        );
    };
    return (
        <>
            {props.cover ? (
                <>
                    <Button
                        variant="contained"
                        component="span"
                        aria-label="upload picture"
                        endIcon={<InsertPhotoIcon />}
                        sx={{ margin: "10px" }}
                        onClick={(e) => {
                            window.open(props.coverLink, "_blank");
                        }}
                    >
                        瀏覽封面"{props.cover}"
                    </Button>
                    <Button
                        variant="contained"
                        component="span"
                        aria-label="upload picture"
                        color="error"
                        sx={{ margin: "10px" }}
                        onClick={() => {
                            props.setCover("");
                            props.setCoverLink("");
                        }}
                    >
                        刪除封面
                    </Button>
                </>
            ) : (
                <>
                    <Button onClick={handleOpen}>Open Modal</Button>
                    <Modal
                        open={open}
                        onClose={handleClose}
                        aria-labelledby="modal-modal-title"
                        aria-describedby="modal-modal-description"
                    >
                        <Box sx={style}>
                            <label htmlFor="icon-button-file">
                                <Input
                                    accept="image/jpeg, image/png"
                                    id="icon-button-file"
                                    type="file"
                                    onChange={(file) => {
                                        return new Promise(
                                            (resolve, reject) => {
                                                const fd = new FormData();
                                                fd.append(
                                                    "image",
                                                    file.target.files[0]
                                                );
                                                _onUpload(fd, resolve, "image");
                                            }
                                        );
                                    }}
                                />
                                <Button
                                    variant="outlined"
                                    component="span"
                                    aria-label="upload picture"
                                    endIcon={<DriveFolderUploadIcon />}
                                    sx={{ margin: "10px" }}
                                >
                                    上傳封面
                                </Button>
                            </label>
                        </Box>
                    </Modal>
                </>
            )}
        </>
    );
};

export default UploadCover;
