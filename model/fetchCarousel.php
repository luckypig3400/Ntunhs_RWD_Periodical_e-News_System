<?php

function fetchCarousel()
{
    require("config.php");

    try {
        $conn = new PDO("mysql:host=$servername;dbname=$dbname", $username, $password);
        $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

        $sql = "SELECT * FROM carousel";

        $stmt = $conn->prepare($sql);
        $stmt->execute();
        $stmt->setFetchMode(PDO::FETCH_ASSOC);

        $result = $stmt->fetchAll();
    } catch (PDOException $e) {
        echo "Error happened while fetching Database, Full error log:" . $e->getMessage();
    }

    if (sizeof($result) == 0) {
        return "Error happened while fetching Database";
    } else {
        return $result;
    }
}

function fetchCarouselWithID($in_id)
{
    require("config.php");
    $id = preg_replace('/[^A-Za-z0-9\-]/', '', $in_id);
    // remove special characters

    try {
        $conn = new PDO("mysql:host=$servername;dbname=$dbname", $username, $password);
        $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

        if ($id == "") {
            $stmt = $conn->prepare("SET @newestPeriod=(SELECT periodNumber FROM periodical ORDER BY updateTime DESC LIMIT 1);");
            $stmt->execute();// 利用上方SQL取得最新文章期別

            $sql = "SELECT * FROM carousel WHERE id = @newestPeriod;";
            // if id is empty, fetch the last one
        } else {
            $sql = "SELECT * FROM carousel WHERE id = $id";
        }

        $stmt = $conn->prepare($sql);
        $stmt->execute();
        $stmt->setFetchMode(PDO::FETCH_ASSOC);

        $result = $stmt->fetchAll();
    } catch (PDOException $e) {
        echo "Error happened while fetching Database, Full error log:" . $e->getMessage();
    }

    if (sizeof($result) == 0) {
        return "Error";
    } else {
        return $result[0]["postIDArray"];
    }
}
