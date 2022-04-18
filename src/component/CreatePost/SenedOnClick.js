import axios from "axios";
import React, { useState } from "react";
import { Alert, IconButton, Collapse, Button } from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import CloseIcon from "@mui/icons-material/Close";
import { createPost } from "../../axios/putAxios";
const config = require("../../config/default.json");

export default function CreatePostSendOnClick(props) {
    const [open, setOpen] = useState(false);
    const [severity, SetSeverity] = useState("success");

    var [renderMessage, setRenderMessage] = useState("");

    const SendOnClick = async () => {
        const response = await createPost(props);
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
