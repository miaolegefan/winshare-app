import React from 'react';
import axios from "axios";
import {Link} from "react-router-dom";
import {Flex, Icon, NavBar, SearchBar,Toast} from "antd-mobile";
import {createHashHistory} from 'history'
import moment from "moment/moment";  //返回上一页这段代码
const history = createHashHistory();//返回上一页这段代码


//获取INV为空的印单（类型为正常的）
function getOrderData(_this) {
    axios.post('/api/public/moblie-invDcData/query?userId='+sessionStorage.userId+'&roleId='+sessionStorage.roleId,{}).then(function(response){
        if(response.data.success){
            _this.setState({
                orderInv : response.data.rows,
                search:response.data.rows
            });
        }else{
            Toast.info('查询数据失败 !!!', 2);
        }
    })
}



function search(arr, q) {
    return arr.filter(v => Object.values(v).some(v => new RegExp(q + '').test(v)));
}


export default class invDcHead extends React.Component{
    constructor(props){
        super(props)
        this.state={
            orderInv:[],
            search:[],
            invSelect:[]
        }
    }


    componentWillMount() {
    getOrderData(this);

    }

    //返回按钮
    comeback=()=>{
        history.goBack();  //返回上一页这段代码
    }

    //查询事件
    onSearch = (val) => {
        const value = search(this.state.search,val);
        this.setState({
            orderInv: value
        });

    }

    render() {
        const orderList = this.state.orderInv.map((item,index) =>(
                <Link to={{pathname:'/invDc/detail/'+item.orderNo,orderDetail:item}} key={index}>
                    <section className="section">
                        <Flex>
                            <div className="font07 text_left flex1">{item.orderDate}</div>
                            <div className="font07 text_right flex1" >{item.orderNo}</div>
                        </Flex>
                        <Flex>
                            <div className="text_left  colorBlack"><strong>{item.bookName}</strong></div>
                            {/*<div className="font07 text_right flex2" >{moment(item.auditDate).format('YYYY-MM-DD')}</div>*/}
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
                                    <div className="text_right flex1">要求送书日期:</div>
                                    <div className="text_left flex1 margin-left">
                                        {item.requireSendDate?moment(item.requireSendDate).format('YYYY-MM-DD'):item.requireSendDate}
                                    </div>
                                </Flex>
                            </div>
                        </Flex>
                        <Flex>
                            <div className="font07 text_left flex1">
                                <Flex>
                                    <div className="text_left ">征订期:</div>
                                    <div className="text_left margin-left">{item.season}</div>
                                </Flex>
                            </div>
                            <div className="font07 text_right flex1" >
                                <Flex>
                                    <div className="text_right flex1">征订代码:</div>
                                    <div className="text_left flex1 margin-left">{item.subCode}</div>
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
        );
    }

}