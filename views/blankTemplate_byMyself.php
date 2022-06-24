<!DOCTYPE html>
<html lang="zh-Hant">

<?php
require_once("partials/head.php");
?>

<body id="fontSizeControllableArea">

  <?php
  require_once("partials/header.php");
  ?>

  <main id="main">
    <!-- ======= 麵包屑區塊 ======= -->
    <section class="breadcrumbs">
      <div class="container">

        <div class="d-flex justify-content-between align-items-center">
          <h2>空白頁面</h2>

          <ol>
            <li><a href="index.php">首頁</a></li>
            <li>空白頁面</li>
          </ol>
        </div>

      </div>
    </section><!-- 麵包屑區塊結尾 -->

    <!-- ======= Blog Section ======= -->
    <section id="blog" class="blog">
      <div class="container" data-aos="fade-up">

        <div class="row">
          <div class="col-lg-12 entries">
            <article class="entry">

              <div class="entry-img">
                <img src="../public/assets/img/blog/blog-3.jpg" alt="" class="img-fluid">
              </div>

              <h2 class="entry-title">
                <a href="fullArticlePage.php">文章標題</a>
              </h2>

              <div class="entry-meta">
                <ul>
                  <li class="d-flex align-items-center"><i class="bi bi-person"></i> <a href="fullArticlePage.php">Editor</a></li>
                  <li class="d-flex align-items-center"><i class="bi bi-clock"></i> <a href="fullArticlePage.php"><time datetime="2020-01-01">Jan 1, 2020</time></a></li>
                  <li class="d-flex align-items-center"><i class="bi bi-chat-dots"></i> <a href="fullArticlePage.php">12
                      Comments</a></li>
                </ul>
              </div>

              <div class="entry-content">
                <p>
                  內文OwO lkodkdlfekgritrjtiewutirw
                </p>
                <div class="read-more">
                  <a href="fullArticlePage.php">瀏覽全文</a>
                </div>
              </div>

            </article><!-- End blog entry -->

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
  require_once("./partials/footer.php");
  ?>

</body>

</html>