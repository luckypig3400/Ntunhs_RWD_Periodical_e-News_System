<?php

function fetchCategories()
{
    require("config.php");

    try {
        $conn = new PDO("mysql:host=$servername;dbname=$dbname", $username, $password);
        $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

        $sql = "SELECT * FROM category";

        $stmt = $conn->prepare($sql);
        $stmt->execute();
        $stmt->setFetchMode(PDO::FETCH_ASSOC);

        $result = $stmt->fetchAll();
    } catch (PDOException $e) {
        echo "Something went wrong while accessing MySQL DB, ERROR:" . $e;
    }

    if (sizeof($result) == 0) {
        return "Error While fetching Categories";
    }

    return $result;
}
