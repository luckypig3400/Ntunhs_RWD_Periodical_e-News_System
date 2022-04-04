<!DOCTYPE html>
<html lang="zh-Hant">

<?php
require_once("partials/head.php");
?>

<body>

  <?php
  require_once("partials/header.php");
  ?>

  <main id="main">
    <!-- ======= 麵包屑區塊 ======= -->
    <section class="breadcrumbs">
      <div class="container">

        <div class="d-flex justify-content-between align-items-center">
          <h2>搜尋頁面</h2>

          <ol>
            <li><a href="index.php">首頁</a></li>
            <li>搜尋頁面</li>
          </ol>
        </div>

      </div>
    </section><!-- 麵包屑區塊結尾 -->

    <!-- ======= Blog Section ======= -->
    <section id="blog" class="blog">
      <!-- 搜尋欄區塊 -->
      <div class="container" data-aos="fade-up">
        <div class="sidebar col-lg-12 entries">
          <h3 class="sidebar-title">搜尋</h3>
          <div class="sidebar-item search-form">
            <form action="">
              <input type="text">
              <button type="submit"><i class="bi bi-search"></i></button>
            </form>
          </div><!-- End sidebar search formn-->

          <h3 class="sidebar-title">文章分類</h3>
          <div class="sidebar-item categories">
            <ul>
              <li><a href="#">頭條新聞<span>(3)</span></a></li>
              <li><a href="#">特別報導<span>(5)</span></a></li>
              <li><a href="#">校園尚青<span>(5)</span></a></li>
              <li><a href="#">心靈立可白<span>(2)</span></a></li>
              <li><a href="#">業務報導<span>(1)</span></a></li>
            </ul>
          </div><!-- End sidebar categories-->

          <h3 class="sidebar-title">選擇期別</h3>
          <div class="sidebar-item tags">
            <ul>
              <li><a href="#">217</a></li>
              <li><a href="#">216</a></li>
              <li><a href="#">215</a></li>
              <li><a href="#">214</a></li>
              <li><a href="#">213</a></li>
              <li><a href="#">212</a></li>
            </ul>
          </div><!-- End sidebar tags-->

        </div><!-- 搜尋欄區塊 -->
      </div>
    </section><!-- End Blog Section -->

  </main><!-- End #main -->

  <?php
  require_once("partials/footer.php");
  ?>

</body>

</html>