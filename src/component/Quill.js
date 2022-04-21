import React from "react";
import { Quill } from "react-quill";
import ImageResize from "quill-image-resize-module-react";
import axios from "axios";
import { ImageHandler, VideoHandler, AttachmentHandler } from "quill-upload";
const config = require("../config/default.json");
const apiURL = config.apiURL;

Quill.register("modules/imageResize", ImageResize);
Quill.register("modules/imageHandler", ImageHandler);
Quill.register("modules/videoHandler", VideoHandler);
Quill.register("modules/attachmentHandler", AttachmentHandler);

export const modules = {
    toolbar: [
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
    ],
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
    videoHandler: {
        upload: (file) => {
            return new Promise((resolve) => {
                const fd = new FormData();
                fd.append("video", file);
                _onUpload(fd, resolve, "video");
            });
        },
    },
    imageHandler: {
        upload: (file) => {
            return new Promise((resolve) => {
                const fd = new FormData();
                fd.append("image", file);
                _onUpload(fd, resolve, "image");
            });
        },
    },
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
        resolve(`http://localhost:3090/${type}/${result}`);
    }, 1000);
};
