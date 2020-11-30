var couchbase = require("couchbase");
var cluster = new couchbase.Cluster("couchbase://localhost", {
username: "Administrator",
password: "admin123"
});
var bucket = cluster.bucket("test");
var collection = bucket.defaultCollection();

var getData = function() {
  return new Promise((resolve,reject) => {
      const query = "SELECT * FROM test";
      cluster.query(query,(err,result)=>{
            if(err){
              console.log("err",err);
              return reject(err);
            }else{
              return resolve(result);
            }
      });
  })
}


var getDataById = function(key){
  return new Promise((resolve,reject) => {
      collection.get(key,function(err,result){
        if(err){
          console.log("err",err);
          return reject(err);
        }else{
        console.log(result.value);
          return resolve(result.value);
        }
      })
  })
}

var insertData = function(key,data){
  return new Promise((resolve,reject) => {
    collection.insert(key,data, function(err, result) {
      if(err){
          console.log("err",err);
          return reject(err);
      }else{
        return resolve(result.value);
      } 
    });   
  }) 
}


var updateData = function(key,data){
  return new Promise((resolve,reject) => {
    collection.upsert(key,data, function(err,result){
      if(err){
        console.log("err",err);
        return reject(err);
      }else{
        return resolve(result.value);
      }
    });
  })
}


var deleteData = function(key){
  return new Promise((resolve,reject) => {
    collection.remove("u"+key,function(err,result){
      if(err){
          console.log("err",err);
          return reject(err);
      }else{
          return resolve(result.value);
      } 
  })   
  })       
}

var searchData = function(search) {
  console.log(search);
  return new Promise((resolve,reject) => {
      const query = `SELECT * FROM test WHERE (firstname LIKE '%${search}%')`;
      cluster.query(query,(err,result)=>{
            if(err){
              console.log("err",err);
              return reject(err);
            }else{
              return resolve(result);
            }
      });
  })
}

module.exports.getData = getData;
module.exports.getDataById = getDataById;
module.exports.insertData = insertData;
module.exports.updateData = updateData;
module.exports.deleteData = deleteData;
module.exports.searchData = searchData;