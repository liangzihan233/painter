
$("#li_2").click(
    function doInput(id){
        var inputObj = document.createElement('input');
        inputObj.addEventListener('change',readFile,false);
        inputObj.type = 'file';
        inputObj.accept = 'image/*';
        inputObj.id = id;
        inputObj.click();
    });
$("#new").click(function () {
    $(".cover").removeClass("none");
 $(".windows_new").removeClass("none");
});
$(".input_no").click(function () {
    $(".windows_new").addClass("none");
    $(".input_up").val("");
    $(".cover").addClass("none")
});
$(".input_yes").click(function () {
    var value_w = $(".small_1080").val();
    var value_h = $(".small_500").val();
    var check_w = /^(10[0-7]\d)|^([1-9]\d{0,2})$/;
    var check_h =/^(5[0-5]\d)|^([1-4]\d{0,2})$/;
    if(check_w.test(value_w) && check_h.test(value_h)){
        $(".input_no").trigger("click");
        drawNewCanvas(value_w,value_h);
    }else {
       alert("输入的像素太大了")}
});
$("#exit").click(function () {
     $(canvas_now).remove();
    });
/*滤镜菜单事件*/
$('#xiaoguo a').click(function () {
    if (this.id != undefined) {
        var oprationid = this.id;
        switch (oprationid) {
            case "mnConslateblackwhite": //黑白
                tobalckwhite();
                //处理完后关闭
                break;
            case "mnConslateopsitecolor": //反色
                inverse();
                //处理完后关闭
                break;
            case "mnConslatelight": //亮度/对比度
                $("#diamnLightSlide").dialog('open');
                imgdlighttmp = show.getImageData(0, 0, mapWidth, mapHeight);  //从指定的矩形区域获取 canvas 像素数组
                imgdlight = imgdlighttmp;
                break;
            case "mnConslateblur": //模糊
                blur();
                //处理完后关闭
                break;
            case "mnConslatecloud": //雾化
                wuhuaView();
                //处理完后关闭
                break;
            case "mnConslatesharpen": //锐化
                sharpen();
                //处理完后关闭，这里作为测试
                break;
            case "mnConslatefloat": //浮雕
                selaFloat();
                //处理完后关闭
                break;
            case "mnConslatesoft": //柔化
                conslateSoft();

                //处理完后关闭，这里作为测试
                break;
            case "mnConslatepainting": //油画
                conslatepainting();

                //处理完后关闭，这里作为测试
                break;
            case "mnConslatewood": //积木
                conslatewood();

                //处理完后关闭，这里作为测试
                break;
            case "mnConslateCuve": //雕刻
                diaokeView();
                //处理完后关闭，这里作为测试
                break;
            case "mnConslateTurnOld": //怀旧
                turnOld();
                //处理完后关闭，这里作为测试
                break;
            case "mnConslateTurnRed": //红色蒙版
                turnRed();
                //处理完后关闭，这里作为测试

                break;
            case "mnConslateTurnGreen": //绿色蒙版
                turnGreen();
                //处理完后关闭，这里作为测试
                break;
            case "mnConslateTurnBlue": //蓝色蒙版
                turnBlue();
                //处理完后关闭，这里作为测试
                //发送协同操作
                break;
        }

     /*   //保存历史记录，撤销时使用
        //有些对象不需要记录，需要排除
        if (oprationid != "" && oprationid != "mnConslatelight") {
            ShowOpration(oprationmenuid, oprationmenutext, iconmenuCls); //将操作显示在历史记录中
            saveImageHistory();
        }*/
    }
});
/*动画栏事件*/
$(".histories").click(function () {
    if($("#history").css("display") === "none"){
        $("#history").removeClass("none")
    }else {
        $("#history").addClass("none")
    }
});
$(".history_head button").click(function () {
    $("#history").addClass("none")
})
$(".tool_left").click(function () {
    if($("#tools").css("display") === "none"){
        $("#tools").removeClass("none")
    }else {
        $("#tools").addClass("none")
    }
});
$("#clear_all").click(function () {
    $(canvas_now).clearCanvas()
});
$("#li_save").click(function () {
    var imgurl = canvas_now.toDataURL();
    downloadIamge(imgurl);
});
$("#big").click(function () {
    var cvs = canvas_now;
    var imgurl = cvs.toDataURL();
    cvs.width = cvs.width*1.2;
    cvs.height = cvs.height*1.2;
    $(cvs).drawImage({
        source: imgurl,
        x: cvs.width/2, y: cvs.height/2,
        scale: 1.2
    });
});
$("#small").click(function () {
    var cvs = canvas_now;
    var imgurl = cvs.toDataURL();
    cvs.width = cvs.width*0.8;
    cvs.height = cvs.height*0.8;
    console.log(cvs.width);
    $(cvs).drawImage({
        source: imgurl,
        x: cvs.width/2, y: cvs.height/2,
        scale: 0.8
    });
});
$("#scale_big").click(function () {
    if($("#scale").val()) {
        var cvs = canvas_now;
        var imgurl = cvs.toDataURL();
        $(canvas_now).clearCanvas();
        $(cvs).drawImage({
            source: imgurl,
            x: cvs.width/2, y: cvs.height/2,
            scale: parseInt($("#scale").val()) / 100 + 1
        });
    }else {alert("请填写正确的倍数")}
});
$("#scale_small").click(function () {
    if($("#scale").val()) {
        var cvs = canvas_now;
        var imgurl = cvs.toDataURL();
        $(canvas_now).clearCanvas();
        $(cvs).drawImage({
            source: imgurl,
            x: cvs.width/2, y: cvs.height/2,
            scale: 1-(parseInt($("#scale").val()) / 100)
        });
    }else {alert("请填写正确的倍数")}
});
$("#rotate_90").click(function () {
    rotateCanvas();
});
$("#rotate_180").click(function () {
    rotateanvas();
});
$("#rotate_270").click(function () {
    rotatecanvas();
});
$("#rotate_c").click(function () {
    var ctx = canvas_now.getContext("2d");
    var img_data = ctx.getImageData(0, 0, canvas_now.width, canvas_now.height),
            x, y, p, i, i2, t,
        h = img_data.height;
      w = img_data.width;
     var  w_2 = w / 2;
    // 将 img_data 的数据水平翻转
    for (y = 0; y < h; y ++) {
               for (x = 0; x < w_2; x ++) {
                      i = (y<<2) * w + (x<<2);
                   i2 = ((y + 1) << 2) * w - ((x + 1) << 2);
                for (p = 0; p < 4; p ++) {
                     t = img_data.data[i + p];
                        img_data.data[i + p] = img_data.data[i2 + p];
                        img_data.data[i2 + p] = t;
                    }
                    }
    }
       // 重绘水平翻转后的图片
        ctx.putImageData(img_data, 0, 0);

});
$("#img_size").click(function () {
alert("图像的宽为："+canvas_now.width+","+"高为："+canvas_now.height)
});
$("#canvas_size").click(function () {
    $(".cover").removeClass("none");
    $(".windows_size").removeClass("none");
})
$(".size_no").click(function () {
    $(".cover").addClass("none");
    $(".windows_size").addClass("none");
})
$(".size_yes").click(function () {
    var imgurl = canvas_now.toDataURL();
    $(".cover").addClass("none");
    $(".windows_size").addClass("none");
    var width_val = $(".width_val").val();
    var height_val = $(".height_val").val();
    if(!width_val && height_val){
        $(".cover").addClass("none");
        $(".windows_size").addClass("none");
    }
    canvas_now.width = width_val;
    canvas_now.height =height_val;
    $(canvas_now).drawImage({
        source: imgurl,
        x: canvas_now.width/2, y: canvas_now.height/2,
    });
})
$("#rotateAny").click(function () {
    $(".cover").removeClass("none");
    $(".windows_rotate").removeClass("none");
})
$(".rotate_no").click(function () {
    $(".cover").addClass("none");
    $(".windows_rotate").addClass("none");
})
$(".rotate_yes").click(function () {
    var cvs = canvas_now;
    var rotate_val = $(".rotate_val").val();
   if(!rotate_val){alert("请输入角度")}
   rotateAnyCanvas(cvs,rotate_val)
})
$("#copy_canvas").click(function () {
    var w = canvas_now.width;
    var h = canvas_now.height;
    var imgurl = canvas_now.toDataURL();
    console.log(imgurl)
    creatNewCanvas();
    var cvs = document.querySelector('#'+ canvas_now);
    cvs.width=w;
    cvs.height=h;
    $(cvs).drawImage({
        source: imgurl,
        x: w/2, y: h/2,
    });
    canvas_now =cvs;
})
$("#bi_button").click(function () {
    $("#tools_8").trigger("click")
})
$(".ruler").click(function () {
    exitFullScreen(document.getElementById("Content"))
})
$(".to_all").click(function () {
    fullScreen(document.getElementById("Content"))
})
$(".refresh").click(function () {
    location.reload()
})
$("#all_scream").click(function () {
    fullScreen(canvas_now)
})
$("#reset_scream").click(function () {
    $("#history").addClass("none");
    $("#tools").removeClass("none");
    $("#foot").removeClass("none");
    exitFullScreen(document.getElementById("Content"))
})
$(".foot_xy").click(function () {
    if($("#foot").css("display") === "none"){
        $("#foot").removeClass("none")
    }else {
        $("#foot").addClass("none")
    }
})
$("#draws_save").click(function () {
    var canvas = document.getElementById("cvs_f");
    var imgurl = canvas.toDataURL();
    var img = new Image;
    img.src = imgurl;
    img.onload = function(){//必须onload之后再画
        canvas_now.getContext('2d').drawImage(img,0,0);
    };
    canvas.getContext('2d').clearRect(0,0,canvas.width,canvas.height)
})
$("#draw_save").click(function () {
    var canvas = document.getElementById("cvs_p");
    var imgurl = canvas.toDataURL();
    var img = new Image;
    img.src = imgurl;
    img.onload = function(){//必须onload之后再画
        canvas_now.getContext('2d').drawImage(img,0,0);
    };
    canvas.getContext('2d').clearRect(0,0,canvas.width,canvas.height)
  /*  document.getElementById("cvs_f").canvas.copyrect(rect(0, 0, 100, 100), m_BitMap.Canvas, rect(0, 0, 100, 100));*/
  /*  canvas_now.getContext('2d').drawImage(canvas,canvas_now.width, canvas_now.height, canvas_now.width, canvas_now.height, 0, 0, canvas_now.width, canvas_now.height);*/
   /* html2canvas(document.body, {
        scale: 1,
        // allowTaint: true,
        useCORS: true  //跨域使用
    }).then(canvas => {
        var capture_x, capture_y;
    canvas_now.getContext('2d').drawImage(canvas, canvas_now.offsetLeft-40, canvas_now.offsetTop +1, canvas_now.width, canvas_now.height, 0, 0, canvas_now.width, canvas_now.height);*/
/*})*/
})
$("#rect").click(function () {
    pen_style = "rect";
    $("#dropdownMenu1").text("长方形")
})
$("#circle").click(function () {
    pen_style = "circle";
     $("#dropdownMenu1").text("圆形")
})
$("#arrow").click(function () {
    pen_style = "arrow";
    $("#dropdownMenu1").text("箭头")
})
$("#font_no").click(function () {
    var arrs = []
    $(".windows_font").addClass("none");
    $(".form-control").each(function () {
        arrs.push($(this));
    });
    arrs[0].val("Hello World");
    arrs[2].val("100")
    arrs[3].val("25")
    arrs[4].val("500")
    arrs[5].val("0")
    arrs[6].val("#ffffff")
    arrs[7].val("30")
    arrs[8].val("#000000")
    arrs[9].val("0")
    arrs[10].val("0");
})
$("#font_do").click(function () {
   var arr = [];
    $(".form-control").each(function () {
        arr.push($(this).val());
    });
    console.log( "fontStyle: "+arr[8],
        "strokeStyle:"+ arr[6],
        "strokeWidth:"+ parseInt(arr[5])+"pt",
        "x:"+ parseInt(arr[2]), "y:"+ parseInt(arr[3]),
       " fontSize:"+ parseInt(arr[7])+"pt",
        "fontFamily:"+ arr[1],
        "text:"+ arr[0],
        "rotate:"+ parseInt(arr[5]),
        "maxWidth:"+ parseInt(arr[4]),
       " radius:"+ parseInt(arr[10]));
    $("#cvs_z").drawText({
        fillStyle: arr[8],
        strokeStyle: arr[6],
        strokeWidth: parseInt(arr[5])+"pt",
        x: parseInt(arr[2]), y: parseInt(arr[3]),
        fontSize: parseInt(arr[7])+"pt",
        fontFamily: arr[1],
        text: arr[0],
        rotate: parseInt(arr[5]),
        maxWidth: parseInt(arr[4]),
        radius: parseInt(arr[10])
    });
/*    fontStyle: #000000 strokeStyle:#000000 strokeWidth:0 x:200 y:200  fontSize:50 fontFamily:Microsoft YaHei text:123123 rotate:0 maxWidth:300  radius:150*/
})
$("#erazer_button").click(function () {
    var cvs = canvas_now;
    var ctx = cvs.getContext("2d");
    var isMouseDown=false;
    var size = parseInt($("#erazer_input").val());
    if(!size){size = 5}
    cvs.onmousedown=function (e) {
        isMouseDown=true;
        //记录下鼠标点击的时候的位置
        X= e.offsetX;
        Y= e.offsetY;
        ctx.arc(X,Y,5,0,2*Math.PI);
        cvs.onmousemove=function (e) {
            if(isMouseDown){
                X1= e.offsetX;
                Y1= e.offsetY;
                ctx.save();
                ctx.beginPath();
                ctx.arc(X1,Y1,size,0,2*Math.PI);
                ctx.clip();
                ctx.clearRect(0,0,cvs.width,cvs.height);
                ctx.restore();
            }
        };
        cvs.onmouseup=function () {

            isMouseDown=false;
        }
    }
})
$("#font_re").click(function () {
    $("#cvs_z").clearCanvas()
})
$("#font_yes").click(function () {
    var canvas = document.getElementById("cvs_z");
    var imgurl = canvas.toDataURL();
    var img = new Image;
    img.src = imgurl;
    img.onload = function(){//必须onload之后再画
        canvas_now.getContext('2d').drawImage(img,0,0);
    };
    canvas.getContext('2d').clearRect(0,0,canvas.width,canvas.height)
})
$(".menu-toggle").click(function () {
    $(".mainfeature").addClass("none");
    $(canvas_now).css({
        "filter":"blur(0px)",
        "opacity":"1"
    })
})
$("#ruler").click(function () {
    $.pageRulerToggle()
})
$("#form_yes").click(function () {
$("#target_form").append(" <div class=\"form-group\">\n" +
    "                                    <div class=\"col-lg-3 col-md-3 col-sm-3\" style=\"float: left\">\n" +
    "                                        <label>起始角</label>\n" +
    "                                        <input type=\"text\" class=\"form-control\" placeholder=\"0\">\n" +
    "                                    </div>\n" +
    "                                    <div class=\"col-lg-3 col-md-3 col-sm-3\" style=\"float: left\">\n" +
    "                                        <label>终止角</label>\n" +
    "                                        <input type=\"text\" class=\"form-control\" placeholder=\"0\">\n" +
    "                                    </div>\n" +
    "                                    <div class=\"col-lg-6 col-md-6 col-sm-6\" style=\"float: left\">\n" +
    "                                        <label>颜色(#)</label>\n" +
    "                                        <input type=\"text\" class=\"form-control\">\n" +
    "                                    </div>\n" +
    "                                    <div class=\"clearfix\"></div>\n" +
    "                                </div>")
})
$("#form_no").click(function () {
    $("#target_form").empty();
    $("#target_form").append(" <div class=\"form-group\">\n" +
        "                                    <div class=\"col-lg-3 col-md-3 col-sm-3\" style=\"float: left\">\n" +
        "                                        <label>起始角</label>\n" +
        "                                        <input type=\"text\" class=\"form-control\" placeholder=\"0\">\n" +
        "                                    </div>\n" +
        "                                    <div class=\"col-lg-3 col-md-3 col-sm-3\" style=\"float: left\">\n" +
        "                                        <label>终止角</label>\n" +
        "                                        <input type=\"text\" class=\"form-control\" placeholder=\"0\">\n" +
        "                                    </div>\n" +
        "                                    <div class=\"col-lg-6 col-md-6 col-sm-6\" style=\"float: left\">\n" +
        "                                        <label>颜色(#)</label>\n" +
        "                                        <input type=\"text\" class=\"form-control\">\n" +
        "                                    </div>\n" +
        "                                    <div class=\"clearfix\"></div>\n" +
        "                                </div>")
    $(".windows_form").addClass("none");
})
$("#form_do").click(function () {
    creatNewCanvas();
    var cvs = document.querySelector('#'+ canvas_now);
    canvas_now = cvs;
    cvs.width= 210;
    cvs.height= 210;
$("#target_form").children(".form-group").each(function () {
    var arr = [];
    $(this).find(".form-control").each(function () {
        if($(this).val() == NaN){$(this).val(0)}
        arr.push($(this).val())
    });
    if(parseInt(arr[0])>180){arr[0] = parseInt(arr[0]) - 360}
    if(parseInt(arr[1])>180){arr[1] = parseInt(arr[1]) - 360}
    $(canvas_now)
        .drawSlice({
            layer: true,
            groups: ['chart', 'slices'],
            fillStyle: arr[2],
            x: 105, y: 105,
            start: parseInt(arr[0]), end: parseInt(arr[1])-2,
            radius: 100,
            spread: 1 / 40
        })
})


})
$("#border_yes").click(function () {
    var arr = [];
    arr[0] = $("#border_px").val();arr[1]= $("#border_color").val();arr[2]= $("#border_radius").val();
    for(var i=0;i<3;i++){
        if(!arr[i]){arr[i] =0}
    }
    console.log(arr);
    $("canvas").css({
        "border": arr[0]+"px",
        "border-style": "solid",
        "border-color": arr[1],
        "border-radius": arr[2]+"px"
    })
})
$(".save_zhang").click(function () {
    var len = $("#my_zhang").children("li").length;
    var clipImg = new Image();
    clipImg.src = canvas_now.toDataURL();
    $("#my_zhang").append(" <li><a tabindex=\"-1\" class=\"jojo\" id=\"zhang_"+len+"\">&nbsp;</a>\n" +
        "                                    </li>");
    $("#zhang_"+len).css("background-image","url("+clipImg.src+")");
    $("#zhang_"+len).click(function () {
        var url = clipImg.src;
        if(flag !== "tools_9") {
            zhang(url)
        }else {
            tool_zhang = url;
            $("#tools_9").trigger("click")
        }
    })
});
$("#jojo_0").click(function () {
    var url = "img/jojo/00.gif";
    if(flag !== "tools_9") {
        zhang(url)
    } else {
        console.log(2);
        tool_zhang = url;
        $("#tools_9").trigger("click");
    }
})
$("#jojo_1").click(function () {
    var url = 'img/jojo/11.gif';
     if(flag !== "tools_9") {
         zhang(url)
     }else {
           tool_zhang = url;
             $("#tools_9").trigger("click")
     }
})
$("#jojo_2").click(function () {
    var url = 'img/jojo/22.gif';
     if(flag !== "tools_9") {
         zhang(url)
     }else {
           tool_zhang = url;
             $("#tools_9").trigger("click")
     }
})
$("#jojo_3").click(function () {
    var url = 'img/jojo/33.gif';
     if(flag !== "tools_9") {
         zhang(url);
     }else {
         tool_zhang = url;
           $("#tools_9").trigger("click")
     }

})
$("#jojo_4").click(function () {
    var url = 'img/jojo/44.gif';
     if(flag !== "tools_9") {
         zhang(url)
     }else {
           tool_zhang = url;
             $("#tools_9").trigger("click")
     }
})
$("#jojo_5").click(function () {
    var url = 'img/jojo/55.png';
     if(flag !== "tools_9") {
         zhang(url)
     }else {
           tool_zhang = url;
             $("#tools_9").trigger("click")
     }
})
$("#jojo_6").click(function () {
    var url = 'img/jojo/66.png';
     if(flag !== "tools_9") {
         zhang(url)
     }else {
           tool_zhang = url;
             $("#tools_9").trigger("click")
     }
})
$("#jojo_7").click(function () {
    var url = 'img/jojo/77.png';
     if(flag !== "tools_9") {
         zhang(url)
     }else {
           tool_zhang = url;
             $("#tools_9").trigger("click")
     }
})
$("#jojo_8").click(function () {
    var url = 'img/jojo/88.png';
     if(flag !== "tools_9") {
         zhang(url)
     }else {
           tool_zhang = url;
             $("#tools_9").trigger("click")
     }
})
$("#jojo_9").click(function () {
    var url = 'img/jojo/99.png';
     if(flag !== "tools_9") {
         zhang(url)
     }else {
           tool_zhang = url;
             $("#tools_9").trigger("click")
     }
})
$("#jojo_11").click(function () {
    var url = 'img/jojo/1111.png';
     if(flag !== "tools_9") {
         zhang(url)
     }else {
           tool_zhang = url;
             $("#tools_9").trigger("click")
     }
})
$("#jojo_12").click(function () {
    var url = 'img/jojo/1212.png';
     if(flag !== "tools_9") {
         zhang(url)
     }else {
           tool_zhang = url;
             $("#tools_9").trigger("click")
     }
})
$("#jojo_13").click(function () {
    var url = 'img/jojo/1313.png';
     if(flag !== "tools_9") {
         zhang(url)
     }else {
           tool_zhang = url;
             $("#tools_9").trigger("click")
     }
})
$("#jojo_14").click(function () {
    var url = 'img/jojo/1414.png';
     if(flag !== "tools_9") {
         zhang(url)
     }else {
           tool_zhang = url;
             $("#tools_9").trigger("click")
     }
})
$("#jojo_bg").click(function () {
    var url = 'img/jojo/bgbg.png';
     if(flag !== "tools_9") {
         zhang(url);
     }else {
           tool_zhang = url;
             $("#tools_9").trigger("click")
     }
    $("#jojo_bg").css("z-index","998")
})
$("#zhang_yes").click(function () {
    var canvas = document.getElementById("cvs_zhang");
    var imgurl = canvas.toDataURL();
    var img = new Image;
    img.src = imgurl;
    img.onload = function(){//必须onload之后再画
        canvas_now.getContext('2d').drawImage(img,0,0);
    };
    canvas.getContext('2d').clearRect(0,0,canvas.width,canvas.height)
})
$("#zhang_no").click(function () {
    var c = document.getElementById("cvs_zhang");
    c.getContext("2d").clearRect(0,0,c.width,c.height);
})
$("#stick_0").click(function () {
    var url = 'img/pack/000.png';
    if(flag !== "tools_9") {
        zhang(url);
    }else {
        tool_zhang = url;
        $("#tools_9").trigger("click")
    }
    $("#jojo_bg").css("z-index","998")
})
$("#stick_1").click(function () {
    var url = 'img/pack/111.png';
    if(flag !== "tools_9") {
        zhang(url);
    }else {
        tool_zhang = url;
        $("#tools_9").trigger("click")
    }
    $("#jojo_bg").css("z-index","998")
})
$("#stick_2").click(function () {
    var url = 'img/pack/222.jpg';
    if(flag !== "tools_9") {
        zhang(url);
    }else {
        tool_zhang = url;
        $("#tools_9").trigger("click")
    }
    $("#jojo_bg").css("z-index","998")
})
$("#stick_3").click(function () {
    var url = 'img/pack/333.jpg';
    if(flag !== "tools_9") {
        zhang(url);
    }else {
        tool_zhang = url;
        $("#tools_9").trigger("click")
    }
    $("#jojo_bg").css("z-index","998")
})
$("#stick_4").click(function () {
    var url = 'img/pack/444.jpg';
    if(flag !== "tools_9") {
        zhang(url);
    }else {
        tool_zhang = url;
        $("#tools_9").trigger("click")
    }
    $("#jojo_bg").css("z-index","998")
})
$("#stick_5").click(function () {
    var url = 'img/pack/555.jpg';
    if(flag !== "tools_9") {
        zhang(url);
    }else {
        tool_zhang = url;
        $("#tools_9").trigger("click")
    }
    $("#jojo_bg").css("z-index","998")
})
$("#clear_zhang").click(function () {
    $(".zhang").remove();
})


/*
$("#").click(function () {

})
*/

