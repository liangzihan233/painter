$(function(){
    var canvas=$("#cvs_2");
    var cobj=canvas.getContext("2d");
    var obj=new draw(copy[0],canvascobj,$(".xp"),$(".selectarea"));
    //画图的类型:
    $(".hasson:eq(1) ").find(".son li").click(function(){
        obj.shapes=$(this).attr("data-role");
        if(obj.shapes=="pen"){
            obj.pen();
        }else{
            obj.draw();
        }
    })
    //填充类型
    $(".hasson:eq(2) ").find(".son li").click(function(){
        obj.type=$(this).attr("data-rolo");
    })
    //边框颜色
    $(".hasson:eq(3) ").find(".son input").click(function(){
        $(this).change(function(){
            obj.borderColor=this.value;
        })
    })
    $(".hasson:eq(4) ").find(".son input").click(function(){
        $(this).change(function(){
            obj.bgcolor=this.value;
        })
    })
    $(".hasson:eq(5) ")[0].onmousedown=function(e){
        e.stopPropagation();
    }
    $(".hasson:eq(5) ").find(".son  li input").click(function(){
        $(this).change(function(){
            if(isNaN(Number(this.value))){
                alert("请输入数字");
            }
            obj.borderWidth=this.value;
            this.value="";
        })
    })
    //橡皮
    $(".xpc li").click(function(){
        var w=$(this).attr("data-role");
        var h=$(this).attr("data-role");
        obj.xp($(".xp"),w,h);
    })

    //文件
    $(".file li").click(function(){
        var index=$(this).index(".file li");
        if(index==0){
            if(obj.history.length!=0){
                var yes=window.confirm("是否要保存");
                if(yes){
                    location.href=canvas[0].toDataURL().replace("data:image/png","data:stream/octet");
                }
            }
        }
        if(index==1){
            cobj.clearRect(0,0,canvas[0].width,canvas[0].height)
            if(obj.history.length==0){
                alert("不能后退");
                return;
            }
            var data=obj.history.pop();
            cobj.putImageData(data,0,0);
        }
        if(index==2){
            location.href=(canvas[0].toDataURL().replace("data:image/png","data:stream/octet"));
        }
    })
    ///拖拽
    $(document).on("mousedown",function(e){
        if($(e.target).attr("class")=="son"||$(e.target).parent().attr("class")=="son"||$(e.target).attr("class")=="sq"){
            return;
        }
        var ox= e.offsetX;
        var oy= e.offsetY;
        e.stopPropagation();
        $(document).on("mousemove",function(e){
            var cx= e.clientX;
            var cy= e.clientY;
            var target= e.target;
            $(target).trigger("drag",{ox:ox,oy:oy,cx:cx,cy:cy});
        });
        $(document).on("mouseup",function(){
            $(document).off("mousemove");
            $(document).off("mouseup");
        });
    });
    $(document).delegate(".menu","drag",function(e,data){
        $(this).css({
            left:data.cx-data.ox,
            top:data.cy-data.oy
        });
    });
    ///收起
    var flag=true;
    $(".sq").click(function(e){
        if(flag){
            $(".parent:not(.sq)").css({
                display:"none"
            })
            $(".sq").html("&#xe61c;");
            flag=false;
        }else{
            $(".parent:not(.sq)").css({
                display:"block"
            })
            $(".sq").html("&#xe61b;");
            flag=true;
        }
    })
    $(".select").click(function(){
        obj.select($(".selectarea"));
    })

})