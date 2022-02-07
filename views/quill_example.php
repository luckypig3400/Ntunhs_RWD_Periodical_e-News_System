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

        <!-- Include stylesheet -->
        <link href="https://cdn.quilljs.com/1.3.6/quill.snow.css" rel="stylesheet">

        <section class="blog">
            <div class="container" data-aos="fade-up">

                <!-- Create the editor container -->
                <div id="editor">
                </div>

            </div>
        </section>

        <!-- Include the Quill library -->
        <script src="https://cdn.quilljs.com/1.3.6/quill.js"></script>

        <!-- Initialize Quill editor -->
        <script>
            // https://quilljs.com/docs/modules/toolbar/
            var toolbarOptions = [
                ['bold', 'italic', 'underline', 'strike'], // toggled buttons
                ['blockquote', 'code-block'],
                [{
                    'header': [1, 2, 3, 4, 5, 6, false]
                }],

                [{
                    'color': []
                }, {
                    'background': []
                }], // dropdown with defaults from theme
                [{
                    'font': []
                }],
                [{
                    'align': []
                }],

                ['clean'] // remove formatting button
            ];

            var quillOptions = {
                // readOnly: true,
                theme: 'snow',
                modules: {
                    toolbar: toolbarOptions
                },
                // https://stackoverflow.com/questions/39456273/how-do-i-create-a-quill-editor-without-a-toolbar
                // border: none
            }

            var quill = new Quill('#editor', quillOptions);
        </script>
    </main>

    <?php
    require("./partials/footer.php");
    ?>

</body>

</html>