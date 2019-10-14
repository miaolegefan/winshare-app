import React from 'react';
import axios from "axios";
import {Link} from "react-router-dom";
import {Flex, Icon, NavBar, SearchBar,Toast,Checkbox,Button} from "antd-mobile";
import {createHashHistory} from 'history'
import moment from "moment/moment";  //返回上一页这段代码
const history = createHashHistory();//返回上一页这段代码
const CheckboxItem = Checkbox.CheckboxItem;

//获取INV为空的印单（类型为正常的）
function getOrderData(_this) {
    axios.post('/api/public/moblie-invDcData/query?userId='+sessionStorage.userId+'&roleId='+sessionStorage.roleId,{}).then(function(response){
        if(response.data.success){
            const orderInv = response.data.rows;
             // [{"objectVersionNumber":6,"id":306,"season":"18QJ00","fuzzy":null,"orderNo":"20191902","noticeNo":"18QJ20191902","subjectNo":"198007","auditDate":null,"editionPrintTimes":"01-0101","bookName":"高中语文必修2（配人教）1年级下/目","press":"四川教育出版社有限公司","coopForm":null,"businessType":null,"orderDate":null,"wagesSum":null,"printeryPrintTimes":"1","orderMaker":"李夏影","batchId":null,"printeryIsConfirm":"1","receiveStatus":null,"appointStatus":null,"orderCategory":"0","startTime":null,"endTime":null,"bookSizeSpec":"185*260","perform":"原创1-2","pressCode":null,"subCode":"00021716","unitSheet":8.0,"supplierSendPaperDate":null,"coopFormCode":null,"noticeDate":"2019-10-09 00:00:00","bookCode":"102666645","printMenge":1000.0,"printMengeSum":1.0,"bookSize":"16","businessTypeCode":null,"printeryName":"成都祥华印务有限责任公司YC0102","isbn":"978-7-5408-1212-6","printeryReceiveDate":"2019-10-12 14:23:03","printeryReceiveOp":"管理员","auditor":"朱军","requireSendDate":"2019-10-17 00:00:00","sendAddr1":"库房","sendAddr2":"出版公司","sendAddr3":"教育服务事业部产品研发部","sendAddr4":"教育服务事业部采供部","sendAddr5":"四川教育出版社","sampleMenge":76.0,"bindStyle":"胶订","isUploadSap":"Y","coverCraft":"上光油","price":20.0,"costState":null,"printeryCode":null,"auditMark":null,"sendMenge1":1000.0,"sendMenge2":20.0,"sendMenge3":20.0,"sendMenge4":6.0,"sendMenge5":30.0,"createName":null,"inv":null,"remark":null,"appointMenge":null,"invCode":null,"items":null,"costs":null,"newRequireSendDate":null,"processStatus":"in","lovCondition":null,"virtuals":null,"details":null},
             //    {"objectVersionNumber":7,"id":279,"season":"18QJ00","fuzzy":null,"orderNo":"20191903","noticeNo":"18QJ20191903","subjectNo":"198005","auditDate":null,"editionPrintTimes":"01-0101","bookName":"生物学习与检测（配济南版）7下","press":"四川教育出版社有限公司","coopForm":null,"businessType":null,"orderDate":null,"wagesSum":null,"printeryPrintTimes":null,"orderMaker":"熊安琪","batchId":null,"printeryIsConfirm":"1","receiveStatus":null,"appointStatus":null,"orderCategory":"0","startTime":null,"endTime":null,"bookSizeSpec":null,"perform":"原创1-2","pressCode":null,"subCode":"00030632","unitSheet":3.0,"supplierSendPaperDate":null,"coopFormCode":null,"noticeDate":"2019-10-09 00:00:00","bookCode":"102665887","printMenge":10000.0,"printMengeSum":1.0,"bookSize":"16","businessTypeCode":null,"printeryName":"B123","isbn":"978-7-107-18704-9","printeryReceiveDate":"2019-10-10 10:56:12","printeryReceiveOp":"李嘉","auditor":"朱军","requireSendDate":"2019-10-12 00:00:00","sendAddr1":null,"sendAddr2":null,"sendAddr3":null,"sendAddr4":null,"sendAddr5":null,"sampleMenge":76.0,"bindStyle":"Z胶订","isUploadSap":"Y","coverCraft":null,"price":10.0,"costState":"0","printeryCode":null,"auditMark":null,"sendMenge1":null,"sendMenge2":null,"sendMenge3":null,"sendMenge4":null,"sendMenge5":null,"createName":null,"inv":null,"remark":null,"appointMenge":null,"invCode":null,"items":null,"costs":null,"newRequireSendDate":null,"processStatus":null,"lovCondition":null,"virtuals":null,"details":null},
             //    {"objectVersionNumber":7,"id":279,"season":"18QJ00","fuzzy":null,"orderNo":"20191903","noticeNo":"18QJ20191903","subjectNo":"198005","auditDate":null,"editionPrintTimes":"01-0101","bookName":"生物学习与检测（配济南版）7下","press":"四川教育出版社有限公司","coopForm":null,"businessType":null,"orderDate":null,"wagesSum":null,"printeryPrintTimes":null,"orderMaker":"熊安琪","batchId":null,"printeryIsConfirm":"1","receiveStatus":null,"appointStatus":null,"orderCategory":"0","startTime":null,"endTime":null,"bookSizeSpec":null,"perform":"原创1-2","pressCode":null,"subCode":"00030632","unitSheet":3.0,"supplierSendPaperDate":null,"coopFormCode":null,"noticeDate":"2019-10-09 00:00:00","bookCode":"102665887","printMenge":10000.0,"printMengeSum":1.0,"bookSize":"16","businessTypeCode":null,"printeryName":"B123","isbn":"978-7-107-18704-9","printeryReceiveDate":"2019-10-10 10:56:12","printeryReceiveOp":"李嘉","auditor":"朱军","requireSendDate":"2019-10-12 00:00:00","sendAddr1":null,"sendAddr2":null,"sendAddr3":null,"sendAddr4":null,"sendAddr5":null,"sampleMenge":76.0,"bindStyle":"Z胶订","isUploadSap":"Y","coverCraft":null,"price":10.0,"costState":"0","printeryCode":null,"auditMark":null,"sendMenge1":null,"sendMenge2":null,"sendMenge3":null,"sendMenge4":null,"sendMenge5":null,"createName":null,"inv":null,"remark":null,"appointMenge":null,"invCode":null,"items":null,"costs":null,"newRequireSendDate":null,"processStatus":null,"lovCondition":null,"virtuals":null,"details":null},
             //    {"objectVersionNumber":7,"id":279,"season":"18QJ00","fuzzy":null,"orderNo":"20191903","noticeNo":"18QJ20191903","subjectNo":"198005","auditDate":null,"editionPrintTimes":"01-0101","bookName":"生物学习与检测（配济南版）7下","press":"四川教育出版社有限公司","coopForm":null,"businessType":null,"orderDate":null,"wagesSum":null,"printeryPrintTimes":null,"orderMaker":"熊安琪","batchId":null,"printeryIsConfirm":"1","receiveStatus":null,"appointStatus":null,"orderCategory":"0","startTime":null,"endTime":null,"bookSizeSpec":null,"perform":"原创1-2","pressCode":null,"subCode":"00030632","unitSheet":3.0,"supplierSendPaperDate":null,"coopFormCode":null,"noticeDate":"2019-10-09 00:00:00","bookCode":"102665887","printMenge":10000.0,"printMengeSum":1.0,"bookSize":"16","businessTypeCode":null,"printeryName":"B123","isbn":"978-7-107-18704-9","printeryReceiveDate":"2019-10-10 10:56:12","printeryReceiveOp":"李嘉","auditor":"朱军","requireSendDate":"2019-10-12 00:00:00","sendAddr1":null,"sendAddr2":null,"sendAddr3":null,"sendAddr4":null,"sendAddr5":null,"sampleMenge":76.0,"bindStyle":"Z胶订","isUploadSap":"Y","coverCraft":null,"price":10.0,"costState":"0","printeryCode":null,"auditMark":null,"sendMenge1":null,"sendMenge2":null,"sendMenge3":null,"sendMenge4":null,"sendMenge5":null,"createName":null,"inv":null,"remark":null,"appointMenge":null,"invCode":null,"items":null,"costs":null,"newRequireSendDate":null,"processStatus":null,"lovCondition":null,"virtuals":null,"details":null},
             //    {"objectVersionNumber":7,"id":279,"season":"18QJ00","fuzzy":null,"orderNo":"20191903","noticeNo":"18QJ20191903","subjectNo":"198005","auditDate":null,"editionPrintTimes":"01-0101","bookName":"生物学习与检测（配济南版）7下","press":"四川教育出版社有限公司","coopForm":null,"businessType":null,"orderDate":null,"wagesSum":null,"printeryPrintTimes":null,"orderMaker":"熊安琪","batchId":null,"printeryIsConfirm":"1","receiveStatus":null,"appointStatus":null,"orderCategory":"0","startTime":null,"endTime":null,"bookSizeSpec":null,"perform":"原创1-2","pressCode":null,"subCode":"00030632","unitSheet":3.0,"supplierSendPaperDate":null,"coopFormCode":null,"noticeDate":"2019-10-09 00:00:00","bookCode":"102665887","printMenge":10000.0,"printMengeSum":1.0,"bookSize":"16","businessTypeCode":null,"printeryName":"B123","isbn":"978-7-107-18704-9","printeryReceiveDate":"2019-10-10 10:56:12","printeryReceiveOp":"李嘉","auditor":"朱军","requireSendDate":"2019-10-12 00:00:00","sendAddr1":null,"sendAddr2":null,"sendAddr3":null,"sendAddr4":null,"sendAddr5":null,"sampleMenge":76.0,"bindStyle":"Z胶订","isUploadSap":"Y","coverCraft":null,"price":10.0,"costState":"0","printeryCode":null,"auditMark":null,"sendMenge1":null,"sendMenge2":null,"sendMenge3":null,"sendMenge4":null,"sendMenge5":null,"createName":null,"inv":null,"remark":null,"appointMenge":null,"invCode":null,"items":null,"costs":null,"newRequireSendDate":null,"processStatus":null,"lovCondition":null,"virtuals":null,"details":null},
             //    {"objectVersionNumber":7,"id":279,"season":"18QJ00","fuzzy":null,"orderNo":"20191903","noticeNo":"18QJ20191903","subjectNo":"198005","auditDate":null,"editionPrintTimes":"01-0101","bookName":"生物学习与检测（配济南版）7下","press":"四川教育出版社有限公司","coopForm":null,"businessType":null,"orderDate":null,"wagesSum":null,"printeryPrintTimes":null,"orderMaker":"熊安琪","batchId":null,"printeryIsConfirm":"1","receiveStatus":null,"appointStatus":null,"orderCategory":"0","startTime":null,"endTime":null,"bookSizeSpec":null,"perform":"原创1-2","pressCode":null,"subCode":"00030632","unitSheet":3.0,"supplierSendPaperDate":null,"coopFormCode":null,"noticeDate":"2019-10-09 00:00:00","bookCode":"102665887","printMenge":10000.0,"printMengeSum":1.0,"bookSize":"16","businessTypeCode":null,"printeryName":"B123","isbn":"978-7-107-18704-9","printeryReceiveDate":"2019-10-10 10:56:12","printeryReceiveOp":"李嘉","auditor":"朱军","requireSendDate":"2019-10-12 00:00:00","sendAddr1":null,"sendAddr2":null,"sendAddr3":null,"sendAddr4":null,"sendAddr5":null,"sampleMenge":76.0,"bindStyle":"Z胶订","isUploadSap":"Y","coverCraft":null,"price":10.0,"costState":"0","printeryCode":null,"auditMark":null,"sendMenge1":null,"sendMenge2":null,"sendMenge3":null,"sendMenge4":null,"sendMenge5":null,"createName":null,"inv":null,"remark":null,"appointMenge":null,"invCode":null,"items":null,"costs":null,"newRequireSendDate":null,"processStatus":null,"lovCondition":null,"virtuals":null,"details":null}]

            orderInv.map((item,index)=>{
                item.checked=false //复选框默认未选择
            })
            _this.setState({
                orderInv : orderInv,
                search:orderInv
            });
        }else{
            Toast.info('查询数据失败 !!!', 2);
        }
    })
}



function search(arr, q) {
    return arr.filter(v => Object.values(v).some(v => new RegExp(q + '').test(v)));
}


export default class invDcHead extends React.Component{
    constructor(props){
        super(props)
        this.state={
            orderInv:[],
            search:[],
            invSelect:[],
            allCheck:false
        }
    }


    componentWillMount() {
    getOrderData(this);

    }

    //返回按钮
    comeback=()=>{
        history.goBack();  //返回上一页这段代码
    }

    //查询事件
    onSearch = (val) => {
        const value = search(this.state.search,val);
        this.setState({
            orderInv: value
        });

    }
    //复选框改变事件
    checkOnChange = (val,_this) => {
        const orderInv = _this.state.orderInv;
        orderInv.map((item)=>{
            if(item.orderNo == val.orderNo){
                item.checked = !item.checked
            }
        })
        //判断是否为全选
        let allCheck = false;
        let checkNo = 0;
        orderInv.map((item)=>{
            if(item.checked){
                checkNo ++;
            }
        })
        if(checkNo == orderInv.length){
            allCheck = true;
        }
        _this.setState({
            orderInv:orderInv,
            allCheck:allCheck
        })
    }
    //全选改变时间
    allCheckOnChange=(_this)=>{
        let allCheck = !_this.state.allCheck;
        const orderInv = _this.state.orderInv;
        orderInv.map((item)=>{
            item.checked = allCheck
        })
        _this.setState({
            orderInv:orderInv,
            allCheck:allCheck
        })
    }

    //批量选择入库地址
    batchSave=(_this)=>{
        let orderInv = _this.state.orderInv;
        let orderInvCheck = [];
        orderInv.map((item)=>{
            if(item.checked){
                orderInvCheck.push(item);
            }
        })
        if(orderInvCheck.length>0) {
            this.props.history.push({pathname: '/invDcBatch', orderInvCheck: orderInvCheck});
        }else{
            Toast.info('请选择需要更新入库地址的数据', 1);
        }
    }

    render() {
        const orderList = this.state.orderInv.map((item,index) =>(
            <CheckboxItem key={index} onChange={() => this.checkOnChange(item,this)} checked={item.checked}>

            <Link to={{pathname:'/invDc/detail/'+item.orderNo,orderDetail:item}} key={index}>
                    <section style={{border:"thin #E8E8E8 ",color: "#787878",backgroundColor: "white",lineHeight:"3"}}>
                        <Flex>
                            <div className="font07 text_left flex1">{item.orderDate}</div>
                            <div className="font07 text_right flex1" >{item.orderNo}</div>
                        </Flex>
                        <Flex>
                            <div className="text_left  colorBlack"><strong>{item.bookName}</strong></div>
                            {/*<div className="font07 text_right flex2" >{moment(item.auditDate).format('YYYY-MM-DD')}</div>*/}
                        </Flex>
                        <Flex>
                            <div className="font07 text_left flex1">
                                <Flex>
                                    <div className="text_left ">印厂:</div>
                                    <div className="text_left margin-left">{item.printeryName}</div>
                                </Flex>
                            </div>
                        </Flex>
                        <Flex>
                            <div className="font07 text_left flex1">
                                <Flex>
                                    <div className="text_left ">征订期:</div>
                                    <div className="text_left margin-left">{item.season}</div>
                                </Flex>
                            </div>
                            <div className="font07 text_right flex1" >
                                <Flex>
                                    <div className="text_right flex1">征订代码:</div>
                                    <div className="text_left flex1 margin-left">{item.subCode}</div>
                                </Flex>
                            </div>
                        </Flex>
                        <Flex>
                            <div className="font07 text_left flex1">
                                <Flex>
                                    <div className="text_left ">印数:</div>
                                    <div className="text_left margin-left">{item.printMenge}</div>
                                </Flex>
                            </div>
                            <div className="font07 text_right flex1" >
                                <Flex>
                                    <div className="text_right flex1">要求送书日期:</div>
                                    <div className="text_left flex1 margin-left">
                                        {item.requireSendDate?moment(item.requireSendDate).format('YYYY-MM-DD'):item.requireSendDate}
                                    </div>
                                </Flex>
                            </div>
                        </Flex>
                    </section>
                </Link>
            </CheckboxItem>
            )
        )





        return(
            <div >


            <NavBar mode="light" icon={<Icon type="left" />} onLeftClick={this.comeback}>
                    <SearchBar style={{width:"100%"}}
                               placeholder="Search"
                               showCancelButton={true}
                               onChange={this.onSearch}/>
                </NavBar>
                <div style={{height:"11rem",  overflow:"auto"}}>
                {orderList}
                </div>
               <div >
                   <CheckboxItem style={{backgroundColor:'#ABABAB'}}checked={this.state.allCheck} onChange={() => this.allCheckOnChange(this)}>
                       <Button  type="primary" onClick={()=>this.batchSave(this)} size="small"  style={{}} >批量选择入库地址</Button>
                   </CheckboxItem>

               </div>
            </div>
        );
    }

}