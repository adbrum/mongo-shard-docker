

rs.initiate( {
    _id : "shard01",
    members: [
       { _id: 0, host: "shard01/shard01a:27018" },
       { _id: 1, host: "shard01/shard01b:27018" },
    ]
 })
 
 //sh.addShard("shard01/shard01a:27018")
 //sh.addShard("shard01/shard01b:27018")
 
 rs.initiate( {
    _id : "shard02",
    members: [
       { _id: 0, host: "shard02/shard02a:27019" },
       { _id: 1, host: "shard02/shard02b:27019" },
    ]
 })
 
 //sh.addShard("shard02/shard02a:27019")
 //sh.addShard("shard02/shard02b:27019")
 
 rs.initiate( {
    _id : "shard03",
    members: [
       { _id: 0, host: "shard03/shard03a:27020" },
       { _id: 1, host: "shard03/shard03b:27020" },
    ]
 })
 
 //sh.addShard("shard03/shard03a:27020")
 //sh.addShard("shard03/shard03b:27020")