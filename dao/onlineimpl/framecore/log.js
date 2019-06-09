define(['jquery','common','dao/onlineimpl/route',"model/UserModel"], function ($,common,route) {　　　　
  var logDao = {};
  
  logDao.operationLogList = function (params,successcallback,errorcallback) {		
		var url = route.operationLogList;
		//获取token
		common.encryptAjax(url,params,function(data){
			if(successcallback!=null)
			{
//				alert("xxx");
				successcallback(data);
			}
		},function(xhr, type, errorThrown){
			if(errorcallback != null)
			{
//				alert("type="+type+" content="+xhr.responseText);
				errorcallback(xhr.responseText);	
			}
		});
  };
  
  
  return logDao;
});
