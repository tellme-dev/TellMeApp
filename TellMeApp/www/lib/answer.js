//ÉçÇøÆÀÂÛ
$(document).ready(function () {
    $(".clock-i").click(function () {
        if ($(".sq-show").is(":hidden")) {
            $(".sq-show").show();
        } else {
            $(".sq-show").hide();
        }
    });
    $(".butt-op").click(function () {
        $(".sq-show").hide();
    });
});