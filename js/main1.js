var nowPage=2;
var loadStandard=0;
var reloadBl = true;
var loadPageBl = true;
var $reload = $(".reload");
var $loadPage = $(".loadPage");
var $listShow = $(".listShow");
var $iscrollWrapper = $("#iscrollWrapper");
function fnAjaxPage(pageNum){
	var param = '{"params":{"shopType":0,"sort":0,"cityId":5,"userY":31.280032,"filter":0,"userX":121.526236,"toPage":'+pageNum+',"pageRows":10}}';
	$.ajax({
	    type: 'POST',
	    url: "http://handset.line0.com/ws/handset/v9/shop/newshopList",
	    dataType: 'json',
	    contentType: "application/json",
	    data: param,
	    success: function(data){
	        if(data.response.shopList.length == 0){
	        	$loadPage.html("已经到底啦~");
	        }else{
	        	fnMain(data,pageNum);
	        	$loadPage.css({"opacity":1});
	        	// $reload.css({"opacity":1});
		        setTimeout(function(){
					loadStandard=$listShow.height()-$("#iscrollWrapper").height();
					loadPageBl = true;
					$loadPage.text("上拉加载");
		        },200);
		        fnInitPoint();
	        }
	    },
	    error: function(xhr, type){
	        alert('数据加载失败');
	    }
	});
}
function fnMain(data,pageNum){
	var dataEval = data.response.shopList;
	var evalText = doT.template($("#itemTmpl").html());
	var $page = $("<div></div>")
	$page.attr("id","pag"+pageNum);
	$page.html(evalText(dataEval));
	$listShow.append($page);
	$page = null;
} 
function fnInitPoint(){
	var $nowPageAvgAppPoint = $("#pag"+(nowPage-1)+" .avgAppPoint");
	var len = $nowPageAvgAppPoint.length;
	for(var i=0;i<len;i++){
		$("#pag"+(nowPage-1)+" .avgAppPoint:eq("+i+")").raty({
			readOnly: true,
			score: $(".avgAppPointNum:eq("+i+")").html(),
			space: false
		})
	}
}
fnAjaxPage(1);
$(".loadPage").on("click",function(){
	fnAjaxPage(nowPage);
	nowPage++;
})
$iscrollWrapper.on("scroll",function(){
	if(loadPageBl&&$iscrollWrapper.scrollTop()>loadStandard){
		loadPageBl=false;
		$loadPage.text("加载中");
		fnAjaxPage(nowPage);
		nowPage++;
	}
})

var el = document;
var startPosition, endPosition, deltaX, deltaY, moveLength;

el.addEventListener('touchstart', function (e) {
	if($iscrollWrapper.scrollTop()==0){
		$reload.css({"top":"-3rem"});
		$reload.removeClass("reloadAni");
	    var touch = e.touches[0];
	    startPosition = {
	        x: touch.pageX,
	        y: touch.pageY
	    }
	}
});

el.addEventListener('touchmove', function (e) {
	if($iscrollWrapper.scrollTop()==0){
	    var touch = e.touches[0];
	    endPosition = {
	        x: touch.pageX,
	        y: touch.pageY
	    }
	    deltaY = endPosition.y - startPosition.y;
	    fnReload();
	    console.log(deltaY);
	}
});
el.addEventListener('touchend',function (e) {
	$reload.addClass("reloadAni");
	if(Math.sqrt(deltaY/10)-3>0.8){
		window.location.reload();
	}
})

function fnReload(){
	$reload.css({"top":Math.sqrt(deltaY/10)-3+"rem","opacity":Math.sqrt(deltaY/10)-2});
}
