define(['jquery','common',"dao/unlineimpl/sqlitetools","model/UserModel"], function ($,common,sqlitetools) {　　　　
  var loginDao = {};
  
  loginDao.login = function (usermode,successcallback,errorcallback) {
  	//查询数据
  	var sql = "select * from tab_user where username = '"+usermode.userName+"' and password = '"+usermode.userPwd+"'";
  	sqlitetools.executeSql(sql,[],function(tx, rs){
		console.log(rs.rows.length);
		if(rs.rows.length == 1){
			common.setUserInfo(rs.rows[0]);
			successcallback(rs.rows[0]);
		}else{
			errorcallback('用户名密码错误！');
		}
  	},function(tx,err){
			errorcallback('用户名密码错误！');
  	})
  };
  
  // 系统注册
  loginDao.enrolLogin = function (usermode,successcallback,errorcallback) {
  	//查询数据
  	sqlitetools.insertTable('tab_user',usermode,function(tx, rs){
  		console.log("注册成功！！！");
		common.setUserInfo(usermode);
		successcallback(usermode);
  	},function(tx,err){
  		errorcallback("获取数据失败!"+err.message);
  	})
  };
  
  return loginDao;
});
