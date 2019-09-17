import React from 'react';
import { Flex,WingBlank, WhiteSpace,List,TextareaItem,InputItem} from 'antd-mobile';
import axios from "axios";
import '../wl/wlConfirm.css';
import moment from 'moment'






export default class wlConfirmDetail extends React.Component{
    constructor(props){
        super(props)
    }






    render() {
        const detail= this.props.location.detail;
        return(
            <WingBlank size="sm">
            <div className="datails">
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
                <Flex>
                    <div className="margin-left margin-right colorBlack">这是备注这是备注这是备注这是备注这是备注这是备注这是备注这是备注这是备注这是备注</div>
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
                >物流收货数量</InputItem>
            </div>
            </WingBlank>
        );
    }


}