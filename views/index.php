<!DOCTYPE html>
<html lang="zh-Hant">

<?php
require_once("./partials/head.php");
?>

<body>
    <style id="heroAfterStyle">
    </style>
    <?php
    require_once("./partials/header.php");
    require_once("../model/fetchArticle.php");
    require_once("../controller/simplifyArticleContent.php");

    $indexBGstyle = "#hero::after {content: \"\";position: absolute;left: 50%;top: -3%;width: 130%;height: 95%;" .
        "background: linear-gradient(to right, rgba(0, 0, 0, 0.03), rgba(0, 0, 0, 0.18)), " .
        "url(\"../public/assets/img/ntunhs-frontDoor2.png\") center center no-repeat;background-size: cover;" .
        "filter: blur(0px);z-index: 0;border-radius: 0 0 50% 50%;transform: translateX(-50%) rotate(0deg);}";
    // echo "<style>" . $indexBGstyle . "</style>";
    ?>

    <!-- ======= 首頁頭條報導輪播區 ======= -->
    <section id="hero" class="d-flex justify-cntent-center align-items-center">
        <div id="heroCarousel" class="container index-carousel swiper">

            <?php
            echo '<div class="swiper-wrapper">';
            $carouselArticles = fetchIndexCarouselArticleList(getPeriodParam());

            for ($i = 0; $i < 3; $i++) {
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
                        "url(\"../public/assets/img/ntunhs-frontDoor2.png\") center center no-repeat;background-size: cover;" .
                        "filter: blur(0px);z-index: 0;border-radius: 0 0 50% 50%;transform: translateX(-50%) rotate(0deg);}</div>";
                    break;
                } else {
                    echo '<h2 class="animate__animated animate__fadeInDown">' . $carouselArticles[$i]["subject"] . '</h2>';
                    echo '<p class="animate__animated animate__fadeInUp">' . simplifyArticleContent($carouselArticles[$i]["quillcontent"], 36) . '</p>';
                    echo '<a href="#article' . $carouselArticles[$i]["id"] . '" class="btn-get-started animate__animated animate__fadeInUp">閱讀更多</a>';
                    echo '</div></div>';

                    // 以下解析該文章的圖片，取第一張圖片放到隱藏的<div>(div要給id)
                    // 供給js讀取該報導的<div>並於輪播圖更新時放到<style>裡面
                    $articelPhotos = $carouselArticles[$i]["photo"];
                    $pLinks = explode(",", $articelPhotos); // split string by ","
                    $pLink = "";
                    for ($j = 0; $j < count($pLinks); $j++) {
                        if ($pLinks[$j] == "" && $j == count($pLinks) - 1) {
                            // check if the last photo is still empty
                            $pLink =  "../public/assets/img/ntunhs-frontDoor2.png";
                        } else if ($pLinks[$j] != "") {
                            $pLink = $pLinks[$j];
                            $pLink =  "../periodical_data/$pLink";
                            break; // only show the first photo
                        }
                    }
                    echo "<div hidden id=\"carouselStyle$i\">";
                    echo "#hero::after {content: \"\";position: absolute;left: 50%;top: -3%;width: 130%;height: 95%;" .
                        "background: linear-gradient(to right, rgba(0, 0, 0, 0.03), rgba(0, 0, 0, 0.18)), " .
                        "url(\"$pLink\") center center no-repeat;background-size: cover;";
                    if ($pLink == "../public/assets/img/ntunhs-frontDoor2.png")
                        echo "filter: blur(0px);z-index: 0;border-radius: 0 0 50% 50%;transform: translateX(-50%) rotate(0deg);}</div>";
                    else
                        echo "filter: blur(3px);z-index: 0;border-radius: 0 0 50% 50%;transform: translateX(-50%) rotate(0deg);}</div>";
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

    <main id="main">

        <!-- ======= 首頁橫幅大區塊 ======= -->
        <section class="why-us section-bg" data-aos="fade-up" date-aos-delay="200">
            <div class="container">
                <div class="row">
                    <?php
                    $latestArticle =  fetchLatestArticleInCurrentPeriod(getPeriodParam());
                    ?>

                    <div class="col-lg-6 d-flex flex-column justify-content-center p-5">
                        <h2>最新消息</h2><br>

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
                            $photoLinks = explode(",", $latestArticle[0]["photo"]);
                            $photoLink = "";
                            for ($i = 0; $i < count($photoLinks); $i++) {
                                if ($photoLinks[$i] == "" && $i == count($photoLinks) - 1) {
                                    // check if the last photo is still empty
                                    $photoLink =  "<    img src=\"../public/assets/img/ntunhs-overview.jpg\" class=\"img-fluid\" alt=\"北護校本部空中鳥瞰圖\">";
                                } else if ($photoLinks[$i] != "") {
                                    $photoLink = $photoLinks[$i];
                                    $photoLink =  "<img src=\"../periodical_data/$photoLink\" class=\"cropImg\" alt=\"" . $latestArticle[0]["subject"] . "\">";
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
                        $photoLinks = explode(",", $article["photo"]); // split string by ","
                        $photoLink = "";
                        for ($i = 0; $i < count($photoLinks); $i++) {
                            if ($photoLinks[$i] == "" && $i == count($photoLinks) - 1) {
                                // check if the last photo is still empty
                                $photoLink =  "../public/assets/img/ntunhs-overview.jpg";
                            } else if ($photoLinks[$i] != "") {
                                $photoLink = $photoLinks[$i];
                                $photoLink =  "../periodical_data/$photoLink";
                                break; // only show the first photo
                            }
                        }

                        echo '<div class="col-md-4 d-flex align-items-stretch" data-aos="fade-up" id="article' . $article["id"] . '">';
                        echo '<div class="card"><div class="card-img">';
                        echo '<img src="' . $photoLink . '" alt="文章的圖片" width="600px" height="369px">';
                        echo '</div><div class="card-body">';
                        echo '<h5 class="card-title"><a href="fullArticlePage.php?id=' . $article["id"] . '">' . $article["subject"] . '</a></h5>';
                        echo '<div class="read-more"><a href="categoriesSummary.php?category=' . $article["categoryID"] . '&period=' . getPeriodParam() . '">';
                        echo '<i class="bi bi-arrow-right"></i>前往查看同類別報導</a></div></div></div></div>';
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
                            <img src="../periodical_data/217/headline1-2.png" class="img-fluid" alt="">
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