import React, { useState, useEffect,useCallback } from "react";
import { Box, Button, Modal } from "@mui/material";
import DriveFolderUploadIcon from "@mui/icons-material/DriveFolderUpload";
import InsertPhotoIcon from "@mui/icons-material/InsertPhoto";
import { styled } from "@mui/material/styles";
import Cropper from "react-easy-crop";

import { coverUpload } from "../axios/onUpload";
const config = require("../config/default.json");
const imageURL = config.imageURL;

const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "80%",
    height: "80%",
    bgcolor: "background.paper",
    borderRadius: "10px",
    boxShadow: 24,
    p: 4,
};

const UploadCover = (props) => {
    const [crop, setCrop] = useState({ x: 0, y: 0 });
    const [zoom, setZoom] = useState(1);
    const onCropComplete = useCallback((croppedArea, croppedAreaPixels) => {
        console.log(croppedArea, croppedAreaPixels);
    }, []);

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
                        變更封面
                    </Button>
                </>
            ) : (
                <>
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
                </>
            )}
        </>
    );
};

export default UploadCover;
