import React, { useState, useEffect } from "react";
import ReactQuill from "react-quill";
import CreatePostSendOnClick from "../component/CreatePost/SenedOnClick";
import "react-quill/dist/quill.snow.css";
import { modules } from "../component/Quill";
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
import { createPost } from "../axios";
import UploadCover from "../component/UploadCover";

function CreatePost() {
    var date = new Date();
    const [open, setOpen] = useState(false);
    const [totalcategory, setTotalcategory] = useState([]);
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
    const [cover, setCover] = useState("預設封面preset.jpg");
    const [coverLink, setCoverLink] = useState("http://localhost:3090/image/預設封面preset.jpg");

    useEffect(async () => {
        //關聯post.categoryID
        const response = await createPost();
        setTotalcategory(response.categoryResult);
        setPeriodNumber(response.postResult);
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
                        sx={{ margin: "10px" }}
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
                        sx={{ margin: "10px" }}
                        required
                        id="writer"
                        label="單位"
                        value={writer}
                        onChange={(e) => setWriter(e.target.value)}
                    />
                    <TextField
                        id="time"
                        sx={{ margin: "10px" }}
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
                                    sx={{ margin: "10px" }}
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
                        sx={{ minWidth: 200, margin: "10px" }}
                    >
                        <InputLabel id="postsperiodNumber">分類</InputLabel>
                        <Select
                            id="category"
                            label="category"
                            value={categoryID}
                            onChange={(e) => setCategoryID(e.target.value)}
                        >
                            {totalcategory.map((name) => (
                                <MenuItem key={name.id} value={name.id}>
                                    {name.name}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                    <UploadCover
                        cover={cover}
                        setCover={setCover}
                        coverLink={coverLink}
                        setCoverLink={setCoverLink}
                    />
                </div>

                <div style={{ paddingTop: "20px" }}>
                    <h3 style={{ paddingBottom: "10px" }}>輸入內容</h3>
                    <ReactQuill
                        style={{ margin: "10px" }}
                        theme="snow"
                        value={content}
                        preserveWhitespace={true}
                        onChange={setContent}
                        modules={modules}
                        placeholder="這邊寫入內容"
                    />
                </div>

                <Stack
                    direction="row"
                    spacing={2}
                    style={{ paddingTop: "20px" }}
                >
                    <CreatePostSendOnClick
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

export default CreatePost;
