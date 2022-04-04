<?php
function fetchPeriodNumbers()
{
    require("config.php");
    try {
        $conn = new PDO("mysql:host=$servername;dbname=$dbname", $username, $password);
        $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

        $sql = "SELECT `periodNumber` FROM `periodical` GROUP BY `periodNumber`";

        $stmt = $conn->prepare($sql);
        $stmt->execute();
        $stmt->setFetchMode(PDO::FETCH_ASSOC);

        $result = $stmt->fetchAll();
    } catch (PDOException $e) {
        echo "Something went wrong while accessing MySQL DB, ERROR:" . $e;
    }

    if (sizeof($result) == 0) {
        return "Error While fetching Period Numbers";
    }

    return $result;
}

function fetchLatestPeriodNumbers()
{
    require("config.php");
    try {
        $conn = new PDO("mysql:host=$servername;dbname=$dbname", $username, $password);
        $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

        $sql = "SELECT `periodNumber` FROM `periodical` ORDER BY `id`  DESC LIMIT 1";

        $stmt = $conn->prepare($sql);
        $stmt->execute();
        $stmt->setFetchMode(PDO::FETCH_ASSOC);

        $result = $stmt->fetchAll();
    } catch (PDOException $e) {
        echo "Something went wrong while accessing MySQL DB, ERROR:" . $e;
    }

    if (sizeof($result) == 0) {
        return "Error While fetching Period Numbers";
    }

    return $result[0]['periodNumber'];
}
