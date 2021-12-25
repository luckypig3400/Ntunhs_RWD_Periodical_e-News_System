<!-- 請把我放入<main>裡面 -->

<?php
function video($in_videoTitle, $in_article)
{
    $videoTitle = $in_videoTitle;
    $article = $in_article;
    
    $htmlString = '
    <!-- ======= 影片專欄 ======= -->
        <section class="why-us section-bg" data-aos="fade-up" date-aos-delay="200">
            <div class="container">

                <div class="section-title">
                    <br>
                    <h2>影片測試欄位</h2>
                    <p>測試鑲嵌影片於頁面中，目前使用Youtube連結測試，日後嘗試提供後臺影片連結</p>
                </div>

                <div class="row">
                    <div class="col-lg-6 video-box">
                        <img src="https://ntunhsson.ntunhs.edu.tw/ezfiles/31/1031/img/1213/_DSC4773.jpg" class="img-fluid" alt="">
                        <a href="https://www.youtube.com/watch?v=yWHuwvUpU5k" class="venobox play-btn mb-4" data-vbtype="video" data-autoplay="true"></a>
                    </div>

                    <div class="col-lg-6 d-flex flex-column justify-content-center p-5">

                        <div class="icon-box">
                            <div class="icon"><i class="bx bxs-graduation"></i></div>
                            <h4 class="title"><a href="">109畢業典禮</a></h4>
                            <p class="description">109學年度線上畢業典禮 時間110年6月12日 上午10時開始<br><a href="https://student.ntunhs.edu.tw/files/13-1002-51993-1.php?Lang=zh-tw">更多資訊</a>
                            </p>
                        </div>

                        <div class="icon-box">
                            <div class="icon"><i class="bx bxs-medal"></i></div>
                            <h4 class="title"><a href="">一帆風順 鵬程萬里</a></h4>
                            <p class="description">
                                一顆星劃過，心跳快了兩下，因爲雀躍，一片雪飄落，左眼跳了兩下，因爲欣喜；而今，左眼沒有跳，心卻痛著，因爲我們從此別過！僅次獻給畢業分離的同學們，祝福彼此！</p>
                        </div>

                    </div>
                </div>

            </div>
        </section><!-- 影片專欄 -->
        ';

    echo $htmlString;
}

?>