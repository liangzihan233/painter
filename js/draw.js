
var canvasExt = {
    drawRect: function (canvasId, penColor, strokeWidth) {
        var that = this;
        that.penColor = "#000000";
        that.penWidth = 1;
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
        canvas.onmousedown = function(e) {

            //设置画笔颜色和宽度
            var color = that.penColor;
            var penWidth = that.penWidth;
            // 确定起点
            x = e.clientX - canvasLeft;
            y = e.clientY - canvasTop;
            // 添加layer
            $("#"+canvasId).addLayer({
                type: 'rectangle',
                strokeStyle: color,
                strokeWidth: penWidth,
                name:'areaLayer',
                fromCenter: false,
                x: x, y: y,
                width: 1,
                height: 1
            });
            // 绘制
            $("#"+canvasId).drawLayers();
            $("#"+canvasId).saveCanvas();

            //鼠标移动事件，画图
            canvas.onmousemove = function(e){

                // 要画的矩形的宽高
                var width = e.clientX-canvasLeft - x;
                var height = e.clientY-canvasTop - y;

                // 清除之前画的
                $("#"+canvasId).removeLayer('areaLayer');

                $("#"+canvasId).addLayer({
                    type: 'rectangle',
                    strokeStyle: color,
                    strokeWidth: penWidth,
                    name:'areaLayer',
                    fromCenter: false,
                    x: x, y: y,
                    width: width,
                    height: height
                });

                $("#"+canvasId).drawLayers();
            }
        };
        //鼠标抬起
        canvas.onmouseup=function(e){

            var color = that.penColor;
            var penWidth = that.penWidth;

            canvas.onmousemove = null;

            var width = e.clientX - canvasLeft - x;
            var height = e.clientY- canvasTop - y;

            $("#"+canvasId).removeLayer('areaLayer');

            $("#"+canvasId).addLayer({
                type: 'rectangle',
                strokeStyle: color,
                strokeWidth: penWidth,
                name:'areaLayer',
                fromCenter: false,
                x: x, y: y,
                width: width,
                height: height
            });

            $("#"+canvasId).drawLayers();
            $("#"+canvasId).saveCanvas();

            // 把body转成canvas
            html2canvas(document.body, {
                scale: 1,
                // allowTaint: true,
                useCORS: true  //跨域使用
            }).then(canvas => {
                var capture_x, capture_y
                if (width > 0) {
                //从左往右画
                capture_x = x + that.penWidth
            }else {
                //从右往左画
                capture_x = x + width + that.penWidth
            }
            if (height > 0) {
                //从上往下画
                capture_y = y + that.penWidth
            }else {
                //从下往上画
                capture_y = y + height + that.penWidth
            }
            printClip(canvas, capture_x, capture_y, Math.abs(width), Math.abs(height))
        });
            // 移除画的选取框
            $("#"+canvasId).removeLayer('areaLayer');
            // 隐藏用于华画取框的canvas
            $("#"+canvasId).hide();
            $("#"+canvasId).css("z-index","0")
        }
    }
};

function  clipScreenshots(canvasId){
    canvasExt.drawRect(canvasId);
}
function printClip(canvas, capture_x, capture_y, capture_width, capture_height) {
    var clipCanvas = document.createElement('canvas')
    clipCanvas.width = capture_width
    clipCanvas.height = capture_height
    // 截取
    clipCanvas.getContext('2d').drawImage(canvas, capture_x, capture_y, capture_width, capture_height, 0, 0, capture_width, capture_height)
    var clipImgBase64 = clipCanvas.toDataURL()
    // 生成图片
    var clipImg = new Image()
    clipImg.src = clipImgBase64

    if(flag === "tools_5" || flag ==="tools_12"){
        creatNewCanvas();
        clipImg.onload = function(){//必须onload之后再画
            document.querySelector('#'+ canvas_now).width = capture_width;
            document.querySelector('#'+ canvas_now).height = capture_height;
            document.querySelector('#'+ canvas_now).getContext('2d').drawImage(clipImg,0,0,capture_width,capture_height);
            $('#'+ canvas_now).css({"z-index" : maxIndex()+2});
            canvas_now = document.querySelector('#'+ canvas_now);
        };

    } else if(flag === "tools_2"){
        var canvasOffset = $(canvas_now).offset();
        capture_x =  capture_x- canvasOffset.left;
        capture_y = capture_y-canvasOffset.top;
        if(capture_x<=0){
            capture_x = 1
        }
        if(capture_y<=0){
            capture_y = 1
        }
       select[0] = capture_x; select[1] = capture_y; select[2] = capture_width; select[3] = capture_height
    } else if(flag === "tools_4"){
        downloadIamge(clipImgBase64)
    }
}

/**
 * 下载保存图片
 * @param imgUrl 图片地址
 */
function downloadIamge(imgUrl) {
    // 生成一个a元素
    var a = document.createElement('a')
    // 创建一个单击事件
    var event = new MouseEvent('click')
    // 生成文件名称
    var timestamp = new Date().getTime();
    var name = imgUrl.substring(22, 30) + timestamp + '.png';
    a.download = name
    // 将生成的URL设置为a.href属性
    a.href = imgUrl;
    // 触发a的单击事件 开始下载
    a.dispatchEvent(event);
}