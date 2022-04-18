<?php
function blogArticleEntryBlock($in_singleArticle)
{
  $article = $in_singleArticle;

  // https://stackoverflow.com/questions/7124823/file-get-html-displays-fatal-error-call-to-undefined-function
  require_once("../controller/simple_html_dom.php");
  // https://stackoverflow.com/questions/13780025/redeclare-file-get-html-simple-html-dom-php

  $id = $article['id'];
  $subject = $article['subject'];
  $quillcontent = $article['quillcontent'];
  $writer = $article['writer'];

  // split string by ","
  $photoLinks = explode(",", $article["cover"]);
  $photoLink = "";
  for ($i = 0; $i < count($photoLinks); $i++) {
    if ($photoLinks[$i] == "" && $i == count($photoLinks) - 1) {
      // check if the last photo is still empty
      $photoLink =  "<img src=\"../public/assets/img/No-Image.jpg\" class=\"img-fluid\">";
    } else if ($photoLinks[$i] != "") {
      $photoLink = $photoLinks[$i];
      $photoLink =  "<img src=\"../public/image/$photoLink\" class=\"img-fluid\">";
      break; // only show the first photo
    }
  }

  $linkParams = parseGETparamsToString();
  if ($linkParams != "") {
    $id = "&id=" . $id;
  } else {
    $id = "?id=" . $id;
  }

  require_once("../controller/simplifyArticleContent.php");
  $simplifiedContent = simplifyArticleContent($quillcontent, "");

  /*採用函式庫的方式解析HTML但是在解析<p>的過程中會出現嚴重錯誤因此遺棄
  // https://stackoverflow.com/questions/6083076/php-way-of-parsing-html-string
  */

  echo "
    <!-- 文章入口區塊 -->
        <article class=\"entry\">
          <div class=\"entry-img text-center\">
            <br>$photoLink
          </div>

          <h2 class=\"entry-title\">
            <a href=\"fullArticlePage.php$linkParams&id=$id\">$subject</a>
          </h2>

          <div class=\"entry-meta\">
            <ul>
              <!-- <li class=\"d-flex align-items-center\"><i class=\"bi bi-person\"></i>Editor</li> -->
              <li class=\"d-flex align-items-center\">
                <i class=\"bx bx-pencil\"><i class=\"bx bx-data\"></i></i>$writer
              </li>
            </ul>
          </div>

          <div id=\"editor\">
            $simplifiedContent
          </div>

          <div class=\"entry-content\">
            <div class=\"read-more\">
                <a href=\"fullArticlePage.php$linkParams$id\">瀏覽全文</a>
            </div>
          </div>

        </article><!-- 文章入口區塊 -->";
}
