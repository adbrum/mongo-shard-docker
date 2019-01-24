db.createUser(
  {
    user: "admin",
    pwd: "admin",
    roles: [ { role: "userAdminAnyDatabase", db: "admin" } ]
  }
)

db.createUser(
  {
    user: "teste01",
    pwd: "123",
    
    roles: [{"role":"readAnyDatabase","db":"admin"}],
  }
)

use cinema
db.createUser(
  {
    user: "teste02",
    pwd: "123",
    roles: [ { role: "readWrite", db: "cinema" } ]
  }
)

