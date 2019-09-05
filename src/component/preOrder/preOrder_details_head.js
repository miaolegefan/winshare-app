import React from 'react';
import axios from 'axios';
import { Flex, WhiteSpace,WingBlank } from 'antd-mobile';
import './preOrder.css'

export default class PreOrderDetailsHead extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            preOrderHead: this.props.item,
        };
    }
	
    render() {
        const preOrderHead = this.state.preOrderHead;
        return (
		<div className="line2" style={{color:'#787878',width:'100%'}}>
		<WingBlank size="md">
		<WhiteSpace/>
			<Flex>
			  <div className="text_left flex1">预印单号</div>
			  <div className="text_right flex1 colorBlack">{preOrderHead.preOrderNo}</div>
			</Flex>
			<WhiteSpace/>
			<Flex >
			  <div  className="text_left flex1">征订期</div>
			  <div className="text_right"style={{flex:1,color:'#000000'}}>{preOrderHead.season}</div>
			</Flex>
			<WhiteSpace/>
			<Flex >
			  <div  className="text_left flex1">征订代码</div>
			  <div className="text_right flex1 colorBlack">{preOrderHead.subCode}</div>
			</Flex>
			<WhiteSpace/>
			<Flex >
			  <div  className="text_left flex1">出版社</div>
			  <div className="text_right flex1 colorBlack">{preOrderHead.press}</div>
			</Flex>
			<WhiteSpace/>
			<Flex >
			  <div  className="text_left flex1">印厂</div>
			  <div className="text_right flex1 colorBlack">{preOrderHead.printery}</div>
			</Flex>
			<WhiteSpace/>
			<Flex >
			  <div  className="text_left flex1">书名</div>
			  <div className="text_right flex1 colorBlack">{preOrderHead.bookName}</div>
			</Flex>
			<WhiteSpace/>
			<Flex >
			  <div  className="text_left flex1">印厂接收确认</div>
			  <div className="text_right flex1 colorBlack">{preOrderHead.printeryConfirm}</div>
			</Flex>
			<WhiteSpace/>
			<Flex >
			  <div  className="text_left flex1">印厂接收确认时间</div>
			  <div className="text_right flex1 colorBlack">{preOrderHead.printeryConfirmDate}</div>
			</Flex>
			<WhiteSpace/>
			<Flex >
			  <div  className="text_left flex1">物资公司接收确认</div>
			  <div className="text_right flex1 colorBlack">{preOrderHead.materialsConfirm}</div>
			</Flex>
			<WhiteSpace/>
			<Flex >
			  <div  className="text_left flex1">物资公司接收确认时间</div>
			  <div className="text_right flex1 colorBlack">{preOrderHead.materialsConfirmDate}</div>
			</Flex>
			<WhiteSpace/>
			<Flex >
			  <div  className="text_left flex1">物资公司接收确认人</div>
			  <div className="text_right flex1 colorBlack">{preOrderHead.materialsConfirmPerson}</div>
			</Flex>
			<WhiteSpace/>
			<Flex >
			  <div  className="text_left flex1">印数</div>
			  <div className="text_right flex1 colorBlack">{preOrderHead.preMenge}</div>
			</Flex>
			</WingBlank>
		</div>
		
           
        );
    }
}