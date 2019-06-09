define(['jquery','common','dao/onlineimpl/route',"model/UserModel"], function ($,common,route) {　　　　
  var contactDao = {};
  
  contactDao.getLinkManByUser = function (params,successcallback,errorcallback) {	
		var url = route.getLinkManByUser;
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
  }
  contactDao.getLinkManByUserData = function (params,successcallback,errorcallback) {	
		var url = route.getLinkManByUserData;
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
  
  
  return contactDao;
});
