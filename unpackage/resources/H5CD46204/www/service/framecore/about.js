define(['jquery','common',"model/UserModel"], function ($,common) {　　　　
  var aboutService = {};
  
  /**
   * 获取当前关于页面
   * @param {Object} params
   * @param {Object} successcallback
   * @param {Object} errorcallback
   */
  aboutService.getCurrentAbout = function (params,successcallback,errorcallback) {
  	var dao = common.getDao("framecore/about");
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
  
  return aboutService;
});
