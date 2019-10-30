import React from 'react';
import axios from "axios";
import {Link} from "react-router-dom";
import {Flex, Icon, NavBar, SearchBar,Toast,Checkbox,Button,PullToRefresh} from "antd-mobile";
import {createHashHistory} from 'history'
import moment from "moment/moment";  //返回上一页这段代码
const history = createHashHistory();//返回上一页这段代码
const CheckboxItem = Checkbox.CheckboxItem;

//获取INV为空的印单（类型为正常的）
function getOrderData(_this) {
    axios.post('/api/public/moblie-invDcData/query?userId='+sessionStorage.userId+'&roleId='+sessionStorage.roleId+
        '&page='+_this.state.page+''+'&pageSize='+_this.state.pageSize,{
        fuzzy:_this.state.fuzzy,//查询字段
    }).then(function(response){
        if(response.data.success){
            const orderInv = _this.state.orderInv;
            response.data.rows.map((item)=>{
                item.checked=false //复选框默认未选择
                orderInv.push(item)
            });
            _this.setState({
                orderInv : orderInv,
                total:response.data.total,
                allCheck:false,//全选为false
            });
        }else{
            Toast.info('查询数据失败 !!!', 2);
        }
    })
}

export default class invDcHead extends React.Component{
    constructor(props){
        super(props)
        this.state={
            page:1,
            pageSize:10,
            total:0,
            fuzzy:'',//查询
            refreshing: false,//是否显示刷新状态
            down: true,
            height: document.documentElement.clientHeight*0.85,
            orderInv:[],
            invSelect:[],
            allCheck:false
        }
    }


    componentWillMount() {
        if(this.props.location.orderInvState){
            this.setState(this.props.location.orderInvState);
        }else {
            getOrderData(this);
        }

    }

    //返回按钮
    comeback=()=>{
        history.goBack();  //返回上一页这段代码
    }

    //查询onchang事件
    searchBarOnChange = (val) =>{
        this.setState({
            fuzzy: val
        });
    }

    //查询事件
    onSearch = () => {
        this.setState({
            page:1,
            pageSize:10,
            orderInv:[],
            allCheck:false
        })
        setTimeout(() => {
            getOrderData(this);
        },2)

    }
    //查询取消事件
    onCancel =()=>{
        this.setState({
            fuzzy: "",
            page:1,
            pageSize:10,
            orderInv:[],
            allCheck:false
        });
        setTimeout(() => {
            getOrderData(this);
        },2)
    }
    //复选框改变事件
    checkOnChange = (val,_this) => {
        const orderInv = _this.state.orderInv;
        orderInv.map((item)=>{
            if(item.orderNo == val.orderNo){
                item.checked = !item.checked
            }
        })
        //判断是否为全选
        let allCheck = false;
        let checkNo = 0;
        orderInv.map((item)=>{
            if(item.checked){
                checkNo ++;
            }
        })
        if(checkNo == orderInv.length){
            allCheck = true;
        }
        _this.setState({
            orderInv:orderInv,
            allCheck:allCheck
        })
    }
    //全选改变事件
    allCheckOnChange=(_this)=>{
        let allCheck = !_this.state.allCheck;
        const orderInv = _this.state.orderInv;
        orderInv.map((item)=>{
            item.checked = allCheck
        })
        _this.setState({
            orderInv:orderInv,
            allCheck:allCheck
        })
    }

    //批量选择入库地址
    batchSave=(_this)=>{
        let orderInv = _this.state.orderInv;
        let orderInvCheck = [];
        orderInv.map((item)=>{
            if(item.checked){
                orderInvCheck.push(item);
            }
        })
        if(orderInvCheck.length>0) {
            this.props.history.push({pathname: '/invDcBatch', orderInvCheck: orderInvCheck});
        }else{
            Toast.info('请选择需要更新入库地址的数据', 1);
        }
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
                getOrderData(_this);
                _this.setState({ refreshing: false });
            }, 1000);
        }
    }

    render() {
        const orderList = this.state.orderInv.map((item,index) =>(
            <CheckboxItem key={index} onChange={() => this.checkOnChange(item,this)} checked={item.checked}>

            <Link to={{pathname:'/invDc/detail/'+item.orderNo,orderInvState:this.state}} key={index}>
                    <section style={{border:"thin #E8E8E8 ",color: "#787878",backgroundColor: "white",lineHeight:"3"}}>
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
                            <div className="font07 text_right flex1" >
                                <Flex>
                                    <div className="text_right flex1">要求送书日期:</div>
                                    <div className="text_left flex1 margin-left">
                                        {item.requireSendDate?moment(item.requireSendDate).format('YYYY-MM-DD'):item.requireSendDate}
                                    </div>
                                </Flex>
                            </div>
                        </Flex>
                    </section>
                </Link>
            </CheckboxItem>
            )
        )





        return(
            <div >


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

               <div >
                   <CheckboxItem style={{backgroundColor:'#ABABAB'}}checked={this.state.allCheck} onChange={() => this.allCheckOnChange(this)}>
                       <Button  type="primary" onClick={()=>this.batchSave(this)} size="small"  style={{}} >批量选择入库地址</Button>
                   </CheckboxItem>

               </div>
            </div>
        );
    }

}