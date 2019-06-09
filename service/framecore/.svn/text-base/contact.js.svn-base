define(['jquery','common',"model/UserModel"], function ($,common) {　　　　
  var contactService = {};
  
  /**
   * 获取联系人
   * @param {Object} params
   * @param {Object} successcallback
   * @param {Object} errorcallback
   */
  contactService.getLinkManByUser = function (params,successcallback,errorcallback) {
  	var dao = common.getDao("framecore/contact");
  	require([dao], function (dao) {

          dao.getLinkManByUser(params,function(data){
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
  
  
contactService.getLinkManByUserData = function (params,successcallback,errorcallback) {
  	var dao = common.getDao("framecore/contact");
  	require([dao], function (dao) {

          dao.getLinkManByUserData(params,function(data){
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
  
  return contactService;
});
