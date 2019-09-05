import React from 'react';
import './order.css';
import {Flex} from 'antd-mobile';

export default class OrderDetailsCost extends React.Component{
	constructor(props){
		super(props);
		this.state={
			cost : [{"_token":"e59a2689c6e18445289d06e08b26d7ad","objectVersionNumber":1,"id":20,
					"orderNo":"W420190022","itemName":"封面材料","color":"黑色","menge":123,"unit":"张",
					"price":123,"amount":123,"remark":"这是备注","status":null,"operationTime":null,"type":null},
					{"_token":"e59a2689c6e18445289d06e08b26d7ad","objectVersionNumber":1,"id":20,
					"orderNo":"W420190022","itemName":"封面材料","color":"黑色","menge":123,"unit":"张",
					"price":123,"amount":123,"remark":"这是备注","status":null,"operationTime":null,"type":null},
					{"_token":"e59a2689c6e18445289d06e08b26d7ad","objectVersionNumber":1,"id":12,
					"orderNo":"W420190022","itemName":"人工费","color":null,"menge":null,"unit":null,
					"price":null,"amount":null,"remark":null,"status":null,"operationTime":null,"type":null},
					],
		}
	}
	render(){
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
							<div className="text_right flex1">结算数量:</div>
							<div className="text_left flex1 margin-left">{item.menge}</div>
						</Flex>
					</div>
					<div className="font07 text_right flex1" >
						<Flex>
							<div className="text_right flex2">结算单位:</div>
							<div className="text_left flex1 margin-left">{item.unit}</div>
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
							<div className="text_right flex1">金额:</div>
							<div className="text_left flex1 margin-left">{item.amount}</div>
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
			<div>
			{costList}
			</div>
		)
	}
	
}