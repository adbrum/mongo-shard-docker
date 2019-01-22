use cinema

db.ratings.createIndex( {  movieId : "hashed" }, {unique: false} )
sh.shardCollection( "cinema.ratings", { movieId : "hashed" } )
sh.moveChunk("cinema.ratings", { movieId : "hashed" }, "shard01")

db.movies.createIndex( {  movieId : "hashed" }, {unique: false} )
sh.shardCollection( "cinema.movies", { movieId : "hashed" } )
sh.moveChunk("cinema.movies", { movieId : "hashed" }, "shard02")

db.tags.createIndex( {  movieId : "hashed" }, {unique: false} )
sh.shardCollection( "cinema.tags", { movieId : "hashed" } )
sh.moveChunk("cinema.tags", { movieId : "hashed" }, "shard02")

db.genome_scores.createIndex( {  movieId : "hashed" }, {unique: false} )
sh.shardCollection( "cinema.genome_scores", { movieId : "hashed" } )
sh.moveChunk("cinema.genome_scores", { movieId : "hashed" }, "shard03")

db.genome_tags.createIndex( {  tagId  : "hashed" }, {unique: false} )
sh.shardCollection( "cinema.genome_tags", { tagId  : "hashed" } )
sh.moveChunk("cinema.genome_tags", { tagId  : "hashed" }, "shard03")
