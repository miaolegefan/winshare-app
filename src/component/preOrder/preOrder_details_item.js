import React from 'react';
import axios from 'axios';
import './preOrder.css'
import { Flex, WhiteSpace,WingBlank } from 'antd-mobile';

function getItem(preOrderNo,_this) {

	axios.post('/api/public/moblie-preOrder/queryItem',{preOrderNo}).then(function(response){
		if(response.data.success){
			_this.setState({
				preOrderItem : response.data.rows,
			});
		}else{

			const test = '';
		}
	})



}





export default class PreOrderDetailsItem extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
			preOrderItem:[]
        };
    }

	componentDidMount(){
		getItem(this.props.preOrderNo,this)
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