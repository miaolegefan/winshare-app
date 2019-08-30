import React from 'react';
import axios from 'axios';
import './preOrder.css'
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

	componentWillMount(){
		
	}
    render() {
         const preOrderItemList=this.state.preOrderItem.map((item, index) => (
			<section className='pre_order_sec' key={index}>
				<WhiteSpace/>
				<div style={{color:'#787878'}}>
					<Flex >
					  <div style={{flex:1}}>{item.materialType}</div>
					  <div style={{flex:2,color:'#000000'}}><strong>{item.materialName}</strong></div>
					</Flex>
					<WhiteSpace/>
					<Flex >
					  <div style={{flex:1}}>印色</div> <div style={{flex:2}}>{item.color}</div>
					  <div style={{flex:2}}>用纸正数</div> <div style={{flex:1}}>{item.contentPaperUse}</div>
					  <div style={{flex:2}}>用纸总量</div> <div style={{flex:2.5}}>{item.paperUseMenge}</div>
					</Flex>
					<Flex >
					  <div style={{flex:1}}>规格:</div> <div style={{flex:2}}>{item.materialSpec}</div>
					  <div style={{flex:2}}>加放数</div> <div style={{flex:1}}>{item.plusMenge}</div>
					  <div style={{flex:2}}>单位</div> <div style={{flex:2.5}}>{item.unit}</div>
					</Flex>
				</div>	
				<WhiteSpace/>
			</section>
         
        
        ));
        return (
           <div>{preOrderItemList}</div>
        );
    }
}