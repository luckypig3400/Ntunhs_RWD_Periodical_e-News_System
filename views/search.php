<!DOCTYPE html>
<html lang="zh-Hant">

<?php
require_once("partials/head.php");
?>

<body>

  <?php
  require_once("partials/header.php");
  require_once("../model/fetchCategories.php");
  require_once("../model/fetchPeriodNumbers.php");
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

          <div class="section-title">
            <h2>搜尋文章內容</h2>
          </div>

          <!-- https://www.w3schools.com/howto/howto_css_stacked_form.asp -->
          <form class="searchForm" action="">
            <h3 class="blog-title">輸入搜索文字</h3>
            <textarea id="searchTextInput" name="searchText" placeholder="請輸入想搜尋的關鍵字或句子，將為您於指定範圍內搜索符合的內文或標題"></textarea>
            <hr><br>

            <h3 class="blog-title">選擇文章分類</h3>
            <!-- https://codepen.io/sora_12/pen/YzrBNog -->
            <div class="radio_container">
              <input type="radio" name="searchCategory" id="allCategory" value="all" checked>
              <label for="allCategory">全部分類</label>

              <?php
              $categories = fetchCategories();
              foreach ($categories as $category) {
                $id = $category["id"];
                echo '<input type="radio" name="searchCategory" id="' . $id . '" value="' . $id . '">';
                echo '<label for="' . $id . '">' . $category['name'] . '</label>';
              }
              ?>

              <!-- <input type="radio" name="searchCategory" id="C03" value="C03">
              <label for="C03">每月一書</label> -->
            </div>
            <br>
            <hr><br>

            <h3 class="blog-title">選擇文章期別</h3>
            <select id="searchPeriodSelectBox" name="searchPeriod">
              <option value="all">在所有期別內搜索</option>

              <?php
              $periodNumbersString = fetchPeriodNumbers();
              $periodNumbers = array();
              foreach ($periodNumbersString as $pn) {
                array_push($periodNumbers, (int)$pn['periodNumber']);
              }

              sort($periodNumbers);
              for ($i = count($periodNumbers) - 1; $i >= 0; $i--) {
                echo '<option value="' . $periodNumbers[$i] . '">第' . $periodNumbers[$i] . '期</option>';
              }
              ?>

              <!-- <option value="219">第219期</option> -->
            </select>

            <br><br><br>
            <input type="submit" value="送出查詢">
          </form>

        </div><!-- 搜尋欄區塊 -->

      </div>

    </section><!-- End Blog Section -->

  </main><!-- End #main -->

  <?php
  require_once("partials/footer.php");
  ?>

</body>

</html>