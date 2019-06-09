define(['jquery','common',"model/UserModel"], function ($,common) {　　　　
  var appService = {};
  
  /**
   * 获取应用菜单
   * @param {Object} params
   * @param {Object} successcallback
   * @param {Object} errorcallback
   */
  appService.getFuncByUserForApp = function (params,successcallback,errorcallback) {
  	var dao = common.getDao("framecore/app");
  	require([dao], function (dao) {

          dao.getFuncByUserForApp(params,function(data){
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
  
  return appService;
});
