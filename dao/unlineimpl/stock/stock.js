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
	
	// 新增货品
	stockDao.saveStock = function (params,successcallback,errorcallback) {
		//查询数据
		sqlitetools.insertTable('tab_inventory',params,function(tx, rs){
			console.log("增加成功！！！");
			successcallback(params);
		},function(tx,err){
			errorcallback("获取数据失败!"+err.message);
		})
	};
	
	// 获取货品列表
	stockDao.getStockList = function (params,successcallback,errorcallback) {
		//查询数据
		sqlitetools.getTableList('tab_inventory',params,function(tx, rs){
			console.log("查询成功！！！");
			successcallback(rs.rows);
		},function(tx,err){
			console.error(err.message);
			errorcallback("获取数据失败!"+err.message);
		})
	};
	  
  
  return stockDao;
});