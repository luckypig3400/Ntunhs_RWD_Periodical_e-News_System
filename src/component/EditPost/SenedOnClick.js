import axios from "axios";
import React, { useState, useEffect } from "react";
import { Alert, IconButton, Collapse, Button } from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import CloseIcon from "@mui/icons-material/Close";
const config = require("../../config/default.json");

export default function EditPostSendOnClick(props) {
    const [open, setOpen] = useState(false);
    const [severity, SetSeverity] = useState("success");

    var [renderMessage,setRenderMessage]=useState('');

    const SendOnClick = () => {
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
            })
            .then(
                (response) =>{
                    setOpen(true)
                    SetSeverity("success")
                    setRenderMessage('更新成功')
                } 
            )
            .catch((error) => {
                console.log(error.request.onerror.name);
                setOpen(true);
                SetSeverity("error")
                setRenderMessage(error.request.onerror.name)
            });
    };

    return (
        <>
            <Button
                variant="contained"
                endIcon={<SendIcon />}
                onClick={() => {
                    SendOnClick();
                    console.log(renderMessage)
                }}
            >
                Send
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
