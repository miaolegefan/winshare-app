import React from 'react';
import {Button, List, Radio, WingBlank, WhiteSpace, Modal, Picker, Toast, Flex, NavBar, Icon} from 'antd-mobile';
import axios from "axios";
import {Link} from "react-router-dom";
import moment from 'moment'
import Select from 'antd/lib/select';
import {createHashHistory} from 'history'  //返回上一页这段代码
const history = createHashHistory();//返回上一页这段代码


//查询
function query(_this) {
    axios.post('/api/public/wl/receive/appoint/query?userId='+sessionStorage.userId,{
        printeryCode:sessionStorage.printeryCode,
    }).then(function(response){
        if(response.data.success){
            _this.setState({
                orderDelivery : response.data.rows,
                search:response.data.rows
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
            return  v.dealStatus == '确认';
        })
    }else if(q =='已拒绝'){
        arr =  arr.filter(function (v) {
            return  v.dealStatus == '拒绝';
        })
    }
    return arr;
}



export default class wlConfirm extends React.Component{

constructor(props){
    super(props)
    this.state={
        orderDelivery:[],
        search:[],
        locale: '全部 ',
    }
}


componentDidMount() {
        query(this,'')
    this.setState({
        orderDelivery :  [],
        search:[]

    });
   }

    //返回按钮
    comeback=()=>{
        history.goBack();  //返回上一页这段代码
    }


    //筛选
    onSearch = (val) => {
        const value = search(this.state.search,val);
        this.setState({
            orderDelivery: value
        });
    }

    onChange = (value) => {
        this.setState({
            locale: value[0],
        });
    }
    onColor = (value)=>{
        let a ='';
        if(value == null){
            a = <span style={{color:'#108ee9'}}>未处理</span>;
        }else if(value == '确认'){
            a = <span style={{color:'#00ff00'}}>已同意</span>;
        }else if(value == '拒绝'){
            a = <span style={{color:'red'}}>已拒绝</span>;
        }
    return a;
    }

render() {
    const { locale } = this.state;
    const list =this.state.orderDelivery.map((item,index) => (
        <Link to={{pathname:'/wlConfirm/detail',detail:item}} key={index}>
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
    ));

    const choose = [
        {
            value: '未处理',
            label: '未处理',
        },
        {
            value: '已拒绝',
            label: '已拒绝',
        },
        {
            value: '已同意',
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
                    value={[locale]}
                    style={{width:"100%"}}
                >
                    <List.Item style={{width:"100%"}} arrow="horizontal">处理状态</List.Item>
                </Picker>
            </NavBar>

            {list}

        </div>
    );
}

}