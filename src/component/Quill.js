import React, { useState } from "react";
import { Quill } from "react-quill";
import ImageResize from "quill-image-resize-module-react";
import axios from "axios";
import { Button, Input } from "@mui/material";
import { styled } from "@mui/material/styles";
//import { ImageHandler, VideoHandler, AttachmentHandler } from "quill-upload";
const config = require("../config/default.json");
const apiURL = config.apiURL;

Quill.register("modules/imageResize", ImageResize);
// Quill.register("modules/imageHandler", ImageHandler);
// Quill.register("modules/videoHandler", VideoHandler);
// Quill.register("modules/attachmentHandler", AttachmentHandler);

var Image = Quill.import("formats/image");
Image.className = "custom-class-to-image";
Quill.register(Image, true);

var myToolbar = [
    [{ font: [] }],
    [{ header: [1, 2, 3, 4, 5, 6, false] }],
    ["bold", "italic", "underline", "strike"],
    [{ color: [] }, { background: [] }],
    [{ script: "sub" }, { script: "super" }],
    ["blockquote", "code-block"],
    [{ list: "ordered" }, { list: "bullet" }],
    [{ indent: "-1" }, { indent: "+1" }, { align: [] }],
    ["link", "image", "video"],
    ["clean"],
];

export const modules = {
    toolbar: {
        container: myToolbar,
        handlers: {
            image: imageHandler,
            video: videoHandler,
        },
    },
    imageResize: {
        parchment: Quill.import("parchment"),
        modules: ["Resize", "DisplaySize", "Toolbar"],
        handleStyles: {
            backgroundColor: "black",
            border: "none",
        },
        displayStyles: {
            backgroundColor: "black",
            border: "none",
        },
        toolbarStyles: {
            backgroundColor: "black",
            border: "none",
        },
    },
    // videoHandler: {
    //     upload: (file) => {
    //         return new Promise((resolve) => {
    //             const fd = new FormData();
    //             fd.append("video", file);
    //             _onUpload(fd, resolve, "video");
    //         });
    //     },
    // },
    // imageHandler: {
    //     upload: (file) => {
    //         return new Promise((resolve) => {
    //             const fd = new FormData();
    //             fd.append("image", file);
    //             _onUpload(fd, resolve, "image");
    //         });
    //     },
    // },
};

export const formats = [
    "header",
    "bold",
    "italic",
    "underline",
    "strike",
    "blockquote",
    "list",
    "bullet",
    "indent",
    "link",
    "image",
    "imageBlot",
];

function imageHandler() {
    var range = this.quill.getSelection();
    var value = prompt("please copy paste the image url here.");
    if (value) {
        this.quill.insertEmbed(range.index, "image", value, Quill.sources.USER);
    }
}

function videoHandler() {
    var range = this.quill.getSelection();
    var value = prompt("please copy paste the video url here.");
    if (value) {
        this.quill.insertEmbed(range.index, "video", value, Quill.sources.USER);
    }
}

const UploadButton = () => {
    const Input = styled("input")({
        display: "none",
    });
    return (
        <>
            <label htmlFor="tempImage">
                <Input
                    accept="image/jpeg, image/png"
                    id="tempImage"
                    type="file"
                    onChange={(file) => {
                        return new Promise((resolve, reject) => {
                            const fd = new FormData();
                            fd.append("image", file.target.files[0]);
                            _onUpload(fd, resolve, "image");
                        });
                    }}
                />
                <Button
                    variant="outlined"
                    component="span"
                    aria-label="upload picture"
                >
                    上傳圖片
                </Button>
            </label>
            <label htmlFor="tempVideo">
                <Input
                    accept="video/*"
                    id="tempVideo"
                    type="file"
                    onChange={(file) => {
                        return new Promise((resolve, reject) => {
                            const fd = new FormData();
                            fd.append("image", file.target.files[0]);
                            _onUpload(fd, resolve, "image");
                        });
                    }}
                />
                <Button
                    variant="outlined"
                    component="span"
                    aria-label="upload picture"
                >
                    上傳影片
                </Button>
            </label>
        </>
    );
};

const _onUpload = async (fd, resolve, type) => {
    axios.defaults.withCredentials = true;
    const result = await axios({
        method: "post",
        url: `${apiURL}/api/upload/${type}`,
        data: fd,
    })
        .then((response) => {
            return response.data.fileName;
        })
        .catch((e) => {
            console.log(e);
        });
    console.log(result);
    await setTimeout(() => {
        console.log(`http://localhost:3090/${type}/${result}`);
        navigator.clipboard.writeText(
            `http://localhost:3090/${type}/${result}`
        );
        resolve(`http://localhost:3090/${type}/${result}`);
    }, 1000);
};

export default UploadButton;
