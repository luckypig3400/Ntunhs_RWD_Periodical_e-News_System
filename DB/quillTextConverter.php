<?php
require("../config/config.php");

try {
    $conn = new PDO("mysql:host=$servername;dbname=$dbname", $username, $password);
    $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    $sql_selectCommand = "SELECT * FROM content WHERE `Serial` = '369'";

    $stmt = $conn->prepare($sql_selectCommand);
    $stmt->execute();
    $stmt->setFetchMode(PDO::FETCH_ASSOC); // set the resulting array to associative

    $result = $stmt->fetchAll();

    $outputQuillText = "";

    foreach ($result as $row) {
        $serial = $row['Serial'];
        $photo1 = $row['Photo1'];
        $photo2 = $row['Photo2'];
        $photo3 = $row['Photo3'];
        $content1 = nl2br($row['Content1']);
        $content2 = nl2br($row['Content2']);
        $content3 = nl2br($row['Content3']);
        $img1Alt = $row['Alt1'];
        $img2Alt = $row['Alt2'];
        $img3Alt = $row['Alt3'];

        if ($photo1 != null) {
            $outputQuillText .= "<p class=\"ql-align-center\"><img src=\"../periodical_data/$photo1\" alt=\"$img1Alt\"></p><p><br></p>";
        }
        if ($content1 != null) {
            $outputQuillText .= "<p>$content1</p><p><br></p>";
        }
        if ($photo2 != null) {
            $outputQuillText .= "<p class=\"ql-align-center\"><img src=\"../periodical_data/$photo2\" alt=\"$img2Alt\"></p><p><br></p>";
        }
        if ($content2 != null) {
            $outputQuillText .= "<p>$content2</p><p><br></p>";
        }
        if ($photo3 != null) {
            $outputQuillText .= "<p class=\"ql-align-center\"><img src=\"../periodical_data/$photo3\" alt=\"$img3Alt\"></p><p><br></p>";
        }
        if ($content3 != null) {
            $outputQuillText .= "<p>$content3</p><p><br></p>";
        }
        echo $outputQuillText;
    }
} catch (PDOException $e) {
    echo "Error occured while accessing MySQL DB:" . $e->getMessage();
}
?>

<!DOCTYPE html>
<html>

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>舊資料庫文章2Quill轉換器</title>
</head>

<body>

</body>

</html>