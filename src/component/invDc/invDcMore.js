import React from 'react';
import axios from "axios";
import {Button, Flex, Icon, NavBar, SearchBar, Toast, WhiteSpace, PullToRefresh} from "antd-mobile";
import '../common.css';
import {createHashHistory} from 'history'  //返回上一页这段代码
const history = createHashHistory();//返回上一页这段代码


function getData(season,subCode,_this) {
    const data ={
        "season":season,
        "subCode":subCode,
        "fuzzy":_this.state.fuzzy,//查询
    };
    axios.post('/api/public/moblie-inv-more/query?page='+_this.state.page+''+'&pageSize='+_this.state.pageSize,
        data).then(function(response){
        if(response.data.success){
            let data = _this.state.data;
            response.data.rows.map((item)=>{data.push(item)});
            _this.setState({
                data : data,
                total:response.data.total,
            });
        }else{
            Toast.info('查询数据失败 !!!', 2);
        }
    })

}

export default class invDcMore extends React.Component{

    constructor(props){
        super(props)
        this.state={
            page:1,
            pageSize:10,
            total:0,
            fuzzy:'',//查询
            height: document.documentElement.clientHeight-100,
            data:[],
        }
    }


    componentWillMount() {

        getData(this.props.location.season,this.props.location.subCode,this);
    }
    //返回按钮
    comeback=()=>{
        history.goBack();  //返回上一页这段代码
    }
    //查询onchang事件
    searchBarOnChange = (val) =>{
        this.setState({
            fuzzy: val
        });
    }

    //查询事件
    onSearch = (val) => {
        //按条件进行查询，页码从第一页开始
        this.setState({
            page:1,
            pageSize:10,
            data:[],
        })
        setTimeout(() => {
            getData(this.props.location.season,this.props.location.subCode,this);
        },2)
    }
    //查询取消事件
    onCancel =()=>{
        this.setState({
            fuzzy: "",
            page:1,
            pageSize:10,
            data:[],
        });
        setTimeout(() => {
            getData(this.props.location.season,this.props.location.subCode,this);
        },2)
    }

    //加载更多 上划加载
    onRefresh=(_this)=>{
        let total = _this.state.total;
        let page = _this.state.page;
        let pageSiza = _this.state.pageSize;
        //判断是否都加载完了
        if(total<page*pageSiza){
            return ;
        }else{
            _this.setState({
                refreshing: true,
                page:page+1,
            });
            setTimeout(() => {
                getData(this.props.location.season,this.props.location.subCode,_this);
                _this.setState({ refreshing: false });
            }, 1000);
        }
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
                               value={this.state.fuzzy}
                               showCancelButton={true}
                               onChange={this.searchBarOnChange}
                               onCancel={this.onCancel()}
                               onSubmit={this.onSearch}/>
                </NavBar>
                <PullToRefresh
                    damping={100}
                    ref={el => this.ptr = el}
                    style={{
                        height: this.state.height,
                        overflow: 'auto',
                    }}
                    indicator={this.state.down ? {} : { deactivate: '上拉可以刷新' }}
                    direction={'up'}//上划刷新 down
                    refreshing={this.state.refreshing} //是否显示刷新状态
                    onRefresh={() => {this.onRefresh(this)}}
                >
                    {list}
                </PullToRefresh>
            </div>


        );
    }

}