import React from 'react';
import axios from "axios/index";
import {Flex, Icon, NavBar, SearchBar,Toast,Button,List,Picker,WingBlank,Switch,WhiteSpace} from "antd-mobile";
import {createHashHistory} from 'history'
const history = createHashHistory();//返回上一页这段代码

//获取入库DC下拉列表
function getInvDc(_this) {
    axios.get('/api/public/moblie-inv/select').then(function(response){
        if(response.data.success){
            _this.setState({
                invSelect : response.data.rows,
            });
        }else {
            Toast.info('获取入库地点列表失败 !!!', 2);
        }
    })
}
//获取批次号
function getBatchId(_this) {

    axios.get('/api/public/moblie-inv/getBatch').then(function(response){
        if(response.data.success){
            _this.setState({
                batch:response.data.message
            });
        }else{
            Toast.info('获取批次失败 !!!', 2);
        }
    })
}

export default class InvcDcBatch extends React.Component{
    constructor(props){
        super(props);
        this.state={
            orderInv : this.props.location.orderInv,
            checked: false,//
            invSelect:[],//入库DC下拉列表
            batch:'无',//批次号
        }
    }
    componentWillMount(){
        getBatchId(this);
        getInvDc(this);
    }
    //返回按钮
    comeback=()=>{
        history.goBack();  //返回上一页这段代码
    }
    //保存方法
    batchSave=(_this)=>{

        
    }
    render() {
        const batch = this.state.batch;         //批次
        const inv = this.state.invSelect;       //下拉框

        const detailUi =  <WingBlank size="sm">
            <div className="datails" style={{'marginBottom': '100px'}}>
                <Flex>
                    <div className="text_left flex2">批次号:</div>
                    <div className="text_left flex2 colorBlack">{batch}</div>
                </Flex>

                <Picker data={inv}
                        title="选择入库地点"
                        cols={1}
                        value={this.state.sValue}
                        onChange={v => this.setState({ sValue: v })}
                        onOk={v => this.setState({ sValue: v })} >
                    <List.Item arrow="horizontal">入库地点</List.Item>
                </Picker>
                <List.Item
                    extra={<Switch
                        checked={this.state.checked}
                        onChange={() => {
                            this.setState({
                                checked: !this.state.checked,
                            });
                        }}
                    />}
                >上传SAP</List.Item>
                <WhiteSpace size="lg"/>

            </div>
        </WingBlank>


        return(
            <div>
                <NavBar mode="light" icon={<Icon type="left" />} onLeftClick={this.comeback}/>
                {detailUi}
                <div  id="footer">
                    <div hidden={this.state.hidden}>
                        <WingBlank size="md"><Button  type="ghost"  onClick={()=>this.batchSave(this)} style={{color: '#108ee9', 'backgroundColor': 'white', 'borderRadius': '5px', border: '1px solid #108ee9'}} >保存</Button></WingBlank>
                    </div>
                </div>
            </div>
        );
    }
}