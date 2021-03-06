import React from 'react';
import { Flex,WingBlank, Button,NavBar, Icon,TextareaItem,InputItem,Toast,Modal,Form} from 'antd-mobile';
import axios from "axios";
import '../wl/wlConfirm.css';
import moment from 'moment'
import {createHashHistory} from 'history'
const history = createHashHistory();//返回上一页这段代码

function mobileApproce(item,_this) {

    if(item.receiveMenge>item.appointMenge){
        Toast.info('收货数不能大于预约数 !!!', 2);
    }else{
        const data =  {"orderNo":item.orderNo,"id":item.id,"dealStatus":"CONFIRM","receiveMenge":item.receiveMenge,"appointMenge":item.appointMenge,"objectVersionNumber":item.objectVersionNumber};
        axios.post('/api/public/mobile/wl/receive/appoint/approve?userId='+sessionStorage.userId+'&roleId='+sessionStorage.roleId,
            data).then(function(response){
            if(response.data.success){
                Toast.info('收货成功', 2);
                _this.setState({
                    approveHidden:true,
                    rejectHidden:false
                })
            }else{
                Toast.info('收货失败'+response.data.message, 2);
            }
        })
    }

}


function mobileReject(item,_this,reason) {
    reason = document.getElementById("reason").value;
    const data =  {"orderNo":item.orderNo,"id":item.id,"dealStatus":"REJECT","receiveMenge":"0","remark":reason,"appointMenge":item.appointMenge,"objectVersionNumber":item.objectVersionNumber};
    axios.post('/api/public/mobile/wl/receive/appoint/reject?userId='+sessionStorage.userId+'&roleId='+sessionStorage.roleId,
        data).then(function(response){
        if(response.data.success){
            Toast.info('拒绝成功', 2);
            _this.setState({
                approveHidden:false,
                rejectHidden:true
            })
        }else{
            Toast.info('拒绝失败'+response.data.message, 2);
        }
    })

}




export default class wlConfirmDetail extends React.Component{
    constructor(props){
        super(props)
        this.state={
            orderDeliveryState:this.props.location.orderDeliveryState,
            approveHidden:true,
            rejectHidden:true,
            textAreaHidden:false,
            orderDelivery:[],
            modal1: false,
        }
    }

    //预约数量控制
    onReceiveMenge=(item)=>{

        if(item.receiveMenge == null||item.receiveMenge=='0'){
            item.receiveMenge = item.appointMenge;
        }

        return item.receiveMenge;
    }


    componentDidMount() {
        const data=this.props.location.detail;

        this.setState({
            orderDelivery:data
        })
        const button =sessionStorage.button;
        const arr = button.split(",");
        let wlApproved ='';//当前角色是否有物流确认同意的权限
        let wlRegected ='';//当前角色是否有物流确认拒绝的权限
        for (let i = 0; i < arr.length; i++) {
            if ('wlApproved' == arr[i]) {
                wlApproved=arr[i];
            }
            if ('wlRegected' == arr[i]) {
                wlRegected=arr[i];
            }
        }
        //按钮隐藏控制
        const value = data.dealStatus;
        //有同意权限
        if(wlApproved) {
            if (value == null) {
                this.setState({
                    approveHidden: false,
                })
            } else if (value == 'CONFIRM') {
                this.setState({
                    approveHidden: true,
                })

            } else if (value == 'REJECT') {
                this.setState({
                    approveHidden: false,
                })
            }
        }
        //有拒绝权限
        if(wlRegected) {
            if (value == null) {
                this.setState({
                    rejectHidden: false
                })
            } else if (value == 'CONFIRM') {
                this.setState({
                    rejectHidden: false
                })
            } else if (value == 'REJECT') {
                this.setState({
                    rejectHidden: true
                })
            }
        }
    }


    showModal = key => (e) => {
        e.preventDefault(); // 修复 Android 上点击穿透
        this.setState({
            [key]: true,
        });
    }
    onClose = key => () => {
        this.setState({
            [key]: false,
        });
    }

    //返回按钮
    comeback=()=>{
        history.goBack();  //返回上一页这段代码
        this.props.history.push({pathname:'/wlConfirm',orderDeliveryState:this.state.orderDeliveryState});//带父页面参数返回
    }
    render() {
        const detail= this.props.location.detail;
        const _this = this;
       const {receiveMengeValue} = this.state;
        return(
            <WingBlank size="sm">
                <div>
                    <NavBar mode="light" icon={<Icon type="left" />}
                            onLeftClick={this.comeback}>
                    </NavBar>

                    <div className="datails" style={{"width": "auto"}}>
                        <Flex>
                            <div className="text_left flex1">预约日期:</div>
                            <div className="text_right flex1 colorBlack">{moment(detail.appointDate).format('YYYY-MM-DD')}</div>
                        </Flex>
                        <Flex>
                            <div className="text_left flex1">预约时段:</div>
                            <div className="text_right flex1 colorBlack">{detail.appointPeriod}</div>
                        </Flex>
                        <Flex>
                            <div className="text_left flex1">送货方:</div>
                            <div className="text_right flex1 colorBlack">{detail.sender}</div>
                        </Flex>
                        <Flex>
                            <div className="text_left flex1">书名:</div>
                            <div className="text_right flex1 colorBlack">{detail.bookName}</div>
                        </Flex>
                        <Flex>
                            <div className="text_left flex1">商品编码:</div>
                            <div className="text_right flex1 colorBlack">{detail.bookCode}</div>
                        </Flex>
                        <Flex>
                            <div className="text_left flex1">预约数量:</div>
                            <div className="text_right flex1 colorBlack">{detail.appointMenge}</div>
                        </Flex>
                        <Flex>
                            <div className="text_left flex1">册包数:</div>
                            <div className="text_right flex1 colorBlack">{detail.volumeMenge}</div>
                        </Flex>
                        <Flex>
                            <div className="text_left flex1">车数量:</div>
                            <div className="text_right flex1 colorBlack">{detail.carsMenge}</div>
                        </Flex>
                        <Flex>
                            <div className="text_left flex1">装订厂联系人:</div>
                            <div className="text_right flex1 colorBlack">{detail.binderyContact}</div>
                        </Flex>
                        <Flex>
                            <div className="text_left flex1">装订厂联系电话:</div>
                            <div className="text_right flex1 colorBlack">{detail.binderyTel}</div>
                        </Flex>
                        <Flex>
                            <div className="text_left flex1">备注:</div>
                        </Flex>
                        <Flex>
                            <div className="margin-left margin-right colorBlack" style={{ border:'thin #E8E8E8 solid'}}>
                                {detail.remark}
                            </div>
                        </Flex>


                            <InputItem
                                type="digit"
                                id="receiveMenge"
                                clear
                                autoAdjustHeight={true}
                                style={{borderColor: '#404040'}}
                                defaultValue={this.onReceiveMenge(detail)}
                            >物流收货数量</InputItem>
                    </div>

                    <div  id="footer" style={{bottom:'8%',width:'100%'}}>
                        <div hidden={this.state.approveHidden}>
                        <WingBlank size="md"><Button  type="ghost" onClick={()=>mobileApproce(detail,_this)} style={{color: '#108ee9', 'backgroundColor': 'white', 'borderRadius': '5px', border: '1px solid #108ee9'}} >同意</Button></WingBlank>
                        </div>
                        <div hidden={this.state.rejectHidden} >
                            <WingBlank size="md"><Button  type="ghost"  onClick={this.showModal('modal1')}    style={{color: 'red', 'backgroundColor': 'white', 'borderRadius': '5px', border: '1px solid #108ee9'}} >拒绝</Button></WingBlank>
                        </div>


                        <Modal
                            visible={this.state.modal1}
                            transparent
                            maskClosable={false}
                            onClose={this.onClose('modal1')}
                            title="Title"
                            footer={[{ text: '取消', onPress: () => { console.log('cancel'); this.onClose('modal1')(); } },
                                { text: '确认', onPress: () => {mobileReject(detail,_this,''); this.onClose('modal1')(); } }
                            ]}
                        >
                            <div style={{ height: 100, overflow: 'scroll' }}>
                                <TextareaItem
                                    id="reason"
                                    rows={3}
                                    style={{ color:'black' ,backgroundColor:'#f7f7f7',borderColor: 'rgb(169, 169, 169)'}}
                                />
                            </div>
                        </Modal>
                    </div>

                </div>
            </WingBlank>
        );
    }


}