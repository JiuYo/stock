define(['jquery','common',"model/UserModel",'utils/systemutil'], function ($,common,model,systemutil) {　　　　
  var sqlite = {};
  //数据库名称  版本  大小
  var db=openDatabase("stock",'1.0.0','',65536);  
  sqlite.init = function (){
  };

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
  /* 删除数据库数据调用的方法，传入表名，条件等*/
  sqlite.deleteTable = function(tableName,params,success,error){
	 var deleteSql = "delete from " + tableName;
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
            tx.executeSql(deleteSql,params,function(tx,res){
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
  
  
  
  //默认加载对象时,执行创建数据库的语句

  return sqlite;
});
