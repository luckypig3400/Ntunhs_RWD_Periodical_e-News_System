import axios from "axios";
import React, { useState } from "react";
import { Alert, IconButton, Collapse, Button } from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import CloseIcon from "@mui/icons-material/Close";
import DeleteIcon from "@mui/icons-material/Delete";
import { editPost, deletePost } from "../../axios/putAxios";
const config = require("../../config/default.json");

export default function EditPostSendOnClick(props) {
    const [open, setOpen] = useState(false);
    const [severity, SetSeverity] = useState("success");

    var [renderMessage, setRenderMessage] = useState("");

    const SendOnClick = async () => {
        const response = await editPost(props);
        setOpen(response.Open);
        SetSeverity(response.Severity);
        setRenderMessage(response.RenderMessage);
    };

    const checkDropAlert = async () => {
        const response = await deletePost(props);
        setOpen(response.Open);
        SetSeverity(response.Severity);
        setRenderMessage(response.RenderMessage);
    };

    return (
        <>
            <Button
                variant="contained"
                endIcon={<SendIcon />}
                onClick={() => {
                    SendOnClick();
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
                        window.location.href = `./${config.hashRouter}/PostList`;
                    } else {
                        alert("取消刪除");
                        window.location.href = `./${config.hashRouter}/PostList`;
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
