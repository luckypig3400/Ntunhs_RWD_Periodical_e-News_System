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
import { styled } from "@mui/material/styles";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import DriveFolderUploadIcon from "@mui/icons-material/DriveFolderUpload";
import InsertPhotoIcon from "@mui/icons-material/InsertPhoto";
import { createPost } from "../axios";
import { coverUpload } from "../axios/onUpload";
const config = require("../config/default.json");
const imageURL = config.imageURL;

const Input = styled("input")({
    display: "none",
});

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
    const [cover, setCover] = useState("");
    const [coverLink, setCoverLink] = useState("");

    useEffect(async () => {
        //關聯post.categoryID
        const response = await createPost();
        setTotalcategory(response.categoryResult);
        setPeriodNumber(response.postResult);
    }, []);

    const _onUpload = async (fd, resolve, type) => {
        const response = await coverUpload(fd);
        resolve(
            `${imageURL}/${response}`,
            setCover(response),
            setCoverLink(`${imageURL}/image/${response}`)
        );
    };
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
                    <FormControl
                        required
                        variant="standard"
                        sx={{ minWidth: 200 }}
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
                        cover={cover}
                    />
                </Stack>
            </div>
        </>
    );
}

export default CreatePost;
