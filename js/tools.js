
    $("#tools li").click(function () {
        $("#tools li").removeClass("tools_active");
        $("#" + this.id).addClass("tools_active");
        var that = this;
        setTimeout(function () {
       if($("#history_tar").children("li").length>=4){
           $("#history_tar li:first").remove()
       }
        $("#history_tar").append("" +
            " <li class=\"history_li\"><span>"+$(that).find("a").attr("data-original-title")+"</span></li>");
        if(flag !== "tools_1"){
            if(tool_on) {
                for(var i=0;i<draggies.length;i++){
                    draggies[i].destroy();
                }
                tool_on = false;
            }
        }
        if(flag !== "tools_7"){
            $(".draw_erazer").addClass("none");
        }
        /*   if(flag !="tools_6"){
               canvas_now.removeEventListener('click', throut(e))
           }*/
        if(flag !== "tools_8"){
            $(".draw_bi").addClass("none");
            pencles(false);
        }
        if(flag !== "tools_13" && flag!=="tools_14"&&flag!=="tools_15"){
            select = []
        }
        if (flag !=="tools_13" || flag ==="tools_14" || flag ==="tools_15"){
            $(canvas_now).removeClass("aa");
            $(canvas_now).removeClass("bb");
            $(canvas_now).removeClass("cc")
        }
        if(flag !=="tools_6" && flag !== "tools_7"){
            $(canvas_now).off("click");
        }
        if(flag !=="tools_9"){
            tool_zhang = "";
            $("#cvs_zhang").off("click");
            $("#cvs_zhang").remove();
            $(".draw_zhang").addClass("none");
        }
        if(flag!=="tools_18"){
            $(".draw_border").addClass("none")
        }
        if(flag!=="tools_20"){
             $(".scale_li").addClass("none");
        }
        /*tools_10*/
        },0)
        if(document.getElementById("cvs_f")){
            if(document.getElementById('cvs_f')) {
                $(".draw_pen").addClass("none");
                var paint = Ypaint(document.getElementById('cvs_f'));
                paint.chooseRect(false);
                paint.chooseCircle(false);
                paint.chooseArrow(false);
                $("#cvs_f").remove()
            }
        }
        /*tools_8*/
        if(document.getElementById("cvs_p")){
                $(".draw_bi").addClass("none");
                var paint = Ypaint(document.getElementById('cvs_p'));
                paint.chooseLine(false);
                $("#cvs_p").remove()
        }
        if(document.getElementById("cvs_z")){
            $("#cvs_z").remove();
        }
    });/*判断*/
    $("#tools_1").click(function () {
        flag = "tools_1";
        var d = document.getElementsByClassName("canvas");
        for(var i=0;i<d.length;i++){
            var draggableElem = d[i];
            var draggie = new Draggabilly( draggableElem);
            draggies.push( draggie );
            draggie.on( 'pointerDown', function() {
                var z = maxIndex();
                z+=1;
                this.$element[0].style.zIndex = z;
                canvas_now =  this.$element[0];
            });
        }
        tool_on = true;
    });/*移动*/
    $("#tools_2").click(function () {
        flag = "tools_2";
        $("#bg_canvas").css("z-index","9999");
        $("#bg_canvas").show();
        $("#bg_canvas").off("click");
        clipScreenshots("bg_canvas");
    });/*选区*/
    $("#tools_3").click(function () {
        flag = "tools_3";
    });/*彩蛋*/
    $("#tools_4").click(function () {
        flag="tools_4";
        $("#bg_canvas").css("z-index","9999");
        $("#bg_canvas").show();
        clipScreenshots("bg_canvas");
    });/*截屏*/
    $("#tools_5").click(function () {
        flag = "tools_5";
        $("#bg_canvas").css("z-index","9999");
        $("#bg_canvas").show();
        clipScreenshots("bg_canvas");
    });/*选中生成*/
    $("#tools_6").click(function () {
        flag = "tools_6";
        $(canvas_now).on("click",function(e) {
            var canvasOffset = $(canvas_now).offset();
            var canvasX = Math.floor(e.pageX - canvasOffset.left);
            var canvasY = Math.floor(e.pageY - canvasOffset.top);
            var colorData = canvas_now.getPixelColor(canvasX, canvasY).hex;
            color_now = colorData;
            $(".color-box").css("background-color",colorData);
            $("#input_colpik").val(colorData);
        })
    });/*吸管*/
    $("#tools_7").click(function () {
        flag = "tools_7";
        $(".draw_erazer").removeClass("none");
    });/*橡皮*/
    $("#tools_8").click(function () {
        flag = "tools_8";
        if(flag === "tools_8") {
            var size_2 = parseInt($("#bi_input").val());
            if (!size_2) {
                size_2 = 1
            }
            $(".draw_bi").removeClass("none");
            $("#canvas_main").append("<canvas id='cvs_p'></canvas>");
            $("#cvs_p").css({
                "position": "fixed",
                "top": $(canvas_now).offset().top - 1,
                "left": $(canvas_now).offset().left - 1,
                "z-index": maxIndex() + 1
            });
            document.getElementById('cvs_p').width = canvas_now.width + 2;
            document.getElementById('cvs_p').height = canvas_now.height + 2;
            var paint = Ypaint(document.getElementById('cvs_p'));
            paint.chooseLine(true);
        }
        paint.outerParams.line.lineWidth = size_2;
        paint.outerParams.line.color = color_now;
    });/*画笔*/
    $("#tools_9").click(function () {
        flag = "tools_9";
        $("#cvs_zhang").off("click");
        if(tool_zhang !=="") {
            $(".draw_zhang").removeClass("none");
            $("#cvs_zhang").click( function (e) {
                var canvasOffset = $("#cvs_zhang").offset();
                var canvasX = Math.floor(e.pageX - canvasOffset.left);
                var canvasY = Math.floor(e.pageY - canvasOffset.top);
                $(this).drawImage({
                    source: tool_zhang,
                    x: canvasX, y: canvasY
                });
            })
        }else if(tool_zhang == ""){
            $("#canvas_main").append("<canvas id='cvs_zhang'></canvas>");
            $("#cvs_zhang").css({
                "position": "fixed",
                "top": $(canvas_now).offset().top - 1,
                "left": $(canvas_now).offset().left - 1,
                "z-index": maxIndex() + 1
            });
            document.getElementById('cvs_zhang').width = canvas_now.width + 2;
            document.getElementById('cvs_zhang').height = canvas_now.height + 2;
        }
    });/*盖章*/
    $("#tools_10").click(function () {
        flag = "tools_10";
        $(".draw_pen").removeClass("none");
        $("#canvas_main").append("<canvas id='cvs_f'></canvas>");
        $("#cvs_f").css({
            "position":"fixed",
            "top":$(canvas_now).offset().top,
            "left":$(canvas_now).offset().left,
            "z-index": maxIndex()+1
        });
        document.getElementById('cvs_f').width = canvas_now.width;
        document.getElementById('cvs_f').height = canvas_now.height;
        var paint = Ypaint(document.getElementById('cvs_f'));
        $("#draws").click(function () {
            if(!pen_style){
                alert("请选择画笔")
            }else if (pen_style === "rect"){
                var linewidth = parseInt($("#pen_input").val());
                paint.chooseRect(true);
                paint.outerParams.rect.lineWidth = linewidth;
                paint.outerParams.rect.radius = 1;
                paint.outerParams.rect.color = color_now;
            }else if (pen_style === "circle"){
                var linewidth = parseInt($("#pen_input").val());
                paint.chooseCircle(true);
                paint.outerParams.circle.lineWidth = linewidth;
                paint.outerParams.circle.color = color_now;
            }else if (pen_style === "arrow"){
                var linewidth = parseInt($("#pen_input").val());
                paint.chooseArrow(true);
                paint.outerParams.arrow.range = linewidth;
                paint.outerParams.arrow.color = color_now;
            }else {
                alert("出现了未知错误，请重新选择工具")
            }
        });

    });/*多功能画笔*/
    $("#tools_11").click(function () {
        flag = "tools_11"
        $(".windows_form").removeClass("none")
    })/*图表*/
    $("#tools_12").click(function () {
        flag = "tools_12";
        $("#bg_canvas").css("z-index","9999");
        $("#bg_canvas").show();
        $("#bg_canvas").removeLayer('areaLayer');
        html2canvas(document.body, {
            scale: 1,
            // allowTaint: true,
            useCORS: true  //跨域使用
        }).then(canvas => {
            var capture_y = $(canvas_now).offset().top;
        var capture_x = $(canvas_now).offset().left;
        printClip(canvas, capture_x, capture_y,canvas_now.width, canvas_now.height)
    })
        $("#bg_canvas").hide();
        $("#bg_canvas").css("z-index","0")

    })/*复制*/
    $("#tools_13").click(function () {
        flag = "tools_13";
        if (!select[0]) {
            var f = false;
            $(canvas_now).mousedown(function () {
                f = true;
                $(canvas_now).mousemove(function (ev) {
                    if (f && flag === "tools_13") {
                        var canvasOffset = $(canvas_now).offset();
                        var canvasX = Math.floor(ev.pageX - canvasOffset.left);
                        var canvasY = Math.floor(ev.pageY - canvasOffset.top);
                        blue(14, 14, canvasX - 7, canvasY - 7)
                    }
                });
                $(canvas_now).mouseup(function () {
                    f = false;
                })


            })
        }else {
            blue(select[2], select[3], select[0], select[1]);
        }
    })/*模糊*/
    $("#tools_14").click(function () {
        flag = "tools_14";
        if (!select[0]) {
            var f = false;
            $(canvas_now).mousedown(function () {
                f= true;
                $(canvas_now).mousemove(function (ev) {
                    if (f&& flag === "tools_14") {
                        var canvasOffset = $(canvas_now).offset();
                        var canvasX = Math.floor(ev.pageX - canvasOffset.left);
                        var canvasY = Math.floor(ev.pageY - canvasOffset.top);
                        lightImage(canvasX - 4, canvasY - 4, 8, 8)
                    }
                });
                $(canvas_now).mouseup(function () {
                    f = false;
                })
            })
        }else {
            lightImage(select[0], select[1], select[2], select[3]);
        }
    })/*淡色*/
    $("#tools_15").click(function () {
        flag = "tools_15";
        if (!select[0]) {
            var f = false;
            $(canvas_now).mousedown(function () {
                f = true;
                $(canvas_now).mousemove(function (ev) {
                    if (f&& flag === "tools_15") {
                        var canvasOffset = $(canvas_now).offset();
                        var canvasX = Math.floor(ev.pageX - canvasOffset.left);
                        var canvasY = Math.floor(ev.pageY - canvasOffset.top);
                        DarkImage(canvasX - 4, canvasY - 4, 8, 8)
                    }
                });
                $(canvas_now).mouseup(function () {
                    f = false;
                })
            })
        }else {
            DarkImage(select[0], select[1], select[2], select[3]);
        }
    })/*加深*/
    $("#tools_16").click(function () {
        flag = "tools_16";
        $(".windows_font").removeClass("none");
        $("#canvas_main").append("<canvas id='cvs_z'></canvas>");
        $("#cvs_z").css({
            "position":"fixed",
            "top":$(canvas_now).offset().top - 1,
            "left":$(canvas_now).offset().left - 1,
            "z-index": maxIndex()+1
        });
        document.getElementById('cvs_z').width = canvas_now.width + 2;
        document.getElementById('cvs_z').height = canvas_now.height + 2;
    });/*打字*/
    $("#tools_17").click(function () {
        flag = "tools_17"
    })
    $("#tools_18").click(function () {
        flag ="tools_18";
        $(".draw_border").removeClass("none")
    })/*边框工具*/
    $("#tools_19").click(function () {
        $.post("ajax/test.html",{flag:flag,canvas_now:canvas_now,color_now:color_now,tool_on:tool_on,draggies:draggies,lineWidth:lineWidth,pen_style:pen_style,select:select,tool_zhang:tool_zhang}, function() {
            alert("发送成功)")
        });
    })/*报错*/
    $("#tools_20").click(function () {
        flag ="tools_20";
      $(".scale_li").removeClass("none")
    })/*缩放*/
