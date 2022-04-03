import axios from "axios";
import React, { useState } from "react";
import { Alert, IconButton, Collapse, Button } from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import CloseIcon from "@mui/icons-material/Close";
import DeleteIcon from "@mui/icons-material/Delete";
const config = require("../../config/default.json");

export default function EditPostSendOnClick(props) {
    const [open, setOpen] = useState(false);
    const [severity, SetSeverity] = useState("success");

    var [renderMessage, setRenderMessage] = useState("");

    const SendOnClick = () => {
        console.log(props);
        axios.defaults.withCredentials = true;
        axios
            .patch(`${config.apiURL}/api/post/${props.PostID}`, {
                periodNumber: props.periodNumber,
                noYear: props.noYear,
                noMonth: props.noMonth,
                categoryID: props.categoryID,
                writer: props.writer,
                content: props.content,
                subject: props.subject,
                cover: props.cover,
            })
            .then((response) => {
                setOpen(true);
                SetSeverity("success");
                setRenderMessage("更新成功");
            })
            .catch((error) => {
                setOpen(true);
                SetSeverity("error");
                setRenderMessage(error.request.onerror.name);
            });
    };

    const checkDropAlert = () => {
        axios.defaults.withCredentials = true;
        axios
            .delete(`${config.apiURL}/api/Post/${props.PostID}`, {
                postID: props.PostID,
            })
            .then((response) => {
                setOpen(true);
                SetSeverity("success");
                setRenderMessage("刪除成功");
            })
            .catch((error) => console.log(error.request));
    };

    return (
        <>
            <Button
                variant="contained"
                endIcon={<SendIcon />}
                onClick={() => {
                    SendOnClick();
                    console.log(renderMessage);
                }}
            >
                Send
            </Button>
            <Button
                variant="outlined"
                endIcon={<DeleteIcon />}
                color="error"
                onClick={() => {
                    var message = window.confirm("確定要刪除貼文?");
                    if (message === true) {
                        alert("OK");
                        checkDropAlert(props.PostID);
                        window.location.href = `/PostList`;
                    } else {
                        alert("取消刪除");
                        window.location.href = `/PostList`;
                    }
                }}
            >
                刪除貼文
            </Button>
            <Collapse in={open}>
                <Alert
                    severity={`${severity}`}
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
                    {renderMessage}
                </Alert>
            </Collapse>
        </>
    );
}
