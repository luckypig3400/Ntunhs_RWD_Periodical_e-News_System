import React, { useState, useEffect } from "react";
import domtoimage from "dom-to-image";
import { saveAs } from "file-saver";
import { getPostList } from "../axios";
import { Button, CircularProgress } from "@mui/material";

import MailPoster from "../component/NewCanvas/MailPoster";

function filter(node) {
    return node.tagName !== "i";
}
const MailCanvaPrint = () => {
    const [postList, setPostList] = useState([]);
    const [periodNumberPostList, setPeriodNumberPostList] = useState([]);
    const [lodingPrint, setLodingPrint] = useState(false);
    const PostID = getQueryVariable();
    useEffect(async () => {
        setPostList(await getPostList());
    }, []);

    useEffect(() => {
        postList.map((item) => {
            if (item.periodNumber === PostID) {
                setPeriodNumberPostList((periodNumberPostList) => [
                    ...periodNumberPostList,
                    item,
                ]);
            }
        });
    }, [postList]);

    const newPostList = periodNumberPostList.map((item) => {
        return <MailPoster PostList={item} key={item.id} />;
    });

    const onButtonClick = () => {
    };

    const WindowHeight = window.innerHeight;
    return (
        <div width="100%">
            <div
                className="my-actions"
                style={{
                    alignItems: "center",
                    justifyContent: "center",
                    display: "flex",
                }}
            >
                <Button
                    variant="contained"
                    className="action"
                    onClick={onButtonClick}
                    sx={{ margin: "10px" }}
                >
                    儲存圖片
                </Button>
            </div>
            <div id="node">{newPostList}</div>
            {lodingPrint && (
                <div
                    className="Loding"
                    style={{
                        width: "100%",
                        height: `${WindowHeight}px`,
                    }}
                >
                    <CircularProgress size={0.1 * window.innerWidth} />
                </div>
            )}
        </div>
    );
};

//獲取url參數
function getQueryVariable() {
    var baseUrl = window.location.href; // You can also use document.URL
    var koopId = baseUrl.substring(baseUrl.lastIndexOf("=") + 1);
    return koopId;
}

export default MailCanvaPrint;
