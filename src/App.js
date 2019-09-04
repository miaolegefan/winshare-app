import React from 'react';
import {BrowserRouter as Router,Route,Switch} from 'react-router-dom';
import Home from './component/home';
import Home2 from './component/home2';
import Manuscript from './component/manuscript/manuscript';
import ManuscriptDetails from './component/manuscript/manuscrip_details';
import PreLogin from './component/login/preLogin';
import PreOrder from './component/preOrder/preOrder';
import PreOrderDetails from './component/preOrder/preOrder_details';

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
		  {/*<Route path='/manuscript/details/:id' component={ManuscriptDetails}/> */}
            <Route path='/manuscript/details' component={ManuscriptDetails}/>
            <Route exact path='/preOrder' component={PreOrder}/>
		  <Route path='/preOrder/details/:id' component={PreOrderDetails}/>
		  <Route path='/roleChoose' component={RoleChoose}/>
        </Switch>
      </Router>
    )
  }
}
export default App;

