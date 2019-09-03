import React from 'react';
import axios from 'axios';
import { Flex, WhiteSpace,WingBlank } from 'antd-mobile';
import './preOrder.css'

export default class PreOrderDetailsHead extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            preOrderHead: {"_token":"3f000acec69ea10f928dd8247bf5068e","objectVersionNumber":4,
				"creationDate":"2019-08-22 12:37:11","id":2181,"fuzzy":null,
				"subCode":null,"startTime":null,"endTime":null,"preOrderNo":"YY19QJ00001",
				"season":"19QJ00","printeryCode":null,"printery":"印厂","press":"四川出版社",
				"bookName":"高等数学","price":12.0,"isbn":"12012","bookSize":"1","bookSizeSpec":"12",
				"sheet":13.0,"preMenge":24.0,"coverCraft":"1","bindStyle":"1","bindSequence":"1、******。\n2、oooo。",
				"others":"测试","serviceCondition":"测试","attachment":null,"planDeliveryDate":"2019-08-08 00:00:00",
				"remark":"测试","auditor":"经理1","auditDate":"2019-08-22 13:35:50","printeryConfirm":"1",
				"printeryConfirmDate":"2019-08-22 05:31:56","materialsConfirm":null,"materialsConfirmDate":"2019-08-22 00:00:00",
				"printeryConfirmPerson":"辰东","materialsConfirmPerson":null,"createdName":"林海伦","isDeleted":"0",
				"approveResult":"已通过","items":null},
        };
    }

	componentDidMount(){
		
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