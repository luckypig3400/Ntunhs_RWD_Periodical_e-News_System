import React, { useState, useEffect } from "react";
import domtoimage from "dom-to-image";
import { getPostList, getCategory } from "../axios";
import { Button, CircularProgress } from "@mui/material";

import MailCanvaPrintPostList1 from "../component/MailCanvaPrintPostList/MailCanvaPrintPostList1";
import CoverModal from "../component/CoverModal";

const MailCanvaPrint = () => {
    const [postList, setPostList] = useState([]);
    const [periodNumberPostList, setPeriodNumberPostList] = useState([]);
    const [lodingPrint, setLodingPrint] = useState(false);
    const [imageArray, setImageArray] = useState([]);
    const [buttonDisplay, setButtonDisplay] = useState(false);
    const [nodeDivDisplay, setNodeDivDisplay] = useState(true);
    const [category, setCategory] = useState([]);
    const PostID = getQueryVariable();

    useEffect(async () => {
        setPostList(await getPostList());
        setCategory(await getCategory());
    }, []);

    useEffect(() => {
        const sortedPostList = [];
        postList.map((item) => {
            if (item.periodNumber === PostID) {
                sortedPostList.push(item);
            }
        });
        addPostListToPeriodNumberPostList(sortedPostList);
    }, [postList, category]);

    //依照欸別重新排序
    const addPostListToPeriodNumberPostList = (sortedPostList) => {
        category.map((category) => {
            sortedPostList.map((item) => {
                if (item.categoryID === category.name) {
                    setPeriodNumberPostList((periodNumberPostList) => [
                        ...periodNumberPostList,
                        item,
                    ]);
                }
            });
        });
    };

    // 生成图片自动下载为png格式（将dom转为二进制再编译下载）
    const getBlobPng = (postID) => {
        const node = document.getElementById(postID);
        domtoimage
            .toPng(node)
            .then(function (dataUrl) {
                var img = new Image();
                img.src = dataUrl;
                img.id = postID;
                setImageArray((imageArray) => [...imageArray, img]);
                //document.body.appendChild(img);
            })
            .catch(function (error) {
                console.error("oops, something went wrong!", error);
            });
    };

    const newPostList = periodNumberPostList.map((item) => {
        return (
            <>
                <div id={item.id} key={item.id}>
                    <MailCanvaPrintPostList1
                        PostList={item}
                        key={item.id}
                        style={{ margin: 0 }}
                    />
                </div>
            </>
        );
    });
    // 转为Jpeg图片  --- 手动下载（自动下载调用saveAs(defaultUrl, '自动保存.png'))

    const WindowHeight = window.innerHeight;

    const capture = () => {
        periodNumberPostList.map(async (item) => {
            await getBlobPng(item.id);
        });
        setButtonDisplay(true);
    };

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
                <CoverModal
                    imageArray={imageArray}
                    buttonDisplay={buttonDisplay}
                    setButtonDisplay={setButtonDisplay}
                    periodNumberPostList={periodNumberPostList}
                    setNodeDivDisplay={setNodeDivDisplay}
                />
                <Button
                    variant="contained"
                    onClick={() => capture()}
                    className="action"
                    sx={{ margin: "10px" }}
                >
                    產出文件
                </Button>
            </div>
            {nodeDivDisplay ? <div id="node">{newPostList}</div> : ""}
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
