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
                    <?php
                    require("../model/fetchDB.php");
                    $randID = random_int(67, 1910);

                    $dataRow = fetchQuillContent_WithID($randID);

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