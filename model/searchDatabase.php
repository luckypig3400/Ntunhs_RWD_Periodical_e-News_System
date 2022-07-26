<?php

function searchDatabase($searchKeyword, $searchCategory, $searchPeriod)
{
    try {
        require("config.php");
        // remove special characters
        $searchKeyword = removeSpecialCharacters($searchKeyword);
        $searchCategory = removeSpecialCharacters($searchCategory);
        $searchPeriod = removeSpecialCharacters($searchPeriod);

        $conn = new PDO("mysql:host=$servername;dbname=$dbname", $username, $password);
        $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

        $sql = "SELECT * FROM `periodical` WHERE (`quillcontent` LIKE '%" . $searchKeyword . "%' OR `subject` LIKE '%" . $searchKeyword . "%' OR `writer` LIKE '%" . $searchKeyword . "%' )";
        if ($searchCategory != "all" && $searchCategory != "") {
            $sql .= " AND `categoryID` = '" . $searchCategory . "'";
        }
        if ($searchPeriod != "all" && $searchPeriod != "") {
            $sql .= " AND `periodNumber` = '" . $searchPeriod . "'";
        }
        $sql .= " ORDER BY `periodical`.`id` DESC";

        $stmt = $conn->prepare($sql);
        $stmt->execute();
        $stmt->setFetchMode(PDO::FETCH_ASSOC);

        $result = $stmt->fetchAll();
        // echo "<h1>$sql</h1>";
        return $result;
    } catch (PDOException $e) {
        echo "Something went wrong while accessing MySQL DB, ERROR:" . $e;
    }
}

function removeSpecialCharacters($string)
{
    $string = preg_replace('/[^\p{L}\p{N}\s]/u', '', $string);
    return $string;
}
