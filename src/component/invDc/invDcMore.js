import React from 'react';
import axios from "axios";
import {Button, Flex, Icon, NavBar, SearchBar, Toast, WhiteSpace, WingBlank} from "antd-mobile";
import '../common.css';
import {createHashHistory} from 'history'  //返回上一页这段代码
const history = createHashHistory();//返回上一页这段代码


function getData(season,subCode,_this) {
    const data ={"season":season,"subCode":subCode};
    axios.post('/api/public/moblie-inv-more/query',data).then(function(response){
        if(response.data.success){
            _this.setState({
                data : response.data.rows,
                search:response.data.rows
            });
        }else{
            Toast.info('查询数据失败 !!!', 2);
        }
    })

}



function search(arr, q) {
    return arr.filter(v => Object.values(v).some(v => new RegExp(q + '').test(v)));
}

export default class invDcMore extends React.Component{

    constructor(props){
        super(props)
        this.state={
            data:[],
            search:[]
        }
    }


    componentWillMount() {

        getData(this.props.location.season,this.props.location.subCode,this);
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

    render() {


        const list =  this.state.data.map((item,index) =>(
            <div key={index}>
            <section className="section">
                <Flex>
                    <div className="text_left  colorBlack"><strong>{item.printeryName}</strong></div>
                </Flex>
                <Flex>
                    <div className="font07 text_left flex1">
                        <Flex>
                            <div className="text_left ">入库DC:</div>
                            <div className="text_left margin-left">{item.inv}</div>
                        </Flex>
                    </div>
                </Flex>
                <Flex>
                    <div className="font07 text_left flex1">
                        <Flex>
                            <div className="text_left ">数量:</div>
                            <div className="text_left margin-left">{item.printMenge}</div>
                        </Flex>
                    </div>
                </Flex>
                <Flex>
                    <div className="font07 text_left flex1">
                        <Flex>
                            <div className="text_left ">类别:</div>
                            <div className="text_left margin-left">正常</div>
                        </Flex>
                    </div>
                </Flex>
                <Flex>
                    <div className="font07 text_left flex1">
                        <Flex>
                            <div className="text_left ">印单号:</div>
                            <div className="text_left margin-left">{item.orderNo}</div>
                        </Flex>
                    </div>
                </Flex>

            </section>
                <WhiteSpace size="lg"/>
            </div>

        ));

        return(
            <div>

                <NavBar mode="light" icon={<Icon type="left" />} onLeftClick={this.comeback}>
                    <SearchBar style={{width:"100%"}}
                               placeholder="Search"
                               showCancelButton={true}
                               onChange={this.onSearch}/>
                </NavBar>
                {list}
            </div>


        );
    }

}