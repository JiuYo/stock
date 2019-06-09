define(['jquery','common',"model/UserModel"], function ($,common) {　　
	var bottomSqlService = {};
	
	/**
   * 查询图号
   * @param {Object} params
   * @param {Object} successcallback
   * @param {Object} errorcallback
   */
  bottomSqlService.getMaterialList = function (params,successcallback,errorcallback) {
  	var dao = common.getDao("system/bottomSql");
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
  
  /**
   * 获取OEM厂商列表数据
   * @param {Object} params
   * @param {Object} successcallback
   * @param {Object} errorcallback
   */
    bottomSqlService.selectOEMName = function (params,successcallback,errorcallback) {
  	var dao = common.getDao("system/bottomSql");
  	require([dao], function (dao) {

          dao.selectOEMName(params,function(data){
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
  }
  
  /**
   * 根据数据字典的分组code获取分组的内容  getTypeListByCode
   * @param {Object} code :字典表的分组code
   * @param {Object} successcallback
   * @param {Object} errorcallback
   */
  bottomSqlService.getTypeListByCode = function (params,successcallback,errorcallback) {
  	var dao = common.getDao("system/bottomSql");
  	require([dao], function (dao) {

          dao.getTypeListByCode(params,function(data){
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
   * 根据数据字典分组的内容的code获取详细   getTypeByCode
   * @param {Object} code :字典表的分组内容的code
   * @param {Object} successcallback
   * @param {Object} errorcallback
   */
  bottomSqlService.getTypeByCode = function (params,successcallback,errorcallback) {
  	var dao = common.getDao("system/bottomSql");
  	require([dao], function (dao) {

          dao.getTypeByCode(params,function(data){
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
   * 查询件号
   * @param {Object} id : 图号id
   * @param {Object} successcallback
   * @param {Object} errorcallback
   */
  bottomSqlService.getpieceList = function (params,successcallback,errorcallback) {
  	var dao = common.getDao("system/bottomSql");
  	require([dao], function (dao) {

          dao.getpieceList(params,function(data){
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
   * 查询型号牌号
   * @param {Object} id : 图号id
   * @param {Object} successcallback
   * @param {Object} errorcallback
   */
  bottomSqlService.getMarqueList = function (params,successcallback,errorcallback) {
  	var dao = common.getDao("system/bottomSql");
  	require([dao], function (dao) {

          dao.getMarqueList(params,function(data){
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
   * 查询批次
   * @param {Object} id : 图号id
   * @param {Object} successcallback
   * @param {Object} errorcallback
   */
  bottomSqlService.getBatchList = function (params,successcallback,errorcallback) {
  	var dao = common.getDao("system/bottomSql");
  	require([dao], function (dao) {

          dao.getBatchList(params,function(data){
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
   * 查询架次
   * @param {Object} 
   * @param {Object} successcallback
   * @param {Object} errorcallback
   */
  bottomSqlService.getShipList = function (params,successcallback,errorcallback) {
  	var dao = common.getDao("system/bottomSql");
  	require([dao], function (dao) {
          dao.getShipList(params,function(data){
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
	
	return bottomSqlService;
})