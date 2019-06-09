define(['jquery','common','dao/onlineimpl/route',"model/UserModel"], function ($,common,route) {　　　　
  var appDao = {};
  
  appDao.getFuncByUserForApp = function (params,successcallback,errorcallback) {		
		var url = route.getFuncByUserForApp;
		//获取token
		common.encryptAjax(url,params,function(data){
			if(successcallback!=null)
			{
				successcallback(data);
			}
		},function(xhr, type, errorThrown){
			if(errorcallback != null)
			{
				errorcallback(xhr.responseText);	
			}
		});
  };
  
  
  return appDao;
});
