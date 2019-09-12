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
import PrinteryProcessEnclosure from './component/printeryProcess/printeryProcessEnclosure'
import PrinteryProcessEnclosureAdd from './component/printeryProcess/printeryProcessEnclosureAdd'
import Order from './component/order/order';
import OrderDetails from './component/order/order_details';
import RoleChoose from './component/roleChoose/roleChoose';
import Address from './component/address/address';

class App extends React.PureComponent{
  render(){
    return (
      <Router >
        <Switch>
			<Route exact path='/' component={Home}/>
			<Route path='/home' component={Home}/>
			<Route path='/home2' component={Home2}/>
			<Route exact path='/manuscript' component={Manuscript}/> 
			<Route path='/manuscript/details' component={ManuscriptDetails}/>
			<Route path='/roleChoose' component={RoleChoose}/>
			<Route exact path='/preOrder' component={PreOrder}/> 
			<Route path='/preOrder/details' component={PreOrderDetails}/> 
			<Route exact path='/printeryProcess' component={PrinteryProcess}/>
			<Route exact path='/printeryProcess/details/:orderNo' component={PrinteryProcessDetails}/>
            <Route exact path='/printeryProcess/details/en/enclosure' component={PrinteryProcessEnclosure}/>
			<Route exact path='/order' component={Order}/>
			<Route path='/order/details' component={OrderDetails}/>
			<Route path='/address' component={Address}/>
        </Switch>
      </Router>
    )
  }
}
export default App;

