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
                    <?php
                    require("../model/fetchDB.php");
                    echo fetchQuillContent_WithID(70);
                    ?>
                </div>

            </div>
        </section>

    </main>

    <?php
    require("./partials/footer.php");
    ?>

</body>

</html>