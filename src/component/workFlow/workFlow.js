import React from 'react';
import {
    Toast,
    Flex,
    NavBar,
    Icon, SearchBar
} from 'antd-mobile';
import axios from "axios";
import {Link} from "react-router-dom";
import moment from 'moment'
import {createHashHistory} from 'history'  //返回上一页这段代码
const history = createHashHistory();//返回上一页这段代码

function search(arr, q) {
    return arr.filter(v => Object.values(v).some(v => new RegExp(q + '').test(v)));
}

function getMyTasks(_this) {

    axios.post('/api/public/workFlow/getMyTasks?userId='+sessionStorage.userId+'&roleId='+sessionStorage.roleId,{
        printeryCode:sessionStorage.printeryCode,
    }).then(function(response){
        if(response.status == '200'){
            //除去社会送书流程
            const arr =  response.data.data.filter(function (v) {
                return  v.processName.indexOf("退书") == -1;
            })
          _this.setState(
              {
                  myTask: arr,
                  search:response.data.data
              }
          );
        }else{
            Toast.info('获取待办失败', 1);
        }
    })

}


export default class workFlow extends React.Component{


    constructor(props) {
        super(props);
        this.state={
            hiddenNavBar:this.props.hiddenNavBar?this.props.hiddenNavBar:false,
            myTask:[],
            search:[]
        }
    }
    
    componentDidMount() {

        getMyTasks(this);

    }
    //返回按钮
    comeback=()=>{
        history.goBack();  //返回上一页这段代码
    }

    //查询事件
    onSearch = (val) => {
        const value = search(this.state.search,val);
        this.setState({
            order: value
        });
    }
    render() {
        const myTaskList = this.state.myTask.map((item,index) => (

            <Link to={{pathname:'/workFlow/details/'+item.id,processId:item.processInstanceId}} key={index} >
                <section className="section">
                    <Flex>
                        <div className="font07 text_left flex1">开始日期</div>
                        <div className="font07 text_right flex1" >{item.createTime}</div>
                    </Flex>
                    <Flex>
                        <div className="text_left flex2 colorBlack"><strong>{item.processName}</strong></div>
                    </Flex>
                    <Flex>
                        <div className="font07 text_left flex1">
                            <Flex>
                                <div className="text_left ">ID:</div>
                                <div className="text_left margin-left">{item.processInstanceId}</div>
                            </Flex>
                        </div>
                        <div className="font07 text_right flex1" >
                            <Flex>
                                <div className="text_right flex4">申请人:</div>
                                <div className="text_left flex3 margin-left">{item.startUserName}</div>
                            </Flex>
                        </div>
                    </Flex>
                    <Flex>
                        <div className="font07 text_left flex1">
                            <Flex>
                                <div className="text_left">审批环节:</div>
                                <div className="text_left margin-left">{item.name}</div>
                            </Flex>
                        </div>
                    </Flex>
                    <Flex>
                        <div className="font07 text_left flex1">
                            <Flex>
                                <div className="text_left">描述:</div>
                                <div className="text_left margin-left">{item.description}</div>
                            </Flex>
                        </div>
                    </Flex>
                </section>
            </Link>

        ));


        const hiddenNavBar = this.state.hiddenNavBar;
        return(
            <div>
                <div hidden={hiddenNavBar}>
                    <NavBar mode="light" icon={<Icon type="left" />} onLeftClick={this.comeback} >
                        <SearchBar style={{width:"100%"}}
                                   placeholder="Search"
                                   showCancelButton={true}
                                   onChange={this.onSearch}/>
                    </NavBar>
                </div>
                {myTaskList}
            </div>
        );
    }


}