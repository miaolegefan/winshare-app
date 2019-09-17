import React from 'react';
import { Flex,WingBlank, Button,List,TextareaItem,InputItem} from 'antd-mobile';
import axios from "axios";
import '../wl/wlConfirm.css';
import moment from 'moment'


function mobileApproce(item) {




    axios.post('/api/public/mobile/wl/receive/appoint/approve?userId=10021',{}).then(function(response){
        if(response.data.success){

        }
    })





}


function mobileReject(item) {



    axios.post('/api/public/moblie-preOrder/query?userId=10021',{}).then(function(response){
        if(response.data.success){

        }
    })





}





export default class wlConfirmDetail extends React.Component{
    constructor(props){
        super(props)
        this.state={
            approveHidden:false,
            rejectHidden:false
        }
    }


    onReceiveMenge=(receiveMenge,appointMenge)=>{

        if(receiveMenge == null){
            receiveMenge = appointMenge;
        }
        return receiveMenge;
    }


    componentDidMount() {
        const data=this.props.location.detail;
        const value = data.dealStatus;
        if(value == null){
            this.setState({
                approveHidden:false,
                rejectHidden:false
            })
        }else if(value == '确认'){
            this.setState({
                approveHidden:true,
                rejectHidden:false
            })

        }else if(value == '拒绝'){
            this.setState({
                approveHidden:false,
                rejectHidden:true
            })
        }
    }


    render() {
        const detail= this.props.location.detail;
        return(
            <WingBlank size="sm">
            <div className="datails">
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
                    <div className="text_right flex2 colorBlack">{detail.bookCode}</div>
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
                    <TextareaItem
                        disabled={true}
                        editable={false}
                        rows={3}
                        style={{ color:'black' ,backgroundColor:'rgb(204, 191, 191)',borderColor: 'rgb(169, 169, 169)'}}
                        value="测试"
                    />


                <InputItem
                    type="money"
                    clear
                    style={{borderColor: '#404040'}}
                    value={this.onReceiveMenge(detail.receiveMenge,detail.appointMenge)}
                >物流收货数量</InputItem>
            </div>

                <div style={{position: 'absolute', bottom: 0, left: 0, right: 0 }}>
                    <div hidden={this.state.approveHidden}>
                    <WingBlank size="md"><Button  type="ghost"  style={{color: '#108ee9', 'backgroundColor': 'white', 'borderRadius': '5px', border: '1px solid #108ee9'}}  size="small">同意</Button></WingBlank>
                    </div>
                    <div hidden={this.state.rejectHidden}>
                    <WingBlank size="md"><Button  type="ghost"  style={{color: 'red', 'backgroundColor': 'white', 'borderRadius': '5px', border: '1px solid #108ee9'}} size="small">拒绝</Button></WingBlank>
                    </div>
                </div>
            </WingBlank>
        );
    }


}