<?php
function blogArticleEntryBlock($in_singleArticle)
{
    $article = $in_singleArticle;

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

    echo "
    <!-- 文章入口區塊 -->
        <article class=\"entry\">
          <div class=\"entry-img text-center\">
            <br>$photoLink
          </div>

          <h2 class=\"entry-title\">
            <a href=\"fullArticlePage.php?id=$id\">$subject</a>
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
            $quillcontent
          </div>

          <div class=\"entry-content\">
            <div class=\"read-more\">
                <a href=\"fullArticlePage.php?id=$id\">瀏覽全文</a>
            </div>
          </div>

        </article><!-- 文章入口區塊 -->";
}
