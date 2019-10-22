import React from 'react';
import {List, Picker, Flex, NavBar, Icon,PullToRefresh,DatePicker,Checkbox,Button} from 'antd-mobile';
import axios from "axios";
import {Link} from "react-router-dom";
import moment from 'moment'
import {createHashHistory} from 'history'
const history = createHashHistory();//返回上一页这段代码
const CheckboxItem = Checkbox.CheckboxItem;

//查询
function query(_this) {
    axios.post('/api/public/wl/receive/appoint/query?userId='+sessionStorage.userId+'&roleId='+sessionStorage.roleId+
        '&page='+_this.state.page+''+'&pageSize='+_this.state.pageSize,{
        printeryCode:sessionStorage.printeryCode,
        fuzzy:_this.state.fuzzy,//查询字段
        dealStatus:_this.state.dealStatus,//处理状态
    }).then(function(response){
        if(response.data.success){
            let orderDelivery = _this.state.orderDelivery;
            response.data.rows.map((item)=>{
                item.checked=false //复选框默认未选择
                orderDelivery.push(item)
            });
            _this.setState({
                orderDelivery : orderDelivery,
                total:response.data.total,
            });
        }
    })

}


//状态查询
function search(arr, q) {

    if(q =='未处理'){
        arr =   arr.filter(function (v) {
            return  v.dealStatus == null;
        })
    }else if(q == '已同意'){
        arr =  arr.filter(function (v) {
            return  v.dealStatus == 'CONFIRM';
        })
    }else if(q =='已拒绝'){
        arr =  arr.filter(function (v) {
            return  v.dealStatus == 'REJECT';
        })
    }
    return arr;
}



export default class wlConfirm extends React.Component{

constructor(props){
    super(props)
    this.state={
        page:1,
        pageSize:10,
        total:0,
        fuzzy:'',//查询
        dealStatus:'UNTREATED',//处理状态 
        refreshing: false,//是否显示刷新状态
        down: true,
        height: document.documentElement.clientHeight*0.85,
        orderDelivery:[],
        allCheck:false
    }
}


componentDidMount() {
    if(this.props.location.orderDeliveryState){
        this.setState(this.props.location.orderDeliveryState);
    }else {
        query(this)
    }
}

    //返回按钮
    comeback=()=>{
        history.goBack();  //返回上一页这段代码
    }

    //筛选
    // onSearch = (val) => {
    //     const value = search(this.state.search,val);
    //     this.setState({
    //         orderDelivery: value
    //     });
    // }
    //查询onchang事件
    onChange = (value) => {
        this.setState({
            dealStatus: value[0],
            page:1,
            pageSize:10,
            orderDelivery:[],
            allCheck:false,
        });
        setTimeout(() => {
            query(this);
        },2)
    }
    onColor = (value)=>{
        let a ='';
        if(value == null){
            a = <span style={{color:'#108ee9'}}>未处理</span>;
        }else if(value == 'CONFIRM'){
            a = <span style={{color:'#00ff00'}}>已同意</span>;
        }else if(value == 'REJECT'){
            a = <span style={{color:'red'}}>已拒绝</span>;
        }
    return a;
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

    //复选框改变事件
    checkOnChange = (val,_this) => {
        const orderDelivery = _this.state.orderDelivery;
        orderDelivery.map((item)=>{
            if(item.orderNo == val.orderNo){
                item.checked = !item.checked
            }
        })
        //判断是否为全选
        let allCheck = false;
        let checkNo = 0;
        orderDelivery.map((item)=>{
            if(item.checked){
                checkNo ++;
            }
        })
        if(checkNo == orderDelivery.length){
            allCheck = true;
        }
        _this.setState({
            orderDelivery:orderDelivery,
            allCheck:allCheck
        })
    }
    //全选改变事件
    allCheckOnChange=(_this)=>{
        let allCheck = !_this.state.allCheck;
        const orderDelivery = _this.state.orderDelivery;
        orderDelivery.map((item)=>{
            item.checked = allCheck
        })
        _this.setState({
            orderDelivery:orderDelivery,
            allCheck:allCheck
        })
    }


    render() {
    const { dealStatus } = this.state;
    const list =this.state.orderDelivery.map((item,index) => (
        <CheckboxItem key={index} onChange={() => this.checkOnChange(item,this)} checked={item.checked}>
        <Link to={{pathname:'/wlConfirm/detail',detail:item,orderDeliveryState:this.state}} key={index}>
            <section className="section">
                <Flex>
                    <div className="font07 text_left flex1">{moment(item.appointDate).format('YYYY-MM-DD')}{item.appointPeriod}</div>
                    <div className="font07 text_right flex1" >{this.onColor(item.dealStatus)}</div>
                </Flex>
                <Flex>
                    <div className="text_left flex3 colorBlack"><strong>{item.bookName}</strong></div>
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
                            <div className="text_right flex3">预约数量:</div>
                            <div className="text_left flex1 margin-left">{item.appointMenge}</div>
                        </Flex>
                    </div>
                </Flex>
                <Flex>
                    <div className="font07 text_left flex1">
                        <Flex>
                            <div className="text_left ">册包数:</div>
                            <div className="text_left margin-left">{item.volumeMenge}</div>
                        </Flex>
                    </div>
                    <div className="font07 text_right flex1" >
                        <Flex>
                            <div className="text_right flex3">车数量:</div>
                            <div className="text_left flex1 margin-left">{item.carsMenge}</div>
                        </Flex>
                    </div>
                </Flex>
                <Flex>
                    <div className="font07 text_left flex1">
                        <Flex>
                            <div className="text_left ">送货方:</div>
                            <div className="text_left margin-left">{item.sender}</div>
                        </Flex>
                    </div>
                </Flex>
            </section>
        </Link>
        </CheckboxItem>
    ));

    const choose = [
        // {
        //     value: '',
        //     label: '全部',
        // },
        {
            value: 'UNTREATED',
            label: '未处理',
        },
        {
            value: 'REJECT',
            label: '已拒绝',
        },
        {
            value: 'CONFIRM',
            label: '已同意',
        },
    ];
    return(
        <div>
            <NavBar mode="light" icon={<Icon type="left" />} onLeftClick={this.comeback}>
                <Picker
                    data={choose}
                    onChange={this.onChange}
                    cols={1}
                    value={[dealStatus]}
                    style={{width:"100%"}}
                >
                    <List.Item style={{width:"100%"}} arrow="horizontal">处理状态</List.Item>
                </Picker>
                <DatePicker
                    mode="date"
                    title=""
                    extra=""
                    value={this.state.date}
                    onChange={date => this.setState({ date })}
                >
                    <List.Item arrow="horizontal">时间</List.Item>
                </DatePicker>

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
                {list}
            </PullToRefresh>
            <div >
                <CheckboxItem style={{backgroundColor:'#ABABAB'}}checked={this.state.allCheck} onChange={() => this.allCheckOnChange(this)}>
                    <Button  type="primary" onClick={()=>this.batchSave(this)} size="small"  style={{}} >批量选择</Button>
                </CheckboxItem>

            </div>
        </div>
    );
}

}