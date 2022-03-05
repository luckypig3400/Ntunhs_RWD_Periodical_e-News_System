import React, { useState, useEffect } from "react";
import EditPostButtion from "../component/EditPost/EditPostButtion";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import EditorToolbar, { modules } from "../component/CreatePost/EditorToolbar";
import {
    FormControl,
    TextField,
    Stack,
    Alert,
    IconButton,
    Collapse,
    NativeSelect,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import DatePicker from "@mui/lab/DatePicker";

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
                })
            )
            .catch((err) => {
                console.log(err);
            });
    }, []);

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
                        defaultValue=""
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
                        defaultValue=""
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
                            labelId="category"
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
