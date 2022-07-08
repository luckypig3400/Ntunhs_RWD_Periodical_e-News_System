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
  $simplifiedContent = str_replace("&nbsp;", "", $simplifiedContent);
  // 使用傳統換行符號來解決後臺管理系統quill套件儲存時壓縮資料為單行導致解析出空值
  $simplifiedContent = str_replace("<br>", "\n", $simplifiedContent);
  $simplifiedContent = str_replace("<p>", "\n", $simplifiedContent);
  $simplifiedContent = str_replace("</p>", "\n", $simplifiedContent);

  preg_match_all("/<img.*>/", $simplifiedContent, $matches);
  // https://www.w3schools.com/php/func_regex_preg_match_all.asp
  // https://stackoverflow.com/questions/2912894/how-to-match-any-character-in-regular-expression
  foreach ($matches as $match) {
    $simplifiedContent = str_replace($match, "", $simplifiedContent);
  }

  // remove all HTML tags
  preg_match_all("/<.*>/", $simplifiedContent, $matches);
  foreach ($matches as $match) {
    $simplifiedContent = str_replace($match, "", $simplifiedContent);
  }
  // remove all HTML tags finished !
  // 移除完所有HTML標籤後再移除傳統換行符號
  $simplifiedContent = str_replace("\n", "", $simplifiedContent);

  $limitLengthContent = "";
  if (strlen($limitLengthContent) + strlen($simplifiedContent) > $max_length) {
    // https://stackoverflow.com/questions/10934711/truncating-chinese-text
    $limitLengthContent = mb_substr($simplifiedContent, 0, $max_length) . "......";
  } else {
    $limitLengthContent .= mb_substr($simplifiedContent, 0, $max_length);
  }

  // echo "<script>console.log('簡化過的文字:$limitLengthContent');</script>";
  return $limitLengthContent;
}
