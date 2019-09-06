import React from 'react';
import { Flex, WhiteSpace,WingBlank,SearchBar } from 'antd-mobile';
import '../common.css';

export default class PrinteryProcessDetails extends React.Component {
	constructor(props) {
		super(props);
		this.state ={}
	}
	render(){
		const item = this.props.location.item;
		return(
			<div>
				<section className="section" hidden={item.isOpen==='0' }>
					<Flex>
						<div className="font15 colorBlack flex1"> 
							开机
						</div>
						<div className="flex3">
							<div>{item.openTime}</div>
							<div>{item.openRemark}</div>
						</div>
					</Flex>
				</section>
				<section className="section" hidden={item.isBind==='0' }>
					<Flex>
						<div className="font15 colorBlack flex1"> 
							装订
						</div>
						<div className="flex3">
							<div>{item.bindTime}</div>
							<div>{item.bindRemark}</div>
						</div>
					</Flex>
				</section>
				<section className="section" hidden={item.isQuality==='0' }>
					<Flex>
						<div className="font15 colorBlack flex1"> 
							质检
						</div>
						<div className="flex3">
							<div>{item.qualityTime}</div>
							<div>{item.qualityRemark}</div>
						</div>
					</Flex>
				</section>
				<section className="section" hidden={item.isStartSend==='0' }>
					<Flex>
						<div className="font15 colorBlack flex1"> 
							开始送货
						</div>
						<div className="flex3">
							<div>{item.startSendTime}</div>
							<div>{item.startSendRemark}</div>
						</div>
					</Flex>
				</section>
				<section className="section" hidden={item.isFinishSend==='0' }>
					<Flex>
						<div className="font15 colorBlack flex1"> 
							结束送货
						</div>
						<div className="flex3">
							<div>{item.finishSendTime}</div>
							<div>{item.finishSendRemark}</div>
						</div>
					</Flex>
				</section>
			</div>
		)
	}
	
}