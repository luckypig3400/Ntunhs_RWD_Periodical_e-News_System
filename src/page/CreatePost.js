import React, { useState, useEffect } from "react";
import ReactQuill from "react-quill";
import CreatePostSendOnClick from "../component/CreatePost/SenedOnClick";
import "react-quill/dist/quill.snow.css";
import EditorToolbar, { modules } from "../component/CreatePost/EditorToolbar";
import {
    FormControl,
    InputLabel,
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
import SendIcon from "@mui/icons-material/Send";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import axios from "axios";
const config = require("../config/default.json");

const apiURL = config.apiURL;

function CreatePost() {
    var date = new Date();
    const [open, setOpen] = useState(false);
    const [totalcategory] = useState([{ name: "", id: "" }]);
    const [postime, setPostime] = React.useState(
        `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`
    ); //預設時間

    //存取表單輸入值
    const [subject, setSubject] = useState("");
    const [writer, setWriter] = useState("");
    const [periodNumber, setPeriodNumber] = useState("");
    const [categoryID, setCategoryID] = useState("");
    const [noYear, setNoYear] = useState(date.getFullYear());
    const [noMonth, setNoMonth] = useState(date.getMonth() + 1);
    const [content, setContent] = useState("");

    useEffect(() => {
        axios
            .all([
                axios.get(`${apiURL}/api/post`),
                axios.get(`${apiURL}/api/category`),
            ])
            .then(
                axios.spread((data1, data2) => {
                    const postResult = data1.data.results[0].periodNumber;
                    const categoryResult = data2.data.results;
                    //關聯post.categoryID
                    categoryResult.forEach((item) => {
                        totalcategory.push(item);
                    });
                    setPeriodNumber(postResult);
                })
            )
            .catch((err) => {
                console.log(err);
            });
    }, []);

    return (
        <>
            <div className="headerTitle">新增期刊</div>
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
                    <FormControl
                        required
                        variant="standard"
                        sx={{ minWidth: 200 }}
                    >
                        <InputLabel id="postsperiodNumber">分類</InputLabel>
                        <Select
                            labelId="category"
                            id="category"
                            label="category"
                            onChange={(e) => setCategoryID(e.target.value)}
                        >
                            {totalcategory.map((name) => (
                                <MenuItem key={name.id} value={name.id}>
                                    {name.name}
                                </MenuItem>
                            ))}
                        </Select>
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
                    <Button variant="outlined" endIcon={<RemoveRedEyeIcon />}>
                        檢視
                    </Button>
                    <CreatePostSendOnClick
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
export default CreatePost;
