import axios from "axios";
import React, { useState, useEffect } from "react";
import { Alert, IconButton, Collapse, Button } from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import CloseIcon from "@mui/icons-material/Close";
import { createPost } from "../../axios/putAxios";
import { getCarousel } from "../../axios";
import { createCarousel } from "../../axios/putAxios";
import { getPostList } from "../../axios";

const config = require("../../config/default.json");

export default function CreatePostSendOnClick(props) {
    const [open, setOpen] = useState(false);
    const [severity, SetSeverity] = useState("success");
    const [carousel, setCarousel] = useState([]);
    const [postList, setPostList] = useState([]);
    var [renderMessage, setRenderMessage] = useState("");

    useEffect(async () => {
        setCarousel(await getCarousel());
        setPostList(await getPostList());
    }, []);

    const SendOnClick = async () => {
        const response = await createPost(props);
        if (response.Severity !== "error") {
            ChackPeriodNumberIsNew();
        }
        setOpen(response.Open);
        SetSeverity(response.Severity);
        setRenderMessage(response.RenderMessage);
    };

    const ChackPeriodNumberIsNew = async () => {
        const Chack = carousel.find((item) => {
            return item.id.toString() === props.periodNumber;
        });
        if (Chack === undefined) {
            createCarousel(props.periodNumber, postList[0].id + 1);
        }
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
