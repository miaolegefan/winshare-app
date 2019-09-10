import React from 'react';
import {Tabs,Button} from 'antd-mobile';
import OrderDetailsHead from './order_details_head.js';
import OrderDetailsCost from './order_details_cost.js';
import OrderDetailsItem from './order_details_item.js';
import '../tabs.css';

export default class OrderDetails extends React.Component {
	 constructor(props) {
		 super(props);
		 this.state={
			 
		 };
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