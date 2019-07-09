define(['jquery',"mui","common","service/system/userInfor","model/UserModel"], function ($,mui,common,userInforService,umodel) {　　　　
  var about = {};
  about.init = function (page) {
 		mui.init();
  };
  mui.plusReady(function(){
  	plus.navigator.setStatusBarBackground("#000000");
		plus.navigator.setStatusBarStyle("UIStatusBarStyleBlackOpaque");
		$('.version').html(common.getVersion());
  })
  
//$('#introduce').on('tap',function(){
//	$('#serviceLayer').show();
//})
//$('#newVersion').on('tap',function(){
//	$('#mewLayer').show();
//})
//$('.layui-m-layershade').on('tap',function(){
//	$('.layui-m-layer').hide(200);
//})
  
  $('#agreementHref').on('tap',function(){
  	mui.openWindow({
				  url: "agreement.html",
				  id: "agreement.html",
				  show: {
				        autoShow: true //页面loaded事件发生后自动显示，默认为true
			    },
					extras:{
							isShowButton:'display'
					}
			});
  })
  
  
  return about;
});
