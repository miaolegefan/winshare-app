import React from 'react';
import {Link} from 'react-router-dom';
import './preOrder.css'

import '../common.css';
import moment from 'moment'
import { Flex, WhiteSpace,WingBlank,SearchBar,NavBar, Icon} from 'antd-mobile';
import axios from "axios";
import {createHashHistory} from 'history'  //返回上一页这段代码
const history = createHashHistory();//返回上一页这段代码
//数据查询
function query(_this) {
	axios.post('/api/public/moblie-preOrder/query?userId='+sessionStorage.userId,{}).then(function(response){
		if(response.data.success){
			_this.setState({
				preOrder : response.data.rows,
				search:response.data.rows
			});
		}
	})

}

function queryPermission(_this) {//人员角色查询

	const codes =[{
		code: "pre-order-dataset.printery",
		resourceType: "site"
	},{
		code: "pre-order-dataset.materials",
		resourceType: "site"
	},{
		code: "pre-order-dataset.print-center",
		resourceType: "site"
	}];

	axios.post('/api/public/checkPermission/query?userId=10021&roleId=101',codes).then(function(response){
		if(response.data.success){
			const res =response.data.rows;
			for(var i=0;i<res.length;i++){
				switch (res[i].code) {
					case 'pre-order-dataset.printery':
						result.printery=res[i].approve
					case 'pre-order-dataset.materials':
						result.materials=res[i].approve
					case 'pre-order-dataset.print-center':
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
	materials:false,
	print_center: false
};
export default class PreOrder extends React.Component{
	constructor(props) {
		super(props);
		this.state = {
			search:[],
			preOrder : [],
		}
	}
	componentDidMount(){
		query(this);
		queryPermission(this);
	}

	//查询事件
	onSearch = (val) => {
		const value = search(this.state.search,val);
		this.setState({
			preOrder: value
		});

	}

	//返回按钮
    comeback=()=>{
        history.goBack();  //返回上一页这段代码
    }

	render(){
		const preOrderList=this.state.preOrder.map((preOrderItem, index) => (


		    <Link to={{pathname:'/preOrder/details',item:preOrderItem,rolePermission:result}} key={index}>
		       <section className='section' >
				   <div>
						<Flex>
						  <div className="font07 text_left flex1">{preOrderItem.season}</div>
						  <div className="font07 text_right flex1">{preOrderItem.preOrderNo}</div>
						</Flex>
						<Flex style={{color:'#000000'}}><strong>{preOrderItem.bookName}</strong></Flex>
						<WhiteSpace/>
						<Flex className="font07"  >
							<div className="text_left ">印厂确认时间:</div>
							<div className="text_left margin-left">{moment(preOrderItem.printeryConfirmDate).format('YYYY-MM-DD')}</div>
						</Flex>
						<Flex className="font07">
						  <div className="text_left ">物资公司确认时间:</div>
						  <div className="text_left margin-left">{moment(preOrderItem.materialsConfirmDate).format('YYYY-MM-DD')}</div>
						</Flex>
					</div>
		        </section>
		    </Link>));


		return(
		<div>
            <NavBar mode="light" icon={<Icon type="left" />} onLeftClick={this.comeback}>
                <SearchBar style={{width:"100%"}}
                           placeholder="Search"
                           showCancelButton={true}
                           onChange={this.onSearch}/>
            </NavBar>
			{preOrderList }
		</div>
		);
	}
}