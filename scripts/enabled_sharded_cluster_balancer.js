//Check the Balancer State
sh.getBalancerState()
sh.isBalancerRunning()

//Schedule the Balancing Window
use config
sh.setBalancerState( true )

//Enable the Balancer
sh.setBalancerState(true)
db.adminCommand( { balancerStart: 1 } )


