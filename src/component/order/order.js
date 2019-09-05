import React from 'react';
import './order.css';
import { Flex, WhiteSpace,WingBlank,SearchBar } from 'antd-mobile';
import {Link} from 'react-router-dom';
import moment from 'moment'

export default class Order extends React.Component{
	constructor(props) {
		super(props);
		this.state={
			order:[
				{"_token":"250e89f41e7ab8723d780d9b5f1a5457","objectVersionNumber":1,"id":82,"season":"17QJ00",
				"fuzzy":null,"orderNo":"W420190022","noticeNo":"17QJW420190022","subjectNo":"E198296",
				"editionPrintTimes":"01-0101","bookName":"U义务教育教科书道德与法治1上","press":"人民教育出版社",
				"coopForm":null,"businessType":null,"orderDate":null,"wagesSum":null,"printeryPrintTimes":"1",
				"orderMaker":"吴鹏程","printeryIsConfirm":"0","receiveStatus":null,"appointStatus":null,
				"orderCategory":null,"startTime":null,"endTime":null,"bookSizeSpec":null,"perform":"租型1-1",
				"pressCode":null,"subCode":"00020025","unitSheet":5.0,"supplierSendPaperDate":null,
				"coopFormCode":null,"noticeDate":"2019-04-01 00:00:00","bookCode":"102637070",
				"printMenge":1021.0,"printMengeSum":1.0,"bookSize":"16","businessTypeCode":null,
				"printeryName":null,"isbn":null,"printeryReceiveDate":null,"printeryReceiveOp":null,
				"auditor":"系统管理员","requireSendDate":null,"sendAddr1":null,"sendAddr2":null,"sendAddr3":null,
				"sendAddr4":null,"sendAddr5":null,"sampleMenge":0.0,"bindStyle":"胶订","coverCraft":null,
				"price":null,"costState":null,"printeryCode":null,"auditMark":null,"sendMenge1":null,
				"sendMenge2":null,"sendMenge3":null,"sendMenge4":null,"sendMenge5":null,"createName":null,
				"inv":null,"remark":null,"appointMenge":null,"items":null,"costs":null,"lovCondition":null,
				"virtuals":null,"details":null,"auditDate":"2019-04-01 00:00:00"},
				{"_token":"fac11cfb08e87fe160edc62c60f29325","objectVersionNumber":14,"id":1,"season":"17CJ00",
				"fuzzy":null,"orderNo":"12102","noticeNo":"17CJ12102","subjectNo":"1",
				"editionPrintTimes":"11","bookName":"普通书籍","press":"11",
				"coopForm":"1","businessType":"1","orderDate":"2019-08-01 10:57:50","wagesSum":3.68,"printeryPrintTimes":"111",
				"orderMaker":"管理员","printeryIsConfirm":"1","receiveStatus":"1","appointStatus":"11",
				"orderCategory":null,"startTime":null,"endTime":null,"bookSizeSpec":"11","perform":"11",
				"pressCode":"1","subCode":"1","unitSheet":11.0,"supplierSendPaperDate":null,
				"coopFormCode":"1","noticeDate":"2019-08-12 05:20:36","bookCode":"1",
				"printMenge":1.0,"printMengeSum":1.0,"bookSize":"1","businessTypeCode":"11",
				"printeryName":"B印厂","isbn":"1","printeryReceiveDate":"2019-08-15 12:44:52","printeryReceiveOp":"辰东",
				"auditor":"1","requireSendDate":"2019-08-27 14:49:55","sendAddr1":"222","sendAddr2":"122","sendAddr3":"122",
				"sendAddr4":"122","sendAddr5":"122","sampleMenge":1.0,"bindStyle":"1","coverCraft":"1",
				"price":1.0,"costState":"2","printeryCode":null,"auditMark":"1","sendMenge1":12.0,
				"sendMenge2":122.0,"sendMenge3":122.0,"sendMenge4":1122.0,"sendMenge5":122.0,"createName":null,
				"inv":"1","remark":null,"appointMenge":null,"items":null,"costs":null,"lovCondition":null,
				"virtuals":null,"details":null,"auditDate":"2019-04-01 00:00:00"},
			],
		}
	}
	render(){
		const orderList = this.state.order.map((item,index) =>(
			<Link to={{pathname:'/order/details',item:item}} key={index}>
				<section className="section">
					<Flex>
						<div className="font07 text_left flex1">{item.season}-{item.subCode}</div>
						<div className="font07 text_right flex1" >{item.orderNo}</div>
					</Flex>
					<Flex>
						<div className="text_left flex3 colorBlack"><strong>{item.bookName}</strong></div>
						<div className="font07 text_right flex2" >{moment(item.auditDate).format('YYYY-MM-DD')}</div>
					</Flex>
					<Flex>
						<div className="font07 text_left flex1">
							<Flex>
								<div className="text_left ">印厂:</div>
								<div className="text_left margin-left">{item.printeryName}</div>
							</Flex>
						</div>
						<div className="font07 text_right flex1" >
							<Flex>
								<div className="text_right flex3">制单人:</div>
								<div className="text_left flex1 margin-left">{item.orderMaker}</div>
							</Flex>
						</div>
					</Flex>
					<Flex>
						<div className="font07 text_left flex1">
							<Flex>
								<div className="text_left ">印数:</div>
								<div className="text_left margin-left">{item.printMenge}</div>
							</Flex>
						</div>
						<div className="font07 text_right flex1" >
							<Flex>
								<div className="text_right flex3">印厂印次:</div>
								<div className="text_left flex1 margin-left">{item.printeryPrintTimes}</div>
							</Flex>
						</div>
					</Flex>
					<Flex>
						<div className="font07 text_left flex1">
							<Flex>
								<div className="text_left ">印厂是否确认:</div>
								<div className="text_left margin-left">{item.printeryIsConfirm}</div>
							</Flex>
						</div>
						<div className="font07 text_right flex1" >
							<Flex>
								<div className="text_right flex3">收货状态:</div>
								<div className="text_left flex1 margin-left">{item.receiveStatus}</div>
							</Flex>
						</div>
					</Flex>
				</section>
			</Link>
			)	
		)
		return(
		<div>
			{orderList}
		</div>
		)
	}
} 