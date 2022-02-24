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
  $photoLinks = explode(",", $article["photo"]);
  $photoLink = "";
  for ($i = 0; $i < count($photoLinks); $i++) {
    if ($photoLinks[$i] != "" && $i == count($photoLinks) - 1) {
      // check if the last photo is still empty
      $photoLink =  "<img src=\"../public/assets/img/No-Image.jpg\" class=\"img-fluid\">";
    } else if ($photoLinks[$i] != "") {
      $photoLink = $photoLinks[$i];
      $photoLink =  "<img src=\"../periodical_data/$photoLink\" class=\"img-fluid\">";
      break; // only show the first photo
    }
  }

  $linkParams = parseGETparamsToString();

  // 從完整文章解析出第一段文字
  $simplifiedContent = $quillcontent;
  $simplifiedContent = str_replace("&nbsp;", "", $simplifiedContent);
  $simplifiedContent = str_replace("<p><br></p>", "", $simplifiedContent);
  // https://stackoverflow.com/questions/10142658/php-find-string-with-regex
  preg_match_all("/<p.*<img.*<\/p>/", $simplifiedContent, $matches);
  // https://www.w3schools.com/php/func_regex_preg_match_all.asp
  // https://stackoverflow.com/questions/2912894/how-to-match-any-character-in-regular-expression
  foreach ($matches as $match) {
    $simplifiedContent = str_replace($match, "", $simplifiedContent);
  }
  // remove <p> tags
  $simplifiedContent = str_replace("<p>", "", $simplifiedContent);
  $simplifiedContent = str_replace("</p>", "", $simplifiedContent);
  // now we can use <br> to check if the content is long enough to be a paragraph
  $splitedArr = explode("<br>", $simplifiedContent);
  foreach ($splitedArr as $p) {
    // echo "<b>" . strlen($p) . "New:</b>" . $p . "<br>";
    if (strlen($p) > 199) {
      // https://stackoverflow.com/questions/10934711/truncating-chinese-text
      $simplifiedContent = mb_substr($p, 0, 69) . "...";
      break;
    }
  }

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
                <a href=\"fullArticlePage.php$linkParams&id=$id\">瀏覽全文</a>
            </div>
          </div>

        </article><!-- 文章入口區塊 -->";
}
