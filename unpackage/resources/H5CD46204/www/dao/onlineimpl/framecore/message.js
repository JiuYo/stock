define(['jquery','common','dao/onlineimpl/route',"model/UserModel"], function ($,common,route) {　　　　
  var messageDao = {};
  
  
  //获取消息列表
  messageDao.getUserMessageList = function (params,successcallback,errorcallback) {		
		var url = route.getUserMessageList;
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
  
  
  //消息标为已读
  messageDao.getMessageRead = function (params,successcallback,errorcallback) {		
		var url = route.getMessageRead;
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
  
  
  //删除消息
  messageDao.delMessage = function (params,successcallback,errorcallback) {		
		var url = route.delMessage;
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
  
  //获取
  messageDao.getUnreadCount = function (params,successcallback,errorcallback) {		
		var url = route.getUnreadCount;
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
  
  
  return messageDao;
});
