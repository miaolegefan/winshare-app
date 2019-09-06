import React from 'react';
import {Flex} from 'antd-mobile';
import '../common.css';
import {Link} from 'react-router-dom';
import moment from 'moment'

export default class PrinteryProcess extends React.Component{
	constructor(props){
		super(props);
		this.state = {
			printeryProcess:[
				{
					"_token": "cf608ead0e5a94699fcb2104f16ae0d2","objectVersionNumber": 1,
					"id": 2,"orderNo": "12102","printeryCode": "0004286","printMenge": null,
					"openTime": "2019-08-02 00:00:00","openAttPic": null,"openAttVideo": null,"openRemark": "开机备注",
					"bindTime": "2019-08-02 00:00:00","bindAttPic": null,"bindAttVideo": null,"bindRemark": "装订备注",
					"qualityTime": "2019-08-02 00:00:00","qualityAttPic": null,"qualityAttVideo": null,"qualityRemark": "质检备注",
					"startSendTime": "2019-08-02 00:00:00","startSendAttPic": null,"startSendAttVideo": null,"startSendRemark": null,
					"finishSendTime": "2019-08-02 00:00:00","finishSendAttPic": null,"finishSendAttVideo": null,"finishSendRemark": null,
					"sheet": null,
					"printeryName": "四川出版印刷公司","checkDate": "2019-08-02 00:00:00","sampleMenge": null,
					"isOpen": "n","price": null,
					"produceStatus": "待开机",
					"isBind": "y",
					"isQuality": "y",
					"isStartSend": "y",
					"isFinishSend": "y",
					"isbn": "11-1-1",
					"season": "17CJ00",
					"subCode": "1",
					"bookCode": "1",
					"bookName": "普通书籍",
					"orderMaker": "管理员",
					"subjectNo": "1",
					"bookSize": "1",
					"orderDate": "2019-08-01 10:57:50",
					"requestSendDate": "2019-08-27 14:49:55",
					"printeryIsConfirm": "1",
					"newRequestSendDate": null,
					"isUploadAtt": null,
					"isProvideOneself": null,
					"inputCondition": null,
					"checkStartDate": null,
					"checkDeadline": null
				},
				{
					"_token": "cf608ead0e5a94699fcb2104f16ae0d2","objectVersionNumber": 1,
					"id": 2,"orderNo": "12102","printeryCode": "0004286","printMenge": null,
					"openTime": "2019-08-02 00:00:00","openAttPic": null,"openAttVideo": null,"openRemark": null,
					"bindTime":null,"bindAttPic": null,"bindAttVideo": null,"bindRemark": null,
					"qualityTime":null,"qualityAttPic": null,"qualityAttVideo": null,"qualityRemark": null,
					"startSendTime": "2019-08-02 00:00:00","startSendAttPic": null,"startSendAttVideo": null,"startSendRemark": null,
					"finishSendTime": "2019-08-02 00:00:00","finishSendAttPic": null,"finishSendAttVideo": null,"finishSendRemark": null,
					"sheet": null,
					"printeryName": "四川出版印刷公司","checkDate": "2019-08-02 00:00:00","sampleMenge": null,
					"isOpen": "y","price": null,
					"produceStatus": "待开机","isBind": "0",
					"isQuality": "0",
					"isStartSend": "0",
					"isFinishSend": "0",
					"isbn": "11-1-1",
					"season": "17CJ00",
					"subCode": "1",
					"bookCode": "1",
					"bookName": "普通书籍",
					"orderMaker": "管理员",
					"subjectNo": "1",
					"bookSize": "1",
					"orderDate": "2019-08-01 10:57:50",
					"requestSendDate": "2019-08-27 14:49:55",
					"printeryIsConfirm": "1",
					"newRequestSendDate": null,
					"isUploadAtt": null,
					"isProvideOneself": null,
					"inputCondition": null,
					"checkStartDate": null,
					"checkDeadline": null
				}
			],
		}
	}
	render(){
		const printeryProcessList = this.state.printeryProcess.map((item,index) => (
			<Link to={{pathname:'/printeryProcess/details',item:item}} key={index}>
				<section className="section">
					<Flex>
						<div className="font07 text_left flex1">{item.season}-{item.subCode}</div>
						<div className="font07 text_right flex1" >{item.orderNo}</div>
					</Flex>
					<Flex>
						<div className="text_left flex1 colorBlack"><strong>{item.bookName}</strong></div>
						<div className="font07 text_right flex1" >{item.produceStatus}</div>
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
								<div className="text_right flex4">开机日期:</div>
								<div className="text_left flex3 margin-left">{item.openTime?moment(item.openTime).format('YYYY-MM-DD'):item.openTime}</div>
							</Flex>
						</div>
					</Flex>
					<Flex>
						<div className="font07 text_left flex1">
							<Flex>
								<div className="text_left">装订日期:</div>
								<div className="text_left margin-left">{item.bindTime?moment(item.bindTime).format('YYYY-MM-DD'):item.bindTime}</div>
							</Flex>
						</div>
						<div className="font07 text_right flex1" >
							<Flex>
								<div className="text_right flex4">质检日期:</div>
								<div className="text_left flex3 margin-left">{item.qualityTime ? moment(item.qualityTime).format('YYYY-MM-DD'):item.qualityTime}</div>
							</Flex>
						</div>
					</Flex>
					<Flex>
						<div className="font07 text_left flex1">
							<Flex>
								<div className="text_left">开始送货日期:</div>
								<div className="text_left margin-left">{item.startSendTime?moment(item.startSendTime).format('YYYY-MM-DD'):item.startSendTime}</div>
							</Flex>
						</div>
						<div className="font07 text_right flex1" >
							<Flex>
								<div className="text_right flex4">完成送货日期:</div>
								<div className="text_left flex3 margin-left">{item.finishSendTime?moment(item.finishSendTime).format('YYYY-MM-DD'):item.finishSendTime}</div>
							</Flex>
						</div>
					</Flex>
				</section>
			</Link>
		));
		return(
			<div> {printeryProcessList}</div>
		)
		
	}
}
