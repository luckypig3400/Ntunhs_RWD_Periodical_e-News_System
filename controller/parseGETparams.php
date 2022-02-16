<?php
// https://stackoverflow.com/questions/5884807/get-url-parameter-in-php
$fullGETparams = isset($_SERVER['QUERY_STRING']) ? $_SERVER['QUERY_STRING'] : "";
// echo "Full GET params: $fullGETparams<br>";

// https://stackoverflow.com/questions/3289758/make-array-of-all-get-variables
foreach ($_GET as $key => $value) {
    // remove all special characters
    $value = preg_replace('/[^a-zA-Z0-9_]/', '', $value);
    echo "GET: $key => $value<br>";
}
