define(['jquery','common',"dao/unlineimpl/sqlitetools"], function ($,common,sqlitetools) {　　　　
  var initialization = {};
  
  var tableSqlArr = [];
  var insertDatasqlArr = [];
  
  initialization.init = function (){
		initialization.tableSql();
		initialization.insertsql();
  };

	initialization.tableSql = function(){
		tableSqlArr.push( "CREATE TABLE if not exists t_s_base_user (  `ID` varchar(32)  PRIMARY KEY NOT NULL ,  `password` varchar(100) DEFAULT NULL ,  `realname` varchar(50) DEFAULT NULL ,  `status` int(6) DEFAULT NULL ,  `username` varchar(50) NOT NULL )");
		tableSqlArr.push("CREATE TABLE if not exists t_s_inventory (`ID` varchar(32) PRIMARY KEY NOT NULL ,  `qty` int(11) DEFAULT NULL ,  `name` varchar(100) DEFAULT NULL ,  `outqty` int(11) DEFAULT NULL ,  `outtime` datetime NOT NULL );");
	}
	
	initialization.insertsql = function(){
		insertDatasqlArr.push("INSERT INTO t_s_base_user(`ID`,  `password`, `realname`,  `status`,  `username`) VALUES ('2c95808b697ee4b101697f0fd6c60031',  '123456', '张三',  null,'zs')");
		insertDatasqlArr.push("INSERT INTO t_s_inventory(`ID`,  `qty`, `name`,  `outqty`,  `outtime`) VALUES ('2c95808b697ee4b101697f0fd6c60031',  '99', '物料1',  11,datetime('now'))");
		
	}
	
	initialization.createTable = function(){
		var isflag = true;
		for(var i=0;i<tableSqlArr.length;i++){
			sqlitetools.executeSql(tableSqlArr[i],[],function(tx, rs){
				console.log("插入成功");
			},function(tx,err){
				isflag = false;
				console.log(err.message)
			})
		}
		if(isflag){
			initialization.deleteTabledata();
		}
	}
	initialization.insertData = function(){
		for(var i=0;i<insertDatasqlArr.length;i++){
			sqlitetools.executeSql(insertDatasqlArr[i],[],function(tx, rs){
				console.log("插入成功");
			},function(tx,err){
				console.log(err.message)
			})
		}
	}
	initialization.deleteTabledata = function(){
		var tableNameArr = ['t_s_base_user','t_s_inventory'];
		for(var i=0;i<tableNameArr.length;i++){
			console.log(tableNameArr[i]);
			sqlitetools.deleteTable(tableNameArr[i],null,function(tx, rs){
				console.log("删除成功");
			},function(tx,err){
				console.log(err.message)
			})
		}
		initialization.insertData();
	}
  
  
  
  return initialization;
});
