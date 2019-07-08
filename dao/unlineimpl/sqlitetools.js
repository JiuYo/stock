define(['jquery','common',"model/UserModel",'utils/systemutil'], function ($,common,model,systemutil) {　　　　
  var sqlite = {};
  //数据库名称  版本  大小
  var db=openDatabase("stock",'1.0.0','',65536);  
  sqlite.init = function (){
  };

 
  /* 删除数据库数据调用的方法，传入表名，条件等*/
  sqlite.deleteTable = function(tableName,params,success,error){
	 var deleteSql = "delete from " + tableName;
	 console.log(JSON.stringify(params));
	 if(null != params){
		 deleteSql +=  " where 1=1 ";
		 for(var index in params){
			 if(systemutil.isNotBlank(params[index])){
				 deleteSql += " and "+index +" = '"+params[index]+"' ";
			 }
		 }
	 }
	 console.log(deleteSql);
  	db.transaction(function (tx){
            tx.executeSql(deleteSql,null,function(tx,res){
  					if(success)
  					{
  						success(tx,res);
  					}
                },function(tx,err){
                    if(error)
                    {
                    	error(tx,err);
                    }
                });
        });
  }
  
  // 插入语句数据库
   sqlite.insertTable = function(tableName,params,success,error){
  	 var insertSql = "INSERT INTO " + tableName;
	 var valueSql = "";
  	 if(null != params){
  		 insertSql +=  " ( id,";
			var id = sqlite.uuidGenerator();
		 valueSql +=  " ('"+id+"',";
  		 for(var index in params){
  			 if(systemutil.isNotBlank(params[index])){
  				 insertSql += " "+index +",";
				 valueSql += " '"+params[index]+"',";
  			 }
  		 }
		 insertSql = insertSql.substring(0,insertSql.length-1);
		 valueSql = valueSql.substring(0,valueSql.length-1);
		 insertSql +=  " ) VALUES "+valueSql+")";
  	 }
  	 console.log(insertSql);
  	db.transaction(function (tx){
            tx.executeSql(insertSql,null,function(tx,res){
  					if(success)
  					{
  						success(tx,res);
  					}
                },function(tx,err){
                    if(error)
                    {
                    	error(tx,err);
                    }
                });
        });
  }
  
   // 修改语句
   sqlite.updateTableByid = function(tableName,params,success,error){
  	 var updateSql = "UPDATE " + tableName +" SET ";
  	 var whereSql = "";
  	 if(null != params){
  		 for(var index in params){
  			 if(systemutil.isNotBlank(params[index])){
				 if(index.toLowerCase() == 'id'){
				  	whereSql +=  " ID = '"+params[index]+"' ";
				 	continue;
				  }
  				 updateSql += " "+index +" = '"+params[index]+"', ";
  			 }
  		 }
  		 updateSql = updateSql.substring(0,updateSql.length-1);
  	 }
	 updateSql = updateSql+whereSql;
  	 console.log(updateSql);
  	db.transaction(function (tx){
            tx.executeSql(updateSql,null,function(tx,res){
  					if(success)
  					{
  						success(tx,res);
  					}
                },function(tx,err){
                    if(error)
                    {
                    	error(tx,err);
                    }
                });
        });
  }
  
  // 修改语句  通过stock  id修改数据  
   sqlite.updatestockById = function(tableName,params,success,error){
  	 var updateSql = " UPDATE " + tableName +" SET ";
  	 var whereSql = "";
  	 if(null != params){
  		for(var index in params){
  			 if(systemutil.isNotBlank(params[index])){
  				 if(index.toLowerCase() == 'id'){
  				  	whereSql +=  " WHERE ID ='"+params[index]+"'";
  				 	continue;
  				  }
  				 updateSql += " "+index +" = '"+params[index]+"', ";
  			 }
  		 } 
  		 updateSql = updateSql.substring(0,updateSql.length-2);
  	 }
  	 updateSql = updateSql+whereSql;
  	 console.log(updateSql);
  	db.transaction(function (tx){
            tx.executeSql(updateSql,null,function(tx,res){
  					if(success)
  					{
  						success(tx,res);
  					}
                },function(tx,err){
                    if(error)
                    {
                    	error(tx,err);
                    }
                });
        });
  }
  
  
  
  
  
  
   /**
   * 执行sql
   * @param {Object} sql sql语句
   * @param {Object} params 参数
   * @param {Object} success 成功后的回调
   * @param {Object} error 失败后的回调
   */
  sqlite.executeSql = function(sql,params,success,error){
  	db.transaction(function (tx){
            tx.executeSql(sql,params,function(tx,res){
  					//alert("创建表成功");
  					if(success)
  					{
  						success(tx,res);
  					}
                },function(tx,err){
                    //alert(err.message)
                    if(error)
                    {
                    	error(tx,err);
                    }
                });
        });
  }
  
  
  // 获取数据库列表
  sqlite.getTableList = function(tablename,params,success,error){
	  var sql = " select * from "+ tablename +" where 1=1 ";
	  // limit 15 offset 20 跳过20条选择15条
	  var pageSql = "";
	   if(null != params){
		   if(systemutil.isNotBlank(params.page) && systemutil.isNotBlank(params.rows) ){
			   var rows = "";
			   if(params.page == 1){
				   rows = 0;
			   }else{
				   rows = page*params.rows;
			   }
			   pageSql = " limit "+rows+" , "+params.rows+ " ";
		   }
		 for(var index in params){
			 if(systemutil.isNotBlank(params[index])){
				 if(index == 'page'){
					 continue;
				 }
				 if(index == 'rows'){
				 		continue;			 
				 }
				 sql += " and "+index.split('_')[0]+" "+index.split('_')[1]+" '"+params[index]+"' ";
			 }
		 }
	  }
	  sql = sql+pageSql;
	  console.log(sql);
  	db.transaction(function (tx){
		tx.executeSql(sql,null,function(tx,res){
				//alert("创建表成功");
				if(success)
				{
					success(tx,res);
				}
			},function(tx,err){
				//alert(err.message)
				if(error)
				{
					error(tx,err);
				}
			});
	});
  }
  
    // 获取根据某个条件获取单条
  sqlite.getEntityById = function(tablename,params,success,error){
  	  var sql = " select * from "+ tablename +" where 1=1 ";
  	   if(null != params){
  		 for(var index in params){
  			 if(systemutil.isNotBlank(params[index])){
  				 sql += " and "+index+" = '"+params[index]+"' ";
  			 }
  		 }
  	  }
  	  console.log(sql);
  	db.transaction(function (tx){
  		tx.executeSql(sql,null,function(tx,res){
  				//alert("创建表成功");
  				if(success)
  				{
  					success(tx,res);
  				}
  			},function(tx,err){
  				//alert(err.message)
  				if(error)
  				{
  					error(tx,err);
  				}
  			});
  	});
  }
  
  sqlite.uuidGenerator = function() {
	var originStr = 'xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx',
		originChar = '0123456789abcdef',
		len = originChar.length;
	return originStr.replace(/x/g, function(match) {
		return originChar.charAt(Math.floor(Math.random() * len))
	})
}
  //默认加载对象时,执行创建数据库的语句

  return sqlite;
});
