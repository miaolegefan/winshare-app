import React from 'react';
import {
    Button,
    List,
    Radio,
    WingBlank,
    WhiteSpace,
    Modal,
    ActivityIndicator,
    Toast,
    Flex,
    NavBar,
    Icon, Tabs
} from 'antd-mobile';
import axios from "axios";


function renderResult(value) {

    if(value == 'APPROVED'){
        return '同意';
    }else if(value == 'REJECTED'){
        return '拒绝';
    }else{
        return '';
    }

}


export default class workFlowHistory extends React.Component{






    render() {
        const history = this.props.history.map((item,index) => (
            <section className="section" key={index} >
                <Flex>
                    <div className="flex1 font07 ">{item.name}</div>
                    <div className="flex1 colorBlack font07"><strong>{item.action}</strong></div>
                    <div className="flex1"></div>
                </Flex>
                <Flex>
                    <div className="font07 text_left flex1" >
                        <Flex>
                            <div className="text_left ">审批人:</div>
                            <div className="text_left margin-left">{item.assigneeName}</div>
                        </Flex>
                    </div>
                    <div className="font07 text_right flex1" >
                        <Flex>
                            <div className="text_right ">审批时间:</div>
                            <div className="text_left margin-left ">{item.endTime}</div>
                        </Flex>
                    </div>

                </Flex>
                <Flex>
                    <div className="font07 text_left flex1" >
                        <Flex>
                            <div className="text_left ">意见:</div>
                            <div className="text_left margin-left ">{item.comment}</div>
                        </Flex>
                    </div>
                </Flex>
            </section>
        ))



        return(
            <div>
                {history}
            </div>
        );
    }


}





