import React from 'react';
import { Flex,NavBar,Icon } from 'antd-mobile';
import {Link} from 'react-router-dom';
import '../common.css';
import './printeryProcess.css'
import axios from "axios/index";
import {createHashHistory} from 'history'  //返回上一页这段代码
const history = createHashHistory();//返回上一页这段代码


//数据查询
function query(_this,orderNo) {
    axios.post('/api/public/moblie-printeryProcess/query?userId='+sessionStorage.userId,{orderNo:orderNo}).then(function(response){
        if(response.data.success){

        	if(response.data.rows.length > 0){
				_this.setState({
					item : response.data.rows[0],
				});
			}

        }
    })

}

export default class PrinteryProcessDetails extends React.Component {
	constructor(props) {
		super(props);
		this.state ={
            item:{}
		}
	}

    componentDidMount(){
        const orderNo = this.props.match.params.orderNo;
        query(this,orderNo);
    }
    //返回按钮
    comeback=()=>{
        history.goBack();  //返回上一页这段代码
    }

	render(){
		const item = this.state.item;
		return(
			<div>

                <NavBar mode="light" icon={<Icon type="left" />}
                        onLeftClick={this.comeback}>
                </NavBar>
				<section className="section" hidden={item.isOpen===undefined || item.isOpen==='0' }>
                    <Link to={{pathname:'/printeryProcess/details/en/enclosure',time:item.openTime,remark:item.openRemark,}}>

						<Flex>
							<div className="font15 colorBlack flex1">
								开机
							</div>
							<div className="flex3 ">
								<div>{item.openTime}</div>
								<div>{item.openRemark}</div>
							</div>
						</Flex>
					</Link>
				</section>

				<section className="section" hidden={item.isBind===undefined || item.isBind==='0' }>
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
				<section className="section" hidden={item.isQuality===undefined || item.isQuality==='0' }>
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
				<section className="section" hidden={item.isStartSend===undefined || item.isStartSend==='0' }>
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
				<section className="section" hidden={item.isFinishSend===undefined || item.isFinishSend==='0' }>
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