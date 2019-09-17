import React from 'react';
import {Button, List, Radio, WingBlank, WhiteSpace, Modal, ActivityIndicator, Toast, Flex} from 'antd-mobile';
import axios from "axios";








export default class wlConfirmDetail extends React.Component{
    constructor(props){
        super(props)
    }






    render() {
        const detail= this.state.detail;
        return(
            <div className="datails">
                <Flex>
                    <div className="text_left flex1">预约日期:</div>
                    <div className="text_right flex1 colorBlack">{detail.appointDate}</div>
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

            </div>
        );
    }


}