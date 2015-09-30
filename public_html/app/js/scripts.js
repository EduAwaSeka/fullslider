
$('#markdown-mode').on('click', function() {
    $('#vertical-toolbar').removeClass('col-sm-2');
    $('#vertical-toolbar').addClass('col-sm-6');

    $('#workspace').removeClass('col-sm-10');
    $('#workspace').addClass('col-sm-6');

    $('#horizontal-slides').removeClass('col-sm-12');
    $('#horizontal-slides').addClass('col-sm-3');


    $('#markdown-space').removeClass('hidden');

});


$('#normal-mode').on('click', function() {
    $('#vertical-toolbar').removeClass('col-sm-6');
    $('#vertical-toolbar').addClass('col-sm-2');

    $('#workspace').removeClass('col-sm-6');
    $('#workspace').addClass('col-sm-10');

    $('#horizontal-slides').removeClass('col-sm-3');
    $('#horizontal-slides').addClass('col-sm-12');

    $('#markdown-space').addClass('hidden');
});