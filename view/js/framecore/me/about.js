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
  
		document.getElementById("gongneng").addEventListener('tap',function(){
		mui.alert("点货郎APP是一款提供新增货品、展示货品、盘点货品的产品，目的是方便商家清点库存，让商家省去纸笔点货的烦恼","功能介绍")
	});
	document.getElementById("guanyu").addEventListener('tap',function(){
		mui.toast('点货郎APP由Miss.Yang、Mr.Wang共同开发');
	})
	
	
  
  return about;
});
