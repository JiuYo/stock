define(['jquery','common','dao/onlineimpl/route',"model/UserModel"], function ($,common,route) {　　　　
	var userInforDao = {};
	
	/**
   * 查看用户信息 getUserByToken
   * @param {Object} params
   * @param {Object} successcallback
   * @param {Object} errorcallback
   */
  userInforDao.getUserByToken = function (params,successcallback,errorcallback) {	
		var url = route.getUserByToken;
		//获取token
		common.encryptAjax(url,params,function(data){
			
			if(successcallback!=null)
			{
				successcallback(data);
			}
		},function(xhr, type, errorThrown){
			alert("error"+xhr);
			if(errorcallback != null)
			{
				errorcallback(xhr.responseText);	
			}
		});
  }
  
  /**
   * 修改用户信息 UpdateByUserData
   * @param {Object} user对象
   * @param {Object} successcallback
   * @param {Object} errorcallback
   */
  userInforDao.UpdateByUserData = function (params,successcallback,errorcallback) {	
		var url = route.UpdateByUserData;
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
  
    /**
   * 修改密码     updatePasswordByUserApp
   * @param {Object} lastPassword : 之前的密码
   * @param {Object} newPassword : 新密码
   * @param {Object} errorcallback
   */
  userInforDao.updatePasswordByUserApp = function (params,successcallback,errorcallback) {	
		var url = route.updatePasswordByUserApp;
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
  
    /**
   * 修改头像     updatePasswordByUserApp
   * @param {Object} lastPassword : 之前的密码
   * @param {Object} newPassword : 新密码
   * @param {Object} errorcallback
   */
  userInforDao.UpdatePortraitByTokenUser = function (params,successcallback,errorcallback) {	
		var url = route.UpdatePortraitByTokenUser;
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
	
	return userInforDao;
});