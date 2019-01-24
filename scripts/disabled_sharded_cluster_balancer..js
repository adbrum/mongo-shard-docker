//Check the Balancer State
sh.getBalancerState()
sh.isBalancerRunning()

use config

//Disable the Balancer
sh.stopBalancer()
sh.getBalancerState()

//To disable the balancer from a driver, use the balancerStop 
//command against the admin database, as in the following:
db.adminCommand( { balancerStop: 1 } )

