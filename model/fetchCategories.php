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

function fetchCategoryWithID($in_id)
{
    $id = str_replace('/[^A-Za-z0-9\-]/', '', $in_id); // Removes all special chars.
    $sql = "SELECT * FROM category WHERE id = $id";

    require("config.php");
    try {
        $conn = new PDO("mysql:host=$servername;dbname=$dbname", $username, $password);
        $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

        $stmt = $conn->prepare($sql);
        $stmt->execute();
        $stmt->setFetchMode(PDO::FETCH_ASSOC);

        $result = $stmt->fetchAll();
    } catch (PDOException $e) {
        echo "MySQL Connection failed: " . $e->getMessage();
    }

    if(sizeof($result) == 1) {
        return $result[0]["name"];
    }else{
        return "找不到您所指定的文章類別";
    }
}
