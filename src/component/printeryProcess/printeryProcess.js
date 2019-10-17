import React from 'react';
import {Flex, SearchBar,NavBar, Icon,PullToRefresh} from 'antd-mobile';
import '../common.css';
import {Link} from 'react-router-dom';
import moment from 'moment'
import axios from "axios";
import {createHashHistory} from 'history'  //返回上一页这段代码
const history = createHashHistory();//返回上一页这段代码

//数据查询
function query(_this) {
	axios.post('/api/public/moblie-printeryProcess/query?userId='+sessionStorage.userId+'&roleId='+sessionStorage.roleId+
        '&page='+_this.state.page+''+'&pageSize='+_this.state.pageSize,{
        printeryCode:sessionStorage.printeryCode,
        fuzzy:_this.state.fuzzy,//查询字段
	}).then(function(response){
		if(response.data.success){
            let printeryProcess = _this.state.printeryProcess;
            response.data.rows.map((item)=>{printeryProcess.push(item)});
			_this.setState({
				printeryProcess : printeryProcess,
                total:response.data.total,
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
            page:1,
            pageSize:10,
            total:0,
            fuzzy:'',//查询
            refreshing: false,//是否显示刷新状态
            down: true,
            height: document.documentElement.clientHeight-100,
			printeryProcess: [],
		}
	}


	componentDidMount(){
        if(this.props.location.printeryProcessState){
            this.setState(this.props.location.printeryProcessState);
        }else {
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
        //按条件进行查询，页码从第一页开始
        this.setState({
            page:1,
            pageSize:10,
            printeryProcess:[],
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
            printeryProcess:[],
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
        const status = [
            {
                value: '0',
                meaning: '待开机',
            },
            {
                value: '1',
                meaning: '开机',
            }, {
                value: '2',
                meaning: '装订',
            }, {
                value: '3',
                meaning: '质检',
            }, {
                value: '4',
                meaning: '开始送货',
            }, {
                value: '5',
                meaning: '完成送货',
            },
        ];
		const printeryProcessList = this.state.printeryProcess.map((item,index) => (
			<Link to={{pathname:'/printeryProcess/details/'+item.orderNo,item:item,printeryProcessState:this.state}} key={index}>
				<section className="section">
					<Flex>
						<div className="font07 text_left flex1">{item.season}-{item.subCode}</div>
						<div className="font07 text_right flex1" >{item.orderNo}</div>
					</Flex>
					<Flex>
						<div className="text_left flex2 colorBlack"><strong>{item.bookName}</strong></div>
						<div className="font07 text_right flex1" >{status[item.produceStatus].meaning}</div>
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
					<Flex className="font07 text_left flex1">
                        <div className="text_left">印数:</div>
						<div className="text_left margin-left">{item.printMenge}</div>
					</Flex>
				</section>
			</Link>
		));
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
                    {printeryProcessList}
                </PullToRefresh>
			</div>
		)
		
	}
}
