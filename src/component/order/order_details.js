import React from 'react';
import {Tabs,NavBar,Icon} from 'antd-mobile';
import OrderDetailsHead from './order_details_head.js';
import OrderDetailsCost from './order_details_cost.js';
import OrderDetailsItem from './order_details_item.js';
import '../tabs.css';
import {createHashHistory} from 'history'  //返回上一页这段代码
const history = createHashHistory();//返回上一页这段代码

export default class OrderDetails extends React.Component {
	 constructor(props) {
		 super(props);
		 this.state={
			 
		 };
	 }
    //返回按钮
	comeback=()=>{
		history.goBack();  //返回上一页这段代码
	}
	  render() {
	 	
		const item = this.props.location.item;
		  let rolePermission = this.props.location.rolePermission;
	 	const tabs2 = [
	 		{ title: '基本信息', sub: '1' },
	 		{ title: '明细信息', sub: '2' },
			{ title: '工价信息', sub: '3' },
	 	];
	     return (
	       <div style={{ position: 'fixed', height: '100%', width: '100%', top: 0 }}>
               <NavBar mode="light" icon={<Icon type="left" />}
                       onLeftClick={this.comeback}>
               </NavBar>
	         <Tabs tabs={tabs2} initialPage={0} tabBarInactiveTextColor='#108ee9'>
	 			<div style={{ display: 'flex', alignItems: 'right', justifyContent: 'right',backgroundColor: '#fff' }}>
	 				<OrderDetailsHead item={item}/>

	 			</div>
	 			<div style={{  alignItems: 'right', justifyContent: 'right', height: '100%', backgroundColor: '#fff' }}>
					<OrderDetailsItem orderNo={item.orderNo} rolePermission={rolePermission} printeryConfirm={item.printeryIsConfirm}/>
	 			</div>
				<div style={{  alignItems: 'right', justifyContent: 'right', height: '100%', backgroundColor: '#fff' }}>
					<OrderDetailsCost orderNo={item.orderNo} rolePermission={rolePermission} costConfirm={item.costState}/>
				</div>
	 		</Tabs>
	       </div>
	     );
	   }
	 }