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
          <?php
          $currentCategory = fetchCategoryWithID(getCategoryParam());
          echo "<h2>歷期$currentCategory</h2>";
          ?>

          <ol>
            <li><a href="index.php">首頁</a></li>
            <?php
            echo "<li>歷期$currentCategory</li>";
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
              echo "<h2>歷期$currentCategory</h2>";
              ?>
            </div>

            <?php
            require_once("../model/fetchArticle.php");

            $startID = getIDparam();
            $currentCategoryID = getCategoryParam();
            $articles = fetchCategorySummaryArticleList($currentCategoryID, $startID);

            if (gettype($articles) == "string") {
              echo "<h3>$articles</h3>";
            } else {
              require_once("partials/sections/blog-article-entry.php");
              foreach ($articles as $article) {
                blogArticleEntryBlock($article);
              }
            }
            ?>

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