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


    $indexBGstyle = "#hero::after {content: \"\";position: absolute;left: 50%;top: -3%;width: 130%;height: 95%;" .
        "background: linear-gradient(to right, rgba(0, 0, 0, 0.36), rgba(0, 0, 0, 0.69)), " .
        "url(\"../public/assets/img/ntunhs-frontDoor2.png\") center center no-repeat;background-size: cover;" .
        "filter: blur(3px);z-index: 0;border-radius: 0 0 50% 50%;transform: translateX(-50%) rotate(0deg);}";
    // echo "<style>" . $indexBGstyle . "</style>";
    ?>

    <!-- ======= 首頁頭條報導輪播區 ======= -->
    <section id="hero" class="d-flex justify-cntent-center align-items-center">
        <div id="heroCarousel" class="container carousel carousel-fade" data-bs-ride="carousel" data-bs-interval="5000">

            <!-- Slide 1 -->
            <div class="carousel-item active">
                <div class="carousel-container">
                    <h2 class="animate__animated animate__fadeInDown">北護69榮耀雙喜<br>學思爾雅二樓啟用</h2>
                    <p class="animate__animated animate__fadeInUp">
                        國立臺北護理健康大學創校邁進69週年，今年校慶......
                    </p>
                    <a href="#headline1" class="btn-get-started animate__animated animate__fadeInUp">閱讀更多</a>
                </div>
            </div>

            <!-- Slide 2 -->
            <div class="carousel-item">
                <div class="carousel-container">
                    <h2 class="animate__animated animate__fadeInDown">高教深耕成果分享會<br>暨成果海報展</h2>
                    <p class="animate__animated animate__fadeInUp">
                        國立臺北護理健康大學於11月24日至26日連續三天，於親仁樓前川堂設有靜態海報成果展，同時於11月24日下午2時在校本部親仁樓B118舉行......
                    </p>
                    <a href="#headline2" class="btn-get-started animate__animated animate__fadeInUp">閱讀更多</a>
                </div>
            </div>

            <!-- Slide 3 -->
            <div class="carousel-item">
                <div class="carousel-container">
                    <h2 class="animate__animated animate__fadeInDown">教育部委員蒞校訪視<br>北護大招生選才作業獲肯定</h2>
                    <p class="animate__animated animate__fadeInUp">
                        教育部委員於110年11月16日蒞臨國立臺北護理健康大校訪視招生選才計畫執行情形，由簡良翰執行長、李傳房教授、張嘉育教授等一行5人蒞校訪視......
                    </p>
                    <a href="#headline3" class="btn-get-started animate__animated animate__fadeInUp">閱讀更多</a>
                </div>
            </div>

            <a class="carousel-control-prev" href="#heroCarousel" role="button" data-bs-slide="prev">
                <span class="carousel-control-prev-icon bx bx-chevron-left" aria-hidden="true"></span>
            </a>

            <a class="carousel-control-next" href="#heroCarousel" role="button" data-bs-slide="next">
                <span class="carousel-control-next-icon bx bx-chevron-right" aria-hidden="true"></span>
            </a>

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
                            require_once("../controller/simplifyArticleContent.php");

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
                                if ($photoLinks[$i] != "" && $i == count($photoLinks) - 1) {
                                    // check if the last photo is still empty
                                    $photoLink =  "<img src=\"../public/assets/img/ntunhs-overview.jpg\" class=\"img-fluid\" alt=\"北護校本部空中鳥瞰圖\">";
                                } else if ($photoLinks[$i] != "") {
                                    $photoLink = $photoLinks[$i];
                                    $photoLink =  "<img src=\"../periodical_data/$photoLink\" class=\"img-fluid\" alt=\"" . $latestArticle[0]["subject"] . "\">";
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
                    <h2>本期所有文章蓋覽</h2>
                </div>
            </div>
        </section><!-- 首頁各區塊標題 -->

        <!-- ======= Service Details Section ======= -->
        <section class="service-details">
            <div class="container">

                <div class="row">
                    <div class="col-md-4 d-flex align-items-stretch" data-aos="fade-up" id="headline1">
                        <div class="card">
                            <div class="card-img">
                                <img src="../public/assets/img/service-details-1.jpg" alt="...">
                            </div>
                            <div class="card-body">
                                <h5 class="card-title"><a href="#">北護69榮耀雙喜 學思爾雅二樓啟用</a></h5>
                                <p class="card-text">
                                    國立臺北護理健康大學創校邁進69週年...<br>Ya 69讚!
                                </p>
                                <div class="read-more"><a href="fullArticlePage.php?id="><i class="bi bi-arrow-right"></i> Read More</a>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="col-md-4 d-flex align-items-stretch" data-aos="fade-up">
                        <div class="card">
                            <div class="card-img">
                                <img src="../public/assets/img/service-details-4.jpg" alt="...">
                            </div>
                            <div class="card-body">
                                <h5 class="card-title"><a href="#">文章2標題</a></h5>
                                <p class="card-text">內文OwO ~fldsfdksgkfdjklfsdgjfkdlgjdf</p>
                                <div class="read-more"><a href="fullArticlePage.php?id="><i class="bi bi-arrow-right"></i> Read More</a>
                                </div>
                            </div>
                        </div>
                    </div>
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