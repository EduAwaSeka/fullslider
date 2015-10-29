
$('#markdown-mode').on('click', function() {
    $('#vertical-toolbar').removeClass('col-sm-2');
    $('#vertical-toolbar').addClass('col-sm-5');

    $('#workspace').removeClass('col-sm-10');
    $('#workspace').addClass('col-sm-7');

    $('#horizontal-slides').removeClass('col-sm-12');
    $('#horizontal-slides').addClass('col-sm-4');


    $('#markdown-space').removeClass('hidden');

});


$('#normal-mode').on('click', function() {
    $('#vertical-toolbar').removeClass('col-sm-5');
    $('#vertical-toolbar').addClass('col-sm-2');

    $('#workspace').removeClass('col-sm-7');
    $('#workspace').addClass('col-sm-10');

    $('#horizontal-slides').removeClass('col-sm-4');
    $('#horizontal-slides').addClass('col-sm-12');

    $('#markdown-space').addClass('hidden');
});