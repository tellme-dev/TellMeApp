//angular.module('ionicApp', ['ionic']);
//文字拖动
//$(function () {
//  //  debugger;

   
//});
//文字拖动



//图片
window.onload = function () {
    debugger;
    var myScroll;
    var length = document.getElementById("list").getElementsByTagName("li").length;		//导航li的数量，若从后台读取可不要本行
    var scroll_width = length * 80 + "px";
    document.getElementById("scroller").style.width = scroll_width;

    //此处，从后台读取时，先如上行重置scroller的宽度后，再把内容放到容器中，再执行下一行

    myScroll = new IScroll('#wrapper', { scrollX: true, scrollY: false, mouseWheel: true });
    document.addEventListener('touchmove', function (e) { e.preventDefault(); }, false);
    var mySwiper1 = new Swiper('#header', {
        freeMode: true,
        slidesPerView: 'auto',
    });
}