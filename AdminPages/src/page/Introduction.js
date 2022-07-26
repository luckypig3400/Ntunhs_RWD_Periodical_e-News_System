import React, { useState, useEffect } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import DeleteIcon from "@mui/icons-material/Delete";
import SendIcon from "@mui/icons-material/Send";
import Stack from "@mui/material/Stack";
import { getIntroduction } from "../axios/index";
import { putIntroduction } from "../axios/putAxios";
import Alert from "@mui/material/Alert";
import CloseIcon from "@mui/icons-material/Close";
import Collapse from "@mui/material/Collapse";
import IconButton from "@mui/material/IconButton";

const Introduction = () => {
    const [IntroductionContent, setIntroductionContent] = useState("");
    const [sendAlert, setSendAlert] = useState(false);

    useEffect(async () => {
        const text = await getIntroduction();
        setIntroductionContent(text[0].value);
    }, []);

    const onSendButtonClick = () => {
        setSendAlert(true);
        putIntroduction(1, IntroductionContent);
    };

    const onCancelButtonClick = async () => {
        const text = await getIntroduction();
        setIntroductionContent(text[0].value);
    };

    return (
        <div>
            <TextField
                id="outlined-multiline-static"
                label="Multiline"
                sx={{ width: "100%" }}
                multiline
                value={IntroductionContent}
                onChange={(e) => setIntroductionContent(e.target.value)}
            />
            <Stack direction="row" spacing={2} sx={{ marginTop: "20px" }}>
                <Button
                    variant="outlined"
                    color="error"
                    startIcon={<DeleteIcon />}
                    onClick={() => onCancelButtonClick()}
                >
                    取消
                </Button>
                <Button
                    variant="contained"
                    color="success"
                    endIcon={<SendIcon />}
                    onClick={() => onSendButtonClick()}
                >
                    更新
                </Button>
            </Stack>
            <Collapse in={sendAlert} sx={{ marginTop: "20px" }}>
                <Alert
                    action={
                        <IconButton
                            aria-label="close"
                            color="inherit"
                            size="small"
                            onClick={() => {
                                setSendAlert(false);
                            }}
                        >
                            <CloseIcon fontSize="inherit" />
                        </IconButton>
                    }
                    sx={{ mb: 2 }}
                >
                    更新成功
                </Alert>
            </Collapse>
        </div>
    );
};

export default Introduction;
