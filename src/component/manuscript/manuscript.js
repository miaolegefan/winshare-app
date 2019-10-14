import React from 'react';
import ManuscriptComponent from './manuscript_component'
import axios from 'axios';
import {Button, SearchBar,NavBar, Icon,WhiteSpace } from 'antd-mobile';
import '../tabs.css';
import {createHashHistory} from 'history'  //返回上一页这段代码
const history = createHashHistory();//返回上一页这段代码

function query(_this) {
    axios.post('/api/public/moblie-manuscript/query?userId='+sessionStorage.userId+'&roleId='+sessionStorage.roleId,{
        printeryCode:sessionStorage.printeryCode,
    }).then(function(response){
        if(response.data.success){
            _this.setState({
                manuscript : response.data.rows,
                search:response.data.rows
            });
        }
    })

}





function search(arr, q) {
    return arr.filter(v => Object.values(v).some(v => new RegExp(q + '').test(v)));
}


export default class Manuscript extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            manuscript: [],
            search:[]

        };
    }
	componentDidMount(){
        query(this);
	}


	//查询事件
    onSearch = (val) => {
        const value = search(this.state.search,val);


        this.setState({
            manuscript: value
        });

    }
    //返回按钮
    comeback=()=>{
        history.goBack();  //返回上一页这段代码
    }
    render() {
        const manuscript = this.state.manuscript;

        const manuscriptList = <ManuscriptComponent manuscript={manuscript} />
        return (
            <div  >
                <NavBar mode="light" icon={<Icon type="left" />} onLeftClick={this.comeback}>
                    <SearchBar style={{width:"100%"}}
                            placeholder="Search"
                               showCancelButton={true}
                            onChange={this.onSearch}/>
                </NavBar>
                <WhiteSpace size="sm" />
                {manuscriptList}
            </div>
        );
    }
}