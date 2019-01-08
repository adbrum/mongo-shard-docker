Mongo Sharded Cluster with Docker Compose
=========================================
A simple sharded Mongo Cluster with a replication factor of 2 running in `docker` using `docker-compose`.

Designed to be quick and simple to get a local or test environment up and running. Needless to say... DON'T USE THIS IN PRODUCTION!

Heavily inspired by [https://github.com/jfollenfant/mongodb-sharding-docker-compose](https://github.com/jfollenfant/mongodb-sharding-docker-compose)

### Mongo Components

* Config Server (3 member replica set): `config01`,`config02`,`config03`
* 3 Shards (each a 2 member replica set):
	* `shard01a`,`shard01b`
	* `shard02a`,`shard02b`
	* `shard03a`,`shard03b`
* 1 Router (mongos): `router`
* (TODO): DB data persistence using docker data volumes

### First Run (initial setup)
**Start all of the containers** (daemonized)

**Initialize the replica sets (config server and shards) and router**

```
sh init.sh or ./init.sh
```

This script has a `sleep 30` to wait for the config server and shards to elect their primaries before initializing the router

**Verify the status of the sharded cluster**

```
docker-compose exec router mongo
mongos> sh.status()
--- Sharding Status --- 
  sharding version: {
  	"_id" : 1,
  	"minCompatibleVersion" : 5,
  	"currentVersion" : 6,
  	"clusterId" : ObjectId("5c34fe87d8294d0068c54f98")
  }
  shards:
        {  "_id" : "shard01",  "host" : "shard01/shard01a:27018,shard01b:27018",  "state" : 1 }
        {  "_id" : "shard02",  "host" : "shard02/shard02a:27019,shard02b:27019",  "state" : 1 }
        {  "_id" : "shard03",  "host" : "shard03/shard03a:27020,shard03b:27020",  "state" : 1 }
  active mongoses:
        "4.0.4" : 1
  autosplit:
        Currently enabled: yes
  balancer:
        Currently enabled:  yes
        Currently running:  no
        Failed balancer rounds in last 5 attempts:  0
        Migration Results for the last 24 hours: 
                No recent migrations
  databases:
        {  "_id" : "cinema",  "primary" : "shard02",  "partitioned" : false,  "version" : {  "uuid" : UUID("9d91158a-769d-48b8-b79d-c5b1a8c0c7ff"),  "lastMod" : 1 } }
        {  "_id" : "config",  "primary" : "config",  "partitioned" : true }
                config.system.sessions
                        shard key: { "_id" : 1 }
                        unique: false
                        balancing: true
                        chunks:
                                shard01	1
                        { "_id" : { "$minKey" : 1 } } -->> { "_id" : { "$maxKey" : 1 } } on : shard01 Timestamp(1, 0) 

```
**Confirm the shard is balancing**
```
mongos> db.stats()
{
	"raw" : {
		"shard02/shard02a:27019,shard02b:27019" : {
			"db" : "test",
			"collections" : 0,
			"views" : 0,
			"objects" : 0,
			"avgObjSize" : 0,
			"dataSize" : 0,
			"storageSize" : 0,
			"numExtents" : 0,
			"indexes" : 0,
			"indexSize" : 0,
			"fileSize" : 0,
			"fsUsedSize" : 0,
			"fsTotalSize" : 0,
			"ok" : 1
		},
		"shard01/shard01a:27018,shard01b:27018" : {
			"db" : "test",
			"collections" : 0,
			"views" : 0,
			"objects" : 0,
			"avgObjSize" : 0,
			"dataSize" : 0,
			"storageSize" : 0,
			"numExtents" : 0,
			"indexes" : 0,
			"indexSize" : 0,
			"fileSize" : 0,
			"fsUsedSize" : 0,
			"fsTotalSize" : 0,
			"ok" : 1
		},
		"shard03/shard03a:27020,shard03b:27020" : {
			"db" : "test",
			"collections" : 0,
			"views" : 0,
			"objects" : 0,
			"avgObjSize" : 0,
			"dataSize" : 0,
			"storageSize" : 0,
			"numExtents" : 0,
			"indexes" : 0,
			"indexSize" : 0,
			"fileSize" : 0,
			"fsUsedSize" : 0,
			"fsTotalSize" : 0,
			"ok" : 1
		}
	},
	"objects" : 0,
	"avgObjSize" : 0,
	"dataSize" : 0,
	"storageSize" : 0,
	"numExtents" : 0,
	"indexes" : 0,
	"indexSize" : 0,
	"fileSize" : 0,
	"extentFreeList" : {
		"num" : 0,
		"totalSize" : 0
	},
	"ok" : 1,
	"operationTime" : Timestamp(1546977416, 1),
	"$clusterTime" : {
		"clusterTime" : Timestamp(1546977421, 1),
		"signature" : {
			"hash" : BinData(0,"AAAAAAAAAAAAAAAAAAAAAAAAAAA="),
			"keyId" : NumberLong(0)
		}
	}
}

```

### Normal Startup
The cluster only has to be initialized on the first run. Subsequent startup can be achieved simply with `docker-compose up` or `docker-compose up -d`

### In consol
Its as simple as:

```
sh start.sh or ./start.sh
```

### In consol
Its as simple as:
```
sh stop.sh or ./stop.sh
```

### Resetting the Cluster
To remove all data and re-initialize the cluster, make sure the containers are stopped and then:

```
docker-compose rm
```

### Cleanup:

```
$ docker stop $(docker ps -a -q)

$ docker rm $(docker ps -a -q)

$ docker volume rm $(docker volume ls -qf dangling=true)
```

Execute the **First Run** instructions again.