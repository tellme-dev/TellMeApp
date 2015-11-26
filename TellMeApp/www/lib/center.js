$(function () {
    $('#list li').click(function () {
        this.addClass('li-but').siblings('li').removeClass('li-but');
    })
});