import React, { useState, useEffect } from "react";
import domtoimage from "dom-to-image";
import { saveAs } from "file-saver";
import { getPostList } from "../axios";
import { Button, CircularProgress } from "@mui/material";
import MailCanvaPrintPostList from "../component/MailCanvaPrintPostList";

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
        return <MailCanvaPrintPostList PostList={item} key={item.id} />;
    });
    const getImg = () => {
        const node = document.getElementById("node");

        domtoimage
            .toPng(node)
            .then((defaultUrl) => {
                const img = new Image();
                img.src = defaultUrl;
                img.setAttribute("className", "pngImg"); // 方便设置样式
                // 将生成的png图片插入到当前页面
                document.getElementById("export-img").appendChild(img);
                // 手动点击图片下载 自动下载调用saveAs(defaultUrl, '自动保存.png')
                img.addEventListener("click", () => {
                    var link = document.createElement("a");
                    link.download = "古诗词.png";
                    link.href = defaultUrl;
                    link.click();
                });
            })
            .catch(() => {
                console.log("error");
            });
    };
    // 生成图片自动下载为png格式（将dom转为二进制再编译下载）
    const getBlobPng = () => {
        setLodingPrint(true);
        const node = document.getElementById("node");
        domtoimage.toBlob(node).then((blob) => {
            // 调用file-save方法 直接保存图片
            saveAs(blob, PostID);
            setLodingPrint(false);
        });
    };
    // 转为Jpeg图片  --- 手动下载（自动下载调用saveAs(defaultUrl, '自动保存.png'))
    const getJpeg = () => {
        const node = document.getElementById("node");
        domtoimage.toJpeg(node, { quality: 0.95 }).then((defaultUrl) => {
            var link = document.createElement("a");
            link.download = "下载jpeg.jpeg";
            link.href = defaultUrl;
            link.click();
        });
        setLodingPrint(false);
    };
    // 转为SVG图片---手动下载 （自动下载调用saveAs(defaultUrl, '自动保存.png'))
    const getSVG = () => {
        setLodingPrint(true);
        const node = document.getElementById("node");
        domtoimage.toSvg(node, { filter: filter }).then((defaultUrl) => {
            const img = new Image();
            img.src = defaultUrl;
            img.setAttribute("className", "svgImg");
            document.getElementById("export-img").appendChild(img);
            img.addEventListener("click", () => {
                var link = document.createElement("a");
                link.download = "SVG";
                link.href = defaultUrl;
                link.click();
            });
        });
        setLodingPrint(false);
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
                    onClick={getBlobPng}
                    className="action"
                    sx={{ margin: "10px" }}
                >
                   儲存圖片
                </Button>
                {/* <Button
                    variant="contained"
                    color="success"
                    onClick={() => {
                        setLodingPrint(true);
                        getJpeg();
                    }}
                    className="action"
                    sx={{ margin: "10px" }}
                >
                    jpeg圖片
                </Button>
                <Button
                    variant="contained"
                    color="secondary"
                    onClick={() => {
                        setLodingPrint(true);
                        getSVG();
                    }}
                    className="action"
                    sx={{ margin: "10px" }}
                >
                    svg圖片
                </Button>*/}
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
