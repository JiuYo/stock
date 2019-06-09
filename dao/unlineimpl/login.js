define(['jquery','common',"dao/unlineimpl/sqlitetools","model/UserModel"], function ($,common,sqlitetools) {　　　　
  var loginDao = {};
  
  loginDao.login = function (usermode,successcallback,errorcallback) {
  	//查询数据
  	var sql = "select * from t_s_base_user where username = '"+usermode.userName+"' and password = '"+usermode.userPwd+"'";
  	sqlitetools.executeSql(sql,[],function(tx, rs){
  		console.log("数据获取成功,共获取"+rs.rows.length+"条数据,数据内容如下:");
		if(rs.rows.length == 1){
			successcallback(usermode);
		}
  	},function(tx,err){
  		alert("获取数据失败!"+err.message);
  	})
  };
  
  return loginDao;
});
