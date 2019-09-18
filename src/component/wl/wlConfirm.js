import React from 'react';
import {Button, List, Radio, WingBlank, WhiteSpace, Modal, Picker, Toast, Flex, NavBar, Icon} from 'antd-mobile';
import axios from "axios";
import {Link} from "react-router-dom";
import moment from 'moment'
import Select from 'antd/lib/select';
import {createHashHistory} from 'history'  //返回上一页这段代码
const history = createHashHistory();//返回上一页这段代码


//查询
function query(_this) {
    axios.post('/api/public/wl/receive/appoint/query?userId='+sessionStorage.userId,{}).then(function(response){
        if(response.data.success){
            _this.setState({
                orderDelivery : response.data.rows,
                search:response.data.rows
            });
        }
    })

}


//状态查询
function search(arr, q) {

    if(q =='未处理'){
        arr =   arr.filter(function (v) {
            return  v.dealStatus == null;
        })
    }else if(q == '已同意'){
        arr =  arr.filter(function (v) {
            return  v.dealStatus == '确认';
        })
    }else if(q =='已拒绝'){
        arr =  arr.filter(function (v) {
            return  v.dealStatus == '拒绝';
        })
    }
    return arr;
}



export default class wlConfirm extends React.Component{

constructor(props){
    super(props)
    this.state={
        orderDelivery:[],
        search:[],
        locale: '全部 ',
    }
}


componentDidMount() {
        // query(this,'')
    this.setState({
        orderDelivery :  [{"_token":"e078580c9dd1c5d4bdb7399f6f4483b1","objectVersionNumber":3,"id":24,
            "appointDate":"2019-08-23 00:00:00","appointRegTime":"2019-08-22 11:22:52","appointPeriod":"上午",
            "printeryName":"A印厂","printeryRemark":null,"bookName":"三国",
            "bookCode":"0870141","appointMenge":1200,"volumeMenge":12,"carsMenge":12,"sender":"供应商",
            "bindery":null,"binderyContact":null,"inv":null,"dealDate":"2019-08-22 21:00:12","remark":" 这是备注这是备注这是备注这是备注这是备注这是备注这是备注这是备注这是备注这是备注",
            "carShipNum":null,"binderyTel":null,"dealer":"admin","receiveMenge":1200,"orderNo":"0870",
            "notInMenge":null,"dealStatus":"确认","inputCondition":null,"appointStartDate":null,
            "appointEndDate":null},{"_token":"3c035f546b3a5e2be56e11820b29f85a","objectVersionNumber":3,"id":25,"appointDate":"2019-08-24 00:00:00","appointRegTime":"2019-08-22 22:59:35","appointPeriod":"上午","printeryName":"B印厂","printeryRemark":null,"bookName":"普通书籍","bookCode":"1","appointMenge":100,"volumeMenge":1,"carsMenge":12,"sender":null,"bindery":null,"binderyContact":null,"inv":"1","dealDate":"2019-09-17 13:53:57","remark":null,"carShipNum":null,"binderyTel":null,"dealer":"admin","receiveMenge":0,"orderNo":"12102","notInMenge":null,"dealStatus":"拒绝","inputCondition":null,"appointStartDate":null,"appointEndDate":null},{"_token":"b5bf7fb28a17595265bbc7b487d74bdb","objectVersionNumber":3,"id":43,"appointDate":"2019-08-26 00:00:00","appointRegTime":null,"appointPeriod":"上午","printeryName":"B印厂","printeryRemark":null,"bookName":"普通书籍","bookCode":"1","appointMenge":1,"volumeMenge":1,"carsMenge":1,"sender":null,"bindery":null,"binderyContact":null,"inv":"1","dealDate":"2019-08-27 19:48:24","remark":null,"carShipNum":null,"binderyTel":null,"dealer":"admin","receiveMenge":1,"orderNo":"12102","notInMenge":null,"dealStatus":null,"inputCondition":null,"appointStartDate":null,"appointEndDate":null},{"_token":"a34deeea3ca9021b2aca011af594acb1","objectVersionNumber":12,"id":1,"appointDate":"2019-08-07 14:22:11","appointRegTime":"2019-08-16 14:22:15","appointPeriod":"上午","printeryName":"四川新华印刷有限责任公司YC0022","printeryRemark":"晚到4天","bookName":"新课标.生物八下","bookCode":"102313941","appointMenge":288000,"volumeMenge":12,"carsMenge":10,"sender":null,"bindery":null,"binderyContact":null,"inv":null,"dealDate":"2019-08-21 23:11:04","remark":"999","carShipNum":null,"binderyTel":null,"dealer":"admin","receiveMenge":1100,"orderNo":"12102","notInMenge":null,"dealStatus":"确认","inputCondition":null,"appointStartDate":null,"appointEndDate":null},{"_token":"c86f071c0a0e15298184de3ce0ad3140","objectVersionNumber":1,"id":62,"appointDate":"2019-09-06 00:00:00","appointRegTime":"2019-09-04 22:44:47","appointPeriod":"下午","printeryName":"测试印厂","printeryRemark":null,"bookName":"三国","bookCode":"1","appointMenge":0,"volumeMenge":0,"carsMenge":0,"sender":null,"bindery":null,"binderyContact":null,"inv":"1","dealDate":"2019-09-17 11:02:11","remark":null,"carShipNum":null,"binderyTel":null,"dealer":"admin","receiveMenge":null,"orderNo":"12103","notInMenge":null,"dealStatus":"确认","inputCondition":null,"appointStartDate":null,"appointEndDate":null},{"_token":"475b462279e9ef0987c4fdd6a159d859","objectVersionNumber":1,"id":61,"appointDate":"2019-09-06 00:00:00","appointRegTime":"2019-09-04 22:43:11","appointPeriod":"下午","printeryName":"测试印厂","printeryRemark":null,"bookName":"三国","bookCode":"1","appointMenge":0,"volumeMenge":0,"carsMenge":0,"sender":null,"bindery":null,"binderyContact":null,"inv":"1","dealDate":"2019-09-17 11:02:11","remark":null,"carShipNum":null,"binderyTel":null,"dealer":"admin","receiveMenge":null,"orderNo":"12103","notInMenge":null,"dealStatus":"确认","inputCondition":null,"appointStartDate":null,"appointEndDate":null},{"_token":"28f8ab48af9440bdae649e7a9307e386","objectVersionNumber":1,"id":45,"appointDate":"2019-08-29 00:00:00","appointRegTime":"2019-08-27 20:06:15","appointPeriod":"上午","printeryName":"测试印厂","printeryRemark":null,"bookName":"三国","bookCode":"1","appointMenge":3,"volumeMenge":3,"carsMenge":3,"sender":null,"bindery":null,"binderyContact":null,"inv":"1","dealDate":"2019-09-17 11:02:11","remark":null,"carShipNum":null,"binderyTel":null,"dealer":"admin","receiveMenge":null,"orderNo":"12103","notInMenge":null,"dealStatus":"确认","inputCondition":null,"appointStartDate":null,"appointEndDate":null},{"_token":"0e5c5fe22f2f6f4520a385a23cc2ba87","objectVersionNumber":10,"id":44,"appointDate":"2019-08-29 00:00:00","appointRegTime":null,"appointPeriod":"上午","printeryName":"测试印厂","printeryRemark":null,"bookName":"三国","bookCode":"1","appointMenge":3,"volumeMenge":5,"carsMenge":3,"sender":null,"bindery":null,"binderyContact":null,"inv":"1","dealDate":"2019-09-17 11:02:11","remark":null,"carShipNum":null,"binderyTel":null,"dealer":"admin","receiveMenge":null,"orderNo":"12103","notInMenge":null,"dealStatus":"确认","inputCondition":null,"appointStartDate":null,"appointEndDate":null},{"_token":"aa35d0e361e5f24e0abc498d872bd0cc","objectVersionNumber":5,"id":42,"appointDate":"2019-08-29 00:00:00","appointRegTime":null,"appointPeriod":"下午","printeryName":"测试印厂","printeryRemark":null,"bookName":"三国","bookCode":"1","appointMenge":1,"volumeMenge":2,"carsMenge":1,"sender":null,"bindery":null,"binderyContact":null,"inv":"1","dealDate":"2019-09-04 22:49:23","remark":null,"carShipNum":null,"binderyTel":null,"dealer":"admin","receiveMenge":1,"orderNo":"12103","notInMenge":null,"dealStatus":"确认","inputCondition":null,"appointStartDate":null,"appointEndDate":null},{"_token":"6851dea6faf4fd74e947fba66be2df4a","objectVersionNumber":2,"id":41,"appointDate":"2019-08-27 00:00:00","appointRegTime":"2019-08-27 14:01:39","appointPeriod":"上午","printeryName":"测试印厂","printeryRemark":null,"bookName":"三国","bookCode":"1","appointMenge":1,"volumeMenge":1,"carsMenge":1,"sender":null,"bindery":null,"binderyContact":null,"inv":"1","dealDate":"2019-08-27 19:49:20","remark":null,"carShipNum":null,"binderyTel":null,"dealer":"admin","receiveMenge":1,"orderNo":"12103","notInMenge":null,"dealStatus":"确认","inputCondition":null,"appointStartDate":null,"appointEndDate":null},{"_token":"e9435ae9e8b47dccb8cf1337bafced39","objectVersionNumber":1,"id":63,"appointDate":"2019-09-06 00:00:00","appointRegTime":"2019-09-05 00:00:00","appointPeriod":"下午","printeryName":"测试印厂","printeryRemark":null,"bookName":"三国","bookCode":"1","appointMenge":0,"volumeMenge":0,"carsMenge":0,"sender":null,"bindery":null,"binderyContact":null,"inv":"1","dealDate":"2019-09-17 11:02:11","remark":null,"carShipNum":null,"binderyTel":null,"dealer":"admin","receiveMenge":null,"orderNo":"W420190022","notInMenge":null,"dealStatus":"确认","inputCondition":null,"appointStartDate":null,"appointEndDate":null}],
        search:[{"_token":"e078580c9dd1c5d4bdb7399f6f4483b1","objectVersionNumber":3,"id":24,"appointDate":"2019-08-23 00:00:00","appointRegTime":"2019-08-22 11:22:52","appointPeriod":"上午","printeryName":"A印厂","printeryRemark":null,"bookName":"三国","bookCode":"0870141","appointMenge":1200,"volumeMenge":12,"carsMenge":12,"sender":"供应商","bindery":null,"binderyContact":null,"inv":null,"dealDate":"2019-08-22 21:00:12","remark":null,"carShipNum":null,"binderyTel":null,"dealer":"admin","receiveMenge":1200,"orderNo":"0870","notInMenge":null,"dealStatus":"确认","inputCondition":null,"appointStartDate":null,"appointEndDate":null},{"_token":"3c035f546b3a5e2be56e11820b29f85a","objectVersionNumber":3,"id":25,"appointDate":"2019-08-24 00:00:00","appointRegTime":"2019-08-22 22:59:35","appointPeriod":"上午","printeryName":"B印厂","printeryRemark":null,"bookName":"普通书籍","bookCode":"1","appointMenge":100,"volumeMenge":1,"carsMenge":12,"sender":null,"bindery":null,"binderyContact":null,"inv":"1","dealDate":"2019-09-17 13:53:57","remark":null,"carShipNum":null,"binderyTel":null,"dealer":"admin","receiveMenge":0,"orderNo":"12102","notInMenge":null,"dealStatus":"拒绝","inputCondition":null,"appointStartDate":null,"appointEndDate":null},{"_token":"b5bf7fb28a17595265bbc7b487d74bdb","objectVersionNumber":3,"id":43,"appointDate":"2019-08-26 00:00:00","appointRegTime":null,"appointPeriod":"上午","printeryName":"B印厂","printeryRemark":null,"bookName":"普通书籍","bookCode":"1","appointMenge":1,"volumeMenge":1,"carsMenge":1,"sender":null,"bindery":null,"binderyContact":null,"inv":"1","dealDate":"2019-08-27 19:48:24","remark":null,"carShipNum":null,"binderyTel":null,"dealer":"admin","receiveMenge":1,"orderNo":"12102","notInMenge":null,"dealStatus":null,"inputCondition":null,"appointStartDate":null,"appointEndDate":null},{"_token":"a34deeea3ca9021b2aca011af594acb1","objectVersionNumber":12,"id":1,"appointDate":"2019-08-07 14:22:11","appointRegTime":"2019-08-16 14:22:15","appointPeriod":"上午","printeryName":"四川新华印刷有限责任公司YC0022","printeryRemark":"晚到4天","bookName":"新课标.生物八下","bookCode":"102313941","appointMenge":288000,"volumeMenge":12,"carsMenge":10,"sender":null,"bindery":null,"binderyContact":null,"inv":null,"dealDate":"2019-08-21 23:11:04","remark":"999","carShipNum":null,"binderyTel":null,"dealer":"admin","receiveMenge":1100,"orderNo":"12102","notInMenge":null,"dealStatus":"确认","inputCondition":null,"appointStartDate":null,"appointEndDate":null},{"_token":"c86f071c0a0e15298184de3ce0ad3140","objectVersionNumber":1,"id":62,"appointDate":"2019-09-06 00:00:00","appointRegTime":"2019-09-04 22:44:47","appointPeriod":"下午","printeryName":"测试印厂","printeryRemark":null,"bookName":"三国","bookCode":"1","appointMenge":0,"volumeMenge":0,"carsMenge":0,"sender":null,"bindery":null,"binderyContact":null,"inv":"1","dealDate":"2019-09-17 11:02:11","remark":null,"carShipNum":null,"binderyTel":null,"dealer":"admin","receiveMenge":null,"orderNo":"12103","notInMenge":null,"dealStatus":"确认","inputCondition":null,"appointStartDate":null,"appointEndDate":null},{"_token":"475b462279e9ef0987c4fdd6a159d859","objectVersionNumber":1,"id":61,"appointDate":"2019-09-06 00:00:00","appointRegTime":"2019-09-04 22:43:11","appointPeriod":"下午","printeryName":"测试印厂","printeryRemark":null,"bookName":"三国","bookCode":"1","appointMenge":0,"volumeMenge":0,"carsMenge":0,"sender":null,"bindery":null,"binderyContact":null,"inv":"1","dealDate":"2019-09-17 11:02:11","remark":null,"carShipNum":null,"binderyTel":null,"dealer":"admin","receiveMenge":null,"orderNo":"12103","notInMenge":null,"dealStatus":"确认","inputCondition":null,"appointStartDate":null,"appointEndDate":null},{"_token":"28f8ab48af9440bdae649e7a9307e386","objectVersionNumber":1,"id":45,"appointDate":"2019-08-29 00:00:00","appointRegTime":"2019-08-27 20:06:15","appointPeriod":"上午","printeryName":"测试印厂","printeryRemark":null,"bookName":"三国","bookCode":"1","appointMenge":3,"volumeMenge":3,"carsMenge":3,"sender":null,"bindery":null,"binderyContact":null,"inv":"1","dealDate":"2019-09-17 11:02:11","remark":null,"carShipNum":null,"binderyTel":null,"dealer":"admin","receiveMenge":null,"orderNo":"12103","notInMenge":null,"dealStatus":"确认","inputCondition":null,"appointStartDate":null,"appointEndDate":null},{"_token":"0e5c5fe22f2f6f4520a385a23cc2ba87","objectVersionNumber":10,"id":44,"appointDate":"2019-08-29 00:00:00","appointRegTime":null,"appointPeriod":"上午","printeryName":"测试印厂","printeryRemark":null,"bookName":"三国","bookCode":"1","appointMenge":3,"volumeMenge":5,"carsMenge":3,"sender":null,"bindery":null,"binderyContact":null,"inv":"1","dealDate":"2019-09-17 11:02:11","remark":null,"carShipNum":null,"binderyTel":null,"dealer":"admin","receiveMenge":null,"orderNo":"12103","notInMenge":null,"dealStatus":"确认","inputCondition":null,"appointStartDate":null,"appointEndDate":null},{"_token":"aa35d0e361e5f24e0abc498d872bd0cc","objectVersionNumber":5,"id":42,"appointDate":"2019-08-29 00:00:00","appointRegTime":null,"appointPeriod":"下午","printeryName":"测试印厂","printeryRemark":null,"bookName":"三国","bookCode":"1","appointMenge":1,"volumeMenge":2,"carsMenge":1,"sender":null,"bindery":null,"binderyContact":null,"inv":"1","dealDate":"2019-09-04 22:49:23","remark":null,"carShipNum":null,"binderyTel":null,"dealer":"admin","receiveMenge":1,"orderNo":"12103","notInMenge":null,"dealStatus":"确认","inputCondition":null,"appointStartDate":null,"appointEndDate":null},{"_token":"6851dea6faf4fd74e947fba66be2df4a","objectVersionNumber":2,"id":41,"appointDate":"2019-08-27 00:00:00","appointRegTime":"2019-08-27 14:01:39","appointPeriod":"上午","printeryName":"测试印厂","printeryRemark":null,"bookName":"三国","bookCode":"1","appointMenge":1,"volumeMenge":1,"carsMenge":1,"sender":null,"bindery":null,"binderyContact":null,"inv":"1","dealDate":"2019-08-27 19:49:20","remark":null,"carShipNum":null,"binderyTel":null,"dealer":"admin","receiveMenge":1,"orderNo":"12103","notInMenge":null,"dealStatus":"确认","inputCondition":null,"appointStartDate":null,"appointEndDate":null},{"_token":"e9435ae9e8b47dccb8cf1337bafced39","objectVersionNumber":1,"id":63,"appointDate":"2019-09-06 00:00:00","appointRegTime":"2019-09-05 00:00:00","appointPeriod":"下午","printeryName":"测试印厂","printeryRemark":null,"bookName":"三国","bookCode":"1","appointMenge":0,"volumeMenge":0,"carsMenge":0,"sender":null,"bindery":null,"binderyContact":null,"inv":"1","dealDate":"2019-09-17 11:02:11","remark":null,"carShipNum":null,"binderyTel":null,"dealer":"admin","receiveMenge":null,"orderNo":"W420190022","notInMenge":null,"dealStatus":"确认","inputCondition":null,"appointStartDate":null,"appointEndDate":null}],

    });
   }

    //返回按钮
    comeback=()=>{
        history.goBack();  //返回上一页这段代码
    }


    //筛选
    onSearch = (val) => {
        const value = search(this.state.search,val);
        this.setState({
            orderDelivery: value
        });
    }

    onChange = (value) => {
        this.setState({
            locale: value[0],
        });
    }
    onColor = (value)=>{
        let a ='';
        if(value == null){
            a = <span style={{color:'#108ee9'}}>未处理</span>;
        }else if(value == '确认'){
            a = <span style={{color:'#00ff00'}}>已同意</span>;
        }else if(value == '拒绝'){
            a = <span style={{color:'red'}}>已拒绝</span>;
        }
    return a;
    }

render() {
    const { locale } = this.state;
    const list =this.state.orderDelivery.map((item,index) => (
        <Link to={{pathname:'/wlConfirm/detail',detail:item}} key={index}>
            <section className="section">
                <Flex>
                    <div className="font07 text_left flex1">{moment(item.appointDate).format('YYYY-MM-DD')}{item.appointPeriod}</div>
                    <div className="font07 text_right flex1" >{this.onColor(item.dealStatus)}</div>
                </Flex>
                <Flex>
                    <div className="text_left flex3 colorBlack"><strong>{item.bookName}</strong></div>
                </Flex>
                <Flex>
                    <div className="font07 text_left flex1">
                        <Flex>
                            <div className="text_left ">印厂:</div>
                            <div className="text_left margin-left">{item.printeryName}</div>
                        </Flex>
                    </div>
                    <div className="font07 text_right flex1" >
                        <Flex>
                            <div className="text_right flex3">预约数量:</div>
                            <div className="text_left flex1 margin-left">{item.appointMenge}</div>
                        </Flex>
                    </div>
                </Flex>
                <Flex>
                    <div className="font07 text_left flex1">
                        <Flex>
                            <div className="text_left ">册包数:</div>
                            <div className="text_left margin-left">{item.volumeMenge}</div>
                        </Flex>
                    </div>
                    <div className="font07 text_right flex1" >
                        <Flex>
                            <div className="text_right flex3">车数量:</div>
                            <div className="text_left flex1 margin-left">{item.carsMenge}</div>
                        </Flex>
                    </div>
                </Flex>
                <Flex>
                    <div className="font07 text_left flex1">
                        <Flex>
                            <div className="text_left ">送货方:</div>
                            <div className="text_left margin-left">{item.sender}</div>
                        </Flex>
                    </div>
                </Flex>
            </section>
        </Link>
    ));

    const choose = [
        {
            value: '未处理',
            label: '未处理',
        },
        {
            value: '已拒绝',
            label: '已拒绝',
        },
        {
            value: '已同意',
            label: '已同意',
        },
    ];
    return(
        <div>
            <NavBar mode="light" icon={<Icon type="left" />} onLeftClick={this.comeback}>
                <Picker
                    data={choose}
                    onChange={this.onChange}
                    cols={1}
                    value={[locale]}
                    style={{width:"100%"}}
                >
                    <List.Item style={{width:"100%"}} arrow="horizontal">处理状态</List.Item>
                </Picker>
            </NavBar>

            {list}

        </div>
    );
}

}