/*读取图片*/
function readFile(){
    var file = this.files[0];//获取input输入的图片
    if(!/image\/\w+/.test(file.type)){
        alert("请确保文件为图像类型");
        return false;
    }//判断是否图片，在移动端由于浏览器对调用file类型处理不同，虽然加了accept = 'image/*'，但是还要再次判断
    var reader = new FileReader();
    reader.readAsDataURL(file);//转化成base64数据类型
    reader.onload = function(e){
        checkImage(1080,560,this.result)
        /* drawToCanvas(this.result);*/
    }
}
/*画图片*/
function drawToCanvas(w,h,imgData){
    creatNewCanvas();
    var cvs = document.getElementById(''+ canvas_now);
    cvs.width=w;
    cvs.height=h;
    var ctx = cvs.getContext('2d');
    var img = new Image;
    img.src = imgData;
    img.onload = function(){//必须onload之后再画
        ctx.drawImage(img,0,0,w,h);
    };
    $('#'+ canvas_now).css({"z-index" : maxIndex()+2});
    canvas_now = cvs;
}
/*修改图片尺寸*/
function checkImage(maxWidth,maxHeight,imgData){
    var img = new Image();
    img.src = imgData;
    img.onload = function() {
        var hRatio;
        var wRatio;
        var Ratio = 1;
        var w = img.width;
        var h = img.height;
        wRatio = maxWidth / w;/*画布除原  >1 不缩放*/
        hRatio = maxHeight / h;/*小于1 缩放*/
        if(wRatio>1 && hRatio>1){Ratio = 1}
        else if(wRatio>1 && hRatio<1){Ratio = hRatio}
        else if(wRatio<1 && hRatio>1){Ratio = wRatio}
        else if(wRatio<1 && hRatio<1){
            if(wRatio>hRatio){Ratio = hRatio}
            else (Ratio = wRatio)

        }
        w = w * Ratio;
        h = h * Ratio;
        imgData.height = h;
        imgData.width = w;
        drawToCanvas(w,h,img.src)
    }

}
/*创建新的空白图*/
function drawNewCanvas(w,h) {
    creatNewCanvas();
  var cvs = document.querySelector('#'+ canvas_now);
    cvs.width=w;
    cvs.height=h;
    $('#'+ canvas_now).css({
        "z-index" : maxIndex()+2,
        "background-color" : "white"
    });
    $('cvs_0').drawArc({
        fillStyle: 'black',
        x: 100, y: 100,
        radius: 50
    });
    canvas_now = cvs;
}
/*创建新canvas*/
function creatNewCanvas() {
  var len = document.getElementsByClassName("canvas").length;
  $("#canvas_main").append("<canvas id=cvs_"+len+" class='canvas'></canvas>");
  canvas_now = "cvs_"+len;
}
/*计算最大z-index*/
function maxIndex() {
        var maxZ = Math.max.apply(null,
            $.map($('.canvas'), function(e,n) {
                if ($(e).css('position') != 'static')
                    return parseInt($(e).css('z-index')) || -1;
            }));
        return maxZ;
    }
/*全屏*/
function fullScreen(el) {
    var rfs = el.requestFullScreen || el.webkitRequestFullScreen || el.mozRequestFullScreen || el.msRequestFullScreen,
        wscript;

    if(typeof rfs != "undefined" && rfs) {
        rfs.call(el);
        return;
    }

    if(typeof window.ActiveXObject != "undefined") {
        wscript = new ActiveXObject("WScript.Shell");
        if(wscript) {
            wscript.SendKeys("{F11}");
        }
    }
}
function exitFullScreen(el) {
    var el= document,
        cfs = el.cancelFullScreen || el.webkitCancelFullScreen || el.mozCancelFullScreen || el.exitFullScreen,
        wscript;

    if (typeof cfs != "undefined" && cfs) {
        cfs.call(el);
        return;
    }

    if (typeof window.ActiveXObject != "undefined") {
        wscript = new ActiveXObject("WScript.Shell");
        if (wscript != null) {
            wscript.SendKeys("{F11}");
        }
    }
}
/*工具绘画*/
function pencles(a,size,color) {
    if(a){
    function drowline(num1,num2,num3,num4){
        //开启新的路径
        if(flag)
            context.beginPath();
        //移动画笔的初始位置
        context.moveTo(num1,num2);
        context.lineWidth=size;
        context.strokeStyle=color;
        //移动画笔的结束位置
        context.lineTo(num3,num4);
        //开始绘制
        context.stroke();
        if(flag!=0){
            X=X1;
            Y=Y1;
        }
    }
        var oV=canvas_now;
        var isMouseDown=false;
        var context=oV.getContext('2d');  //图形上下文——绘图接口
        var X,Y,X1,Y1;
        var flag=0;
        oV.onmousedown=function (e) {
            isMouseDown=true;
            //记录下鼠标点击的时候的位置
            X= e.offsetX;
            Y= e.offsetY;
            oV.onmousemove=function (e) {
                if(isMouseDown){
                    X1= e.offsetX;
                    Y1= e.offsetY;
                    drowline(X,Y,X1,Y1);
                    flag++;
                }
            };
            oV.onmouseup=function () {
                isMouseDown=false;
                flag=0;
            }
        }
    } else {canvas_now.onmousedown=function () {
        null;
    }}
}
    /*黑白*/
function tobalckwhite() {
    var mapWidth = canvas_now.width;
    var mapHeight = canvas_now.height;//绘图区域高
    var show = canvas_now.getContext("2d");
    var imgd = show.getImageData(0, 0, mapWidth, mapHeight);  //从指定的矩形区域获取 canvas 像素数组
    var pix = imgd.data; //得到像素
    for (var i = 0, n = pix.length; i < n; i += 4) {
        var r = pix[i];
        var g = pix[i + 1];
        var b = pix[i + 2];
        var averge;
        //实例程序以加权平均值法产生黑白图像
        var iType = 2;
        switch (iType) {
            case 0: //平均值法
                averge = ((r + g + b) / 3);
                break;
            case 1: //最大值法
                averge = r > g ? r : g;
                averge = averge > b ? averge : b;
                break;
            case 2: //加权平均值法
                //averge = ((0.7 * r) + (0.2 * g) + (0.1 * b));
                averge = ((0.299 * r) + (0.587 * g) + (0.114 * b));
                break;
        }
        pix[i] = averge;       //红
        pix[i + 1] = averge;   //绿
        pix[i + 2] = averge;   //蓝
        pix[i + 3] = pix[i + 3];         //透明度
    }

    show.putImageData(imgd, 0, 0);         //在指定位置进行像素重绘
}
//获得每一点像素的值, 然后再使用SetPixel方法将取反后的颜色值设置到对应的点
function inverse() {
    var mapWidth = canvas_now.width;
    var mapHeight = canvas_now.height;//绘图区域高
    var show = canvas_now.getContext("2d");
    var imgd = show.getImageData(0, 0, mapWidth, mapHeight);  //从指定的矩形区域获取 canvas 像素数组
    var pix = imgd.data; //得到像素

    //获取红绿蓝，取反
    for (var i = 0, n = pix.length; i < n; i += 4) {
        pix[i] = 255 - pix[i];           //红
        pix[i + 1] = 255 - pix[i + 1];   //绿
        pix[i + 2] = 255 - pix[i + 2];   //蓝
        pix[i + 3] = pix[i + 3];         //透明度
    }

    show.putImageData(imgd, 0, 0);         //在指定位置进行像素重绘
}
function light(lightstep) {
    imgdlighttmp = imgdlight;
    var show = canvas_now.getContext("2d");
    var pix = imgdlighttmp.data; //得到像素
    var average = 0;//计算r、g、b平均值

    for (var i = 0, n = pix.length; i < n; i += 4) {
        var r = 0;
        var g = 0;
        var b = 0;

        r = pix[i] + lightstep;
        g = pix[i + 1] + lightstep;
        b = pix[i + 2] + lightstep;

        average = (r + g + b) / 3;
        r = r + average;
        g = g + average;
        b = b + average;

        if (r > 255)
            r = 255;
        if (r < 0)
            r = 0;
        if (g > 255)
            g = 255;
        if (g < 0)
            g = 0;
        if (b > 255)
            b = 255;
        if (b < 0)
            b = 0;

        pix[i] = r;       //红
        pix[i + 1] = g;   //绿
        pix[i + 2] = b;   //蓝
        pix[i + 3] = pix[i + 3];         //透明度
    }

    show.putImageData(imgdlighttmp, 0, 0);         //在指定位置进行像素重绘
}
 function drawRect(canvasId) {
    var that = this;
    that.penColor = "#000000";
    that.penWidth = 5;
    var canvas = document.getElementById(canvasId);
    //canvas 的矩形框
    var canvasRect = canvas.getBoundingClientRect();
    //canvas 矩形框的左上角坐标
    var canvasLeft = canvasRect.left;
    var canvasTop = canvasRect.top;
    // 要画的矩形的起点 xy
    var x = 0;
    var y = 0;

    //鼠标点击按下事件，画图准备
    canvas.onmousedown = function (e) {
        //设置画笔颜色和宽度
        var color = that.penColor;
        var penWidth = that.penWidth;
        // 确定起点
        x = e.clientX - canvasLeft;
        y = e.clientY - canvasTop;
        // 添加layer
        $("#" + canvasId).addLayer({
            type: 'rectangle',
            strokeStyle: color,
            strokeWidth: penWidth,
            name: 'areaLayer',
            fromCenter: false,
            x: x, y: y,
            width: 1,
            height: 1
        });
        // 绘制
        $("#" + canvasId).drawLayers();
        $("#" + canvasId).saveCanvas();

        //鼠标移动事件，画图
        canvas.onmousemove = function (e) {

            // 要画的矩形的宽高
            var width = e.clientX - canvasLeft - x;
            var height = e.clientY - canvasTop - y;

            // 清除之前画的
            $("#" + canvasId).removeLayer('areaLayer');

            $("#" + canvasId).addLayer({
                type: 'rectangle',
                strokeStyle: color,
                strokeWidth: penWidth,
                name: 'areaLayer',
                fromCenter: false,
                x: x, y: y,
                width: width,
                height: height
            });

            $("#" + canvasId).drawLayers();
        }
    };
    //鼠标抬起
    canvas.onmouseup = function (e) {

        var color = that.penColor;
        var penWidth = that.penWidth;

        canvas.onmousemove = null;

        var width = e.clientX - canvasLeft - x;
        var height = e.clientY - canvasTop - y;

        $("#" + canvasId).removeLayer('areaLayer');

        $("#" + canvasId).addLayer({
            type: 'rectangle',
            strokeStyle: color,
            strokeWidth: penWidth,
            name: 'areaLayer',
            fromCenter: false,
            x: x, y: y,
            width: width,
            height: height
        });

        $("#" + canvasId).drawLayers();
        $("#" + canvasId).saveCanvas();
    }
}
function rotateCanvas() {
    var cvs = canvas_now;
    var w = cvs.width;
    var h = cvs.height;
    var imgurl = canvas_now.toDataURL("image/png");
    cvs.width=h;
    cvs.height=w;
    $(canvas_now).drawImage({
        source: imgurl,
        x: h/2, y: w/2,
        rotate: 90
    });
}
function rotatecanvas() {
    var cvs = canvas_now;
    var w = cvs.width;
    var h = cvs.height;
    var imgurl = canvas_now.toDataURL("image/png");
    cvs.width=h;
    cvs.height=w;
    $(canvas_now).drawImage({
        source: imgurl,
        x: h/2, y: w/2,
        rotate: 270
    });
}
function rotateanvas() {
    var cvs = canvas_now;
    var w = cvs.width;
    var h = cvs.height;
    var imgurl = canvas_now.toDataURL("image/png");
    $(canvas_now).drawImage({
        source: imgurl,
        x: w/2, y: h/2,
        rotate: 180
    });
}
function rotateAnyCanvas(cvs,a) {
    var w = cvs.width;
    var h = cvs.height;
    var imgurl = canvas_now.toDataURL("image/png");
    cvs.getContext("2d").clearRect(0,0,w,h);
    $(canvas_now).drawImage({
        source: imgurl,
        x: w/2, y: h/2,
        rotate: a
    });
}
//#endregion
//#region对比度调整todo
//让颜色深的更深，让颜色浅的更浅
function compare(compstep) {
    imgdlighttmp = imgdlight;
    var pix = imgdlighttmp.data; //得到像素

    for (var i = 0, n = pix.length; i < n; i += 4) {
        var r = 0;
        var g = 0;
        var b = 0;

        r = pix[i];
        g = pix[i + 1];
        b = pix[i + 2];

        if (r > 127) {
            r = r + compstep;
        }
        if (r < 127) {
            r = r - compstep;
        }

        if (g > 127) {
            g = g + compstep;
        }
        if (g < 127) {
            g = g - compstep;
        }

        if (b > 127) {
            b = b + compstep;
        }
        if (b < 127) {
            b = b - compstep;
        }

        if (r > 255)
            r = 255;
        if (r < 0)
            r = 0;
        if (g > 255)
            g = 255;
        if (g < 0)
            g = 0;
        if (b > 255)
            b = 255;
        if (b < 0)
            b = 0;

        pix[i] = r;       //红
        pix[i + 1] = g;   //绿
        pix[i + 2] = b;   //蓝
        pix[i + 3] = pix[i + 3];         //透明度
    }

    show.putImageData(imgdlighttmp, 0, 0);         //在指定位置进行像素重绘
}
//#region 锐化效果
//突出显示颜色值大(即形成形体边缘)的像素点.
function sharpen() {
    var mapWidth = canvas_now.width;
    var mapHeight = canvas_now.height;//绘图区域高
    var show = canvas_now.getContext("2d");
    var imgd = show.getImageData(0, 0, mapWidth, mapHeight);  //从指定的矩形区域获取 canvas 像素数组
    var pix = imgd.data; //得到像素
    var imgdWd = imgd.width;
    var imgdHt = imgd.height;

    //拉普拉斯模板
    var Laplacian = [-1, -1, -1, -1, 9, -1, -1, -1, -1];
    var r = 0, g = 0, b = 0;
    var Index = 0;
    for (var x = 1; x < imgdWd - 1; x++) {
        for (var y = 1; y < imgdHt - 1; y++) {
            r = 0;
            g = 0;
            b = 0;
            Index = 0;
            for (var col = -1; col <= 1; col++) {
                for (var row = -1; row <= 1; row++) {
                    r += pix[((imgdWd * (y + col)) + x + row) * 4] * Laplacian[Index];
                    g += pix[((imgdWd * (y + col)) + x + row) * 4 + 1] * Laplacian[Index];
                    b += pix[((imgdWd * (y + col)) + x + row) * 4 + 2] * Laplacian[Index];
                    Index++;
                }
            }

            //处理颜色值溢出
            r = r > 255 ? 255 : r;
            r = r < 0 ? 0 : r;
            g = g > 255 ? 255 : g;
            g = g < 0 ? 0 : g;
            b = b > 255 ? 255 : b;
            b = b < 0 ? 0 : b;

            pix[((imgdWd * (y - 1)) + x - 1) * 4] = r;
            pix[((imgdWd * (y - 1)) + x - 1) * 4 + 1] = g;
            pix[((imgdWd * (y - 1)) + x - 1) * 4 + 2] = b;
            pix[((imgdWd * (y - 1)) + x - 1) * 4 + 3] = pix[((imgdWd * (y - 1)) + x - 1) * 4 + 3];
        }
    }

    show.putImageData(imgd, 0, 0);//在指定位置进行像素重绘
}
function DarkImage (x,y,ex,ey)
{
    ctx = canvas_now.getContext("2d");
    var imgData = ctx.getImageData(x , y ,ex,ey);
    for (var i = 0 , len = imgData.data.length ; i < len ; i += 4 )
    {
        // 改变每个像素的R、G、B值
        imgData.data[i + 0] = imgData.data[i + 0] * 0.98;
        imgData.data[i + 1] = imgData.data[i + 1] * 0.98;
        imgData.data[i + 2] = imgData.data[i + 2] * 0.98;
    }
    // 将获取的图片数据放回去。
    ctx.putImageData(imgData , x , y);
}
function lightImage (x,y,ex,ey) {
    ctx = canvas_now.getContext("2d");
    var imgData = ctx.getImageData(x , y ,ex,ey);
    for (var i = 0 , len = imgData.data.length ; i < len ; i += 4 )
    {
        // 改变每个像素的R、G、B值
        imgData.data[i + 0] = imgData.data[i + 0] * 1.02;
        imgData.data[i + 1] = imgData.data[i + 1] *1.02;
        imgData.data[i + 2] = imgData.data[i + 2] * 1.02;
    }
    // 将获取的图片数据放回去。
    ctx.putImageData(imgData , x , y);
}
function zhang(z_url) {
    var len = document.getElementsByTagName("canvas").length;
    $("#canvas_main").append("<canvas id=canvas_"+len+" class='zhang'></canvas>");
    var img = new Image();
    var w,h,cvs;
    img.src = z_url;
    w = img.width;
    h = img.height;
    cvs = document.getElementById("canvas_"+len);
    cvs.width=w;
    cvs.height=h;
    $(cvs).drawImage({
        source: z_url,
        x: w/2, y: h/2
    });
    $(cvs).css("z-index","999");
    $(cvs).draggabilly();
}
//#endregion
//#region 浮雕处理
//对图像像素点的像素值分别与相邻像素点的像素值相减后加上128, 然后将其作为新的像素点的值.

function selaFloat() {
    var mapWidth = canvas_now.width;
    var mapHeight = canvas_now.height;//绘图区域高
    var show = canvas_now.getContext("2d");
    var imgd = show.getImageData(0, 0, mapWidth, mapHeight);  //从指定的矩形区域获取 canvas 像素数组
    var pix = imgd.data; //得到像素

    for (var i = 0, n = pix.length; i < n; i += 4) {
        var r = 0;
        var g = 0;
        var b = 0;

        r = Math.abs(pix[i] - pix[i + 4] + 128);
        g = Math.abs(pix[i + 1] - pix[i + 5] + 128);
        b = Math.abs(pix[i + 2] - pix[i + 6] + 128);
        if (r > 255)
            r = 255;
        if (r < 0)
            r = 0;
        if (g > 255)
            g = 255;
        if (g < 0)
            g = 0;
        if (b > 255)
            b = 255;
        if (b < 0)
            b = 0;

        pix[i] = r;       //红
        pix[i + 1] = g;   //绿
        pix[i + 2] = b;   //蓝
        pix[i + 3] = pix[i + 3];         //透明度
    }

    show.putImageData(imgd, 0, 0);         //在指定位置进行像素重绘
}
//#endregion
//#region 柔化效果
//当前像素点与周围像素点的颜色差距较大时取其平均值.

function conslateSoft() {
    var mapWidth = canvas_now.width;
    var mapHeight = canvas_now.height;//绘图区域高
    var show = canvas_now.getContext("2d");
    var imgd = show.getImageData(0, 0, mapWidth, mapHeight);  //从指定的矩形区域获取 canvas 像素数组
    var pix = imgd.data; //得到像素
    var imgdWd = imgd.width;
    var imgdHt = imgd.height;

    //高斯模板
    var Gauss = [1, 2, 1, 2, 4, 2, 1, 2, 1];
    var r = 0, g = 0, b = 0;
    var Index = 0;
    for (var x = 1; x < imgdWd - 1; x++) {
        for (var y = 1; y < imgdHt - 1; y++) {
            r = 0;
            g = 0;
            b = 0;
            Index = 0;
            for (var col = -1; col <= 1; col++) {
                for (var row = -1; row <= 1; row++) {
                    r += pix[((imgdWd * (y + col)) + x + row) * 4] * Gauss[Index];
                    g += pix[((imgdWd * (y + col)) + x + row) * 4 + 1] * Gauss[Index];
                    b += pix[((imgdWd * (y + col)) + x + row) * 4 + 2] * Gauss[Index];
                    Index++;
                }
            }

            r /= 16;
            g /= 16;
            b /= 16;
            //处理颜色值溢出
            r = r > 255 ? 255 : r;
            r = r < 0 ? 0 : r;
            g = g > 255 ? 255 : g;
            g = g < 0 ? 0 : g;
            b = b > 255 ? 255 : b;
            b = b < 0 ? 0 : b;

            pix[((imgdWd * (y - 1)) + x - 1) * 4] = r;
            pix[((imgdWd * (y - 1)) + x - 1) * 4 + 1] = g;
            pix[((imgdWd * (y - 1)) + x - 1) * 4 + 2] = b;
            pix[((imgdWd * (y - 1)) + x - 1) * 4 + 3] = pix[((imgdWd * (y - 1)) + x - 1) * 4 + 3];
        }
    }

    show.putImageData(imgd, 0, 0);//在指定位置进行像素重绘
}

//#endregion
//#region油画效果
//对图像中某一范围内的像素引入随机值.

function conslatepainting() {
    var mapWidth = canvas_now.width;
    var mapHeight = canvas_now.height;//绘图区域高
    var show = canvas_now.getContext("2d");
    var imgd = show.getImageData(0, 0, mapWidth, mapHeight);  //从指定的矩形区域获取 canvas 像素数组
    var pix = imgd.data; //得到像素
    var imgdWd = imgd.width;
    var imgdHt = imgd.height;

    //取不同的值决定油画效果的不同程度
    var iModel = 2;
    var i = imgdWd - iModel;
    while (i > 1) {
        var j = imgdHt - iModel;
        while (j > 1) {
            var iPos = Math.floor(Math.random() * 99999) % iModel;

            //将该点的RGB值设置成附近iModel点之内的任一点
            r = pix[((imgdWd * (j + iPos)) + i + iPos) * 4];
            g = pix[((imgdWd * (j + iPos)) + i + iPos) * 4 + 1];
            b = pix[((imgdWd * (j + iPos)) + i + iPos) * 4 + 2];

            pix[(imgdWd * j + i) * 4] = r;
            pix[(imgdWd * j + i) * 4 + 1] = g;
            pix[(imgdWd * j + i) * 4 + 2] = b;
            pix[(imgdWd * j + i) * 4 + 3] = pix[(imgdWd * j + i) * 4 + 3];

            j = j - 1;
        }
        i = i - 1;
    }

    show.putImageData(imgd, 0, 0);//在指定位置进行像素重绘
}

//#endregion
//#region积木效果
//对图像中的各个像素点着重(即加大分像素的颜色值)着色.

function conslatewood() {
    var mapWidth = canvas_now.width;
    var mapHeight = canvas_now.height;//绘图区域高
    var show = canvas_now.getContext("2d");
    var imgd = show.getImageData(0, 0, mapWidth, mapHeight);  //从指定的矩形区域获取 canvas 像素数组
    var pix = imgd.data; //得到像素
    var imgdWd = imgd.width;
    var imgdHt = imgd.height;

    var r = 0, g = 0, b = 0;
    var iAvg = 0;
    for (var x = 1; x < imgdWd - 1; x++) {
        for (var y = 1; y < imgdHt - 1; y++) {
            r = 0;
            g = 0;
            b = 0;
            iAvg = (pix[(imgdWd * y + x) * 4] + pix[(imgdWd * y + x) * 4 + 1] + pix[(imgdWd * y + x) * 4 + 2]) / 3;

            if (iAvg >= 128) {
                iAvg = 255;
            }
            else {
                iAvg = 0;
            }

            pix[(imgdWd * y + x) * 4] = iAvg;
            pix[(imgdWd * y + x) * 4 + 1] = iAvg;
            pix[(imgdWd * y + x) * 4 + 2] = iAvg;
            pix[(imgdWd * y + x) * 4 + 3] = pix[(imgdWd * y + x) * 4 + 3];
        }
    }

    show.putImageData(imgd, 0, 0);//在指定位置进行像素重绘
}

//#endregion
//#region 模糊处理
function blue(w,h,ex,ey) {
    var mapWidth = w;
    var mapHeight = h;//绘图区域高
    var show = canvas_now.getContext("2d");
    var pi = 3.141592654; //get blur_array
    var e = 2.718281828459;
    var g = 2;
    var blur_array = new Array();
    var temp = 0;

    for (var x = 0; x < 2 * g + 1; x++) {
        blur_array[x] = new Array();
        for (var y = 0; y < 2 * g + 1; y++) {
            blur_array[x][y] = Math.pow(e, -((x - g) * (x - g) + (y - g) * (y - g)) / (2 * g * g)) / (2 * pi * g * g);
            temp += blur_array[x][y];
        }
    }

    for (var x = 0; x < 2 * g + 1; x++) {
        for (var y = 0; y < 2 * g + 1; y++) {
            blur_array[x][y] /= temp;
        }
    }

    var can_data = show.getImageData(ex, ey, mapWidth, mapHeight);
    var can_data2 = show.getImageData(ex, ey, mapWidth, mapHeight);

    for (var i = g; i < mapWidth - g - 1; i++) {
        for (var j = g; j < mapHeight - g - 1; j++) {
            var idx = (i + j * mapWidth) * 4;
            can_data2.data[idx + 0] = get_blur_average(can_data, g, blur_array, 0, i, j);
            can_data2.data[idx + 1] = get_blur_average(can_data, g, blur_array, 1, i, j);
            can_data2.data[idx + 2] = get_blur_average(can_data, g, blur_array, 2, i, j);
        }
    }
    show.putImageData(can_data2, ex, ey);
}
function blur() {
    var mapWidth = canvas_now.width;
    var mapHeight = canvas_now.height;//绘图区域高
    var show = canvas_now.getContext("2d");
    var pi = 3.141592654; //get blur_array
    var e = 2.718281828459;
    var g = 2;
    var blur_array = new Array();
    var temp = 0;

    for (var x = 0; x < 2 * g + 1; x++) {
        blur_array[x] = new Array();
        for (var y = 0; y < 2 * g + 1; y++) {
            blur_array[x][y] = Math.pow(e, -((x - g) * (x - g) + (y - g) * (y - g)) / (2 * g * g)) / (2 * pi * g * g);
            temp += blur_array[x][y];
        }
    }

    for (var x = 0; x < 2 * g + 1; x++) {
        for (var y = 0; y < 2 * g + 1; y++) {
            blur_array[x][y] /= temp;
        }
    }

    var can_data = show.getImageData(0, 0, mapWidth, mapHeight);
    var can_data2 = show.getImageData(0, 0, mapWidth, mapHeight);

    for (var i = g; i < mapWidth - g - 1; i++) {
        for (var j = g; j < mapHeight - g - 1; j++) {
            var idx = (i + j * mapWidth) * 4;
            can_data2.data[idx + 0] = get_blur_average(can_data, g, blur_array, 0, i, j);
            can_data2.data[idx + 1] = get_blur_average(can_data, g, blur_array, 1, i, j);
            can_data2.data[idx + 2] = get_blur_average(can_data, g, blur_array, 2, i, j);
        }
    }
    show.putImageData(can_data2, 0, 0);
}

function get_blur_average(can_data, g, blur_array, channel, x, y) {
    var t = 0;
    for (var i = 0; i < 2 * g + 1; i++) {
        for (var j = 0; j < 2 * g + 1; j++) {
            var idx = (x + i - g + (y + j - g) * can_data.width) * 4;
            t += can_data.data[idx + channel] * blur_array[i][j];
        }
    }
    return t;
}

//#endregion
//#region 雾化处理
//在图像中引入一定的随机值, 打乱图像中的像素值

function wuhuaView() {
    var mapWidth = canvas_now.width;
    var mapHeight = canvas_now.height;//绘图区域高
    var show = canvas_now.getContext("2d");
    var imgd = show.getImageData(0, 0, mapWidth, mapHeight);  //从指定的矩形区域获取 canvas 像素数组
    var pix = imgd.data; //得到像素

    for (var i = 0, n = pix.length; i < n; i += 4) {
        var k = Math.floor(Math.random() * (123456 + 1));

        //像素块大小
        var dx = i + k % 19;
        if (dx >= pix.length) {
            dx = pix.length - 1;
        }

        var r = pix[dx];
        var g = pix[dx + 1];
        var b = pix[dx + 2];
        var a = pix[dx + 3];

        pix[i] = r;       //红
        pix[i + 1] = g;   //绿
        pix[i + 2] = b;   //蓝
        pix[i + 3] = a;         //透明度
    }

    show.putImageData(imgd, 0, 0);         //在指定位置进行像素重绘
}

//#endregion
//#region 雕刻处理
//同浮雕效果相反，从结尾的像素开始处理

function diaokeView() {
    var mapWidth = canvas_now.width;
    var mapHeight = canvas_now.height;//绘图区域高
    var show = canvas_now.getContext("2d");
    var imgd = show.getImageData(0, 0, mapWidth, mapHeight);  //从指定的矩形区域获取 canvas 像素数组
    var pix = imgd.data; //得到像素

    for (var i = pix.length - 4; i > 0; i -= 4) {
        var r = 0;
        var g = 0;
        var b = 0;

        r = Math.abs(pix[i] - pix[i - 4] + 128);
        g = Math.abs(pix[i + 1] - pix[i - 3] + 128);
        b = Math.abs(pix[i + 2] - pix[i - 2] + 128);
        if (r > 255)
            r = 255;
        if (r < 0)
            r = 0;
        if (g > 255)
            g = 255;
        if (g < 0)
            g = 0;
        if (b > 255)
            b = 255;
        if (b < 0)
            b = 0;

        pix[i] = r;       //红
        pix[i + 1] = g;   //绿
        pix[i + 2] = b;   //蓝
        pix[i + 3] = pix[i + 3];         //透明度
    }

    show.putImageData(imgd, 0, 0);         //在指定位置进行像素重绘
}
//#endregion
//#region 怀旧处理

function turnOld() {
    var mapWidth = canvas_now.width;
    var mapHeight = canvas_now.height;//绘图区域高
    var show = canvas_now.getContext("2d");
    var imgd = show.getImageData(0, 0, mapWidth, mapHeight);  //从指定的矩形区域获取 canvas 像素数组
    var pix = imgd.data; //得到像素

    for (var i = 0, n = pix.length; i < n; i += 4) {
        var r = parseInt(0.393 * pix[i] + 0.769 * pix[i + 1] + 0.189 * pix[i + 2]);
        var g = parseInt(0.349 * pix[i] + 0.686 * pix[i + 1] + 0.168 * pix[i + 2]);
        var b = parseInt(0.272 * pix[i] + 0.534 * pix[i + 1] + 0.131 * pix[i + 2]);

        if (r > 255) {
            r = 255;
        }
        if (g > 255) {
            g = 255;
        }
        if (b > 255) {
            b = 255;
        }

        pix[i] = r;       //红
        pix[i + 1] = g;   //绿
        pix[i + 2] = b;   //蓝
        pix[i + 3] = pix[i + 3];         //透明度
    }

    show.putImageData(imgd, 0, 0);         //在指定位置进行像素重绘
}

//#endregion
//#region红色蒙版
//将红色通道取平均值，绿色通道和蓝色通道都设为0

function turnRed() {
    var mapWidth = canvas_now.width;
    var mapHeight = canvas_now.height;//绘图区域高
    var show = canvas_now.getContext("2d");
    var imgd = show.getImageData(0, 0, mapWidth, mapHeight);  //从指定的矩形区域获取 canvas 像素数组
    var pix = imgd.data; //得到像素

    for (var i = 0, n = pix.length; i < n; i += 4) {
        var r = pix[i];
        var g = pix[i + 1];
        var b = pix[i + 2];
        pix[i] = (r + g + b) / 3;        // 红色通道取平均值
        pix[i + 1] = pix[i + 2] = 0; // 绿色通道和蓝色通道都设为0
    }

    show.putImageData(imgd, 0, 0);         //在指定位置进行像素重绘
}

//#endregion
//#region绿色蒙版

function turnGreen() {
    var mapWidth = canvas_now.width;
    var mapHeight = canvas_now.height;//绘图区域高
    var show = canvas_now.getContext("2d");
    var imgd = show.getImageData(0, 0, mapWidth, mapHeight);  //从指定的矩形区域获取 canvas 像素数组
    var pix = imgd.data; //得到像素

    for (var i = 0, n = pix.length; i < n; i += 4) {
        var r = pix[i];
        var g = pix[i + 1];
        var b = pix[i + 2];

        pix[i + 1] = (r + g + b) / 3;        // 绿色通道取平均值
        pix[i] = pix[i + 2] = 0; // 红色通道和蓝色通道都设为0
    }

    show.putImageData(imgd, 0, 0);         //在指定位置进行像素重绘
}

//#endregion
//#region蓝色蒙版

function turnBlue() {
    var mapWidth = canvas_now.width;
    var mapHeight = canvas_now.height;//绘图区域高
    var show = canvas_now.getContext("2d");
    var imgd = show.getImageData(0, 0, mapWidth, mapHeight);  //从指定的矩形区域获取 canvas 像素数组
    var pix = imgd.data; //得到像素

    for (var i = 0, n = pix.length; i < n; i += 4) {
        var r = pix[i];
        var g = pix[i + 1];
        var b = pix[i + 2];

        pix[i + 2] = (r + g + b) / 3;        //蓝色通道取平均值
        pix[i] = pix[i + 1] = 0; //红色通道和绿色通道都设为0
    }

    show.putImageData(imgd, 0, 0);         //在指定位置进行像素重绘
}

//#endregion
