<!DOCTYPE html>
<html lang="zh-Hant">

<?php
require("partials/head.php");
?>

<body>

  <?php
  require("partials/header.php");
  ?>

  <main id="main">
    <!-- ======= 麵包屑區塊 ======= -->
    <section class="breadcrumbs">
      <div class="container">

        <div class="d-flex justify-content-between align-items-center">
          <h2>頭條新聞</h2>

          <ol>
            <li><a href="index.php">首頁</a></li>
            <?php
            $currentCategory = fetchCategoryWithID(getCategoryParam());
            echo "<li>$currentCategory</li>";
            ?>
          </ol>
        </div>

      </div>
    </section><!-- 麵包屑區塊結尾 -->

    <!-- ======= Blog Section ======= -->
    <section id="blog" class="blog">
      <div class="container" data-aos="fade-up">

        <div class="row">
          <div class="col-lg-12 entries">

            <div class="section-title">
              <?php
              echo "<h2>$currentCategory</h2>";
              ?>
            </div>

            <?php
            require("../model/fetchArticle.php");

            $currentPeriod = getPeriodParam();
            $currentCategoryID = getCategoryParam();
            $articles = fetchArticleList($currentPeriod, $currentCategoryID);

            echo sizeof($articles) == 0 ? "沒有文章" : "";
            print_r($articles);
            ?>

            <!-- 文章1區塊 -->
            <article class="entry">

              <div class="entry-img text-center">
                <br>
                <img src="../public/assets/img/blog/blog-1.jpg" alt="" class="img-fluid">
              </div>

              <h2 class="entry-title">
                <a href="fullArticlePage.php?category={thisArticleCategory}&period=217&number=1">當期該分類文章一標題</a>
              </h2>

              <div class="entry-meta">
                <ul>
                  <!-- <li class="d-flex align-items-center"><i class="bi bi-person"></i>Editor</li> -->
                  <li class="d-flex align-items-center"><i class="bx bx-pencil">編者</i>教務處 郭心怡</li>
                  <li class="d-flex align-items-center"><i class="bx bx-data">資料</i>學務處</li>
                </ul>
              </div>

              <div class="entry-content">
                <p>
                  當期該分類文章一內文摘要<br>
                  廣瀨淡窗講過一句值得人反覆尋思的話，詩如禪機，在於參悟。這句話改變了我的人生。既然，要想清楚，當期該分類文章內文摘要，到底是一種怎麼樣的存在。培根曾經提過，金錢是個好僕人，但在某些場合也會變成惡主人。這段話讓我所有的疑惑頓時豁然開朗。總結來說，張九齡說過一句著名的話，相知無遠近，萬里尚為鄰。希望大家能從這段話中有所收穫。老子講過，天下難事，必作於易; 天下大事，必作於細。這把視野帶到了全新的高度。
                </p>
                <div class="read-more">
                  <a href="fullArticlePage.php?category={thisArticleCategory}&period=217&number=1">瀏覽全文</a>
                </div>
              </div>

            </article><!-- 文章1區塊 -->

            <!-- 文章2區塊 -->
            <article class="entry">

              <div class="entry-img text-center">
                <br>
                <img src="../public/assets/img/blog/blog-2.jpg" alt="" class="img-fluid">
              </div>

              <h2 class="entry-title">
                <a href="fullArticlePage.php?category={thisArticleCategory}&period=217&number=2">當期該分類文章二標題</a>
              </h2>

              <div class="entry-meta">
                <ul>
                  <!-- <li class="d-flex align-items-center"><i class="bi bi-person"></i>Editor</li> -->
                  <li class="d-flex align-items-center"><i class="bx bx-pencil">編者</i>教務處 鍾明君</li>
                  <li class="d-flex align-items-center"><i class="bx bx-data">資料</i>校務研究辦公室</li>
                </ul>
              </div>

              <div class="entry-content">
                <p>
                  當期該分類文章二內文摘要<br>
                  廣瀨淡窗講過一句值得人反覆尋思的話，詩如禪機，在於參悟。這句話改變了我的人生。既然，要想清楚，當期該分類文章內文摘要，到底是一種怎麼樣的存在。培根曾經提過，金錢是個好僕人，但在某些場合也會變成惡主人。這段話讓我所有的疑惑頓時豁然開朗。總結來說，張九齡說過一句著名的話，相知無遠近，萬里尚為鄰。希望大家能從這段話中有所收穫。老子講過，天下難事，必作於易; 天下大事，必作於細。這把視野帶到了全新的高度。
                </p>
                <div class="read-more">
                  <a href="fullArticlePage.php?category={thisArticleCategory}&period=217&number=2">瀏覽全文</a>
                </div>
              </div>

            </article><!-- 文章2區塊 -->

            <!-- 文章3區塊 -->
            <article class="entry">

              <div class="entry-img text-center">
                <br>
                <img src="../public/assets/img/blog/blog-3.jpg" alt="" class="img-fluid">
              </div>

              <h2 class="entry-title">
                <a href="fullArticlePage.php?category={thisArticleCategory}&period=217&number=3">當期該分類文章三標題</a>
              </h2>

              <div class="entry-meta">
                <ul>
                  <!-- <li class="d-flex align-items-center"><i class="bi bi-person"></i>Editor</li> -->
                  <li class="d-flex align-items-center"><i class="bx bx-pencil">編者</i>教務處 郭心怡</li>
                  <li class="d-flex align-items-center"><i class="bx bx-data">資料</i>教務處招生選才辦公室</li>
                </ul>
              </div>

              <div class="entry-content">
                <p>
                  當期該分類文章三內文摘要<br>
                  廣瀨淡窗講過一句值得人反覆尋思的話，詩如禪機，在於參悟。這句話改變了我的人生。既然，要想清楚，當期該分類文章內文摘要，到底是一種怎麼樣的存在。培根曾經提過，金錢是個好僕人，但在某些場合也會變成惡主人。這段話讓我所有的疑惑頓時豁然開朗。總結來說，張九齡說過一句著名的話，相知無遠近，萬里尚為鄰。希望大家能從這段話中有所收穫。老子講過，天下難事，必作於易; 天下大事，必作於細。這把視野帶到了全新的高度。
                </p>
                <div class="read-more">
                  <a href="fullArticlePage.php?category={thisArticleCategory}&period=217&number=3">瀏覽全文</a>
                </div>
              </div>

            </article><!-- 文章3區塊 -->

            <!-- 文章4區塊 -->
            <article class="entry">

              <div class="entry-img text-center">
                <br>
                <img src="../public/assets/img/blog/blog-4.jpg" alt="" class="img-fluid">
              </div>

              <h2 class="entry-title">
                <a href="fullArticlePage.php?category={thisArticleCategory}&period=217&number=4">當期該分類文章四標題</a>
              </h2>

              <div class="entry-meta">
                <ul>
                  <!-- <li class="d-flex align-items-center"><i class="bi bi-person"></i>Editor</li> -->
                  <li class="d-flex align-items-center"><i class="bx bx-pencil">編者</i>教務處 郭心怡</li>
                  <li class="d-flex align-items-center"><i class="bx bx-data">資料</i>教務處招生選才辦公室</li>
                </ul>
              </div>

              <div class="entry-content">
                <p>
                  當期該分類文章四內文摘要<br>
                  廣瀨淡窗講過一句值得人反覆尋思的話，詩如禪機，在於參悟。這句話改變了我的人生。既然，要想清楚，當期該分類文章內文摘要，到底是一種怎麼樣的存在。培根曾經提過，金錢是個好僕人，但在某些場合也會變成惡主人。這段話讓我所有的疑惑頓時豁然開朗。總結來說，張九齡說過一句著名的話，相知無遠近，萬里尚為鄰。希望大家能從這段話中有所收穫。老子講過，天下難事，必作於易; 天下大事，必作於細。這把視野帶到了全新的高度。
                </p>
                <div class="read-more">
                  <a href="fullArticlePage.php?category={thisArticleCategory}&period=217&number=4">瀏覽全文</a>
                </div>
              </div>
            </article><!-- 文章4區塊 -->

            <div class="blog-pagination">
              <ul class="justify-content-center">
                <li class="active"><a href="#">1</a></li>
                <li><a href="#">2</a></li>
                <li><a href="#">3</a></li>
              </ul>
            </div>
          </div><!-- End blog entries list -->
        </div>

      </div>
    </section><!-- End Blog Section -->

  </main><!-- End #main -->

  <?php
  require("./partials/footer.php");
  ?>

</body>

</html>