import React from 'react';
import '../common.css';
import { Flex, WhiteSpace,WingBlank,SearchBar,NavBar, Icon,PullToRefresh } from 'antd-mobile';
import {Link} from 'react-router-dom';
import moment from 'moment'
import axios from "axios";
import {createHashHistory} from 'history'  //返回上一页这段代码
const history = createHashHistory();//返回上一页这段代码

function query(_this) {//数据查询
	axios.post('/api/public/moblie-order/query?userId='+sessionStorage.userId+'&roleId='+sessionStorage.roleId+
		'&page='+_this.state.page+''+'&pageSize='+_this.state.pageSize,{
		printeryCode:sessionStorage.printeryCode,
        fuzzy:_this.state.fuzzy,//查询字段
	}).then(function(response){
		if(response.data.success){
			let order = _this.state.order;
            response.data.rows.map((item)=>{order.push(item)});
			_this.setState({
				order : order,
                total:response.data.total,
			});
		}
	})
}

function search(arr, q) {
	return arr.filter(v => Object.values(v).some(v => new RegExp(q + '').test(v)));
}

export default class Order extends React.Component{
	constructor(props) {
		super(props);
		this.state={
			page:1,
			pageSize:10,
            total:0,
			order:[],
            fuzzy:'',//查询
            refreshing: false,//是否显示刷新状态
            down: true,
            height: document.documentElement.clientHeight-100,

        };
    }

	componentDidMount() {

		if(this.props.location.orderState){
			this.setState(this.props.location.orderState);
		}else{
			query(this);
        }

	}
	//查询onchang事件
    searchBarOnChange = (val) =>{
        this.setState({
			fuzzy: val
		});
	}

	//查询事件
	onSearch = () => {
		//前端查询
		// const value = search(this.state.search,val);
		// this.setState({
		// 	order: value
		// });
		//按条件进行查询，页码从第一页开始
		this.setState({
            page:1,
            pageSize:10,
            order:[],
		})
        setTimeout(() => {
            query(this);
        },2)
	}

    //查询取消事件
    onCancel =()=>{
        this.setState({
            fuzzy: "",
            page:1,
            pageSize:10,
            order:[],
        });
        setTimeout(() => {
            query(this);
        },2)
    }

    //返回按钮
    comeback=()=>{
        history.goBack();  //返回上一页这段代码
        // 返回主页面
        // this.props.history.push('/home')
    }
    //加载更多 上划加载
    onRefresh=(_this)=>{
		let total = _this.state.total;
		let page = _this.state.page;
		let pageSiza = _this.state.pageSize;
        //判断是否都加载完了
		if(total<page*pageSiza){
			return ;
		}else{
            _this.setState({
				refreshing: true,
				page:page+1,
            });
            setTimeout(() => {
                query(_this);
                _this.setState({ refreshing: false });
            }, 1000);
		}
	}
	render(){
		const orderList = this.state.order.map((item,index) =>(
			<Link to={{pathname:'/order/details',item:item,orderState:this.state}} key={index}>
				<section className="section">
					<Flex>
						<div className="font07 text_left flex1">{item.season}-{item.subCode}</div>
						<div className="font07 text_right flex1" >{item.orderNo}</div>
					</Flex>
					<Flex>
						<div className="text_left flex3 colorBlack"><strong>{item.bookName}</strong></div>
						<div className="font07 text_right flex2" >{item.auditDate?moment(item.auditDate).format('YYYY-MM-DD'):item.auditDate}</div>
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
						   value={this.state.fuzzy}
                           showCancelButton={true}
						   onChange={this.searchBarOnChange}
                           onCancel={this.onCancel}
                           onSubmit={this.onSearch}/>
            </NavBar>

			<PullToRefresh
				damping={100}
				ref={el => this.ptr = el}
				style={{
					height: this.state.height,
					overflow: 'auto',
				}}
				indicator={this.state.down ? {} : { deactivate: '上拉可以刷新' }}
				direction={'up'}//上划刷新 down
				refreshing={this.state.refreshing} //是否显示刷新状态
				onRefresh={() => {this.onRefresh(this)}}
			>
				{orderList}
			</PullToRefresh>

			<WhiteSpace style={{}}/>
		</div>
		)
	}
} 