import React, { useState, useEffect, useRef } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";

//import HTMLtoDOCX from "html-to-docx";
import { saveAs } from "file-saver";

const style = {
    position: "absolute",
    top: "20%",
    left: "10%",
    transform: "translate(20%, -10%)",
    width: "60%",
    height: "80%",
    bgcolor: "background.paper",
    border: "1px solid #000",
    overflow: "scroll",
    boxShadow: 24,
    p: 4,
};

const CoverModal = (props) => {
    const handleClose = () => location.reload();

    function copyToClipboard(e) {
        var div = document.getElementById("contentpage");
    }

    const BoxContent = () => {
        if (props.imageArray[0]) {
            return (
                <>
                    {
                        //<Button onClick={copyToClipboard}>5</Button>
                    }
                    <div id="contentpage">
                        {props.imageArray.map((item) => {
                            return props.periodNumberPostList.map((item2) => {
                                if (
                                    item.id.toString() === item2.id.toString()
                                ) {
                                    return (
                                        <div key={item.id.toString()}>
                                            <p>
                                                <font
                                                    style={{
                                                        fontSize: "20px",
                                                        fontWeight: "bold",
                                                        fontFamily:
                                                            "Microsoft JhengHei",
                                                    }}
                                                >
                                                    標題：{`${item2.subject}`}
                                                </font>
                                            </p>
                                            <font
                                                style={{
                                                    fontSize: "20px",
                                                    fontWeight: "bold",
                                                    fontFamily:
                                                        "Microsoft JhengHei",
                                                }}
                                            >
                                                連結：
                                            </font>
                                            <a
                                                target="_blank"
                                                href={`https://acadsys.ntunhs.edu.tw/Periodical-eNews/views/fullArticlePage.php?id=${item.id}`}
                                            >{`https://acadsys.ntunhs.edu.tw/Periodical-eNews/views/fullArticlePage.php?id=${item.id}`}</a>
                                            <img src={item.src} width="100%" />
                                            <br />
                                            <br />
                                        </div>
                                    );
                                }
                            });
                        })}
                    </div>
                </>
            );
        } else {
            return <>請燒等...</>;
        }
    };

    return (
        <div>
            {props.buttonDisplay ? (
                <Modal
                    open={props.buttonDisplay}
                    onClose={handleClose}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                >
                    <Box sx={style}>
                        <BoxContent />
                    </Box>
                </Modal>
            ) : null}
        </div>
    );
};

export default CoverModal;
