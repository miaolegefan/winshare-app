import React from 'react';
import {Link} from 'react-router-dom';
import './preOrder.css'

import '../common.css';
import moment from 'moment'
import { Flex, WhiteSpace,WingBlank,SearchBar,NavBar, Icon,PullToRefresh} from 'antd-mobile';
import axios from "axios";
import {createHashHistory} from 'history'  //返回上一页这段代码
const history = createHashHistory();//返回上一页这段代码

//数据查询
function query(_this) {
	axios.post('/api/public/moblie-preOrder/query?userId='+sessionStorage.userId+'&roleId='+sessionStorage.roleId+
        '&page='+_this.state.page+''+'&pageSize='+_this.state.pageSize,{
        printeryCode:sessionStorage.printeryCode,
        fuzzy:_this.state.fuzzy,//查询字段
	}).then(function(response){
		if(response.data.success){
            let preOrder = _this.state.preOrder;
            response.data.rows.map((item)=>{preOrder.push(item)});
			_this.setState({
				preOrder : preOrder,
                total:response.data.total,
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

	axios.post('/api/public/checkPermission/query?userId='+sessionStorage.userId+'&roleId='+sessionStorage.roleId,codes).then(function(response){
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


var result = {
	printery:false,
	materials:false,
	print_center: false
};
export default class PreOrder extends React.Component{
	constructor(props) {
		super(props);
		this.state = {
            page:1,
            pageSize:10,
            total:0,
            fuzzy:'',//查询
            refreshing: false,//是否显示刷新状态
            down: true,
            height: document.documentElement.clientHeight-100,
			preOrder : [],
		}
	}
	componentDidMount(){
        if(this.props.location.preOrderState){
            this.setState(this.props.location.preOrderState);
        }else {
            query(this);
            queryPermission(this);
        }
	}

    //查询onchang事件
    searchBarOnChange = (val) =>{
        this.setState({
            fuzzy: val
        });
    }

	//查询事件
	onSearch = (val) => {
        //按条件进行查询，页码从第一页开始
        this.setState({
            page:1,
            pageSize:10,
            preOrder:[],
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
            preOrder:[],
        });
        setTimeout(() => {
            query(this);
        },2)
    }

	//返回按钮
    comeback=()=>{
        history.goBack();  //返回上一页这段代码
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
		const preOrderList=this.state.preOrder.map((preOrderItem, index) => (


		    <Link to={{pathname:'/preOrder/details',item:preOrderItem,rolePermission:result,preOrderState:this.state}} key={index}>
		       <section className='section' >
				   <div>
						<Flex>
						  <div className="font07 text_left flex1">{preOrderItem.season}</div>
						  <div className="font07 text_right flex1">{preOrderItem.preOrderNo}</div>
						</Flex>
						<Flex style={{color:'#000000'}}><strong>{preOrderItem.bookName}</strong></Flex>
						<WhiteSpace/>
                       <Flex className="font07"  >
                           <div className="text_left ">印数:</div>
                           <div className="text_left margin-left">{preOrderItem.preMenge}</div>
                       </Flex>
						<Flex className="font07"  >
							<div className="text_left ">印厂确认时间:</div>
							<div className="text_left margin-left">{preOrderItem.printeryConfirmDate?moment(preOrderItem.printeryConfirmDate).format('YYYY-MM-DD'):preOrderItem.printeryConfirmDate}</div>
						</Flex>
						<Flex className="font07">
						  <div className="text_left ">物资公司确认时间:</div>
						  <div className="text_left margin-left">{preOrderItem.materialsConfirmDate?moment(preOrderItem.materialsConfirmDate).format('YYYY-MM-DD'):preOrderItem.materialsConfirmDate}</div>
						</Flex>
					</div>
		        </section>
		    </Link>));


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
                {preOrderList}
            </PullToRefresh>

		</div>
		);
	}
}