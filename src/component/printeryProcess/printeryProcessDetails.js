import React from 'react';
import { Flex,NavBar,Icon,WingBlank,Button, Toast} from 'antd-mobile';
import {Link} from 'react-router-dom';
import '../common.css';
import './printeryProcess.css'
import axios from "axios/index";
import {createHashHistory} from 'history'  //返回上一页这段代码
const history = createHashHistory();//返回上一页这段代码

function add(_this) {

	if('0'==_this.state.item.produceStatus) {
        //新增按钮增加逻辑判断
        axios.get('/api/public/moblie-printeryProcess/isAdd?orderNo=' + _this.state.item.orderNo + '&produceStatus=' + _this.state.item.produceStatus)
			.then(function (response) {
				if(response.data.success){
                    const item =_this.state;
                    _this.props.history.push('/add',item)
				}else{
                    Toast.info(response.data.message);
				}
            })

    }else{
		const item =_this.state;
		_this.props.history.push('/add',item)
    }
}
//数据查询
function query(_this,orderNo) {
    axios.post('/api/public/moblie-printeryProcess/query?userId='+sessionStorage.userId+'&roleId='+sessionStorage.roleId+
        '&page='+1+''+'&pageSize='+10,{
    	orderNo:orderNo}).then(function(response){
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
            printeryProcessState:this.props.location.printeryProcessState?this.props.location.printeryProcessState:'',
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
        this.props.history.push({pathname:'/printeryProcess',printeryProcessState:this.state.printeryProcessState});//带父页面参数返回
    }

	render(){
		const item = this.state.item;
		const _this = this;
        const status = [
            {
                value: '0',
                meaning: '开机',
            }, {
                value: '1',
                meaning: '装订',
            }, {
                value: '2',
                meaning: '质检',
            }, {
                value: '3',
                meaning: '开始送货',
            }, {
                value: '4',
                meaning: '完成送货',
            }, {
                value: '5',
                meaning: '',
            },
        ];
		return(
			<div>

                <NavBar mode="light" icon={<Icon type="left" />}
                        onLeftClick={this.comeback}>
                </NavBar>
				<section className="section" hidden={item.isOpen===null || item.isOpen==='0' }>
                    <Link to={{pathname:'/printeryProcess/details/en/enclosure',time:item.openTime,remark:item.openRemark,
						imagePath:item.openAttPic,filePath:item.openAttVideo,address:item.openAttAddress}}>

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

				<section className="section" hidden={item.isBind===null || item.isBind==='0' }>
                    <Link to={{pathname:'/printeryProcess/details/en/enclosure',time:item.bindTime,remark:item.bindRemark,
						imagePath:item.bindAttPic,filePath:item.bindAttVideo,address:item.bindAttAddress}}>

						<Flex>
							<div className="font15 colorBlack flex1">
								装订
							</div>
							<div className="flex3">
								<div>{item.bindTime}</div>
								<div>{item.bindRemark}</div>
							</div>
						</Flex>
					</Link>
				</section>
				<section className="section" hidden={item.isQuality===null || item.isQuality==='0' }>
                    <Link to={{pathname:'/printeryProcess/details/en/enclosure',time:item.qualityTime,remark:item.qualityRemark,
						imagePath:item.qualityAttPic,filePath:item.qualityAttVideo,address:item.qualityAttAddress}}>
						<Flex>
							<div className="font15 colorBlack flex1">
								质检
							</div>
							<div className="flex3">
								<div>{item.qualityTime}</div>
								<div>{item.qualityRemark}</div>
							</div>
						</Flex>
					</Link>
				</section>
				<section className="section" hidden={item.isStartSend===null || item.isStartSend==='0' }>
                    <Link to={{pathname:'/printeryProcess/details/en/enclosure',time:item.startSendTime,remark:item.startSendRemark,
						imagePath:item.startSendAttPic,filePath:item.startSendAttVideo,address:item.startSendAttAddress}}>
						<Flex>
							<div className="font15 colorBlack flex1">
								开始送货
							</div>
							<div className="flex3">
								<div>{item.startSendTime}</div>
								<div>{item.startSendRemark}</div>
							</div>
						</Flex>
					</Link>
				</section>
				<section className="section" hidden={item.isFinishSend===null || item.isFinishSend==='0' }>
                    <Link to={{pathname:'/printeryProcess/details/en/enclosure',time:item.finishSendTime,remark:item.finishSendRemark,
						imagePath:item.finishSendAttPic,filePath:item.finishSendAttVideo,address:item.finishSendAttAddress}}>
                        <Flex>
							<div className="font15 colorBlack flex1">
								结束送货
							</div>
							<div className="flex3">
								<div>{item.finishSendTime}</div>
								<div>{item.finishSendRemark}</div>
							</div>
						</Flex>
					</Link>
				</section>



                <div style={{position: 'absolute', bottom: '2%', left: 0, right: 0 }} hidden={item.produceStatus==='5' }>
                    <WingBlank size="md">
                        <Button  type="ghost" onClick={()=>add(_this)}   style={{color: '#108ee9', 'backgroundColor': 'white', 'borderRadius': '5px', border: '1px solid #108ee9'}}  >
							 {"增加"+(item.produceStatus?status[item.produceStatus].meaning:'')+"进度"}
						</Button>
                    </WingBlank>
                </div>
			</div>
		)
	}
	
}