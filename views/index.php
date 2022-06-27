<!DOCTYPE html>
<html lang="zh-Hant">

<?php
require_once("./partials/head.php");
?>

<body id="fontSizeControllableArea">
    <style id="heroAfterStyle">
    </style>
    <?php
    require_once("./partials/header.php");
    require_once("../model/fetchArticle.php");
    require_once("../controller/simplifyArticleContent.php");
    require_once("../model/fetchCarousel.php");

    $indexBGstyle = "#hero::after {content: \"\";position: absolute;left: 50%;top: -3%;width: 130%;height: 95%;" .
        "background: linear-gradient(to right, rgba(0, 0, 0, 0.03), rgba(0, 0, 0, 0.18)), " .
        "url(\"../public/assets/img/stylizedPhoenix.jpg\") center center no-repeat;background-size: cover;" .
        "filter: blur(0px);z-index: 0;border-radius: 0 0 50% 50%;transform: translateX(-50%) rotate(0deg);}";
    // echo "<style>" . $indexBGstyle . "</style>";
    ?>

    <!-- ======= 首頁頭條報導輪播區 ======= -->
    <section id="hero" class="d-flex justify-cntent-center align-items-center">
        <div id="heroCarousel" class="container index-carousel swiper">

            <?php
            $carouselArticlesID = fetchCarouselWithID(getPeriodParam());
            // 獲取本期的後臺排序過順序的輪播文章ID

            if (strcmp($carouselArticlesID, "Error") != 0) {
                // https://www.php.net/manual/en/function.strcmp.php
                $carouselArticlesID = explode(",", $carouselArticlesID);

                $carouselArticles = array(); // 使用後台輪播圖表格來依序抓取文章資料
                foreach ($carouselArticlesID as $id) {
                    $article = fetchFullArticle_WithID($id);
                    array_push($carouselArticles, $article[0]);
                    // 整理多篇文章資料成為和fetchIndexCarouselArticleList()一樣的二維陣列格式
                }

                $carouselAmount = sizeof($carouselArticles); // 獲取本期後台設定的輪播文章數量
            } else {
                $carouselArticles = fetchIndexCarouselArticleList(getPeriodParam());
                // 用舊版預設抓取3篇頭條與特別報導的方式來抓取輪播文章資料
                $carouselAmount = 3;
            }

            echo '<div class="swiper-wrapper">';

            for ($i = 0; $i < $carouselAmount; $i++) {
                if ($i == 0)
                    echo '<!-- Single Slide --><div class="swiper-slide"><div class="carousel-container">';
                else
                    echo '<!-- Single Slide --><div class="swiper-slide"><div class="carousel-container">';

                if ($i >= sizeof($carouselArticles)) {
                    echo '<h2 class="animate__animated animate__fadeInDown">敬請期待本期更多精采文章</h2>';
                    echo '<p class="animate__animated animate__fadeInUp">更多優質報導正在撰寫中......</p>';
                    echo '<a href="#" class="btn-get-started animate__animated animate__fadeInUp">我很期待</a>';
                    echo '</div></div>';

                    echo "<div hidden id=\"carouselStyle$i\">";
                    echo "#hero::after {content: \"\";position: absolute;left: 50%;top: -3%;width: 130%;height: 95%;" .
                        "background: linear-gradient(to right, rgba(0, 0, 0, 0.03), rgba(0, 0, 0, 0.18)), " .
                        "url(\"../public/assets/img/stylizedPhoenix.jpg\") center center no-repeat;background-size: cover;" .
                        "filter: blur(0px);z-index: 0;border-radius: 0 0 50% 50%;transform: translateX(-50%) rotate(0deg);}</div>";
                    break;
                } else {
                    // https://stackoverflow.com/questions/9393885/how-to-replace-multiple-items-from-a-text-string-in-php
                    $subjectSplitter = [",", "、", ":", "(", "「", "」", "-", " "];
                    $replacedWords = [",<br>", "、<br>", ":<br>", "<br>(", "<br>「", "」<br>", "-<br>", "<br>"];

                    echo '<h2 class="animate__animated animate__fadeInDown">' .
                        str_replace($subjectSplitter, $replacedWords, $carouselArticles[$i]["subject"]) . '</h2>';

                    echo '<p class="animate__animated animate__fadeInUp">' . simplifyArticleContent($carouselArticles[$i]["quillcontent"], 36) . '</p>';
                    echo '<a href="#article' . $carouselArticles[$i]["id"] . '" class="indexReadmoreButton btn-get-started animate__animated animate__fadeInUp">閱讀更多</a>';
                    echo '</div></div>';

                    // 以下解析該文章的圖片，取第一張圖片放到隱藏的<div>(div要給id)
                    // 供給js讀取該報導的<div>並於輪播圖更新時放到<style>裡面
                    $articelPhotos = $carouselArticles[$i]["cover"];
                    $pLinks = explode(",", $articelPhotos); // split string by ","
                    $pLink = "";
                    for ($j = 0; $j < count($pLinks); $j++) {
                        if ($pLinks[$j] == "" && $j == count($pLinks) - 1) {
                            // check if the last photo is still empty
                            $pLink =  "../public/assets/img/stylizedPhoenix.jpg";
                        } else if ($pLinks[$j] != "") {
                            $pLink = $pLinks[$j];
                            $pLink =  "../public/image/$pLink";
                            break; // only show the first photo
                        }
                    }
                    echo "<div hidden id=\"carouselStyle$i\">";
                    echo "#hero::after {content: \"\";position: absolute;left: 50%;top: -3%;width: 130%;height: 95%;" .
                        // "background: linear-gradient(#fff, #000)," .
                        "background: linear-gradient(to right, rgba(0, 0, 0, 0.03), rgba(0, 0, 0, 0.18)), " .
                        "url(\"$pLink\") bottom center no-repeat, " .
                        "url(\"../public/assets/img/stylizedPhoenix.jpg\") center center no-repeat;" .
                        "background-size: cover, contain;"; // 疊在上方的圖片大小可以考慮使用contain
                    // 疊圖參考:https://www.w3schools.com/css/css3_backgrounds.asp
                    // 背景圖大小調整:https://www.w3schools.com/cssref/css3_pr_background-size.asp
                    if ($pLink == "../public/assets/img/stylizedPhoenix.jpg")
                        echo "filter: blur(0px);z-index: 0;border-radius: 0 0 50% 50%;transform: translateX(-50%) rotate(0deg);}</div>";
                    else
                        // 取消模糊效果，已改用將期刊cover疊圖到校園背景上
                        echo "filter: blur(0px);z-index: 0;border-radius: 0 0 50% 50%;transform: translateX(-50%) rotate(0deg);}</div>";
                }
            }
            echo '</div>';
            ?>

            <div class="swiper-button-prev"></div>
            <div class="swiper-button-next"></div>

            <!-- <a class="carousel-control-prev" href="#heroCarousel" role="button" data-bs-slide="prev">
                <span class="carousel-control-prev-icon bx bx-chevron-left" aria-hidden="true"></span>
            </a>
            <a class="carousel-control-next" href="#heroCarousel" role="button" data-bs-slide="next">
                <span class="carousel-control-next-icon bx bx-chevron-right" aria-hidden="true"></span>
            </a> -->


        </div>
    </section><!-- 首頁頭條報導輪播區 -->

    <!-- 只在最新期別顯示公告訊息 -->
    <div class="announcement" <?php if (getPeriodParam() != "") echo " hidden"; ?>>
        <p id="announcementText">
        <h3 class="center"><strong>最新公告</strong></h3>
        <!-- https://www.wibibi.com/info.php?tid=68 -->
        <marquee scrollamount="6">
            <strong>
                <?php
                require("./../model/config.php");

                $annoucnementText = file_get_contents($apiURL . "announcement");

                if ($annoucnementText === false) {
                    //https://stackoverflow.com/questions/272361/how-can-i-handle-the-warning-of-file-get-contents-function-in-php
                    $annoucnementText = '{"results":[{"id":1,"text":"很抱歉後端API Server異常 目前無法取得公告訊息","dateTime":"1969-06-09T00:00:00.000Z"}]}';
                } else if ($annoucnementText == '{"results":[]}') {
                    $annoucnementText = '{"results":[{"id":1,"text":"目前尚未有公告訊息","dateTime":"1999-09-09T00:00:00.000Z"}]}';
                }

                $jsonObj = json_decode($annoucnementText, true);
                // https://www.w3schools.com/php/func_json_decode.asp

                $rows = $jsonObj["results"];
                foreach ($rows as $row) {
                    $dt = new DateTime($row["dateTime"]);
                    $formattedDate = $dt->format('Y-m-d H:i');
                    // https://stackoverflow.com/questions/10569053/convert-datetime-to-string-php

                    echo $row["text"] . " — <i class=\"bx bx-time\"></i>" . $formattedDate . "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;";
                }

                ?>
            </strong>
        </marquee>
        </p>
    </div>

    <main id="main">

        <!-- ======= 首頁橫幅大區塊 ======= -->
        <section class="why-us section-bg" data-aos="fade-up" date-aos-delay="200">
            <div class="container">
                <div class="row">
                    <?php
                    $latestArticle =  fetchLatestHeadlineArticleInCurrentPeriod(getPeriodParam());
                    ?>

                    <div class="col-lg-6 d-flex flex-column justify-content-center p-5">
                        <h2>頭條報導</h2><br>

                        <?php
                        if (gettype($latestArticle) == "string") {
                            echo "<h3>" . $latestArticle . "</h3>";
                        } else {
                            $id = $latestArticle[0]["id"];
                            echo "<h3>" . $latestArticle[0]["subject"] . "</h3>";
                            echo "<p class=\"description\">" . simplifyArticleContent($latestArticle[0]["quillcontent"], 168)
                                . "<br><a href=\"fullArticlePage.php?id=$id\">更多資訊</a> </p>";
                        }
                        ?>
                    </div>

                    <div class="col-lg-6 text-center">
                        <?php
                        if (gettype($latestArticle) == "string") {
                            echo "<img src=\"../public/assets/img/ntunhs-overview.jpg\" class=\"img-fluid\" alt=\"北護校本部空中鳥瞰圖\">";
                        } else {
                            // split string by ","
                            $photoLinks = explode(",", $latestArticle[0]["cover"]);
                            $photoLink = "";
                            for ($i = 0; $i < count($photoLinks); $i++) {
                                if ($photoLinks[$i] == "" && $i == count($photoLinks) - 1) {
                                    // check if the last photo is still empty
                                    $photoLink =  "<img src=\"../public/assets/img/ntunhs-overview.jpg\" class=\"img-fluid\" alt=\"北護校本部空中鳥瞰圖\">";
                                } else if ($photoLinks[$i] != "") {
                                    $photoLink = $photoLinks[$i];
                                    $photoLink =  "<img src=\"../public/image/$photoLink\" class=\"cropImg\" alt=\"" . $latestArticle[0]["subject"] . "\">";
                                    break; // only show the first photo
                                }
                            }
                            echo $photoLink;
                        }
                        ?>
                    </div>
                </div>

            </div>
        </section><!-- 首頁橫幅區塊 -->

        <!-- ======= 首頁各區塊標題 ======= -->
        <section class="features">
            <div class="container">
                <div class="section-title">
                    <h2>本期所有文章概覽</h2>
                </div>
            </div>
        </section><!-- 首頁各區塊標題 -->

        <!-- ======= Service Details Section ======= -->
        <section class="service-details">
            <div class="container">

                <div class="row">
                    <?php
                    $articles = fetchArticleList(getPeriodParam(), "");

                    foreach ($articles as $article) {
                        $photoLinks = explode(",", $article["cover"]); // split string by ","
                        $photoLink = "";
                        for ($i = 0; $i < count($photoLinks); $i++) {
                            if ($photoLinks[$i] == "" && $i == count($photoLinks) - 1) {
                                // check if the last photo is still empty
                                $photoLink =  "../public/assets/img/ntunhs-overview.jpg";
                            } else if ($photoLinks[$i] != "") {
                                $photoLink = $photoLinks[$i];
                                $photoLink =  "../public/image/$photoLink";
                                break; // only show the first photo
                            }
                        }

                        echo '<div class="col-lg-4 col-md-6 d-flex align-items-stretch center" data-aos="fade-up" id="article' . $article["id"] . '">';
                        echo '<div class="card"><div class="card-img">';
                        echo '<img class="all-article-images" src="' . $photoLink . '" alt="文章的圖片">';
                        echo '</div><div class="card-body">';
                        echo '<h5 class="card-title"><a href="fullArticlePage.php?id=' . $article["id"] . '">' . $article["subject"] . '</a></h5>';
                        echo '<div class="read-more"><a href="categoriesSummaryAll.php?category=' . $article["categoryID"] . '&id=' . $article["id"] . '">';

                        echo '<i class="bi bi-arrow-right"></i>前往查看歷期<font style="color:#FF8686">';
                        foreach ($categories as $category) {
                            if ($category["id"] == $article["categoryID"]) {
                                echo $category["name"];
                                break;
                            }
                        }
                        echo '</font>文章</a></div></div></div></div>';
                    }
                    ?>
                </div>

            </div>
        </section><!-- End Service Details Section -->

        <!-- ======= 輪播區 =======
        <section class="testimonials" data-aos="fade-up">
            <div class="container">
                <div class="section-title">
                    <h2>輪播區</h2>
                    <p>輪播區內文OwOdsdsfdgsgd</p>
                </div>

                <div class="testimonials-carousel swiper">
                    <div class="swiper-wrapper">
                        <div class="testimonial-item swiper-slide">
                            <img src="../public/image/217/headline1-2.png" class="img-fluid" alt="">
                            <h3>輪播區塊標題</h3>
                            <h4>輪播區塊副標題</h4>
                            <p>
                                <i class="bx bxs-quote-alt-left quote-icon-left"></i>
                                輪播區塊1內文owowwdewrfewf
                                <i class="bx bxs-quote-alt-right quote-icon-right"></i>
                            </p>
                        </div>

                        <div class="testimonial-item swiper-slide">
                            <img src="../public/assets/img/testimonials/testimonials-2.jpg" class="img-fluid" alt="">
                            <h3>Sara Wilsson</h3>
                            <h4>Designer</h4>
                            <p>
                                <i class="bx bxs-quote-alt-left quote-icon-left"></i>
                                輪播區塊3內文owowwdewrfewf
                                <i class="bx bxs-quote-alt-right quote-icon-right"></i>
                            </p>
                        </div>

                    </div>
                    <div class="swiper-pagination"></div>
                </div>
            </div>
        </section>輪播區 -->

    </main><!-- End #main -->

    <?php
    require_once("./partials/footer.php");
    ?>

</body>

</html>