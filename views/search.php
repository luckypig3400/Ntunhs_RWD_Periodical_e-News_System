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

          <!-- https://www.w3schools.com/howto/howto_css_stacked_form.asp -->
          <form class="searchForm" action="">
            <h3 class="blog-title">文字搜尋</h3>
            <textarea id="searchTextInput" name="searchText" placeholder="請輸入想搜尋的關鍵字或句子，將為您於指定範圍內搜索符合的內文或標題"></textarea>
            <br><br>
            <h3 class="blog-title">文章分類</h3>
            <div class="sidebar-title categories tags">
              <ul>
                <li><a href="#">頭條新聞</a></li>
                <li><a href="#">特別報導</a></li>
                <li><a href="#">校園尚青</a></li>
                <li><a href="#">心靈立可白</a></li>
                <li><a href="#">業務報導</a></li>
              </ul>
            </div><!-- End sidebar categories-->
            <br>
            <h3 class="blog-title">選擇期別</h3>
            <select id="country" name="country">
              <option value="all">在所有期別內搜索</option>
              <option value="219">第219期</option>
              <option value="218">第218期</option>
              <option value="217">第217期</option>
            </select>

            <input type="submit" value="送出查詢">
          </form>

          <h3 class="blog-title">選擇期別</h3>
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