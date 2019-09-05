import React from 'react';
import './order.css';
import {Flex} from 'antd-mobile';

export default class OrderDetailsItem extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			orderItem:[
				{"_token":"7d7fa08375f5798a1764ec3cd98390bc","objectVersionNumber":1,"id":43,"color":null,
				"orderNo":"W420190022","materialType":"正文材料","colorUp":null,"materialSize":16.0,
				"paperPages":80.0,"materialName":"105克铜版纸","materialSpec":"787*1092","contentPaperUse":null,
				"plusPercentage":144.0,"plusMenge":0.736,"paperUseMenge":5.842,"unit":"令","colorDown":null},
				{"_token":"a62561a5875abc94da0e7b9d9b71b667","objectVersionNumber":1,"id":44,"color":null,
				"orderNo":"W420190022","materialType":"装订","colorUp":null,"materialSize":null,
				"paperPages":null,"materialName":"105克铜版纸","materialSpec":"787*1092","contentPaperUse":null,
				"plusPercentage":null,"plusMenge":null,"paperUseMenge":10000.0,"unit":"印张","colorDown":null},
				{"_token":"cefdaab867692fb321eac0c99b25577f","objectVersionNumber":1,"id":45,"color":null,
				"orderNo":"W420190022","materialType":"胶差费","colorUp":null,"materialSize":null,
				"paperPages":null,"materialName":"105克铜版纸","materialSpec":"787*1092","contentPaperUse":null,
				"plusPercentage":null,"plusMenge":null,"paperUseMenge":5.105,"unit":"令","colorDown":null},
				],
		}
	}
	
	render(){
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
							<div className="text_right flex1">纸张规格:</div>
							<div className="text_left margin-left flex1">{item.materialSpec}</div>
						</Flex>
					</div>
					<div className="font07 text_right flex1" >
						<Flex>
							<div className="text_right flex2">正文用纸:</div>
							<div className="text_left margin-left flex1">{item.contentPaperUse}</div>
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
							<div className="text_right flex1">项目页数:</div>
							<div className="text_left flex1 margin-left">{item.paperPages}</div>
						</Flex>
					</div>
					<div className="font07 text_right flex1" >
						<Flex>
							<div className="text_right flex2">纸张开数:</div>
							<div className="text_left flex1 margin-left">{item.materialSize}</div>
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
							<div className="text_right flex1">用纸数量:</div>
							<div className="text_left flex1 margin-left">{item.paperUseMenge}</div>
						</Flex>
					</div>
					<div className="flex1" >
					</div>
				</Flex>
			</section>
		))
		return (
			<div>
				{orderItemList}
			</div>
		)
	}
	
}