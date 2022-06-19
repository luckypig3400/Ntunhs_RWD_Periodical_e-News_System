import React, { useState, useEffect } from "react";
import NTUNHS from "./NTUNHS1.jpg";

const config = require("../config/default.json");
const imageURL = config.imageURL;

// 过滤掉所有<i>元素

const MailCanvaPrintPostList = (props) => {
    const subject = props.PostList.subject;
    const html = props.PostList.quillcontent;
    const cover = `${imageURL}/image/${props.PostList.cover}`;
    // 转为png格式的图片

    return (
        <>
            <div className="dom-to-img">
                <div>
                    <div  className="node-content">
                        <Content subject={subject} html={html} cover={cover} />
                    </div>
                </div>

                <div id="export-img" className="my-image "></div>
            </div>
        </>
    );
};

const Content = (props) => {
    var strippedHtml = props.html.replace(/<[^>]+>/g, "");
    var cleanText = strippedHtml.replace(/&nbsp;/g, "");
    const newContent = cleanText.substr(0, 200) + "......";
    const windowWidth = window.innerWidth;

    const postCover = (
        <img
            src={props.cover}
            id="Cover"
            style={{
                width: windowWidth / 2,
                background: "#000000",
                color: "#FFF",
                boxShadow: "0 0 20px rgba(0,0,0)",
            }}
        />
    );

    return (
        <>
            <img
                src={NTUNHS}
                className="node-content"
                style={{
                    width: windowWidth,
                }}
                alt="Snow"
            />

            <div
                className="Text"
                style={{
                    position: "absolute",
                    top: "50%",
                    transform: "translate(-0%, -50%)",
                    left: windowWidth / 1.7,
                    width: windowWidth / 2.6,
                    backgroundColor: "#FFF",
                    opacity: 0.8,
                }}
            >
                <p>
                    <b>
                        <font
                            style={{
                                fontSize: windowWidth / 35 + "px",
                                fontFamily: "標楷體",
                            }}
                            color="#000000"
                        >
                            {props.subject}
                        </font>
                    </b>
                </p>
                <p>-</p>
                <p>
                    <font
                        style={{
                            fontSize: windowWidth / 50 + "px",
                            fontFamily: "標楷體",
                        }}
                        color="#000000"
                    >
                        {newContent}
                    </font>
                </p>
            </div>

            <div
                className="image-overlay"
                style={{
                    position: "absolute",
                    top: "50%",
                    left: windowWidth / 17,
                    transform: "translate(-0%, -50%)",
                }}
            >
                {postCover}
            </div>
        </>
    );
};

export default MailCanvaPrintPostList;
