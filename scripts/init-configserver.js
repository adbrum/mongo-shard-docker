rs.initiate(
   {
      _id: "configserver",
      configsvr: true,
      version: 1,
      members: [
         { _id: 0, host : "config01:sh.enableSharding( cinema )" },
         { _id: 1, host : "config02:sh.enableSharding( cinema )" },
         { _id: 2, host : "config03:sh.enableSharding( cinena )" }
      ], 
   }
)

//sh.enableAutoSplit()
//db.setSlaveOk()



