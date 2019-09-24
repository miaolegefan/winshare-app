import React from 'react';
import {BrowserRouter as Router,Route,Switch} from 'react-router-dom';
import Home from './component/home';
import Manuscript from './component/manuscript/manuscript';
import ManuscriptDetails from './component/manuscript/manuscrip_details';
import PreLogin from './component/login/preLogin';
import GetWechatUser from './component/login/getWechatUser';
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
import GetAddress from './component/address/getAddress';
import workFlow from  './component/workFlow/workFlow';
import workFlowDetail from './component/workFlow/workFlowDetail';
import wlConfirm from './component/wl/wlConfirm';
import wlConfirmDetail from './component/wl/wlConfirmDetail';
import invDc from './component/invDc/invDcHead';
import invDcDetail from './component/invDc/invDcDetail';
import invDcMore from './component/invDc/invDcMore';
import PrinteryAmount from './component/printeryAmount/printeryAmount'
class App extends React.PureComponent{
  render(){
    return (
      <Router >
        <Switch>
			<Route exact path='/add' component={PrinteryProcessEnclosureAdd}/>
			<Route exact path='/' component={GetWechatUser}/>
			<Route path='/home' component={Home}/>
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
			<Route exact path='/address' component={Address}/>
			<Route exact path='/workFlow' component={workFlow}/>
			<Route exact path='/workFlow/details/:id' component={workFlowDetail}/>
            <Route exact path='/wlConfirm' component={wlConfirm}/>
            <Route exact path='/wlConfirm/detail' component={wlConfirmDetail}/>
			<Route exact path='/invDc' component={invDc}/>
			<Route exact path='/invDc/detail/:orderNo' component={invDcDetail}/>
			<Route exact path='/invDc/data/more' component={invDcMore}/>
            <Route exact path='/printeryAmount' component={PrinteryAmount}/>
        </Switch>
      </Router>
    )
  }
}
export default App;

