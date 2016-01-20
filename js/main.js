function fnAjaxPage(pageNum){
	var param = '{"params":{"shopType":0,"sort":0,"cityId":5,"userY":31.280032,"filter":0,"userX":121.526236,"toPage":'+pageNum+',"pageRows":10}}';
	$.ajax({
	    type: 'POST',
	    url: "http://handset.line0.com/ws/handset/v9/shop/newshopList",
	    dataType: 'json',
	    contentType: "application/json",
	    data: param,
	    success: function(data){
	        console.log(data);
	        console.log(data.response.shopList);
	        fnMain(data);
	        setTimeout(function(){
				var myScroll = new IScroll("#iscrollWrapper",{
					mouseWheel: true,
				    scrollbars: true,
				    click: true
				});
	        },200)
			// myScroll.refresh()
	    },
	    error: function(xhr, type){
	        alert('数据加载失败');
	    }
	});
}
function fnMain(data){
	var dataEval = data.response.shopList;
	console.log(dataEval);
	var evalText = doT.template($("#itemTmpl").html());
	$("#pag1").html(evalText(dataEval));
	fnInitPoint()
} 
function fnInitPoint(){
	for(var i=0;i<$(".avgAppPoint").length;i++){
		$(".avgAppPoint:eq("+i+")").raty({
			readOnly: true,
			score: $(".avgAppPointNum:eq("+i+")").html(),
			space: false
		})
	}
}
fnAjaxPage(1);
// fnAjaxPage(2);