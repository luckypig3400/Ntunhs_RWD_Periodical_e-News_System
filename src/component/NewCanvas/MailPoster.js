import React, { useState, useEffect, useRef } from "react";

const CatMeme = (props) => {
    const CoverUrl = `http://localhost:3090/image/${props.PostList.cover}`;
    const backgroundImage =
        "http://localhost:3090/image/BackgroundImage_Canvas.jpg";

    const [image, setImage] = useState(null);
    const [cover, setCover] = useState(null);
    //const canvas = useRef(null);
    const [topText, setTopText] = useState("");
    const [bottomText, setBottomText] = useState("");
    const [writer, setWriter] = useState("");

    const canvas = document.getElementById(props.PostList.id);
    useEffect(() => {
        const title = props.PostList.subject;
        const textA = props.PostList.quillcontent;
        const writer = props.PostList.writer;
        //去除所有<html>元素
        var strippedHtml = textA.replace(/<[^>]+>/g, "");
        var cleanText = strippedHtml.replace(/&nbsp;/g, "").replace("▲", "");
        var newContent = cleanText.substr(0, 100);
        var newValue =
            newContent.slice(0, 20) +
            "\n" +
            newContent.slice(20, 40) +
            "\n" +
            newContent.slice(40, 60) +
            "\n" +
            newContent.slice(60, 80) +
            "\n" +
            newContent.slice(80, 100) +
            "\n" +
            "......";
        //newContent = newContent.insert(50, "\n");
        var newTitle = title.slice(0, 15) + "\n" + title.slice(15, 30);
        setTopText(newTitle);
        setBottomText(newValue);
        setWriter(writer);

        // 转为png格式的图片_底圖
        const catImage = new Image();
        catImage.src = backgroundImage;
        catImage.onload = () => setImage(catImage);

        // 转为png格式的图片_封面
        const coverImage = new Image();
        coverImage.src = CoverUrl;
        coverImage.onload = () => setCover(coverImage);
    }, []);

    useEffect(() => {
        if (image && cover && canvas) {
            const ctx = canvas.getContext("2d");
            //背景
            ctx.drawImage(image, 0, 0, 1600, 800);

            //封面
            ctx.shadowOffsetX = 10;
            ctx.shadowOffsetY = 10;
            ctx.shadowColor = "black";
            ctx.shadowBlur = 30;
            ctx.drawImage(
                cover,
                70,
                100,
                700,
                (700 * cover.height) / cover.width
            );

            //標題
            ctx.shadowOffsetX = 0;
            ctx.shadowOffsetY = 0;
            ctx.shadowColor = "black";
            ctx.shadowBlur = 0;
            ctx.font = "bold 48px Microsoft JhengHei";
            ctx.fillStyle = "black";
            ctx.textAlign = "left";
            var lines = topText.split("\n");
            var lineheight = 60;
            for (var i = 0; i < lines.length; i++) {
                ctx.fillText(lines[i], 840, 150 + i * lineheight);
            }

            //作者
            ctx.font = "bold 24px Microsoft JhengHei";
            ctx.fillStyle = "black";
            ctx.textAlign = "left";
            ctx.fillText("▲" + writer, 840, 270);

            //下面預覽
            ctx.font = "36px Microsoft JhengHei";
            ctx.fillStyle = "black";
            ctx.textAlign = "left";
            var lines = bottomText.split("\n");
            var lineheight = 50;
            for (var i = 0; i < lines.length; i++) {
                ctx.fillText(lines[i], 840, 350 + i * lineheight);
            }
            //ctx.fillText(bottomText);
        }
    }, [image, canvas, cover, topText, bottomText]);

    return (
        <div>
            <div>
                <p>
                    <font
                        style={{
                            fontSize: "20px",
                            fontWeight: "bold",
                            fontFamily: "Microsoft JhengHei",
                        }}
                    >
                        標題：{topText}
                    </font>
                </p>
                <p>
                    <font
                        style={{
                            fontSize: "20px",
                            fontWeight: "bold",
                            fontFamily: "Microsoft JhengHei",
                        }}
                    >
                        連結：
                    </font>
                    <a
                        target="_blank"
                        href={`https://acadsys.ntunhs.edu.tw/Periodical-eNews/views/fullArticlePage.php?id=${props.PostList.id}`}
                    >
                        {`https://acadsys.ntunhs.edu.tw/Periodical-eNews/views/fullArticlePage.php?id=${props.PostList.id}`}
                    </a>
                </p>
            </div>
            <div>
                <canvas width={1600} height={800} id={props.PostList.id} />
            </div>
            <br />
        </div>
    );
};

export default CatMeme;
