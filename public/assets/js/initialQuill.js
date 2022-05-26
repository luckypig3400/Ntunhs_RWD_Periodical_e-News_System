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
    readOnly: true,
    theme: 'snow',
    modules: {
        toolbar: false, //toolbarOptions
        table: true
    },
    // https://stackoverflow.com/questions/39456273/how-do-i-create-a-quill-editor-without-a-toolbar
    // border: none
}

if(document.getElementById('editor') != null) {
    console.log('Preparing quill editor...');
    var quill = new Quill('#editor', quillOptions);
    const table = quill.getModule('table');
    // https://stackoverflow.com/questions/52331928/how-can-i-initialize-table-in-quill-js-2-0
}