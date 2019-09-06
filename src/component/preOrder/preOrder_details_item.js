import React from 'react';
import axios from 'axios';
import '../common.css';
import { Flex, WhiteSpace,WingBlank } from 'antd-mobile';

export default class PreOrderDetailsItem extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
			preOrderItem:[
				{"_token":"d919ade7769e786a854d7ec5c6c5daf0","objectVersionNumber":1,"id":2162,
				"preOrderNo":"YY19QJ00001","unit":"吨","materialType":"材料2","color":"2+3","colorUp":null,
				"colorDown":null,"materialName":"测试","materialSpec":"1*3","contentPaperUse":2.0,
				"plusMenge":2.0,"paperUseMenge":2.0,"remark":"测试"},
				{"_token":"0c2f7880020ef6e8da281f5c732bb9d7","objectVersionNumber":1,"id":2161,
				"preOrderNo":"YY19QJ00001","unit":"吨","materialType":"材料","color":"1+2","colorUp":null,
				"colorDown":null,"materialName":"铜版纸","materialSpec":"1*2","contentPaperUse":2.0,
				"plusMenge":1.0,"paperUseMenge":2.0,"remark":"测试"},
					{"_token":"d919ade7769e786a854d7ec5c6c5daf0","objectVersionNumber":1,"id":2162,
				"preOrderNo":"YY19QJ00001","unit":"吨","materialType":"材料2","color":"2+3","colorUp":null,
				"colorDown":null,"materialName":"测试","materialSpec":"1*3","contentPaperUse":2.0,
				"plusMenge":2.0,"paperUseMenge":2.0,"remark":"测试"},
				{"_token":"0c2f7880020ef6e8da281f5c732bb9d7","objectVersionNumber":1,"id":2161,
				"preOrderNo":"YY19QJ00001","unit":"吨","materialType":"材料","color":"1+2","colorUp":null,
				"colorDown":null,"materialName":"铜版纸","materialSpec":"1*2","contentPaperUse":2.0,
				"plusMenge":1.0,"paperUseMenge":2.0,"remark":"测试"},
			]
          
        };
    }

	componentDidMount(){
		
	}
    render() {
         const preOrderItemList=this.state.preOrderItem.map((item, index) => (
			<section className='section' key={index}>
				<Flex >
					<div className="flex1 font07 ">{item.materialType}</div>
					<div  className="flex1 colorBlack"><strong>{item.materialName}</strong></div>
					<div className="flex1"></div>
				</Flex>
				<Flex >
					<div className="font07 text_left flex1" >
						<Flex>
							<div className="text_left ">印色:</div>
							<div className="text_left margin-left">{item.color}</div>
						</Flex>
					</div>
					<div className="font07 text_left flex1" >
						<Flex>
							<div className="text_right ">用纸正数:</div>
							<div className="text_left margin-left ">{item.contentPaperUse}</div>
						</Flex>
					</div>
					<div className="font07 text_right flex1" >
						<Flex>
							<div className="text_right ">用纸总量:</div>
							<div className="text_left margin-left ">{item.paperUseMenge}</div>
						</Flex>
					</div>
				</Flex>
				<Flex >
					<div className="font07 text_left flex1" >
						<Flex>
							<div className="text_left ">规格:</div>
							<div className="text_left margin-left">{item.materialSpec}</div>
						</Flex>
					</div>
					<div className="font07 flex1" >
						<Flex>
							<div className="text_right ">加放数:</div>
							<div className="text_left margin-left ">{item.plusMenge}</div>
						</Flex>
					</div>
					<div className="font07 text_right flex1" >
						<Flex>
							<div className="text_right ">单位:</div>
							<div className="text_left margin-left ">{item.unit}</div>
						</Flex>
					</div>
				</Flex>
				
			</section>
         
        
        ));
        return (
           <div>{preOrderItemList}</div>
        );
    }
}