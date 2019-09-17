import React from 'react';
import {Button, List, Radio, WingBlank, WhiteSpace, Modal, Picker, Toast, Flex} from 'antd-mobile';
import axios from "axios";
import {Link} from "react-router-dom";
import moment from 'moment'
import Select from 'antd/lib/select';



function query(_this,dealStatus) {
    axios.post('/api/public/wl/receive/appoint/query?userId=10021',{}).then(function(response){
        if(response.data.success){
            _this.setState({
                orderDelivery : response.data.rows,
                search:response.data.rows
            });
        }
    })

}


const { Option } = Select;
export default class wlConfirm extends React.Component{

constructor(props){
    super(props)
    this.state={
        orderDelivery:[],
        search:[],
        locale: 'English',
    }
}


componentDidMount() {
        query(this,'')
}

    onChange = (value) => {
        this.setState({
            locale: value[0],
        });
    }

render() {
    const { locale } = this.state;
    const list =this.state.orderDelivery.map((item,index) => (
        <Link to={{pathname:'/wlConfirm/detail',detail:item}} key={index}>
            <section className="section">
                <Flex>
                    <div className="font07 text_left flex1">{moment(item.appointDate).format('YYYY-MM-DD')}{item.appointPeriod}</div>
                    <div className="font07 text_right flex1" >{item.dealStatus}</div>
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

    const languages = [
        {
            value: '中国',
            label: '中国',
            language: undefined,
        },
        {
            value: 'English',
            label: 'English',
            language: '',
        },
        {
            value: 'Русский',
            label: 'Русский',
            language: '',
        },
    ];
    return(
        <div>
            <Picker
                data={languages}
                onChange={this.onChange}
                cols={1}
                value={[locale]}
            >
                <List.Item arrow="horizontal">Choose language</List.Item>
            </Picker>
            {list}

        </div>
    );
}

}