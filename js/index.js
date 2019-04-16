$( document ).ready(function() {
    $("#pix_control").click(function() {
      $(".mainfeature").removeClass("none");
        function createHoverState(myobject) {
            myobject.hover(function () {
                $(this).prev().toggleClass('hilite');
            });
            myobject.mousedown(function () {
                $(this).prev().addClass('dragging');
                $("*").mouseup(function () {
                    $(myobject).prev().removeClass('dragging');
         /*           var num = myobject.eq(0).css("left").split("px");
                    num = (parseInt(num)-125)/5;
                    $(canvas_now).css("filter","blur("+  num +"px)")*/
                });
            });
            myobject.eq(2).mousedown(function () {
                myobject.eq(2).mousemove(function () {
                    var num = myobject.eq(2).css("left").split("px");
                     num = (parseFloat(num)-125)/5;
                    $(canvas_now).css("filter","blur("+  num +"px)")
                })
            });
            myobject.eq(1).mousedown(function () {
                myobject.eq(1).mousemove(function () {
                    var num = myobject.eq(1).css("left").split("px");
                    num =parseFloat(num)/125;
                    $(canvas_now).css("filter","contrast("+  num +")")
                })
            });
            myobject.eq(0).mousedown(function () {
                myobject.eq(0).mousemove(function () {
                    var num = myobject.eq(0).css("left").split("px");
                    num =parseFloat(num)/125;
                    $(canvas_now).css("filter","brightness("+  num +")")
                })
            });
            myobject.eq(3).mousedown(function () {
                myobject.eq(3).mousemove(function () {
                    var num = myobject.eq(3).css("left").split("px");
                   if(parseFloat(num)<125) {
                       num = parseFloat(num)/125;
                       $(canvas_now).css("filter", "saturate(" + num + ")")
                   }
                   if(parseFloat(num)>=125){
                       console.log(num);
                       num = (parseFloat(num)-125)/10;
                       $(canvas_now).css("filter", "saturate(" + num + ")")
                       console.log(num);
                   }
                })
            });
            myobject.eq(4).mousedown(function () {
                myobject.eq(4).mousemove(function () {
                    var num = myobject.eq(4).css("left").split("px");
                    num =parseFloat(num)/125;
                    $(canvas_now).css("opacity",num)
                })
            });

        }
/*        function changestyle(myobject) {
            var arr = [];
            var flag = false;
          myobject.each(function () {
              arr.push(this);
          });
console.log(arr[0])
              arr[0].mousedown(function () {
                flag = true;
                  console.log(1)
                  if(flag){
                    arr[0].mousemove(function () {
                        console.log(2)
                    })
                  }
          });*/
         /*   arr[1].onmousemove(function () {
                console.log(1)
            });
            arr[2].onmousemove(function () {
                console.log(1)
            });
            arr[3].onmousemove(function () {
                console.log(1)
            });
            arr[4].onmousemove(function () {
                console.log(1)
            })
        }*/

        $(".slider").slider({
            orientation: "horizontal",
            range: "min",
            max: 100,
            value: 0,
            animate: 1300
        });
        $("#blue").slider("value", 100);
        $('.slider').each(function (index) {
            $(this).slider("value",50);
        });

        createHoverState($(".slider a.ui-slider-handle"));
       /* changestyle($(".slider a.ui-slider-handle"));*/
    })
});
