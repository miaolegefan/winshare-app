import React from 'react';
import {BrowserRouter as Router,Route,Switch} from 'react-router-dom';
import Home from './component/home';
import Home2 from './component/home2';
import Manuscript from './component/manuscript/manuscript';
import ManuscriptDetails from './component/manuscript/manuscrip_details';
import PreLogin from './component/login/preLogin';
import PreOrder from './component/preOrder/preOrder';
import PreOrderDetails from './component/preOrder/preOrder_details';
import PrinteryProcess from './component/printeryProcess/printeryProcess'
import PrinteryProcessDetails from './component/printeryProcess/printeryProcessDetails'
import Order from './component/order/order';
import OrderDetails from './component/order/order_details';

import RoleChoose from './component/roleChoose/roleChoose';

class App extends React.PureComponent{
  render(){
    return (
      <Router >
        <Switch>
		  <Route exact path='/' component={RoleChoose}/>
          <Route path='/home' component={Home}/>
		  <Route path='/home2' component={Home2}/>
		  <Route exact path='/manuscript' component={Manuscript}/> 
<<<<<<< HEAD
		  {/*<Route path='/manuscript/details/:id' component={ManuscriptDetails}/> */}
            <Route path='/manuscript/details' component={ManuscriptDetails}/>
            <Route exact path='/preOrder' component={PreOrder}/>
		  <Route path='/preOrder/details/:id' component={PreOrderDetails}/>
		  <Route path='/roleChoose' component={RoleChoose}/>
=======
		  <Route path='/manuscript/details/:id' component={ManuscriptDetails}/> 
		  <Route exact path='/preOrder' component={PreOrder}/> 
		  <Route path='/preOrder/details' component={PreOrderDetails}/> 
		  <Route exact path='/printeryProcess' component={PrinteryProcess}/>
		  <Route exact path='/printeryProcess/details' component={PrinteryProcessDetails}/>
		  <Route exact path='/order' component={Order}/>
		  <Route path='/order/details' component={OrderDetails}/> 
>>>>>>> 87b15ec2054dad3405cbe331e5c413e8ec529613
        </Switch>
      </Router>
    )
  }
}
export default App;

