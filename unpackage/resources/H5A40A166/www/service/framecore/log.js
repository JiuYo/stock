define(['jquery','common',"model/UserModel"], function ($,common) {　　　　
  var logService = {};
  
  /**
   * 获取审核进度列表
   * @param {Object} params
   * @param {Object} successcallback
   * @param {Object} errorcallback
   */
  logService.operationLogList = function (params,successcallback,errorcallback) {
  	var dao = common.getDao("framecore/log");
  	require([dao], function (dao) {

          dao.operationLogList(params,function(data){
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
  
  return logService;
});
