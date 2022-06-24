<?php
function fetchFullArticle_WithID($in_id)
{
    // https://stackoverflow.com/questions/14114411/remove-all-special-characters-from-a-string
    $id = str_replace('/[^A-Za-z0-9\-]/', '', $in_id); // Removes all special chars.

    try {
        require("config.php");
        $conn = new PDO("mysql:host=$servername;dbname=$dbname", $username, $password);
        $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

        $sql = "SELECT * FROM periodical WHERE id = '$id'";

        $stmt = $conn->prepare($sql);
        $stmt->execute();
        $stmt->setFetchMode(PDO::FETCH_ASSOC); // set the resulting array to associative

        $result = $stmt->fetchAll();
    } catch (PDOException $e) {
        echo "Connection failed: " . $e->getMessage();
    }

    if (sizeof($result) == 0) {
        return "(っ °Д °;)っ<br>您所尋訪的文章不存在喔<br>`(*>﹏<*)′<br>Sorry＞﹏＜!<br>Content not found. OAO";
    }

    return $result;
}

function fetchArticleList($in_period, $in_category)
{
    require("config.php");
    $period = str_replace('/[^A-Za-z0-9\-]/', '', $in_period); // Removes all special chars.
    $category = str_replace('/[^A-Za-z0-9\-]/', '', $in_category); // Removes all special chars.
    $getAllCategories = isset($_GET['getAllCategories']) ? $_GET['getAllCategories'] : "";

    try {
        $conn = new PDO("mysql:host=$servername;dbname=$dbname", $username, $password);
        $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    } catch (PDOException $e) {
        return "Error Occured while Fetching Article List:" . $e->getMessage();
    }

    if ($period != "" && $category != "") {
        $sql = "SELECT * FROM periodical WHERE periodNumber = '$period' AND categoryID = '$category'";
    } else if ($period != "") {
        $sql = "SELECT * FROM periodical WHERE periodNumber = '$period' ORDER BY categoryID ASC;";
    } else if ($category != "" && $getAllCategories == "true") {
        // 同一分類的文章太多，因此只提供該分類全部文章的摘要
        $sql = "SELECT id,subject,cover FROM periodical WHERE categoryID = '$category'";
    } else if ($category != "") {
        try {
            // 利用SQL取得最新文章期別
            $stmt = $conn->prepare("SET @newestPeriod=(SELECT periodNumber FROM periodical ORDER BY updateTime DESC LIMIT 1);");
            $stmt->execute();
            $stmt->setFetchMode(PDO::FETCH_ASSOC); // set the resulting array to associative
        } catch (PDOException $e) {
            return "Error occured while fetching latest periodNumber:" . $e->getMessage();
        }
        $sql = "SELECT * FROM periodical WHERE categoryID = '$category' AND periodNumber = @newestPeriod;";
    } else {
        try {
            // 利用SQL取得最新文章期別
            // https://stackoverflow.com/questions/11754781/how-to-declare-a-variable-in-mysql
            $stmt = $conn->prepare("SET @newestPeriod=(SELECT periodNumber FROM periodical ORDER BY updateTime DESC LIMIT 1);");
            $stmt->execute();
            $stmt->setFetchMode(PDO::FETCH_ASSOC); // set the resulting array to associative
        } catch (PDOException $e) {
            return "Error occured while fetching latest periodNumber:" . $e->getMessage();
        }
        // default select the latest period articles
        $sql = "SELECT * FROM periodical WHERE periodNumber = @newestPeriod ORDER BY categoryID ASC;";
    }

    try {
        $stmt = $conn->prepare($sql);
        $stmt->execute();
        $stmt->setFetchMode(PDO::FETCH_ASSOC); // set the resulting array to associative

        $result = $stmt->fetchAll();
    } catch (PDOException $e) {
        return "Error Occured while Fetching Article List:" . $e->getMessage();
    }

    if (sizeof($result) == 0) {
        return "很抱歉`(*>﹏<*)′<br>本期該分類尚未有文章<br>(っ °Д °;)っ<br>Sorry ＞﹏＜!<br>Current period doesn't have any atrticle for this category !";
    } else {
        return $result;
    }
}

function fetchCategorySummaryArticleList($in_category, $in_id)
{
    require("config.php");
    $category = str_replace('/[^A-Za-z0-9\-]/', '', $in_category); // Removes all special chars.
    $id = str_replace('/[^A-Za-z0-9\-]/', '', $in_id); // Removes all special chars.

    try {
        $conn = new PDO("mysql:host=$servername;dbname=$dbname", $username, $password);
        $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    } catch (PDOException $e) {
        return "Error Occured while Fetching Article List:" . $e->getMessage();
    }

    if ($category != "" && $id != "") {
        $sql = "SELECT * FROM periodical WHERE id <= $id AND categoryID = '$category' ORDER BY id DESC LIMIT 6;";
    }else if($category == "" && $id != ""){
        $sql = "SELECT * FROM periodical WHERE id <= $id ORDER BY id DESC LIMIT 9;";
    }else if($category != "" && $id == ""){
        $sql = "SELECT * FROM periodical WHERE categoryID = '$category' ORDER BY id DESC LIMIT 9;";
    }else{
        $sql = "SELECT * FROM periodical WHERE id = 3696969693;";
    }

    try {
        $stmt = $conn->prepare($sql);
        $stmt->execute();
        $stmt->setFetchMode(PDO::FETCH_ASSOC); // set the resulting array to associative

        $result = $stmt->fetchAll();
    } catch (PDOException $e) {
        return "Error Occured while Fetching Article List:" . $e->getMessage();
    }

    if (sizeof($result) == 0) {
        return "很抱歉`(*>﹏<*)′ 出了點錯誤 (っ °Д °;)っ<br>Oops! Something went wrong.<br>Sorry ＞﹏＜!";
    } else {
        return $result;
    }
}

function fetchLatestHeadlineArticleInCurrentPeriod($in_period)
{
    require("config.php");
    $period = str_replace('/[^A-Za-z0-9\-]/', '', $in_period); // Removes all special chars.

    try {
        $conn = new PDO("mysql:host=$servername;dbname=$dbname", $username, $password);
        $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

        if ($period == "") {
            require_once("fetchPeriodNumbers.php");
            $period = fetchLatestPeriodNumbers();
        }

        $sql = "SELECT * FROM periodical WHERE periodNumber = '$period' AND categoryID = 'C01' ORDER BY updateTime DESC LIMIT 1";

        $stmt = $conn->prepare($sql);
        $stmt->execute();
        $stmt->setFetchMode(PDO::FETCH_ASSOC); // set the resulting array to associative

        $result = $stmt->fetchAll();
    } catch (PDOException $e) {
        return "Error Occured while Fetching Latest Article:" . $e->getMessage();
    }

    if (sizeof($result) == 1) {
        return $result;
    } else {
        return "很抱歉`(*>﹏<*)′<br>在抓取本期最新訊息時出了些問題<br>(っ °Д °;)っ<br>Sorry ＞﹏＜!<br>Error occured while fetching the latest new in current period!";
    }
}

function fetchIndexCarouselArticleList($in_period)
{
    require("config.php");
    $period = str_replace('/[^A-Za-z0-9\-]/', '', $in_period); // Removes all special chars.

    try {
        $conn = new PDO("mysql:host=$servername;dbname=$dbname", $username, $password);
        $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

        if ($period == "") {
            require_once("fetchPeriodNumbers.php");
            $period = fetchLatestPeriodNumbers();
        }

        $sql = "SELECT * FROM `periodical` WHERE `periodNumber` = '$period' ORDER BY `categoryID` ASC";
        // 預設抓取頭條新聞C01與特別報導C02來做為首頁輪播資訊

        $stmt = $conn->prepare($sql);
        $stmt->execute();
        $stmt->setFetchMode(PDO::FETCH_ASSOC); // set the resulting array to associative

        $result = $stmt->fetchAll();
    } catch (PDOException $e) {
        return "Error Occured while Fetching Index Carousel new :" . $e->getMessage();
    }

    if (sizeof($result) == 0) {
        return "很抱歉`(*>﹏<*)′<br>在抓取本期首頁輪播新聞時出了些問題<br>(っ °Д °;)っ<br>Sorry ＞﹏＜!<br>Error occured while fetching the carousel news for Index page!";
    } else {
        return $result;
    }
}
