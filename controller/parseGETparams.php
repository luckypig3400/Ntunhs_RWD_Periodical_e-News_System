<?php
// https://stackoverflow.com/questions/5884807/get-url-parameter-in-php
$fullGETparams = isset($_SERVER['QUERY_STRING']) ? $_SERVER['QUERY_STRING'] : "";

function parseGETparamsToString()
{
    $linkString = "";

    // https://stackoverflow.com/questions/3289758/make-array-of-all-get-variables
    foreach ($_GET as $key => $value) {
        // remove all special characters
        $value = preg_replace('/[^a-zA-Z0-9_]/', '', $value);
        if ($value != "") {
            if ($linkString == "") {
                $linkString .= "?";
            } else {
                $linkString .= "&";
            }
            // echo "GET: $key=$value<br>";
            $linkString .= $key . "=" . $value;
        }
    }

    return $linkString;
}

function parseGETparams()
{
    $parsedGETparams = array();

    // https://stackoverflow.com/questions/3289758/make-array-of-all-get-variables
    foreach ($_GET as $key => $value) {
        // remove all special characters
        $value = preg_replace('/[^a-zA-Z0-9_]/', '', $value);
        if ($value != "") {
            $parsedGETparams[$key] = $value;
        }
    }

    return $parsedGETparams;
}

function getPeriodParam()
{
    $parsedGETArray = parseGETparams();
    if (array_key_exists("period", $parsedGETArray)) {
        return $parsedGETArray["period"];
    } else {
        return "";
    }
}

function getCategoryParam()
{
    $parsedGETArray = parseGETparams();
    if (array_key_exists("category", $parsedGETArray)) {
        return $parsedGETArray["category"];
    } else {
        return "";
    }
}

function getIDparam()
{
    $parsedGETArray = parseGETparams();
    if (array_key_exists("id", $parsedGETArray)) {
        return $parsedGETArray["id"];
    } else {
        return "";
    }
}
