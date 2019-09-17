import React from 'react';
import {Button, Flex, TextareaItem, Toast, WingBlank,} from 'antd-mobile';
import axios from "axios";


function submit(taskId,value) {

const data = {"assignee":null,"action":"complete","comment":"","variables":[{"name":"approveResult","value":value}],"jumpTarget":null,"carbonCopyUsers":""};
        axios.post('/api/public/mobile-task/action/'+taskId+'?userId=10021',data).then(function (response) {
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
        const taskId = this.props.taskId;
        const messageList = message.split('。').map((item,index) => (
            <section className="section">
            <Flex>
                <div className="font08 text_left flex1">
                    <Flex>
                        <div className="text_left">{item}</div>
                    </Flex>
                </div>
            </Flex>
            </section>
        ));
        

        return(
            <div>
                {messageList}
                <div style={{position: 'absolute', bottom: 0, left: 0, right: 0 ,marginBottom:'95px'}}>
                    {/*<TextareaItem*/}
                    {/*    title="标题"*/}
                    {/*    placeholder="auto focus in Alipay client"*/}
                    {/*    data-seed="logId"*/}
                    {/*    ref={el => this.autoFocusInst = el}*/}
                    {/*    autoHeight*/}
                    {/*/>*/}
                <WingBlank size="md"><Button  type="ghost" onClick={()=>submit(taskId,'APPROVED')} style={{color: '#108ee9', 'backgroundColor': 'white', 'borderRadius': '5px', border: '1px solid #108ee9'}}  size="small">同意</Button></WingBlank>
                <WingBlank size="md"><Button  type="ghost" onClick={()=>submit(taskId,'REJECTED')} style={{color: 'red', 'backgroundColor': 'white', 'borderRadius': '5px', border: '1px solid #108ee9'}} size="small">拒绝</Button></WingBlank>
                </div>
            </div>
        );
    }
}