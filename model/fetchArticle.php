<?php
function fetchFullArticle_WithID($in_id)
{
    // https://stackoverflow.com/questions/14114411/remove-all-special-characters-from-a-string
    $id = str_replace('/[^A-Za-z0-9\-]/', '', $in_id); // Removes all special chars.

    try {
        require("config.php");
        $conn = new PDO("mysql:host=$servername;dbname=$dbname", $username, $password);
        $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

        $sql = "SELECT * FROM periodical WHERE id = $id";

        $stmt = $conn->prepare($sql);
        $stmt->execute();
        $stmt->setFetchMode(PDO::FETCH_ASSOC); // set the resulting array to associative

        $result = $stmt->fetchAll();
    } catch (PDOException $e) {
        echo "Connection failed: " . $e->getMessage();
    }

    if (sizeof($result) == 0) {
        return "(っ °Д °;)っ您所尋訪的文章不存在喔`(*>﹏<*)′<br>Sorry＞﹏＜! Content not found. OAO";
    }

    return $result;
}

function fetchArticleList($in_period, $in_category)
{
    $period = str_replace('/[^A-Za-z0-9\-]/', '', $in_period); // Removes all special chars.
    $category = str_replace('/[^A-Za-z0-9\-]/', '', $in_category); // Removes all special chars.
    $getAllCategories = isset($_GET['getAllCategories']) ? $_GET['getAllCategories'] : "";

    if ($period != "" && $category != "") {
        $sql = "SELECT * FROM periodical WHERE periodNumber = '$period' AND categoryID = '$category'";
    } else if ($period != "") {
        $sql = "SELECT * FROM periodical WHERE periodNumber = '$period'";
    } else if ($category != "" && $getAllCategories == "true") {
        // 同一分類的文章太多，因此只提供該分類全部文章的摘要
        $sql = "SELECT id,subject,photo FROM periodical WHERE categoryID = '$category'";
    } else if ($category != "") {
        $sql = "SET @newestPeriod=(SELECT periodNumber FROM periodical ORDER BY updateTime DESC LIMIT 1); SELECT * FROM periodical WHERE categoryID = '$category' AND periodNumber = @newestPeriod;";
    } else {
        // default select the latest period articles
        // https://stackoverflow.com/questions/11754781/how-to-declare-a-variable-in-mysql
        $sql = "SET @newestPeriod=(SELECT periodNumber FROM periodical ORDER BY updateTime DESC LIMIT 1); SELECT * FROM periodical WHERE periodNumber = @newestPeriod;";
    }

    try {
        require("config.php");
        $conn = new PDO("mysql:host=$servername;dbname=$dbname", $username, $password);
        $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

        $stmt = $conn->prepare($sql);
        $stmt->execute();
        $stmt->setFetchMode(PDO::FETCH_ASSOC); // set the resulting array to associative

        $result = $stmt->fetchAll();
    } catch (PDOException $e) {
        return "Error Occured while Fetching Article List:" . $e->getMessage();
    }

    if (sizeof($result) == 0) {
        return "很抱歉`(*>﹏<*)′本期該分類尚未有文章(っ °Д °;)っ<br>Sorry＞﹏＜! Current period doesn't have any atrticle for this category. OAO";
    } else {
        return $result;
    }
}
