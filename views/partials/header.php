<!-- ======= Header ======= -->
<header id="header" class="fixed-top d-flex align-items-center 
<?php
// https://stackoverflow.com/questions/13032930/how-to-get-current-php-page-name/13032941
if (basename($_SERVER['PHP_SELF']) == "index.php") echo "header-transparent";
?>
">
    <div class="container d-flex justify-content-between align-items-center">

        <div class="logo">
            <h1 class="text-light"><a href="index.php"><span>北護校訊電子期刊</span></a></h1>
            <!-- Uncomment below if you prefer to use an image logo -->
            <!-- <a href="index.php"><img src="../public/assets/img/logo.png" alt="" class="img-fluid"></a>-->
        </div>

        <nav id="navbar" class="navbar">
            <?php
            require_once("../controller/parseGETparams.php");
            $parsedGETparams = parseGETparams();
            ?>

            <ul>
                <li><a id="indexLink" class="active " href="index.php">首頁</a></li>
                <?php
                $period_GET = getPeriodParam();
                if ($period_GET != "") {
                    echo "<li><a id=\"C01Link\" href=\"categoriesSummary.php?category=C01&period=" . $period_GET . "\">頭條新聞</a></li>";
                    echo "<li><a id=\"C02Link\" href=\"categoriesSummary.php?category=C02&period=" . $period_GET . "\">特別報導</a></li>";
                } else {
                    echo "<li><a id=\"C01Link\" href=\"categoriesSummary.php?category=C01\">頭條新聞</a></li>";
                    echo "<li><a id=\"C02Link\" href=\"categoriesSummary.php?category=C02\">特別報導</a></li>";
                }
                ?>
                <li class="dropdown"><a id="otherCategories" href="#"><span>其他分類</span><i class="bi bi-chevron-down"></i></a>
                    <ul>
                        <?php
                        require_once("../model/fetchCategories.php");

                        $categories = fetchCategories();
                        // print_r($categories);
                        foreach ($categories as $row) {
                            if ($row["id"] != "C01" && $row["id"] != "C02") {
                                if ($period_GET != "") {
                                    echo "<li><a id=\"" . $row["id"] . "Link\" href=\"categoriesSummary.php?category=" . $row["id"] . "&period=" . $period_GET . "\">" . $row["name"] . "</a></li>";
                                } else {
                                    echo "<li><a id=\"" . $row["id"] . "Link\" href=\"categoriesSummary.php?category=" . $row['id'] . "\">" . $row['name'] . "</a></li>";
                                }
                            }
                        }
                        ?>
                    </ul>
                </li>
                <li class="dropdown"><a href="#"><span>字體調整</span> <i class="bi bi-chevron-down"></i></a>
                    <!-- 字體放大與縮小還與更換背景主題可以參考此網站:https://kenming.gitlab.io/software-requirement-analysis/ch1/functional-vs-nonfunctional-requirement.php -->
                    <ul>
                        <li><a href="#" id="incFontSize" class="scrollto" onclick="increaseAllfontSize()"><span><i class="bi bi-fonts"></i>+</span></a></li>
                        <li><a href="#" id="decFontSize" class="scrollto" onclick="decreaseAllfontSize()"><span><i class="bi bi-fonts"></i>-</span></a></li>
                        <li><a href="#" id="resetFont" class="scrollto" onclick="resetAllfontSize()">重設字體</a></li>
                    </ul>
                </li>
                <li class="dropdown"><a href="#dontReload"><span>選擇期別</span> <i class="bi bi-chevron-down"></i></a>
                    <ul>
                        <?php
                        require_once("../model/fetchPeriodNumbers.php");

                        $periods = fetchPeriodNumbers();
                        $periodsNumbers = array();
                        foreach ($periods as $row) {
                            array_push($periodsNumbers, (int)$row["periodNumber"]);
                        }

                        arsort($periodsNumbers); // sort array in descending order
                        // https://www.php.net/manual/en/array.sorting.php

                        foreach ($periodsNumbers as $periodNumber) {
                            echo "<li><a href=\"index.php?period=" . $periodNumber . "\">第" . $periodNumber . "期校訊</a></li>";
                        }
                        ?>
                    </ul>
                </li>
                <li><a href="#footer" class="scrollto">我要投稿</a></li>
                <li><a href="search.php"><i class="bi bi-search"></i></a></li>
            </ul>
            <i class="bi bi-list mobile-nav-toggle"></i>
        </nav><!-- .navbar -->

    </div>
</header><!-- End Header -->