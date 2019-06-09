define(['jquery','common',"model/UserModel"], function ($,common) {　　
	var currentAboutService = {};
	
	/**
   * 获取关于页面的信息
   * @param {Object} params
   * @param {Object} successcallback
   * @param {Object} errorcallback
   */
  currentAboutService.getCurrentAbout = function (params,successcallback,errorcallback) {
  	var dao = common.getDao("system/currentAbout");
  	require([dao], function (dao) {

          dao.getCurrentAbout(params,function(data){
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
  

	
	return currentAboutService;
})