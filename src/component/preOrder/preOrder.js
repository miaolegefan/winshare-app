import React from 'react';
import {Link} from 'react-router-dom';
import './preOrder.css'

import { Flex, WhiteSpace,WingBlank,SearchBar,Button } from 'antd-mobile';
import axios from "axios";

function query(_this) {//数据查询
	axios.post('/api/public/moblie-preOrder/query?userId='+localStorage.userId,{}).then(function(response){
		if(response.data.success){
			_this.setState({
				preOrder : response.data.rows,
				search:response.data.rows
			});
		}
	})

}

function queryPermission(_this) {//人员角色查询

	const codes =[{
		code: "pre-order-dataset.printery",
		resourceType: "site"
	},{
		code: "pre-order-dataset.materials",
		resourceType: "site"
	},{
		code: "pre-order-dataset.print-center",
		resourceType: "site"
	}];

	axios.post('/api/public/checkPermission/query?userId=10021&roleId=101',codes).then(function(response){
		if(response.data.success){
			const res =response.data.rows;
			for(var i=0;i<res.length;i++){
				switch (res[i].code) {
					case 'pre-order-dataset.printery':
						result.printery=res[i].approve
					case 'pre-order-dataset.materials':
						result.materials=res[i].approve
					case 'pre-order-dataset.print-center':
						result.print_center=res[i].approve
				}
			}

		}else{

			const ces = '';
		}
	})
}


function search(arr, q) {
	return arr.filter(v => Object.values(v).some(v => new RegExp(q + '').test(v)));
}

var result = {
	printery:false,
	materials:false,
	print_center: false
};
export default class PreOrder extends React.Component{
	constructor(props) {
		super(props);
		this.state = {
			search:[],
			preOrder : [],
		}
	}
	componentDidMount(){
		query(this);
		queryPermission(this);
	}

	//查询事件
	onSearch = (val) => {
		const value = search(this.state.search,val);


		this.setState({
			preOrder: value
		});

	}



	render(){
		const preOrderList=this.state.preOrder.map((preOrderItem, index) => (

		    <Link to={{pathname:'/preOrder/details',item:preOrderItem,rolePermission:result}} key={index}>
		       <section className='pre_order_sec' >
				   <div>
						<Flex>
						  <div className="font07 text_left flex1">{preOrderItem.season}</div>
						  <div className="font07 text_right flex2" style={{flex:1}}>{preOrderItem.preOrderNo}</div>
						</Flex>
						<Flex style={{color:'#000000'}}><strong>{preOrderItem.bookName}</strong></Flex>
						<WhiteSpace/>
						<Flex className="font07"  >
						  <div  style={{flex:1}}>印厂确认时间:</div>
						  <div style={{flex:2}}>{preOrderItem.printeryConfirmDate}</div>
						</Flex>
						<Flex className="font07">
						  <div style={{flex:1}}>物资公司确认时间:</div>
						  <div style={{flex:2}}>{preOrderItem.materialsConfirmDate}</div>
						</Flex>
					</div>
		        </section>
		    </Link>));


		return(
		<div>
			<SearchBar
				placeholder="Search"
				onChange={this.onSearch}/>
				{preOrderList }



		</div>
		);
	}
}