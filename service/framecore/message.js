define(['jquery','common',"model/UserModel"], function ($,common) {　　　　
  var messageService = {};
  
  /**
   * 获取代办消息列表
   * @param {Object} params
   * @param {Object} successcallback
   * @param {Object} errorcallback
   */
  messageService.getUserMessageList = function (params,successcallback,errorcallback) {
  	var dao = common.getDao("framecore/message");
  	require([dao], function (dao) {

          dao.getUserMessageList(params,function(data){
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
   * 消息标为已读
   * @param {Object} params
   * @param {Object} successcallback
   * @param {Object} errorcallback
   */
  messageService.getMessageRead = function (params,successcallback,errorcallback) {
  	var dao = common.getDao("framecore/message");
  	require([dao], function (dao) {

          dao.getMessageRead(params,function(data){
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
   * 删除消息
   * @param {Object} params
   * @param {Object} successcallback
   * @param {Object} errorcallback
   */
  messageService.delMessage = function (params,successcallback,errorcallback) {
  	var dao = common.getDao("framecore/message");
  	require([dao], function (dao) {

          dao.delMessage(params,function(data){
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
   * 获取未读条数消息
   * @param {Object} params
   * @param {Object} successcallback
   * @param {Object} errorcallback
   */
  messageService.getUnreadCount = function (params,successcallback,errorcallback) {
  	var dao = common.getDao("framecore/message");
  	require([dao], function (dao) {
          dao.getUnreadCount(params,function(data){
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
  return messageService;
});
