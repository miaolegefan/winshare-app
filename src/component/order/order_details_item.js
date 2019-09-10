import React from 'react';
import '../common.css';
import {Button, Flex, Toast, WingBlank} from 'antd-mobile';
import axios from "axios";

//获取明细数据
function getItem(orderNo,_this) {

	axios.post('/api/public/moblie-orderItem/queryItem',{orderNo}).then(function(response){
		if(response.data.success){
			_this.setState({
				orderItem : response.data.rows,
			});
		}
	})
}


//状态改变
function changeConfrim(printeryIsConfirm,_this) {
	const orderNo = _this.props.orderNo;
	axios.post('/api/public/moblie-order/confirm?userId=10021',{orderNo,printeryIsConfirm}).then(function(response){
		if(response.data.success){
			if(printeryIsConfirm == '1'){
				_this.setState({
					printey:true,
					cancelPrintery:false
				});
			}else{
				_this.setState({
					printey:false,
					cancelPrintery:true
				});
			}
		}else{
			Toast.info('更改印厂确认状态失败', 2);
		}

	})


}



export default class OrderDetailsItem extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			orderItem:[],
			rolePermission:this.props.rolePermission,
			printeryIsConfirm :this.props.printeryConfirm,//印厂确认数据
			printey:true,
			cancelPrintery:true,
		}
	}


	componentDidMount(){
		getItem(this.props.orderNo,this);

	//对角色按钮进行控制
		const printeryConfirm=this.state.printeryIsConfirm==null?0:this.state.printeryIsConfirm;//印厂确认
		const printery = this.state.rolePermission.printery;//当前角色是否有印厂的权限

		if(printery){

			if(printeryConfirm == '1'){
				this.setState({
					printey:true,
					cancelPrintery:false
				});
			}else{
				this.setState({
					printey:false,
					cancelPrintery:true
				});
			}
		}
	}




	render(){
		const _this = this;
		const orderItemList = this.state.orderItem.map((item,index) => (
			<section className="section" key={index} >
				<Flex>
					<div className="flex1 font07 ">{item.materialType}</div>
					<div className="flex1 colorBlack"><strong>{item.materialName}</strong></div>
					<div className="flex1"></div>
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
							<div className="text_right ">纸张规格:</div>
							<div className="text_left margin-left ">{item.materialSpec}</div>
						</Flex>
					</div>
					<div className="font07 text_right flex1" >
						<Flex>
							<div className="text_right ">正文用纸:</div>
							<div className="text_left margin-left ">{item.contentPaperUse}</div>
						</Flex>
					</div>
					
				</Flex>
				<Flex>
					<div className="font07 text_left flex1" >
						<Flex>
							<div className="text_left ">加数:</div>
							<div className="text_left margin-left">{item.plusMenge}</div>
						</Flex>
					</div>
					<div className="font07 flex1" >
						<Flex>
							<div className="text_right ">项目页数:</div>
							<div className="text_left  margin-left">{item.paperPages}</div>
						</Flex>
					</div>
					<div className="font07 text_right flex1" >
						<Flex>
							<div className="text_right ">纸张开数:</div>
							<div className="text_left  margin-left">{item.materialSize}</div>
						</Flex>
					</div>
				</Flex>
				<Flex>
					<div className="font07 text_left flex1" >
						<Flex>
							<div className="text_left ">加放:</div>
							<div className="text_left margin-left">{item.plusPercentage}</div>
						</Flex>
					</div>
					<div className="font07 flex1" >
						<Flex>
							<div className="text_right ">用纸数量:</div>
							<div className="text_left  margin-left">{item.paperUseMenge}</div>
						</Flex>
					</div>
					<div className="flex1" >
					</div>
				</Flex>
			</section>
		))
		return (
			<div style={{width:'100%'}}>
				<div style={{ marginBottom:'200px'}}>
					{orderItemList}
				</div>

				<div style={{position: 'absolute', bottom: 0,width:'100%' }}>
					<div hidden={this.state.printey} >
						<WingBlank size="md"><Button  type="ghost"  onClick={()=>changeConfrim('1',_this)} style={{color: '#108ee9', 'backgroundColor': 'white', 'borderRadius': '5px', border: '1px solid #108ee9'}}  size="small">印厂接收确认</Button></WingBlank>
					</div>
					<div hidden={this.state.cancelPrintery}>
						<WingBlank size="md"><Button  type="ghost" onClick={()=>changeConfrim('0',_this)} style={{color: '#787878', 'backgroundColor': 'white', 'borderRadius': '5px', border: '1px solid #108ee9'}} size="small">取消印厂接收确认</Button></WingBlank>
					</div>
				</div>
			</div>


		)
	}
	
}