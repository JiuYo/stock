define(['jquery','common',"dao/unlineimpl/sqlitetools"], function ($,common,sqlitetools) {　　　　
  var initialization = {};
  
  var tableSqlArr = [];
  var insertDatasqlArr = [];
  
  initialization.init = function (){
		initialization.tableSql();
		initialization.insertsql();
  };

	initialization.tableSql = function(){
		tableSqlArr.push( "CREATE TABLE IF NOT EXISTS tab_user ( "+
							"`ID` VARCHAR ( 32 ) PRIMARY KEY NOT NULL, "+
							"`username` VARCHAR ( 50 ) NOT NULL, "+
							"`password` VARCHAR ( 100 ) DEFAULT NULL, "+
							"`state` INT ( 1 ) DEFAULT NULL, "+
							"`cdk` VARCHAR ( 255 ) DEFAULT NULL, "+
							"`realname` VARCHAR ( 50 ) DEFAULT NULL, "+
							"`status` INT ( 6 ) DEFAULT NULL, "+
							"`imei` VARCHAR ( 255 ) DEFAULT NULL, "+
							"`count` INT ( 11 ) DEFAULT NULL, "+
							"`imeix` VARCHAR ( 255 ) DEFAULT NULL, "+
							"`isDelete` INT ( 1 ) DEFAULT NULL, "+
							"`create_time` datetime DEFAULT NULL "+
							");");
		tableSqlArr.push("CREATE TABLE IF NOT EXISTS tab_inventory ( "+
							"`ID` VARCHAR ( 32 ) PRIMARY KEY NOT NULL, "+
							"`pname` VARCHAR ( 100 ) DEFAULT NULL, "+
							"`price` REAL  DEFAULT NULL, "+
							"`count` REAL DEFAULT NULL, "+
							"`unit` VARCHAR ( 100 ) DEFAULT NULL, "+
							"`total` REAL DEFAULT NULL, "+
							"`stock` REAL DEFAULT NULL, "+
							"`sale` REAL DEFAULT NULL, "+
							"`uid` VARCHAR ( 100 ) DEFAULT NULL, "+
							"`isDelete` INT ( 1 ) DEFAULT NULL, "+
							"`create_time` datetime DEFAULT NULL , "+
							"`date` datetime NOT NULL  "+
							");");
		tableSqlArr.push("	CREATE TABLE IF NOT EXISTS tab_outinfo ( "+
							"`ID` VARCHAR ( 32 ) PRIMARY KEY NOT NULL, "+
							"`pid` VARCHAR ( 100 ) DEFAULT NULL, "+
							"`uid` VARCHAR ( 100 ) DEFAULT NULL, "+
							"`outqty` REAL DEFAULT NULL, "+
							"`create_time` datetime DEFAULT NULL, "+
							"`outtime` datetime NOT NULL  "+
							");");
	}
	
	initialization.insertsql = function(){
		
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
		var tableNameArr = ['t_s_base_user','t_s_inventory','tab_user','tab_inventory','tab_outinfo'];
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
