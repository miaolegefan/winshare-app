import React from 'react';
import {Flex, SearchBar,NavBar, Icon} from 'antd-mobile';
import '../common.css';
import {Link} from 'react-router-dom';
import moment from 'moment'
import axios from "axios";
import creatHistory from 'history/createHashHistory'  //返回上一页这段代码
const history = creatHistory();//返回上一页这段代码

//数据查询
function query(_this) {
	axios.post('/api/public/moblie-printeryProcess/query?userId=10021',{}).then(function(response){
		if(response.data.success){
			_this.setState({
				printeryProcess : response.data.rows,
				search:response.data.rows
			});
		}
	})

}
function search(arr, q) {
	return arr.filter(v => Object.values(v).some(v => new RegExp(q + '').test(v)));
}
export default class PrinteryProcess extends React.Component{
	constructor(props){
		super(props);
		this.state = {
			printeryProcess: [],
			search: []
		}
	}


	componentDidMount(){
		query(this);
	}

	//查询事件
	onSearch = (val) => {
		const value = search(this.state.search,val);
		this.setState({
			printeryProcess: value
		});

	}

    //返回按钮
    comeback=()=>{
        history.goBack();  //返回上一页这段代码
    }

	render(){
		const printeryProcessList = this.state.printeryProcess.map((item,index) => (
			<Link to={{pathname:'/printeryProcess/details/'+item.orderNo,item:item}} key={index}>
				<section className="section">
					<Flex>
						<div className="font07 text_left flex1">{item.season}-{item.subCode}</div>
						<div className="font07 text_right flex1" >{item.orderNo}</div>
					</Flex>
					<Flex>
						<div className="text_left flex2 colorBlack"><strong>{item.bookName}</strong></div>
						<div className="font07 text_right flex1" >{item.produceStatus===null?"未开机":item.produceStatus}</div>
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
			<div>
                <NavBar mode="light" icon={<Icon type="left" />} onLeftClick={this.comeback}>
                    <SearchBar style={{width:"100%"}}
                               placeholder="Search"
                               showCancelButton={true}
                               onChange={this.onSearch}/>
                </NavBar>
				{printeryProcessList}</div>
		)
		
	}
}
