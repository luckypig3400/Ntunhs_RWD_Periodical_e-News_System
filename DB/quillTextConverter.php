<?php
require_once("../model/config.php");

try {
    $conn = new PDO("mysql:host=$servername;dbname=$dbname", $username, $password);
    $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    $sql_selectCommand = "SELECT * FROM content";

    $stmt = $conn->prepare($sql_selectCommand);
    $stmt->execute();
    $stmt->setFetchMode(PDO::FETCH_ASSOC); // set the resulting array to associative

    $result = $stmt->fetchAll();

    foreach ($result as $row) {
        $outputQuillText = "";
        $serial = $row['Serial'];
        $photo1 = $row['Photo1'];
        $photo2 = $row['Photo2'];
        $photo3 = $row['Photo3'];
        $content1 = str_replace("'", "\'", nl2br($row['Content1']));
        // ID:105 found ' cause SQL syntax error
        $content1 = str_replace(" ", "&nbsp;&nbsp;", $content1);
        $content1 = str_replace("　", "&nbsp;&nbsp;&nbsp;&nbsp;", $content1);
        // https://stackoverflow.com/questions/5210287/how-replace-all-spaces-inside-html-elements-with-nbsp-using-preg-replace

        $content2 = str_replace("'", "\'", nl2br($row['Content2']));
        $content2 = str_replace(" ", "&nbsp;&nbsp;", $content2);
        $content2 = str_replace("　", "&nbsp;&nbsp;&nbsp;&nbsp;", $content2);

        $content3 = str_replace("'", "\'", nl2br($row['Content3']));
        $content3 = str_replace(" ", "&nbsp;&nbsp;", $content3);
        $content3 = str_replace("　", "&nbsp;&nbsp;&nbsp;&nbsp;", $content3);

        $img1Alt = $row['Alt1'];
        $img2Alt = $row['Alt2'];
        $img3Alt = $row['Alt3'];

        // 檢查原始欄位是否包含表格語法
        if (str_contains($row["Content1"], "TABLE")) {
            echo "ID:$serial <b>發現表格!</b><br>";
            echo "Original Content:<br>" . $row["Content1"] . "<br>";
            $content1 = str_replace("'", "\'", $row['Content1']);
        } elseif (str_contains($row["Content2"], "TABLE")) {
            echo "ID:$serial <b>發現表格!</b><br>";
            echo "Original Content:<br>" . $row["Content2"] . "<br>";
            $content2 = str_replace("'", "\'", $row['Content2']);
        } elseif (str_contains($row["Content3"], "TABLE")) {
            echo "ID:$serial <b>發現表格!</b><br>";
            echo "Original Content:<br>" . $row["Content3"] . "<br>";
            $content3 = str_replace("'", "\'", $row['Content3']);
        }

        if ($photo1 != null) {
            $outputQuillText .= "<p class=\"ql-align-center\"><img src=\"../public/image/$photo1\" alt=\"$img1Alt\"></p>";
            if ($img1Alt != null) {
                $outputQuillText .= "<p class=\"ql-align-center\">▲ $img1Alt</p>";
            }
            $outputQuillText .= "<p><br></p>";
        }
        if ($content1 != null) {
            $outputQuillText .= "<p>$content1</p><p><br></p>";
        }
        if ($photo2 != null) {
            $outputQuillText .= "<p class=\"ql-align-center\"><img src=\"../public/image/$photo2\" alt=\"$img2Alt\"></p>";
            if ($img2Alt != null) {
                $outputQuillText .= "<p class=\"ql-align-center\">▲ $img2Alt</p>";
            }
            $outputQuillText .= "<p><br></p>";
        }
        if ($content2 != null) {
            $outputQuillText .= "<p>$content2</p><p><br></p>";
        }
        if ($photo3 != null) {
            $outputQuillText .= "<p class=\"ql-align-center\"><img src=\"../public/image/$photo3\" alt=\"$img3Alt\"></p>";
            if ($img3Alt != null) {
                $outputQuillText .= "<p class=\"ql-align-center\">▲ $img3Alt</p>";
            }
            $outputQuillText .= "<p><br></p>";
        }
        if ($content3 != null) {
            $outputQuillText .= "<p>$content3</p><p><br></p>";
        }

        $outputQuillText = str_replace("_x000D_", "", $outputQuillText);
        $outputQuillText = str_replace("&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;", "<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;", $outputQuillText);

        if ($outputQuillText != "") {
            $sql_updateCommand = "UPDATE periodical SET quillcontent = '$outputQuillText' WHERE id = $serial";

            // https://www.w3schools.com/php/php_mysql_update.asp
            $stmt = $conn->prepare($sql_updateCommand);

            $stmt->execute();

            echo "ID:$serial converted & update Database successed! More Info:";
            echo $stmt->rowCount() . " records UPDATED successfully<br>";
        } else {
            echo "ID:$serial <b>Error</b> converted failed! empty string<br>";
        }
    }
} catch (PDOException $e) { 
    echo "Error occured while accessing MySQL DB:" . $e->getMessage();
}

echo "<h1>Total Table: $totalTable</h1>";
?>

<!DOCTYPE html>
<html>

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>舊資料庫文章2Quill轉換器</title>
    <!-- Include stylesheet -->
    <link href="https://cdn.quilljs.com/1.3.6/quill.snow.css" rel="stylesheet">
    <style>
        #editor {
            border: none;
            font-size: larger;
        }
    </style>
</head>

<body>
    <div id="editor">   
        <?php
        // echo $outputQuillText;
        ?>
    </div>

    <!-- Include the Quill library -->
    <script src="https://cdn.quilljs.com/1.3.6/quill.js"></script>
    <script>
        var quillOptions = {
            readOnly: true,
            theme: 'snow',
            modules: {
                toolbar: false
            }
        }
        var quill = new Quill('#editor', quillOptions);
    </script>
</body>

</html>