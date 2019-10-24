import React from 'react';
import axios from "axios";
import {createHashHistory} from 'history'
import {Button, Flex, Icon, WhiteSpace, Picker, NavBar, List, Switch, WingBlank, Toast} from "antd-mobile";
import '../invDc/invDc.css';
import moment from 'moment';
import '../common.css';
const history = createHashHistory();//返回上一页这段代码
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
//保存
function save(detail,_this) {
    //入库地址是否选择
    if(_this.state.sValue.length>0) {

        //是否上传SAP
        const isUploadSap = _this.state.checked;
        //入库地点code
        const DcCode = _this.state.sValue[0].split("-")[0];
        //入库地点名称
        const DcName = _this.state.sValue[0].split("-")[1];
        const data = {
            "orderNo": detail.orderNo,
            "id": detail.id,
            "inv": DcName,
            "batchId": _this.state.batch,
            "invCode": DcCode,
            "isUploadSap": isUploadSap,
            "objectVersionNumber": detail.objectVersionNumber
        };

        axios.post('/api/public/moblie-inv/save', data).then(function (response) {
            if (response.data.success) {
                Toast.info('保存成功', 3);
                _this.setState({
                    hidden: true
                })
            } else {
                Toast.info('保存失败 !!!', 3);
            }
        })
    }else{
        Toast.info('请选择入库地址 !!!', 3);
    }
}

//查询数据
function getOrderData(_this,orderNo) {
    const data = {"orderNo":orderNo};
    axios.post('/api/public/moblie-invDcData/query?userId='+sessionStorage.userId+'&roleId='+sessionStorage.roleId+
        '&page='+1+''+'&pageSize='+10,data).then(function(response){
        if(response.data.success){
            _this.setState({
                detail : response.data.rows[0],
            });
            if(response.data.rows[0].isUploadSap == 'Y'){
                _this.setState({
                    checked:'Y'
                })
            }else{
                _this.setState({
                    checked:'N'
                })
            }
        }else{
            Toast.info('查询数据失败 !!!', 2);
        }
    })
}


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


export default class invDcDetail  extends React.Component{

    constructor(props){
        super(props)
        this.state={
            orderInvState:this.props.location.orderInvState?this.props.location.orderInvState:'',
            batch:'无',
            checked: 'N',
            hidden:false,
            invSelect:[],
            detail:[],
            sValue:[]
        }
    }

    componentWillMount() {
        const orderNo = this.props.match.params.orderNo;
        getBatchId(this);
        getInvDc(this);
        getOrderData(this,orderNo);
    }

    //返回按钮
    comeback=()=>{
        history.goBack();  //返回上一页这段代码
        this.props.history.push({pathname:'/invDc',orderInvState:this.state.orderInvState});//带父页面参数返回
    }

    //跳转更多
    onSkip=()=>{
        const season = this.state.detail.season;
        const subCode = this.state.detail.subCode;
        this.props.history.push({pathname:'/invDc/data/more/',season:season,subCode:subCode});
    }
    //sap onchange事件
    sapOnChange=(value) => {
        this.setState({
            checked: value[0]
        });
    }

    render() {
        const batch = this.state.batch;         //批次
        const inv = this.state.invSelect;       //下拉框
        const checkSap =   [
            {
                value: 'Y',
                label: '是',
            },
            {
                value: 'N',
                label: '否',
            }]
        const detail = this.state.detail;
        const detailUi =  <WingBlank size="sm">
            <div className="datails" style={{'marginBottom': '100px'}}>
                <Flex>
                    <div className="text_left flex2">制单日期:</div>
                    <div className="text_left flex2 colorBlack">{detail.orderDate?moment(detail.orderDate).format('YYYY-MM-DD'):detail.orderDate}</div>
                </Flex>
                <Flex>
                    <div className="text_left flex2">征订日期:</div>
                    <div className="text_left flex2 colorBlack">{detail.season}</div>
                </Flex>
                <Flex>
                    <div className="text_left flex2">征订代码:</div>
                    <div className="text_left flex2 colorBlack">{detail.subCode}</div>
                </Flex>
                <Flex>
                    <div className="text_left flex2">印厂:</div>
                    <div className="text_left flex2 colorBlack">{detail.printeryName}</div>
                </Flex>
                <Flex>
                    <div className="text_left flex2">印数:</div>
                    <div className="text_left flex2 colorBlack">{detail.printMenge}</div>
                </Flex>
                <Flex>
                    <div className="text_left flex2">商品编码:</div>
                    <div className="text_left flex2 colorBlack">{detail.bookCode}</div>
                </Flex>
                <Flex>
                    <div className="text_left flex2">商品名称:</div>
                    <div className="text_left flex2 colorBlack">{detail.bookName}</div>
                </Flex>
                <WhiteSpace size="lg"/>
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

                <Picker
                    data={checkSap}
                    title="是否上传SAP"
                    onChange={this.sapOnChange}
                    cols={1}
                    value={[this.state.checked]}
                    style={{width:"100%"}}
                >
                    <List.Item arrow="horizontal">上传SAP</List.Item>
                </Picker>

                <WhiteSpace size="lg"/>
                <Flex>
                    <div className="font07 text_right flex1" >
                        <Button  onClick={this.onSkip}  inline style={{ marginRight: '4px' }}>查看更多</Button>
                    </div>
                </Flex>
            </div>
        </WingBlank>


        return(
            <div>
                <NavBar mode="light" icon={<Icon type="left" />} onLeftClick={this.comeback}/>
                {detailUi}
                <div  id="footer">
                    <div hidden={this.state.hidden}>
                    <WingBlank size="md"><Button  type="ghost"  onClick={()=>save(detail,this)} style={{color: '#108ee9', 'backgroundColor': 'white', 'borderRadius': '5px', border: '1px solid #108ee9'}} >保存</Button></WingBlank>
                    </div>
                </div>
            </div>
        );
    }

}