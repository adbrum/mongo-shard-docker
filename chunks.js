use cinema

db.ratings.createIndex( {  movieId : "hashed" }, {unique: false} )
sh.shardCollection( "cinema.ratings", { movieId : "hashed" } )

db.links.createIndex( {  movieId : "hashed" }, {unique: false} )
sh.shardCollection( "cinema.links", { movieId : "hashed" } )

db.movies.createIndex( {  movieId : "hashed" }, {unique: false} )
sh.shardCollection( "cinema.movies", { movieId : "hashed" } )

db.tags.createIndex( {  movieId : "hashed" }, {unique: false} )
sh.shardCollection( "cinema.tags", { movieId : "hashed" } )

db.genome_scores.createIndex( {  movieId : "hashed" }, {unique: false} )
sh.shardCollection( "cinema.genome_scores", { movieId : "hashed" } )

db.genome_tags.createIndex( {  tagId  : "hashed" }, {unique: false} )
sh.shardCollection( "cinema.genome_tags", { tagId  : "hashed" } )


sh.moveChunk("cinema.links", { tagId  : "hashed" }, "shard01")
sh.moveChunk("cinema.ratings", { movieId : "hashed" }, "shard01")
sh.moveChunk("cinema.movies", { movieId : "hashed" }, "shard02")
sh.moveChunk("cinema.tags", { movieId : "hashed" }, "shard02")
sh.moveChunk("cinema.genome_scores", { movieId : "hashed" }, "shard03")
sh.moveChunk("cinema.genome_tags", { tagId  : "hashed" }, "shard03")


//db.printShardingStatus(true)