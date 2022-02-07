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
        toolbar: false //toolbarOptions
    },
    // https://stackoverflow.com/questions/39456273/how-do-i-create-a-quill-editor-without-a-toolbar
    // border: none
}

var quill = new Quill('#editor', quillOptions);