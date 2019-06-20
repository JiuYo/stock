define(['jquery','common',"model/UserModel"], function ($,common) {　　
	var stockService = {};
	
	/**
   * 查询图号
   * @param {Object} params
   * @param {Object} successcallback
   * @param {Object} errorcallback
   */
  stockService.getMaterialList = function (params,successcallback,errorcallback) {
  	var dao = common.getDao("system/stock");
  	require([dao], function (dao) {

          dao.getMaterialList(params,function(data){
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

	
	return stockService;
})