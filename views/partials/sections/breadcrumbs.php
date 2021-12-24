<!-- 請把我放入<main>裡面 -->

<?php
function breadcrumbs($in_pageName)
{
    $pageName = $in_pageName;
    $htmlString = '
<!-- 麵包屑區塊 -->
<section class="breadcrumbs">
    <div class="container">

        <div class="d-flex justify-content-between align-items-center">
            <h2>首頁</h2>
            <ol>
                <li><a href="index.php">首頁</a></li>
                <li>' . $pageName . '
                </li>
            </ol>
        </div>

    </div>
</section>
<!-- 麵包屑區塊 -->';

    echo $htmlString;
}

?>