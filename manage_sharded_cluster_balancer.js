//Check the Balancer State
sh.getBalancerState()
sh.isBalancerRunning()

//Schedule the Balancing Window
use config
sh.setBalancerState( true )

//Enable the Balancer
sh.setBalancerState(true)
db.adminCommand( { balancerStart: 1 } )

//Disable the Balancer
sh.stopBalancer()
sh.getBalancerState()

//To disable the balancer from a driver, use the balancerStop 
//command against the admin database, as in the following:
db.adminCommand( { balancerStop: 1 } )

