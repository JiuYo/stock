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
	
	// 删除货品
	stockDao.delStockById = function (params,successcallback,errorcallback) {
		console.log(JSON.stringify(params));
		sqlitetools.deleteTable('tab_inventory',params,function(tx, rs){
			console.log("删除成功！！！");
			successcallback(rs);
		},function(tx,err){
			console.error(err.message);
			errorcallback("删除数据失败!"+err.message);
		})
	};
	
	// 根据ID获取单条货品
	stockDao.getStockById = function (params,successcallback,errorcallback) {
		console.log(JSON.stringify(params));
		sqlitetools.getEntityById('tab_inventory',params,function(tx, rs){
			console.log("查询成功！！！");
			successcallback(rs.rows);
		},function(tx,err){
			console.error(err.message);
			errorcallback("查询数据失败!"+err.message);
		})
	};
	// 修改货品详情
	stockDao.updatestockById = function (params,successcallback,errorcallback) {
		console.log(JSON.stringify(params));
		sqlitetools.updateTableByid('tab_inventory',params,function(tx, rs){
			console.log("修改成功！！！");
			successcallback(rs.rows);
		},function(tx,err){
			console.error(err.message);
			errorcallback("修改数据失败!"+err.message);
		})
	};
	// 新增售出明细
	stockDao.insertStockDetailes = function (params,successcallback,errorcallback) {
		console.log(JSON.stringify(params));
		sqlitetools.insertTable('tab_outinfo',params,function(tx, rs){
			console.log("添加成功！！！");
			successcallback(rs.rows);
		},function(tx,err){
			console.error(err.message);
			errorcallback("添加数据失败!"+err.message);
		})
	};
	// 获取售出明细
	stockDao.getOutDetailsByPId = function (params,successcallback,errorcallback) {
		console.log(JSON.stringify(params));
		sqlitetools.getEntityById('tab_outinfo',params,function(tx, rs){
			console.log("查询成功！！！");
			successcallback(rs.rows);
		},function(tx,err){
			console.error(err.message);
			errorcallback("查询数据失败!"+err.message);
		})
	};
	  
  
  return stockDao;
});
