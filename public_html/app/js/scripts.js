function scalePlay (element) {
    var elem_height = element.offsetHeight;

    $("#play").css("width", $(element).css("width"));
    $("#play").css("top", $(element).css("top"));
    $("#play").css("left", $(element).css("left"));
    
    $("#play").children(".scale").css("top", elem_height);
    $("#play").children(".skewy").css("top", elem_height * 2 / 5);
    $("#play").children(".rotate").css("top", elem_height * 2 / 5);
};