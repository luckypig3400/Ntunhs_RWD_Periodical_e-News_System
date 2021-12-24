<!-- 請把我放入<main>裡面 -->
<!-- 麵包屑區塊 -->
<section class="breadcrumbs">
    <div class="container">

        <div class="d-flex justify-content-between align-items-center">
            <h2>首頁</h2>
            <ol>
                <li><a href="index.php">首頁</a></li>
                <li>
                    <?php
                    echo basename($_SERVER['PHP_SELF']);
                    // https://stackoverflow.com/questions/13032930/how-to-get-current-php-page-name
                    ?>
                </li>
            </ol>
        </div>

    </div>
</section>
<!-- 麵包屑區塊 -->