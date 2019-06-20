define(['jquery','common',"dao/unlineimpl/sqlitetools","model/UserModel"], function ($,common,sqlitetools) {　　　　
  var stockDao = {};
  
  
  // 系统注册
  stockDao.enrolLogin = function (usermode,successcallback,errorcallback) {
  	//查询数据
  	sqlitetools.insertTable('tab_user',usermode,function(tx, rs){
  		console.log("注册成功！！！");
		common.setUserInfo(usermode);
		successcallback(usermode);
  	},function(tx,err){
  		errorcallback("获取数据失败!"+err.message);
  	})
  };
  
  return stockDao;
});
