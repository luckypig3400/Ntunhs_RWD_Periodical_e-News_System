<?php
require("../model/config.php");

try {
    $conn = new PDO("mysql:host=$servername;dbname=$dbname", $username, $password);
    $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    $sqlCommand = "SELECT `Serial`,`Photo1`,`Photo2`,`Photo3` FROM content";

    $stmt = $conn->prepare($sqlCommand);
    $stmt->execute();
    $stmt->setFetchMode(PDO::FETCH_ASSOC); // set the resulting array to associative

    $result = $stmt->fetchAll();

    // print_r($result);
    foreach ($result as $row) {
        $serial = $row['Serial'];
        $photo1 = $row['Photo1'];
        $photo2 = $row['Photo2'];
        $photo3 = $row['Photo3'];

        if ($photo1 != null) {
            if (!file_exists("../periodical_data/upload_originalData/$photo1")) {
                echo "<b>ID:$serial Error:</b> $photo1 does not exist in data folder<br>";
            }
        }
        if ($photo2 != null) {
            if (!file_exists("../periodical_data/upload_originalData/$photo2")) {
                echo "<b>ID:$serial Error:</b> $photo2 does not exist in data folder<br>";
            }
        }
        if ($photo2 != null) {
            if (!file_exists("../periodical_data/upload_originalData/$photo3")) {
                echo "<b>ID:$serial Error:</b> $photo3 does not exist in data folder<br>";
            }
        }
    }
} catch (PDOException $e) {
    echo "<b>Error Occured while asseccing MySQL DB:</b>" . $e->getMessage() . "<br>";
}
?>

<!DOCTYPE html>
<html>

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>舊伺服器檔案檢查器</title>
</head>

<body>

</body>

</html>