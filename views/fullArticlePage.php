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
        <!-- 麵包屑區塊 -->
        <section class="breadcrumbs">
            <div class="container">
                <div class="d-flex justify-content-between align-items-center">
                    <h2>完整文章內容</h2>
                    <ol>
                        <li><a href="index.php">首頁</a></li>
                        <li>文章分類與連結</li>
                        <li>此篇文章標題</li>
                    </ol>
                </div>
            </div>
        </section><!-- 麵包屑區塊 -->

        <?php
        $linkString = parseGETparamsToString();
        // echo $linkString . "<br>";

        $articleID = getIDParam();
        ?>

        <section class="blog">
            <div class="container" data-aos="fade-up">

                <!-- Create the editor container -->
                <div id="editor">
                    <?php
                    require("../model/fetchArticle.php");

                    $dataRow = fetchFullArticle_WithID($articleID);

                    if (gettype($dataRow) == "array") {
                        echo "<h1 class=\"ql-align-center\"><strong><em>" . $dataRow[0]["subject"] . "</em></strong></h1><br>";

                        echo $dataRow[0]["writer"] . "<br><br>";
                        echo $dataRow[0]["quillcontent"];

                        echo "<br>更新日期:" . $dataRow[0]["updateTime"];

                        echo "<br>點閱次數:" . $dataRow[0]["clicked"];
                    } else {
                        echo $dataRow;
                    }
                    // print_r($dataRow);
                    ?>
                </div>
            </div>
        </section>

    </main>

    <?php
    if (gettype($dataRow) == "array") {
        echo "<div id=\"articleInfoDiv\" hidden>
            北護校訊電子期刊 第" . $dataRow[0]["periodNumber"] . "期 "
            . $dataRow[0]["noYear"] . " 年 "
            . $dataRow[0]["noMonth"] . " 月<br><br><hr></div>";
    }
    require("./partials/footer.php");
    ?>

</body>

</html>