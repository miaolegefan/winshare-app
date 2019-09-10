import React from 'react';
import '../common.css';
import {Button, Flex, WhiteSpace, WingBlank} from 'antd-mobile';

export default class OrderDetailsHead extends React.Component {
	constructor(props) {
		super(props);
		this.state={
			orderHead:this.props.item,
		};
	}
	render(){
		
		const orderHead= this.state.orderHead;
		return(
			<div className="datails">
				<Flex>
				  <div className="text_left flex1">通知单编号:</div>
				  <div className="text_right flex1 colorBlack">{orderHead.noticeNo}</div>
				</Flex>
				<Flex>
				  <div className="text_left flex1">制单人:</div>
				  <div className="text_right flex1 colorBlack">{orderHead.orderMaker}</div>
				</Flex>
				<Flex>
				  <div className="text_left flex1">制单日期:</div>
				  <div className="text_right flex1 colorBlack">{orderHead.orderDate}</div>
				</Flex>
				<Flex>
				  <div className="text_left flex1">选题编号:</div>
				  <div className="text_right flex1 colorBlack">{orderHead.subjectNo}</div>
				</Flex>
				<Flex>
				  <div className="text_left flex1">书名:</div>
				  <div className="text_right flex2 colorBlack">{orderHead.bookName}</div>
				</Flex>
				<Flex>
				  <div className="text_left flex1">征订期:</div>
				  <div className="text_right flex1 colorBlack">{orderHead.season}</div>
				</Flex>
				<Flex>
				  <div className="text_left flex1">征订代码:</div>
				  <div className="text_right flex1 colorBlack">{orderHead.subCode}</div>
				</Flex>
				<Flex>
				  <div className="text_left flex1">商品编号:</div>
				  <div className="text_right flex1 colorBlack">{orderHead.bookCode}</div>
				</Flex>
				<Flex>
				  <div className="text_left flex1">ISBN:</div>
				  <div className="text_right flex1 colorBlack">{orderHead.isbn}</div>
				</Flex>
				<Flex>
				  <div className="text_left flex1">版印次:</div>
				  <div className="text_right flex1 colorBlack">{orderHead.editionPrintTimes}</div>
				</Flex>
				<Flex>
				  <div className="text_left flex1">本次总印数:</div>
				  <div className="text_right flex1 colorBlack">{orderHead.printMenge}</div>
				</Flex>
				<Flex>
				  <div className="text_left flex1">累计印次:</div>
				  <div className="text_right flex1 colorBlack">{orderHead.printMengeSum}</div>
				</Flex>
				<Flex>
				  <div className="text_left flex1">单位印张:</div>
				  <div className="text_right flex1 colorBlack">{orderHead.unitSheet}</div>
				</Flex>
				<Flex>
				  <div className="text_left flex1">开本:</div>
				  <div className="text_right flex1 colorBlack">{orderHead.bookSize}</div>
				</Flex>
				<Flex>
				  <div className="text_left flex1">成品尺寸:</div>
				  <div className="text_right flex1 colorBlack">{orderHead.bookSizeSpec}</div>
				</Flex>
				<Flex>
				  <div className="text_left flex1">单价:</div>
				  <div className="text_right flex1 colorBlack">{orderHead.price}</div>
				</Flex>
				<Flex>
				  <div className="text_left flex1">出版社:</div>
				  <div className="text_right flex1 colorBlack">{orderHead.press}</div>
				</Flex>
				<Flex>
				  <div className="text_left flex1">装订方式:</div>
				  <div className="text_right flex1 colorBlack">{orderHead.bindStyle}</div>
				</Flex>
				<Flex>
				  <div className="text_left flex1">要求送书日期:</div>
				  <div className="text_right flex1 colorBlack">{orderHead.requireSendDate}</div>
				</Flex>
				<Flex>
				  <div className="text_left flex1">封面工艺:</div>
				  <div className="text_right flex1 colorBlack">{orderHead.coverCraft}</div>
				</Flex>
				<Flex>
				  <div className="text_left flex1">印厂印次:</div>
				  <div className="text_right flex1 colorBlack">{orderHead.printeryPrintTimes}</div>
				</Flex>
				<Flex>
				  <div className="text_left flex1">供应商发纸日期:</div>
				  <div className="text_right flex1 colorBlack">{orderHead.supplierSendPaperDate}</div>
				</Flex>
				<Flex>
				  <div className="text_left flex1">送书地点1:</div>
				  <div className="text_right flex1 colorBlack">{orderHead.sendAddr1}</div>
				</Flex>
				<Flex>
				  <div className="text_left flex1">送书数量1:</div>
				  <div className="text_right flex1 colorBlack">{orderHead.sendMenge1}</div>
				</Flex>
				<Flex>
				  <div className="text_left flex1">送书地点2:</div>
				  <div className="text_right flex1 colorBlack">{orderHead.sendAddr2}</div>
				</Flex>
				<Flex>
				  <div className="text_left flex1">送书数量2:</div>
				  <div className="text_right flex1 colorBlack">{orderHead.sendMenge2}</div>
				</Flex>
				<Flex>
				  <div className="text_left flex1">送书地点3:</div>
				  <div className="text_right flex1 colorBlack">{orderHead.sendAddr3}</div>
				</Flex>
				<Flex>
				  <div className="text_left flex1">送书数量3:</div>
				  <div className="text_right flex1 colorBlack">{orderHead.sendMenge3}</div>
				</Flex>
				<Flex>
				  <div className="text_left flex1">送书地点4:</div>
				  <div className="text_right flex1 colorBlack">{orderHead.sendAddr4}</div>
				</Flex>
				<Flex>
				  <div className="text_left flex1">送书数量4:</div>
				  <div className="text_right flex1 colorBlack">{orderHead.sendMenge4}</div>
				</Flex>
				<Flex>
				  <div className="text_left flex1">送书地点5:</div>
				  <div className="text_right flex1 colorBlack">{orderHead.sendAddr5}</div>
				</Flex>
				<Flex>
				  <div className="text_left flex1">送书数量5:</div>
				  <div className="text_right flex1 colorBlack">{orderHead.sendMenge5}</div>
				</Flex>
				<Flex>
				  <div className="text_left flex1">印厂接收确认:</div>
				  <div className="text_right flex1 colorBlack">{orderHead.printeryIsConfirm}</div>
				</Flex>
				<Flex>
				  <div className="text_left flex1">印厂接收确认时间:</div>
				  <div className="text_right flex1 colorBlack">{orderHead.printeryReceiveDate}</div>
				</Flex>
				<Flex>
				  <div className="text_left flex1">印厂接收确认人:</div>
				  <div className="text_right flex1 colorBlack">{orderHead.printeryReceiveOp}</div>
				</Flex>

			</div>
		)
	}
}