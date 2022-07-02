import React, { useState, useEffect, useRef } from "react";

const CatMeme = () => {
    const CoverUrl =
        "http://localhost:3090/image/939d89c1638a5bfe84c33fba0a003634.jpg";
    const backgroundImage =
        "http://localhost:3090/image/BackgroundImage_Canvas.jpg";

    const [image, setImage] = useState(null);
    const [cover, setCover] = useState(null);
    const canvas = useRef(null);
    const [topText, setTopText] = useState("");
    const [bottomText, setBottomText] = useState("");
    const [writer, setWriter] = useState("");

    useEffect(() => {
        const title =
            "北護大USR計畫榮獲2021大學社會實踐線上博覽會「最佳亮點故事獎」";
        const textA = `<p class="ql-align-justify">  每個人所擔任每個角色，都是在經驗中不斷的學習，導師的工作也不例外。校園生活看似單純，卻是社會的縮影，人生劇上演的喜怒哀樂、歷經高谷低潮，班級有班級特質，但每位學生都是獨特的，有著不同的劇本，有些學生能隨著年級漸長，益發成熟穩重，也有些學生遭遇困頓挫折，需要老師的及時的守護與陪伴，考驗著每位導師識人與輔導的功力，使導師的工作難以用複製貼上的方式來因應，隨時得迎接新挑戰。</p><p class="ql-align-center">&nbsp;&nbsp;&nbsp;&nbsp;<img class="custom-class-to-image" src="http://140.131.87.222/periodical/html/upload/220lwj.png"></p><p class="ql-align-center">▲ 績優導師林文絹</p><p><br></p><p>記得第一次遭遇學生因憂鬱有自傷念頭，到處找人詢問如何因應處理，生怕哪一環節出狀況，就會造成無可彌補的遺憾，一顆心如同懸在一條線上，任何的牽動都讓人緊張不已。也有即將畢業的學生，畢業想當米蟲不工作，跟現今年輕人想｢躺平｣如出一轍，需要進行認知作戰。也有讓人驚心動魄的考驗，如恐怖情人在班上，班上的班對分手後，男方開始以line、電話不斷騷擾與威脅女方說是他有黑道背景要給她好看，女方飽受驚嚇，經聯繫教官共同商討後到警局備案，也約談男方請他保證不接近女方的承諾。而數次約談男方都無從得知所提及的黑道背景之虛實。由於離畢業還有多年，同時須向同班同學保密的原則下，不著痕跡不讓2人小組同組與實習，期間持續與女方保持聯繫確保其身心的安全，直到學生畢業，警報才解除，慶幸男方信守承諾未再有進一步行動。還有一可能難得一見的案例，學生無端捲入成為被告，二位學生於實習期間並非學生本身發生任何錯誤行為，而是被事件波及不幸淪為被告，家屬由刑事敗訴後又進行民事訴訟，訴訟歷時三年，歷程由學生就學期間直到畢業後一年，期間陪見律師、模擬出庭應答、多次收判決書的忐忑、醫院與校方的聯繫等…增長不少見識，也體會到導師售後服務是無期限，先前很難預知訴訟何時能終止。</p><p><br></p><p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;由上可知導師的工作很難描述，既要面對｢事｣，更要處理｢人｣，處｢事｣需策略，處｢人｣需用心，每個人都需要被尊重與公平的對待，當能真誠的互動，相信學生也能感受你的用心。而很多的狀況會越逾工作日與假日、上下班時間的分野，尤其在學生遭逢困頓挫折、情緒低落，甚至意外時，特別需要我們來協助安頓身心。感謝學校學輔中心每學期都能邀請學者專家、或輔導經驗豐富的講師們強化我們的輔導知能，使我們能成為學生堅實的後盾。而許多學生的狀況特別感謝健康中心、心輔中心與生活輔導組，在過程中能充份聯繫溝通，共同合作解決學生的問題。</p>`;

        //去除所有<html>元素
        var strippedHtml = textA.replace(/<[^>]+>/g, "");
        var cleanText = strippedHtml.replace(/&nbsp;/g, "").replace("▲", "");
        var newContent = cleanText.substr(0, 100);
        var newValue =
            "　" +
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
        setWriter("撰文＼護理系 林文絹 導師");

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
            const ctx = canvas.current.getContext("2d");
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
                <canvas ref={canvas} width={1600} height={800} />
            </div>
        </div>
    );
};

export default CatMeme;
