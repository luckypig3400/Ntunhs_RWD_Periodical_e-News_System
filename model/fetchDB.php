<?php
function fetchQuillContent_WithID($in_id)
{
    require("config.php");
    // https://stackoverflow.com/questions/14114411/remove-all-special-characters-from-a-string
    $id = str_replace('/[^A-Za-z0-9\-]/', '', $in_id); // Removes all special chars.

    $quillContent = "";

    try {
        $conn = new PDO("mysql:host=$servername;dbname=$dbname", $username, $password);

        $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

        $sql = "SELECT quillcontent FROM periodical WHERE id = $id";

        $stmt = $conn->prepare($sql);
        $stmt->execute();
        $stmt->setFetchMode(PDO::FETCH_ASSOC); // set the resulting array to associative

        $result = $stmt->fetchAll();

        foreach ($result as $row) {
            $quillContent = $row['quillcontent'];
        }
    } catch (PDOException $e) {
        echo "Connection failed: " . $e->getMessage();
    }

    if ($quillContent == "") {
        $quillContent = "(っ °Д °;)っ您所尋訪的文章不存在喔`(*>﹏<*)′<br>No content found. OAO";
    }

    return $quillContent;
}
