<!DOCTYPE html>
<html lang="zh-Hant">

<?php
require_once("./partials/head.php");
?>

<body>

    <?php
    require_once("./partials/header.php");

    $linkString = parseGETparamsToString();
    // echo $linkString . "<br>";

    $articleID = getIDParam();

    require_once("../model/fetchArticle.php");
    $dataRow = fetchFullArticle_WithID($articleID);
    ?>
    <!-- https://quilljs.com/docs/quickstart/ -->
    <main id="main">
        <!-- 麵包屑區塊 -->
        <section class="breadcrumbs">
            <div class="container">
                <div class="d-flex justify-content-between align-items-center">
                    <h2>完整報導內文</h2>
                    <ol>
                        <li><a href="index.php">首頁</a></li>
                        <li>
                            <a <?php
                                echo "href=\"categoriesSummary.php$linkString\">";
                                if (gettype($dataRow) == "array") {
                                    echo fetchCategoryWithID($dataRow[0]["categoryID"]);
                                    $articleSubject = $dataRow[0]["subject"];
                                } else {
                                    echo "很抱歉您所尋訪的文章分類不存在";
                                    $articleSubject = "沒有文章";
                                }
                                ?> </a>
                        </li>
                        <li>
                            <?php
                            echo $articleSubject;
                            ?>
                        </li>
                    </ol>
                </div>
            </div>
        </section><!-- 麵包屑區塊 -->

        <section class="blog">
            <div class="container" data-aos="fade-up">

                <!-- Create the editor container -->
                <div id="editor">
                    <?php
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
            北護期刊 第" . $dataRow[0]["periodNumber"] . "期 "
            . $dataRow[0]["noYear"] . " 年 "
            . $dataRow[0]["noMonth"] . " 月<br><br><hr></div>";
    }
    require_once("./partials/footer.php");
    ?>

</body>

</html>