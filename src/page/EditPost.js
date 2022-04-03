import React, { useState, useEffect } from "react";
import EditPostButtion from "../component/EditPost/EditPostButtion";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import EditorToolbar, { modules } from "../component/CreatePost/EditorToolbar";
import {
    FormControl,
    NativeSelect,
    Select,
    MenuItem,
    TextField,
    Button,
    Stack,
    Alert,
    IconButton,
    Collapse,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import DatePicker from "@mui/lab/DatePicker";
import { styled } from "@mui/material/styles";
import DriveFolderUploadIcon from "@mui/icons-material/DriveFolderUpload";
import InsertPhotoIcon from "@mui/icons-material/InsertPhoto";

import axios from "axios";

const config = require("../config/default.json");

const apiURL = config.apiURL;
const PostID = getQueryVariable("PostID");

function EditPost() {
    var date = new Date();
    const [open, setOpen] = useState(false);
    const [totalcategory] = useState([]);
    const [postime, setPostime] = useState(""); //預設時間

    //存取表單輸入值
    const [subject, setSubject] = useState("");
    const [writer, setWriter] = useState("");
    const [periodNumber, setPeriodNumber] = useState("");
    const [categoryID, setCategoryID] = useState("");
    const [noYear, setNoYear] = useState("");
    const [noMonth, setNoMonth] = useState("");
    const [content, setContent] = useState("");
    const [cover, setCover] = useState("");
    const [coverLink, setCoverLink] = useState("");
    const Input = styled("input")({
        display: "none",
    });

    useEffect(() => {
        axios
            .all([
                axios.get(`${apiURL}/api/post/${PostID}`),
                axios.get(`${apiURL}/api/category`),
            ])
            .then(
                axios.spread((data1, data2) => {
                    const categoryResult = data2.data.results;
                    //關聯post.categoryID
                    categoryResult.forEach((item) => {
                        totalcategory.push(item);
                    });

                    setSubject(data1.data.subject);
                    setContent(data1.data.quillcontent);
                    setWriter(data1.data.writer);
                    setPeriodNumber(data1.data.periodNumber);
                    setCategoryID(data1.data.categoryID);
                    setNoYear(data1.data.noYear);
                    setNoMonth(data1.data.noMonth);
                    setPostime(`${data1.data.noYear}/${data1.data.noMonth}`);
                    setCover(data1.data.cover);
                    setCoverLink(
                        `http://localhost:3090/image/${data1.data.cover}`
                    );
                })
            )
            .catch((err) => {
                console.log(err);
            });
    }, []);

    const _onUpload = async (fd, resolve, type) => {
        axios.defaults.withCredentials = true;
        const result = await axios
            .post(`${apiURL}/api/upload/${type}`, fd)
            .catch((err) => console.log(err));
        resolve(
            `http://localhost:3090/${type}/${result.data.fileName}`,
            setCover(result.data.fileName),
            setCoverLink(`http://localhost:3090/imaghe/${result.data.fileName}`)
        );
    };

    return (
        <>
            <div className="headerTitle">編輯期刊-{PostID}</div>
            <div className="pagecontent">
                <Collapse in={open}>
                    <Alert
                        severity="error"
                        action={
                            <IconButton
                                aria-label="close"
                                color="inherit"
                                size="small"
                                onClick={() => {
                                    setOpen(false);
                                }}
                            >
                                <CloseIcon fontSize="inherit" />
                            </IconButton>
                        }
                    >
                        發送失敗
                    </Alert>
                </Collapse>

                <div style={{ paddingTop: "10px" }}>
                    <h3>輸入標題</h3>
                    <TextField
                        sx={{ top: 10 }}
                        required
                        id="subject"
                        label="標題"
                        fullWidth={true}
                        value={subject}
                        onChange={(e) => setSubject(e.target.value)}
                    />
                </div>

                <div style={{ paddingTop: "20px" }}>
                    <h3>輸入發文單位 / 期數 / 日期</h3>
                    <TextField
                        sx={{ top: 10 }}
                        required
                        id="writer"
                        label="單位"
                        value={writer}
                        onChange={(e) => setWriter(e.target.value)}
                    />
                    <TextField
                        id="time"
                        sx={{ top: 10, left: 10 }}
                        label="期數"
                        value={periodNumber}
                        onChange={(e) => {
                            setPeriodNumber(e.target.value);
                        }}
                        type="number"
                    />

                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                        <DatePicker
                            label="Basic example"
                            value={postime}
                            onChange={(newValue) => {
                                setNoYear(newValue.getFullYear());
                                setNoMonth(newValue.getMonth() + 1);
                                setPostime(newValue);
                            }}
                            renderInput={(params) => (
                                <TextField
                                    {...params}
                                    sx={{ top: 10, left: 20 }}
                                />
                            )}
                        />
                    </LocalizationProvider>
                </div>

                <div style={{ paddingTop: "20px" }}>
                    <h3>選取分類</h3>
                    <FormControl variant="standard" sx={{ minWidth: 200 }}>
                        <NativeSelect
                            id="category"
                            label="category"
                            value={categoryID}
                            onChange={(e) => setCategoryID(e.target.value)}
                        >
                            {totalcategory.map((name) => (
                                <option key={name.id} value={name.id}>
                                    {name.name}
                                </option>
                            ))}
                        </NativeSelect>
                    </FormControl>
                    {cover ? (
                        <>
                            <Button
                                variant="contained"
                                component="span"
                                aria-label="upload picture"
                                endIcon={<InsertPhotoIcon />}
                                sx={{ marginLeft: "20px", marginTop: "10px" }}
                                onClick={(e) => {
                                    window.open(coverLink, "_blank");
                                }}
                            >
                                瀏覽封面"{cover}"
                            </Button>
                            <Button
                                variant="contained"
                                component="span"
                                aria-label="upload picture"
                                color="error"
                                sx={{ marginLeft: "20px", marginTop: "10px" }}
                                onClick={() => {
                                    setCover("");
                                    setCoverLink("");
                                }}
                            >
                                刪除封面
                            </Button>
                        </>
                    ) : (
                        <label htmlFor="icon-button-file">
                            <Input
                                accept="image/jpeg, image/png"
                                id="icon-button-file"
                                type="file"
                                onChange={(file) => {
                                    return new Promise((resolve, reject) => {
                                        const fd = new FormData();
                                        fd.append(
                                            "image",
                                            file.target.files[0]
                                        );
                                        _onUpload(fd, resolve, "image");
                                    });
                                }}
                            />
                            <Button
                                variant="outlined"
                                component="span"
                                aria-label="upload picture"
                                endIcon={<DriveFolderUploadIcon />}
                                sx={{ marginLeft: "20px", marginTop: "10px" }}
                            >
                                上傳封面
                            </Button>
                        </label>
                    )}
                </div>

                <div style={{ paddingTop: "20px" }}>
                    <h3 style={{ paddingBottom: "10px" }}>輸入內容</h3>
                    <EditorToolbar />
                    <ReactQuill
                        theme="snow"
                        value={content}
                        onChange={setContent}
                        modules={modules}
                    />
                </div>

                <Stack
                    direction="row"
                    spacing={2}
                    style={{ paddingTop: "20px" }}
                >
                    <EditPostButtion
                        apiURL={apiURL}
                        PostID={PostID}
                        periodNumber={periodNumber}
                        noYear={noYear}
                        noMonth={noMonth}
                        categoryID={categoryID}
                        writer={writer}
                        content={content}
                        subject={subject}
                        cover={cover}
                    />
                </Stack>
            </div>
        </>
    );
}

//獲取PostID
function getQueryVariable(variable) {
    var query = window.location.search.substring(1);
    var vars = query.split("&");
    for (var i = 0; i < vars.length; i++) {
        var pair = vars[i].split("=");
        if (pair[0] === variable) {
            return pair[1];
        }
    }
    return false;
}

export default EditPost;
