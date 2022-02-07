<!DOCTYPE html>
<html lang="zh-Hant">

<?php
require("./partials/head.php");
?>

<body>

    <?php
    require("./partials/header.php");
    ?>
    <!-- https://quilljs.com/docs/quickstart/ -->
    <main id="main">
        <?php
        require("./partials/sections/breadcrumbs.php");
        breadcrumbs("Quill測試頁面");
        ?>

        <section class="blog">
            <div class="container" data-aos="fade-up">

                <!-- Create the editor container -->
                <div id="editor">
                    <h1 class="ql-align-center"><strong><em>改朝換代--第二屆學生會幹部改選</em></strong></h1><br>
                    
                    <?php
                    require("../model/fetchDB.php");
                    echo fetchQuillContent_WithID(70);
                    ?>
                </div>

            </div>
        </section>

    </main>

    <?php
    require("./partials/footer.php");
    ?>

</body>

</html>