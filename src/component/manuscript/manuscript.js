import React from 'react';
import ManuscriptComponent from './manuscript_component'
import axios from 'axios';
import {Button, SearchBar,NavBar, Icon,WhiteSpace ,PullToRefresh} from 'antd-mobile';
import '../tabs.css';
import {createHashHistory} from 'history'  //返回上一页这段代码
const history = createHashHistory();//返回上一页这段代码

function query(_this) {
    axios.post('/api/public/moblie-manuscript/query?userId='+sessionStorage.userId+'&roleId='+sessionStorage.roleId+
        '&page='+_this.state.page+''+'&pageSize='+_this.state.pageSize,{
        printeryCode:sessionStorage.printeryCode,
        fuzzy:_this.state.fuzzy,//查询字段
    }).then(function(response){
        if(response.data.success){
            let manuscript = _this.state.manuscript;
            response.data.rows.map((item)=>{manuscript.push(item)});
            _this.setState({
                manuscript : manuscript,
                total:response.data.total,
            });
        }
    })

}



export default class Manuscript extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            page:1,
            pageSize:10,
            total:0,
            manuscript: [],
            fuzzy:'',//查询
            refreshing: false,//是否显示刷新状态
            down: true,
            height: document.documentElement.clientHeight-100,

        };
    }
	componentDidMount(){
        if(this.props.location.manuscriptState){
            this.setState(this.props.location.manuscriptState);
        }else {
            query(this);
        }
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
                query(_this);
                _this.setState({ refreshing: false });
            }, 1000);
        }
    }
    //查询onchang事件
    searchBarOnChange = (val) =>{
        this.setState({
            fuzzy: val
        });
    }
    //查询取消事件
    onCancel =()=>{
        this.setState({
            fuzzy: "",
            page:1,
            pageSize:10,
            manuscript:[],
        });
        setTimeout(() => {
            query(this);
        },2)
    }

	//查询事件
    onSearch = (val) => {
        //按条件进行查询，页码从第一页开始，数据重新查
        this.setState({
            page:1,
            pageSize:10,
            manuscript:[],
        })
        //设置等2毫秒再执行查询，否则 会出现state未更新就先查询了
        setTimeout(() => {
            query(this);
        },2)

    }
    //返回按钮
    comeback=()=>{
        history.goBack();  //返回上一页这段代码
    }
    render() {
        const manuscript = this.state.manuscript;

        const manuscriptList = <ManuscriptComponent manuscript={manuscript} manuscriptState ={this.state} />
        return (
            <div  >
                <NavBar mode="light" icon={<Icon type="left" />} onLeftClick={this.comeback}>
                    <SearchBar style={{width:"100%"}}
                               placeholder="Search"
                               value={this.state.fuzzy}
                               showCancelButton={true}
                               onChange={this.searchBarOnChange}
                               onCancel={this.onCancel}
                               onSubmit={this.onSearch}/>
                </NavBar>
                <WhiteSpace size="sm" />
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
                    {manuscriptList}
                </PullToRefresh>
            </div>
        );
    }
}