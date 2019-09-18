import React from 'react';
import '../common.css';
import { Flex, WhiteSpace,WingBlank,SearchBar,NavBar, Icon } from 'antd-mobile';
import {Link} from 'react-router-dom';
import moment from 'moment'
import axios from "axios";
import {createHashHistory} from 'history'  //返回上一页这段代码
const history = createHashHistory();//返回上一页这段代码

function query(_this) {//数据查询
	axios.post('/api/public/moblie-order/query?userId='+sessionStorage.userId,{}).then(function(response){
		if(response.data.success){
			_this.setState({
				order : response.data.rows,
				search:response.data.rows
			});
		}
	})
}


function queryPermission(_this) {//人员角色查询

	const codes =[{
		code: "order-dataset.printery",
		resourceType: "site"
	},{
		code: "order-dataset.print-center",
		resourceType: "site"
	}];

	axios.post('/api/public/checkPermission/query?userId='+sessionStorage.userId+'&roleId='+sessionStorage.roleId,codes).then(function(response){
		if(response.data.success){
			const res =response.data.rows;
			for(var i=0;i<res.length;i++){
				switch (res[i].code) {
					case 'order-dataset.printery':
						result.printery=res[i].approve
					case 'order-dataset.print-center':
						result.print_center=res[i].approve
				}
			}

		}
	})
}

function search(arr, q) {
	return arr.filter(v => Object.values(v).some(v => new RegExp(q + '').test(v)));
}

var result = {
	printery:false,
	print_center: false
};

export default class Order extends React.Component{
	constructor(props) {
		super(props);
		this.state={
			order:[],
			search:[],
		}
	}

	componentDidMount() {
		query(this);
		queryPermission(this);
	}


	//查询事件
	onSearch = (val) => {
		const value = search(this.state.search,val);
		this.setState({
			order: value
		});
	}

    //返回按钮
    comeback=()=>{
        history.goBack();  //返回上一页这段代码
    }
	render(){
		const orderList = this.state.order.map((item,index) =>(
			<Link to={{pathname:'/order/details',item:item,rolePermission:result}} key={index}>
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
            <NavBar mode="light" icon={<Icon type="left" />} onLeftClick={this.comeback}>
                <SearchBar style={{width:"100%"}}
                           placeholder="Search"
                           showCancelButton={true}
                           onChange={this.onSearch}/>
            </NavBar>
			{orderList}
		</div>
		)
	}
} 