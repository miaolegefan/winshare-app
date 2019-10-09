import React from 'react';
import {
    TextareaItem,
    Toast,
    Flex,
    NavBar,
    Icon, Tabs
} from 'antd-mobile';
import axios from "axios";
import '../tabs.css';
import WflHistory from './workFlowHistory';
import WflForm from './workFlowForm';
import {createHashHistory} from 'history'  //返回上一页这段代码
const history = createHashHistory();//返回上一页这段代码

//获取历史记录
function getDetail(_this,id) {
    axios.post('/api/public/workFlow/runtime/tasks/'+id+'/details?userId='+sessionStorage.userId,{}).then(function(response){
        if(response.status == '200'){
            _this.setState(
                {
                    data: response.data,
                    history:response.data.historicTaskList

                }
            )
        }else{
            Toast.info('获取待办详情失败', 2);
        }
    })
}
//获取流程描述
function getMessage(_this,processId) {
    axios.post('/api/public/mobile-task/getMessage?processId='+processId,{}).then(function(response){
        if(response.data.success){
            _this.setState(
                {
                    message:response.data.message
                }
            )
        }else{
            Toast.info('获取待办描述失败', 2);
        }
    })
}

export default class workFlowDetail extends React.Component{

    constructor(props) {
        super(props);
        this.state={
            data:[],
            history:[],
            message:''
        }
    }


    componentDidMount() {
        const id = this.props.match.params.id;
        const processId = this.props.location.processId;
        getDetail(this,id);
        getMessage(this,processId);
    }

    //返回按钮
    comeback=()=>{
        history.goBack();  //返回上一页这段代码
    }

    render() {

        const tabs2 = [
            { title: '基本信息', sub: '1' },
            { title: '审批历史', sub: '2' },
        ];
        const historyData = this.state.history;
        const message = this.state.message;
        const taskId = this.props.match.params.id;
        return(
            <div style={{ position: 'fixed', height: '100%', width: '100%', top: 0 }}>
                <NavBar mode="light" icon={<Icon type="left" />}
                        onLeftClick={this.comeback}>
                </NavBar>
                <Tabs tabs={tabs2} initialPage={0} tabBarInactiveTextColor='#108ee9'>
                    <div style={{ alignItems: 'right', justifyContent: 'right',backgroundColor: '#fff' }}>
                        <WflForm  message={message} taskId={taskId}/>
                    </div>
                    <div style={{  alignItems: 'right', justifyContent: 'right', height: '100%', backgroundColor: '#fff' }}>
                        <WflHistory  history={historyData} />
                    </div>
                </Tabs>
            </div>
        );
    }

}