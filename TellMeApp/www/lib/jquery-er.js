angular.module('ionicApp', ['ionic']);
//�����϶�
$(function () {
    debugger;
    var myScroll;
    var length = document.getElementById("list").getElementsByTagName("li").length;		//����li�����������Ӻ�̨��ȡ�ɲ�Ҫ����
   
    var scroll_width = length * 80 + "px";
    document.getElementById("scroller").style.width = scroll_width;

    //�˴����Ӻ�̨��ȡʱ��������������scroller�Ŀ�Ⱥ��ٰ����ݷŵ������У���ִ����һ��

    myScroll = new IScroll('#wrapper', { scrollX: true, scrollY: false, mouseWheel: true });
    document.addEventListener('touchmove', function (e) { e.preventDefault(); }, false);

   
});
//�����϶�



//ͼƬ
window.onload = function () {
    var mySwiper1 = new Swiper('#header', {
        freeMode: true,
        slidesPerView: 'auto',
    });
}