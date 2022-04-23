import { Quill } from "react-quill";
import ImageResize from "quill-image-resize-module-react";
import axios from "axios";
const config = require("../config/default.json");
const apiURL = config.apiURL;

Quill.register("modules/imageResize", ImageResize);

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
        modules: ["Resize", "DisplaySize", ],
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
};

const formats = [
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
    const input = document.createElement("input");
    input.setAttribute("type", "file");
    input.click();

    // Listen upload local image and save to server
    input.onchange = async () => {
        var range = this.quill.getSelection();
        const file = input.files[0];
        // file type is only image.
        if (/^image\//.test(file.type)) {
            var result = await _onUpload(file, "image");
            console.log(result);
            this.quill.insertEmbed(
                range.index,
                "image",
                result,
                Quill.sources.USER
            );
        } else {
            console.warn("You could only upload images.");
        }
    };
}

function videoHandler() {
    const input = document.createElement("input");
    input.setAttribute("type", "file");
    input.click();
    // Listen upload local image and save to server
    input.onchange = async () => {
        var range = this.quill.getSelection();
        const file = input.files[0];
        // file type is only image.
        if (/^video\//.test(file.type)) {
            var result = await _onUpload(file, "video");
            console.log(result);
            this.quill.insertEmbed(
                range.index,
                "video",
                result,
                Quill.sources.USER
            );
        } else {
            console.warn("You could only upload images." + file.type);
        }
    };
}

const _onUpload = async (file, type) => {
    axios.defaults.withCredentials = true;
    const fd = new FormData();
    fd.append(type, file);
    return new Promise((resolve, reject) => {
        try {
            const axiosRes = axios
                .post(`${apiURL}/api/upload/${type}`, fd)
                .then((response) => {
                    console.log(response.data);
                    return `http://localhost:3090/${type}/${response.data.fileName}`;
                });
            resolve(axiosRes);
        } catch (e) {
            console.log(e);
        }
    });
};
