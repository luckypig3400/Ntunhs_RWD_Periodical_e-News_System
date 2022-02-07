<!DOCTYPE html>
<html lang="zh-Hant">

<?php
require("./partials/head.php");
?>

<body>

    <?php
    require("./partials/header.php");
    ?>
    <!-- https://quilljs.com/docs/quickstart/ -->
    <main id="main">
        <?php
        require("./partials/sections/breadcrumbs.php");
        breadcrumbs("Quill測試頁面");
        ?>

        <!-- Include stylesheet -->
        <link href="https://cdn.quilljs.com/1.3.6/quill.snow.css" rel="stylesheet">

        <section class="blog">
            <div class="container" data-aos="fade-up">

                <!-- Create the editor container -->
                <div id="editor">
                    <h1 class="ql-align-center"><strong><em>改朝換代--第二屆學生會幹部改選</em></strong></h1><br>
                    <p>Hello World!</p>
                    <p>Some initial <strong>bold</strong> text</p>
                    <p><br></p>
                    <p>充實而忙碌的一年，終於在全校學生的熱情投票下，產生了第二屆學生會的幹部，由他們承續著第一屆學生會的幹部服務的熱忱繼續的為全校學生做最大的服務。在籌備改選的過程中遭遇到很多困難，在原本的報名期間竟然只有一組會長群候選人出來競選，但為求選舉的公平性只有延長了報名時間，所幸憑著學生會幹部的努力宣傳，這次一共有三組的會長群候選來競選，也使得學生會的改選活動增加了幾分刺激的味道，在這二月剛開學的校園內就有著濃厚的選舉氣氛，候選人為了能獲得同學的支持也紛紛做了多樣的宣傳活動，如：班級的宣傳、海報政見的宣傳等，都一再的顯現出他們想贏得勝利的企圖心，包括在全校學生前的政見發表會上，每一位候選人們更是用心，不管在服裝儀容上還是談吐方面，都有一定的水準表現，特別的是這一次的政見發表上，我們更提供了給台下同學有發問的機會，也考驗著候選人的臨場反應，深獲同學的好評。</p>
                    <p class="ql-align-center">
                        <img src="../periodical_data/78_01.gif" alt="總投票率圖示">
                    </p>
                    <p><br></p>
                    <p>學生自治性的團體，一直以來在各大專院校都是很努力經營的，它代表了學生的自治性，也是學生跟學校溝通的一個管道，學生的許多意見表達並不一定會得到校方的回應，但如果我們可以藉由學生自治性的團體替我們做一個柔性的溝通，相信校方會有適當的回應，這幾年來許多大專院校的自治性的團體都有著後繼無人的危機存在，看到北護同學對於這次學生生會改選這麼的熱情參與，真的是有說不出的感動，但是選舉結果總是殘酷的，相信全校的學生選出了他們可以信賴為他們服務的候選人，也相信他們不會辜負同學對他們的期望，讓北護更加的生氣蓬勃，以下就是我們的選舉結果：

                        正副會長群
                        3號 蔡岳霖、陳怡廷、葉康梅 569票當選。

                        秘書部
                        1號 余玟霈757 票、2號 沈明琪775 票，共兩位當選。

                        文宣部
                        1號 吳靜雯355 票、2號 涂美英439 票、3號 廖東玉865 票、
                        4號 莊惠婷508 票、5號 葉芃 387 票，共五位當選。

                        總務部
                        1號 楊妙英605 票、2號 劉燕縈554 票、3號 丁稚芸736 票，共三位當選。

                        社團部
                        1號 張純華849 票、2號 謝玉琦584 票、3號 蔡淑娟555 票，共三位當選。

                        活動部
                        1號 陳慧瑄703 票、2號 劉怡菁769 票、3號 黃昭瑋621 票、
                        4號 龔閒築643 票、5號 林郁純604 票，共五位當選。

                        公關部
                        1號 李蓉貞555票、2號 吳惠萍494票、3號 蔡雅琴380 票、
                        4號 張瑋玉891 票，共四位當選。

                        總投票率：
                        全校學生共有2732人，投票人數有1480人，投票率為54％

                    </p>
                    <p><br></p>
                    <p>
                        最後，感謝全校學生的熱情參與，學生事務處林旭龍學務長、課指組組長陳建和老師、課指組惠娟姐的幫忙協助，當然還有第一屆學生會幹部的努力，這次的改選活動才能圓滿成功。
                    </p>

                </div>

            </div>
        </section>

        <!-- Include the Quill library -->
        <script src="https://cdn.quilljs.com/1.3.6/quill.js"></script>

        <!-- Initialize Quill editor -->
        <script>
            // https://quilljs.com/docs/modules/toolbar/
            var toolbarOptions = [
                ['bold', 'italic', 'underline', 'strike'], // toggled buttons
                ['blockquote', 'code-block'],
                [{
                    'header': [1, 2, 3, 4, 5, 6, false]
                }],

                [{
                    'color': []
                }, {
                    'background': []
                }], // dropdown with defaults from theme
                [{
                    'font': []
                }],
                [{
                    'align': []
                }],

                ['clean'] // remove formatting button
            ];

            var quillOptions = {
                // readOnly: true,
                theme: 'snow',
                modules: {
                    toolbar: toolbarOptions
                },
                // https://stackoverflow.com/questions/39456273/how-do-i-create-a-quill-editor-without-a-toolbar
                // border: none
            }

            var quill = new Quill('#editor', quillOptions);
        </script>
    </main>

    <?php
    require("./partials/footer.php");
    ?>

</body>

</html>