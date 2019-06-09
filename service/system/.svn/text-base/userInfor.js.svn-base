define(['jquery','common',"model/UserModel"], function ($,common) {　　
	var userInforService = {};
	
	/**
   * 查看用户信息 getUserByToken
   * @param {Object} params
   * @param {Object} successcallback
   * @param {Object} errorcallback
   */
  userInforService.getUserByToken = function (params,successcallback,errorcallback) {
  	var dao = common.getDao("system/userInfor");
  	require([dao], function (dao) {

          dao.getUserByToken(params,function(data){
	          	if(successcallback != null)
	          	{
	          			successcallback(data);
	          	}
          },function(errorInfo){
	          	if(errorcallback != null)
	          	{
	          			errorcallback(errorInfo);
	          	}
          });
    });
  };
  
  /**
   * 修改用户信息 UpdateByUserData
   * @param {Object} user对象
   * @param {Object} successcallback
   * @param {Object} errorcallback
   */
  userInforService.UpdateByUserData = function (params,successcallback,errorcallback) {
  	var dao = common.getDao("system/userInfor");
  	require([dao], function (dao) {

          dao.UpdateByUserData(params,function(data){
	          	if(successcallback != null)
	          	{
	          			successcallback(data);
	          	}
          },function(errorInfo){
	          	if(errorcallback != null)
	          	{
	          			errorcallback(errorInfo);
	          	}
          });
    });
  };
  
   /**
   * 修改密码     updatePasswordByUserApp
   * @param {Object} lastPassword : 之前的密码
   * @param {Object} newPassword : 新密码
   * @param {Object} errorcallback
   */
  userInforService.updatePasswordByUserApp = function (params,successcallback,errorcallback) {
  	var dao = common.getDao("system/userInfor");
  	require([dao], function (dao) {

          dao.updatePasswordByUserApp(params,function(data){
 
	          	if(successcallback != null)
	          	{
	          			successcallback(data);
	          	}
          },function(errorInfo){
	          	if(errorcallback != null)
	          	{
	          			errorcallback(errorInfo);
	          	}
          });
    });
  };
  
  /**
   * 修改头像 getUserByToken
   * @param {Object} params
   * @param {Object} successcallback
   * @param {Object} errorcallback
   */
  userInforService.UpdatePortraitByTokenUser = function (params,successcallback,errorcallback) {
  	var dao = common.getDao("system/userInfor");
  	require([dao], function (dao) {

          dao.UpdatePortraitByTokenUser(params,function(data){
	          	if(successcallback != null)
	          	{
	          			successcallback(data);
	          	}
          },function(errorInfo){
	          	if(errorcallback != null)
	          	{
	          			errorcallback(errorInfo);
	          	}
          });
    });
  };
	
	return userInforService;
})