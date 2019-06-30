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
  // 新增货品
    stockService.saveStock = function (params,successcallback,errorcallback) {
  	var dao = common.getDao("stock/stock");
  	require([dao], function (dao) {
          dao.saveStock(params,function(data){
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

// 获取货品列表
    stockService.getStockList = function (params,successcallback,errorcallback) {
  	var dao = common.getDao("stock/stock");
  	require([dao], function (dao) {
          dao.getStockList(params,function(data){
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
  
  // 删除货品  gdelStockById
    stockService.delStockById = function (params,successcallback,errorcallback) {
	var dao = common.getDao("stock/stock");
	require([dao], function (dao) {
	  dao.delStockById(params,function(data){
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