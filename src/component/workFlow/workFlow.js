import React from 'react';
import {Button, List, Radio, WingBlank, WhiteSpace, Modal, ActivityIndicator, Toast, Flex} from 'antd-mobile';
import axios from "axios";
import {Link} from "react-router-dom";
import moment from 'moment'



function getMyTasks(_this) {

    axios.post('/api/public/workFlow/getMyTasks?userId=10021',{}).then(function(response){
        if(response.status == '200'){
          _this.setState(
              {
                  myTask: response.data.data
              }
          )
        }else{
            Toast.info('获取待办失败', 1);
        }
    })

}


export default class workFlow extends React.Component{


    constructor(props) {
        super(props);
        this.state={
            myTask:[]
        }
    }
    
    componentDidMount() {

        getMyTasks(this);

    }


    render() {
        const myTaskList = this.state.myTask.map((item,index) => (

            <Link to={{pathname:'/workFlow/details/'+item.id,processId:item.processInstanceId}} key={index} >
                <section className="section">
                    <Flex>
                        <div className="font07 text_left flex1">开始日期</div>
                        <div className="font07 text_right flex1" >{item.createTime}</div>
                    </Flex>
                    <Flex>
                        <div className="text_left flex2 colorBlack"><strong>{item.processName}</strong></div>
                    </Flex>
                    <Flex>
                        <div className="font07 text_left flex1">
                            <Flex>
                                <div className="text_left ">ID:</div>
                                <div className="text_left margin-left">{item.processInstanceId}</div>
                            </Flex>
                        </div>
                        <div className="font07 text_right flex1" >
                            <Flex>
                                <div className="text_right flex4">申请人:</div>
                                <div className="text_left flex3 margin-left">{item.startUserName}</div>
                            </Flex>
                        </div>
                    </Flex>
                    <Flex>
                        <div className="font07 text_left flex1">
                            <Flex>
                                <div className="text_left">审批环节:</div>
                                <div className="text_left margin-left">{item.name}</div>
                            </Flex>
                        </div>
                    </Flex>
                    <Flex>
                        <div className="font07 text_left flex1">
                            <Flex>
                                <div className="text_left">描述:</div>
                                <div className="text_left margin-left">{item.description}</div>
                            </Flex>
                        </div>
                    </Flex>
                </section>
            </Link>

        ));





        return(
            <div>
                {myTaskList}
            </div>
        );
    }


}