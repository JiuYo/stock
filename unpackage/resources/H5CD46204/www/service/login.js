define(['jquery','common',"model/UserModel"], function ($,common) {　　　　
  var loginService = {};
  
  loginService.login = function (usermode,successcallback,errorcallback) {
  	var dao = common.getDao("login");
  	require([dao], function (dao) {
          dao.login(usermode,function(usermode){
          	//存储当前登录的用户信息
          	common.setUserInfo(usermode);
          	successcallback(usermode);
          },function(errorinfo){
          	errorcallback(errorinfo);
          });
    });
  };
  
  //系统退出接口
  loginService.outTokens = function (usermode,successcallback,errorcallback) {
  	var dao = common.getDao("login");
  	require([dao], function (dao) {
          dao.outTokens(usermode,function(usermode){
          	successcallback(usermode);
          },function(errorinfo){
          	errorcallback(errorinfo);
          });
    });
  };
  
  return loginService;
});
