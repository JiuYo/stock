define(['jquery','common','dao/onlineimpl/route',"model/UserModel"], function ($,common,route) {　　　　
  var aboutDao = {};
  
  aboutDao.getCurrentAbout = function (params,successcallback,errorcallback) {		
		var url = route.getCurrentAbout;
		//获取token
		common.encryptAjax(url,params,function(data){
			if(successcallback!=null)
			{
				alert("xxx");
				successcallback(data);
			}
		},function(xhr, type, errorThrown){
			if(errorcallback != null)
			{
				alert("type="+type+" content="+xhr.responseText);
				errorcallback(xhr.responseText);	
			}
		});
  };
  
  
  return aboutDao;
});
