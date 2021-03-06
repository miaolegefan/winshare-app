import React from 'react';
import {Button, Flex, TextareaItem, Toast, WingBlank,} from 'antd-mobile';
import axios from "axios";


function submit(taskId,value) {

const data = {"assignee":null,"action":"complete","comment":"","variables":[{"name":"approveResult","value":value}],"jumpTarget":null,"carbonCopyUsers":""};
        axios.post('/api/public/mobile-task/action/'+taskId+'?userId='+sessionStorage.userId+'&roleId='+sessionStorage.roleId,
            data).then(function (response) {
            if(response.status == '200'){
                Toast.info('审批成功', 2);
                //跳转
                this.props.history.push('/workFlow')
            }else{
                Toast.info('审批失败', 2);
            }
        })
}



export default class workFlowForm extends React.Component{


    render() {
        const message = this.props.message;
        const bookName = this.props.bookName;
        const isbn = this.props.isbn;
        const taskId = this.props.taskId;
        let messageList = [];
        if(message){
             messageList = message.split('。').map((item,index) => (
                <section className="section"  key={index} >
                    <Flex>
                        <div className="font08 text_left flex1">
                            <Flex>
                                <div className="text_left">{item}</div>
                            </Flex>
                        </div>
                    </Flex>
                </section>
            ));
        }

        

        return(
            <div>
                <div>
                    <div className="datails">
                        <Flex>
                            <div className="text_left flex1">书名:</div>
                            <div className="text_left flex2 colorBlack">{bookName}</div>
                        </Flex>
                        <Flex>
                            <div className="text_left flex1">书号:</div>
                            <div className="text_left flex2 colorBlack">{isbn}</div>
                        </Flex>
                    </div>
                {messageList}
                </div>
                <div   style={{bottom:'8%',position: 'absolute',width:'100%'}} id="footer">
                <WingBlank size="md"><Button  type="ghost" onClick={()=>submit(taskId,'APPROVED')} style={{color: '#108ee9', 'backgroundColor': 'white', 'borderRadius': '5px', border: '1px solid #108ee9'}} >同意</Button></WingBlank>
                <WingBlank size="md"><Button  type="ghost" onClick={()=>submit(taskId,'REJECTED')} style={{color: 'red', 'backgroundColor': 'white', 'borderRadius': '5px', border: '1px solid #108ee9'}} >拒绝</Button></WingBlank>
                </div>
            </div>
        );
    }
}