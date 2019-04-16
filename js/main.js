var flag = "tools_17";
var canvas_now = $(".cvs_4"); //当前画布
var oContent = document.getElementById('Content');/*被全屏的元素*/
var color_now = "#000000";
var tool_on = false;
var draggies = [];
var lineWidth = 5;
var pen_style = null;
var select = [];
var tool_zhang = "" ;

$(document).ready(function(){
    /*初始化气泡*/
    $(function () {
        $('[data-toggle="popover"]').popover()
    });
    /*初始化窗口大小*/
    var height = $(window).height()-$("#mainDiv").height()-$("#mainNav").height();
    $(".content").height(height);
    $("#canvas_main").height(height);

    $(function(){
        var clientWidth = document.documentElement.clientWidth || document.body.clientWidth;
        var clientHeight = document.documentElement.clientHeight || document.body.clientHeight;
        // 更新canvas宽高
        $("#bg_canvas").attr("width", clientWidth);
        $("#bg_canvas").attr("height", clientHeight);

        $("#bg_canvas").hide();
        $(".print").click(function(){
            $("#bg_canvas").show();
            alert('现在你可以使用鼠标拖拽选取打印区域，松开后完成');
            //调用选取截屏
            clipScreenshots("bg_canvas");
        });
    });

    /*初始化悬浮窗*/
    $('#history').draggabilly();
    $('.windows_font').draggabilly();
    $('.windows_form').draggabilly();

$("#canvas_main").mousemove(function (ev) {
    $("#foot_x").text(ev.offsetX);
    $("#foot_y").text(ev.offsetY)
});

    $("#font_no").trigger("click");

              /*初始化动画栏*/
        $("#navigation li").hover(
            function () {
                $(this).stop().animate({'marginLeft':'-90px'},200);
            },
            function () {
                $(this).stop().animate({'marginLeft':'0'},200);
            }
        );
    $('.color-box').colpick({
        onSubmit:function(hsb,hex,rgb,el) {

            $(el).css('background-color', '#'+hex);

            $(el).colpickHide();
            color_now = '#'+hex;
        }

    })





































});

