$(document).ready(function () {
    $('.menu .item').tab();

    $('.menu .item').tab({
        onBeforeChange: function (tabPath) {
            if (tabPath === 'preview') {
                convertMarkdown();
            }
        }
    });
});



function convertMarkdown() {
    const converter = new showdown.Converter({tables: true, strikethrough: true, tasklists: true,ghCodeBlocks: true, emoji: true});
    const markdown = $('#markdown-input').val();
    const html = converter.makeHtml(markdown);
    $('#markdown-output').html(html);
}

function insertMarkdown(before, after = '') {
    const textarea = document.getElementById('markdown-input');
    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const text = textarea.value;
    const selectedText = text.substring(start, end);
    const replacement = before + selectedText + after;
    textarea.value = text.substring(0, start) + replacement + text.substring(end);
    textarea.focus();
}