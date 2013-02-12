$(".post-content img, .rhythm").each(function () {
    var obj = $(this);
    var h = obj.height();
    var r = global.lineHeight - (h % global.lineHeight);

    //check if rounded
    if (r == 24) {
        r = 0;
    }

    var top = 0;
    var bottom = r;

    if (obj.is("img")) {
        top = r / 2;
        bottom = r - top;
    }

    obj.css({
        paddingTop: top + "px",
        paddingBottom: bottom + "px"
    });
});