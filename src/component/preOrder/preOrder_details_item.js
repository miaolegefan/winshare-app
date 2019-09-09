import React from 'react';
import axios from 'axios';
import '../common.css';
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