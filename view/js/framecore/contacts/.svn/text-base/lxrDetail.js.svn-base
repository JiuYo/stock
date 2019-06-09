define(['jquery',"mui","common","service/framecore/contact","model/UserModel"], function ($,mui,common,contactService,umodel) {　　　　
  var lxrDetail = {};
  lxrDetail.init = function (page) {
		mui.init({});
		mui('.mui-scroll-wrapper').scroll();
		mui.plusReady(function(){
			self = plus.webview.currentWebview();
			lxrDetail.getLinkManByUserData();
		})
}
  

  
   //获取联系人详细
  lxrDetail.getLinkManByUserData = function(){
  	var params={};
  	params.linkmanID = self.userInfo.linkmanID;
  	params.userID = self.userInfo.userID;
  	contactService.getLinkManByUserData(params,function(data){
  		console.log(JSON.stringify(data.obj));
  		var list = data.obj.userList[0];
  		console.log(list.id);
  		if(list.portrait){
  			var serverurl = common.getServerurl();
				var headImg = serverurl + list.portrait;
				console.log(headImg);
  			$('.userPic').attr('src',headImg);
  		}else{
  			$('.userPic').attr('src','../../images/cbd.jpg');
  		}
  		$('.userGroup').html(data.obj.groupname);
  		$('.userName').html(list.realName);
  		$('.userPic').html(list.signatureFile);
  		$('.userPhone').html(list.mobilePhone);
  		$('.userTel').html(list.officePhone);
  		$('.userEmail').html(list.email);
  		$('.userPhone + a').attr('href','tel:'+list.mobilePhone+'');
  		$('.userTel + a').attr('href','tel:'+list.officePhone+'');
  	},function(errorinfo){
  		if(typeof(errorinfo) == Object)
				mui.alert("失败!"+errorinfo.msg);
			else
				mui.alert("失败!"+errorinfo);
  	});
  };


		
  return lxrDetail;
});
