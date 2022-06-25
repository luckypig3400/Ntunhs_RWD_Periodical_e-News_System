<!-- ======= Header ======= -->
<header id="header" class="fixed-top d-flex align-items-center 
<?php
// https://stackoverflow.com/questions/13032930/how-to-get-current-php-page-name/13032941
if (basename($_SERVER['PHP_SELF']) == "index.php") echo "header-transparent";
?>
">
    <div class="container d-flex justify-content-between align-items-center">

        <div class="logo">
            <h1 class="text-light"><a href="index.php"><img src="../public/assets/img/ntunhs_logo.png" class="img-fluid"><span>&nbsp;<strong>北護校訊電子期刊</strong></span></a></h1>
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
                    <ul id="otherCategoriesDropdownList">
                        <?php
                        require_once("../model/fetchCategories.php");
                        require_once("../model/fetchPeriodNumbers.php");

                        $categories = fetchCategories();
                        // print_r($categories);
                        foreach ($categories as $row) {
                            if ($row["id"] != "C01" && $row["id"] != "C02") {
                                if ($period_GET != "") {
                                    if ((int)$period_GET >= 219 && $row["id"] == "C03") {
                                        echo ""; // 在219以後隱藏每月一書
                                    } else {
                                        echo "<li><a id=\"" . $row["id"] . "Link\" href=\"categoriesSummary.php?category=" . $row["id"] . "&period=" . $period_GET . "\">" . $row["name"] . "</a></li>";
                                    }
                                } else {
                                    if ((int)fetchLatestPeriodNumbers() >= 219 && $row["id"] == "C03") {
                                        echo ""; // 在219以後隱藏每月一書
                                    } else {
                                        echo "<li><a id=\"" . $row["id"] . "Link\" href=\"categoriesSummary.php?category=" . $row['id'] . "\">" . $row['name'] . "</a></li>";
                                    }
                                }
                            }
                        }
                        if ($period_GET != "")
                            echo "<li><a href=\"categoriesSummary.php?period=" . $period_GET . "\">本期所有文章</a></li>";
                        else
                            echo "<li><a href=\"categoriesSummary.php\">本期所有文章</a></li>";
                        ?>
                    </ul>
                </li>
                <li class="dropdown"><a href="#"><span>字體調整</span> <i class="bi bi-chevron-down"></i></a>
                    <!-- 字體放大與縮小還與更換背景主題可以參考此網站:https://kenming.gitlab.io/software-requirement-analysis/ch1/functional-vs-nonfunctional-requirement.php -->
                    <ul>
                        <li><a href="#" id="incFontSize" class="scrollto" onclick="increaseAllfontSize()"><span><i class="bi bi-fonts"></i>+</span></a></li>
                        <li><a href="#" id="decFontSize" class="scrollto" onclick="decreaseAllfontSize()"><span><i class="bi bi-fonts"></i>-</span></a></li>
                        <li><a href="#" id="resetFont" class="scrollto" onclick="resetAllfontSize()">重設字體</a></li>

                        <select onchange="fontSizeControll(this);">
                            <option value="">僅更改內文字體大小</option>
                            <option value="xx-small">特小</option>
                            <option value="x-small">更小</option>
                            <option value="small">略小</option>
                            <option value="medium">正常</option>
                            <option value="large">略大</option>
                            <option value="x-large">更大</option>
                            <option value="xx-large">特大</option>
                        </select>
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

                        rsort($periodsNumbers); // sort array in descending order 並且會重新排序KEY (原本的arsort()不會改變KEY)
                        // https://www.php.net/manual/en/array.sorting.php

                        for ($i = 0; $i < sizeof($periodsNumbers); $i++) {
                            if ($i == 0)
                                echo "<li><a href=\"index.php\">第" . $periodsNumbers[$i] . "期校訊</a></li>";
                            else
                                echo "<li><a href=\"index.php?period=" . $periodsNumbers[$i] . "\">第" . $periodsNumbers[$i] . "期校訊</a></li>";
                        }
                        ?>
                    </ul>
                </li>
                <li><a href="#footer" class="scrollto">聯繫我們</a></li>
                <li><a id="searchLink" href="search.php">搜尋<i class="bi bi-search"></i></a></li>
            </ul>
            <i class="bi bi-list mobile-nav-toggle"></i>
        </nav><!-- .navbar -->

    </div>
</header><!-- End Header -->