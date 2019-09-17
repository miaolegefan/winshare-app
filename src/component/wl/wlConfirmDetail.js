import React from 'react';
import { Flex,WingBlank, Button,List,TextareaItem,InputItem,Toast,Modal,Icon} from 'antd-mobile';
import axios from "axios";
import '../wl/wlConfirm.css';
import moment from 'moment'


function mobileApproce(item,_this) {

    if(item.receiveMenge>item.appointMenge){
        Toast.info('收货数不能大于预约数 !!!', 2);
    }else{
        const data =  {"orderNo":item.orderNo,"id":item.id,"dealStatus":"确认","receiveMenge":item.receiveMenge,"appointMenge":item.appointMenge,"objectVersionNumber":item.objectVersionNumber};
        axios.post('/api/public/mobile/wl/receive/appoint/approve?userId=10021',data).then(function(response){
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
    const data =  {"orderNo":item.orderNo,"id":item.id,"dealStatus":"拒绝","receiveMenge":"0","remark":reason,"appointMenge":item.appointMenge,"objectVersionNumber":item.objectVersionNumber};
    axios.post('/api/public/mobile/wl/receive/appoint/reject?userId=10021',data).then(function(response){
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



function test(value) {
    console.log(`输入的内容:${value}`);
}

export default class wlConfirmDetail extends React.Component{
    constructor(props){
        super(props)
        this.state={
            approveHidden:false,
            rejectHidden:false,
            textAreaHidden:false,
            orderDelivery:[],
            modal1: false,
        }
    }

    //预约数量控制
    onReceiveMenge=(receiveMenge,appointMenge)=>{

        if(receiveMenge == null){
            receiveMenge = appointMenge;
        }
        return receiveMenge;
    }


    componentDidMount() {
        const data=this.props.location.detail;

        this.setState({
            orderDelivery:data
        })
        //按钮隐藏控制
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



    render() {
        const detail= this.state.orderDelivery;
        const _this = this;
        return(
            <WingBlank size="sm">
            <div className="datails" style={{'marginBottom': '100px'}}>
                <Flex>
                    <div className="text_left flex1">预约日期:</div>
                    <div className="text_left flex1 colorBlack">{moment(detail.appointDate).format('YYYY-MM-DD')}</div>
                </Flex>
                <Flex>
                    <div className="text_left flex1">预约时段:</div>
                    <div className="text_left flex1 colorBlack">{detail.appointPeriod}</div>
                </Flex>
                <Flex>
                    <div className="text_left flex1">送货方:</div>
                    <div className="text_left flex1 colorBlack">{detail.sender}</div>
                </Flex>
                <Flex>
                    <div className="text_left flex1">书名:</div>
                    <div className="text_left flex1 colorBlack">{detail.bookName}</div>
                </Flex>
                <Flex>
                    <div className="text_left flex1">商品编码:</div>
                    <div className="text_left flex1 colorBlack">{detail.bookCode}</div>
                </Flex>
                <Flex>
                    <div className="text_left flex1">预约数量:</div>
                    <div className="text_left flex1 colorBlack">{detail.appointMenge}</div>
                </Flex>
                <Flex>
                    <div className="text_left flex1">册包数:</div>
                    <div className="text_left flex1 colorBlack">{detail.volumeMenge}</div>
                </Flex>
                <Flex>
                    <div className="text_left flex1">车数量:</div>
                    <div className="text_left flex1 colorBlack">{detail.carsMenge}</div>
                </Flex>
                <Flex>
                    <div className="text_left flex1">装订厂联系人:</div>
                    <div className="text_left flex1 colorBlack">{detail.binderyContact}</div>
                </Flex>
                <Flex>
                    <div className="text_left flex1">装订厂联系电话:</div>
                    <div className="text_left flex1 colorBlack">{detail.binderyTel}</div>
                </Flex>
                <Flex>
                    <div className="text_left flex1">备注:</div>
                </Flex>
<<<<<<< HEAD
                <Flex>
                    <div className="margin-left margin-right colorBlack" style={{ border:'thin #E8E8E8 solid'}}>
                        {detail.remark}
                    </div>
                </Flex>

=======
                    <TextareaItem
                        disabled={true}
                        editable={false}
                        rows={3}
                        style={{ color:'black' ,backgroundColor:'rgb(204, 191, 191)',borderColor: 'rgb(169, 169, 169)'}}
                        value={detail.printeryRemark}
                    />
>>>>>>> master
                <InputItem
                    type="digit"
                    clear
                    style={{borderColor: '#404040'}}
<<<<<<< HEAD
                    defaultValue={this.onReceiveMenge(detail.receiveMenge,detail.appointMenge)}
                ><div className="text_left flex1">物流收货数量:</div></InputItem>
=======
                    value={this.onReceiveMenge(detail.receiveMenge,detail.appointMenge)}
                >物流收货数量</InputItem>

>>>>>>> master
            </div>


                <div id="footer">
                    <div hidden={this.state.approveHidden}>
                    <WingBlank size="md"><Button  type="ghost" onClick={()=>mobileApproce(detail,_this)} style={{color: '#108ee9', 'backgroundColor': 'white', 'borderRadius': '5px', border: '1px solid #108ee9'}}  size="small">同意</Button></WingBlank>
                    </div>
                    <div hidden={this.state.rejectHidden} >
                        <WingBlank size="md"><Button  type="ghost"  onClick={this.showModal('modal1')}    style={{color: 'red', 'backgroundColor': 'white', 'borderRadius': '5px', border: '1px solid #108ee9'}} size="small">拒绝</Button></WingBlank>
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
                        // afterClose={() => { alert('afterClose'); }}
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
            </WingBlank>
        );
    }


}