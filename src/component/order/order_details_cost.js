import React from 'react';
import '../common.css';
import {Button, Flex, WingBlank,Toast} from 'antd-mobile';
import axios from "axios";





function getCost(orderNo,_this) {

	axios.post('/api/public/moblie-orderCost/queryCost',{orderNo}).then(function(response){
		if(response.data.success){
			_this.setState({
				cost : response.data.rows,
			});
		}
	})
}

function confirmCost(costState,_this) {
	const orderNo = _this.props.orderNo;
	axios.post('/api/public/moblie-order/confirm?userId='+sessionStorage.userId,{orderNo,costState}).then(function(response){
		if(response.data.success){
				if(costState == '1'){
					_this.setState({
						printeyCost:true,
						cancelPrinteryCost:false
					});
				}else{
					_this.setState({
						printeyCost:false,
						cancelPrinteryCost:true
					});
				}
		}else{
			Toast.info('更改工价状态失败', 2);
		}
	})
}




export default class OrderDetailsCost extends React.Component{
	constructor(props){
		super(props);
		this.state={
			cost : [],
			rolePermission:this.props.rolePermission,
			costConfirm:this.props.costConfirm,//工价确认数据
			printeyCost:true,
			cancelPrinteryCost:true,
		}
	}


	componentDidMount(){
		getCost(this.props.orderNo,this);

		//对角色按钮进行控制
		const costConfirm=this.state.costConfirm==null?0:this.state.costConfirm;//印厂确认
		const printery = this.state.rolePermission.printery;//当前角色是否有印厂的权限

		if(printery){
			if(costConfirm == '1'){
				this.setState({
					printeyCost:false,
					cancelPrinteryCost:true
				});
			}else{
				this.setState({
					printeyCost:true,
					cancelPrinteryCost:false
				});
			}
		}


	}


	render(){
		const _this = this;
		const costList = this.state.cost.map((item,index) => (
			<section className="section" key={index} >
				<Flex>
					<div className="text_left colorBlack"><strong>{item.itemName}</strong></div>
				</Flex>
				<Flex>
					<div className="font07 text_left flex1" >
						<Flex>
							<div className="text_left ">印色:</div>
							<div className="text_left margin-left">{item.color}</div>
						</Flex>
					</div>
					<div className="font07 flex1" >
						<Flex>
							<div className="text_right ">结算数量:</div>
							<div className="text_left  margin-left">{item.menge}</div>
						</Flex>
					</div>
					<div className="font07 text_right flex1" >
						<Flex>
							<div className="text_right ">结算单位:</div>
							<div className="text_left margin-left">{item.unit}</div>
						</Flex>
					</div>
				</Flex>
				<Flex>
					<div className="font07 flex1" >
						<Flex>
							<div className="text_left ">单价:</div>
							<div className="text_left margin-left">{item.price}</div>
						</Flex>
					</div>
					<div className="font07 flex1" >
						<Flex>
							<div className="text_right ">金额:</div>
							<div className="text_left  margin-left">{item.amount}</div>
						</Flex>
					</div>
					<div className="font07 flex1" >
					</div>
				</Flex>
				<Flex>
					<div className="text_left font07">
						<Flex>
							<div className="text_left ">备注:</div>
							<div className="text_left margin-left">{item.remark}</div>
						</Flex>
					</div>
				</Flex>
			</section>
		))
		return(

			<div style={{width:'100%'}}>
				<div style={{ marginBottom:'400px'}}>
					{costList}
				</div>


				<div style={{bottom:'8%',position: 'absolute',width:'100%'}}>
					<div hidden={this.state.printeyCost} >
						<WingBlank size="md"><Button  type="ghost"   onClick={()=>confirmCost('1',_this)}   style={{color: '#108ee9', 'backgroundColor': 'white', 'borderRadius': '5px', border: '1px solid #108ee9'}} >确认工价</Button></WingBlank>
					</div>
					<div hidden={this.state.cancelPrinteryCost}>
						<WingBlank size="md"><Button  type="ghost" onClick={()=>confirmCost('0',_this)} style={{color: '#787878', 'backgroundColor': 'white', 'borderRadius': '5px', border: '1px solid #108ee9'}} >取消确认工价</Button></WingBlank>
					</div>
				</div>

			</div>

		)
	}
	
}