<?php
function simplifyArticleContent($in_articleContent, $max_length)
{
  try {
    if ($max_length == "") {
      $max_length = (int)69;
    } else {
      $max_length = (int)$max_length;
    }
  } catch (Exception $e) {
    $max_length = (int)69;
  }

  // 從完整文章解析出第一段文字
  $simplifiedContent = $in_articleContent;
  $simplifiedContent = str_replace("&nbsp;", " ", $simplifiedContent);
  $simplifiedContent = str_replace("<p><br></p>", "", $simplifiedContent);
  // https://stackoverflow.com/questions/10142658/php-find-string-with-regex
  preg_match_all("/<img.*>/", $simplifiedContent, $matches);
  // https://www.w3schools.com/php/func_regex_preg_match_all.asp
  // https://stackoverflow.com/questions/2912894/how-to-match-any-character-in-regular-expression
  foreach ($matches as $match) {
    $simplifiedContent = str_replace($match, "", $simplifiedContent);
  }
  // remove <p> tags
  $simplifiedContent = str_replace('<p class="ql-align-center">', "", $simplifiedContent);
  $simplifiedContent = str_replace("<p>", "", $simplifiedContent);
  $simplifiedContent = str_replace("</p>", "", $simplifiedContent);
  // remove Table tags
  preg_match_all("/<table.*>/", $simplifiedContent, $matches);
  foreach ($matches as $match) {
    $simplifiedContent = str_replace($match, "", $simplifiedContent);
  }
  $simplifiedContent = str_replace("</table>", "", $simplifiedContent);
  $simplifiedContent = str_replace("<tr>", "", $simplifiedContent);
  $simplifiedContent = str_replace("</tr>", "", $simplifiedContent);
  $simplifiedContent = str_replace("<td>", "", $simplifiedContent);
  $simplifiedContent = str_replace("</td>", "", $simplifiedContent);
  // now we can use <br> to check if the content is long enough to be a paragraph
  $splitedArr = explode("<br>", $simplifiedContent);

  $simplifiedContent = ""; // reset to count the length
  foreach ($splitedArr as $p) {
    // After explode with <br>, remove the redundant <br> tags
    $p = str_replace("<br>", "", $p);
    $p = str_replace("<br/>", "", $p);
    
    // remove all HTML tags
    preg_match_all("/<.*>/", $p, $matches);
    foreach ($matches as $match) {
      $p = str_replace($match, "", $p);
    }
    // remove all HTML tags finished !

    if (strlen($p) + strlen($simplifiedContent) > $max_length) {
      // https://stackoverflow.com/questions/10934711/truncating-chinese-text
      $simplifiedContent = mb_substr($p, 0, $max_length) . "......";
      break;
    } else {
      $simplifiedContent .= mb_substr($p, 0, $max_length);
    }
  }

  return $simplifiedContent;
}
