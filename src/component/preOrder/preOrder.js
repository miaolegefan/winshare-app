import React from 'react';
import {Link} from 'react-router-dom';
import './preOrder.css'
import {Flex, WhiteSpace, WingBlank, SearchBar,Button} from 'antd-mobile';

export default class PreOrder extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            preOrder: [
                {
                    "_token": "3f000acec69ea10f928dd8247bf5068e",
                    "objectVersionNumber": 4,
                    "creationDate": "2019-08-22 12:37:11",
                    "id": 2181,
                    "fuzzy": null,
                    "subCode": null,
                    "startTime": null,
                    "endTime": null,
                    "preOrderNo": "YY19QJ00001",
                    "season": "19QJ00",
                    "printeryCode": null,
                    "printery": "印厂",
                    "press": "四川出版社",
                    "bookName": "高等数学",
                    "price": 12.0,
                    "isbn": "12012",
                    "bookSize": "1",
                    "bookSizeSpec": "12",
                    "sheet": 13.0,
                    "preMenge": 24.0,
                    "coverCraft": "1",
                    "bindStyle": "1",
                    "bindSequence": "1、******。\n2、oooo。",
                    "others": "测试",
                    "serviceCondition": "测试",
                    "attachment": null,
                    "planDeliveryDate": "2019-08-08 00:00:00",
                    "remark": "测试",
                    "auditor": "经理1",
                    "auditDate": "2019-08-22 13:35:50",
                    "printeryConfirm": "1",
                    "printeryConfirmDate": "2019-08-22 05:31:56",
                    "materialsConfirm": null,
                    "materialsConfirmDate": "2019-08-22 00:00:00",
                    "printeryConfirmPerson": "辰东",
                    "materialsConfirmPerson": null,
                    "createdName": "林海伦",
                    "isDeleted": "0",
                    "approveResult": "已通过",
                    "items": null
                },
                {
                    "_token": "8fc94daf6f80cda52e85adde83a7d5a4",
                    "objectVersionNumber": 2,
                    "creationDate": "2019-08-22 12:53:11",
                    "id": 2182,
                    "fuzzy": null,
                    "subCode": null,
                    "startTime": null,
                    "endTime": null,
                    "preOrderNo": "YY19QJ00002",
                    "season": "19QJ00",
                    "printeryCode": null,
                    "printery": "测试印厂",
                    "press": "少儿出版社",
                    "bookName": "小鸭子",
                    "price": 13.0,
                    "isbn": "13021345678",
                    "bookSize": "1",
                    "bookSizeSpec": "12",
                    "sheet": 12.0,
                    "preMenge": 13.0,
                    "coverCraft": "1",
                    "bindStyle": "1",
                    "bindSequence": "1、*******。\n2、测试。",
                    "others": "测试",
                    "serviceCondition": "测试",
                    "attachment": null,
                    "planDeliveryDate": "2019-08-22 00:00:00",
                    "remark": "测试",
                    "auditor": null,
                    "auditDate": null,
                    "printeryConfirm": null,
                    "printeryConfirmDate": "2019-08-22 00:00:00",
                    "materialsConfirm": null,
                    "materialsConfirmDate": "2019-08-22 00:00:00",
                    "printeryConfirmPerson": null,
                    "materialsConfirmPerson": null,
                    "createdName": "林海伦",
                    "isDeleted": "0",
                    "approveResult": "新建",
                    "items": null
                },
            ],
        }
    }

    submit=(value)=>{
        console.log(value);
    }


    render() {
        const preOrderList = this.state.preOrder.map((preOrderItem, index) => (
            <Link to={`/preOrder/details/${preOrderItem.id}`} key={index}>
                <section className='pre_order_sec' style={{backgroundColor: '#fff'}}>
                    <WingBlank size="md">
                        <div style={{color: '#787878'}}>
                            <Flex>
                                <div style={{flex: 1}}>{preOrderItem.season}</div>
                                <div style={{flex: 2}}/>
                                <div style={{flex: 1}}>{preOrderItem.preOrderNo}</div>
                            </Flex>
                            <WhiteSpace/>
                            <Flex style={{color: '#000000'}}><strong>{preOrderItem.bookName}</strong></Flex>
                            <WhiteSpace/>
                            <Flex>
                                <div style={{flex: 1}}>印厂确认时间:</div>
                                <div style={{flex: 2}}>{preOrderItem.printeryConfirmDate}</div>
                            </Flex>
                            <Flex>
                                <div style={{flex: 1}}>物资公司确认时间:</div>
                                <div style={{flex: 2}}>{preOrderItem.materialsConfirmDate}</div>
                            </Flex>
                        </div>
                    </WingBlank>
                </section>
            </Link>

        ));
        return (
            <div>
                <SearchBar
                    placeholder="Search"
                    onSubmit={this.submit}

                />
                {preOrderList}



                    <Button type="ghost"  style={{ width: '100%' }} className="am-button-ghost" hidden={true}>inline ghost</Button>




            </div>
        );
    }

}