import React from 'react';
import {Button,List,Radio,WingBlank,WhiteSpace,Modal,ActivityIndicator,Toast } from 'antd-mobile';
import './roleChoose.css';
import axios from "axios";
import { Redirect} from 'react-router-dom'
const RadioItem = Radio.RadioItem;

let data;
export default class roleChoose extends React.Component{

    constructor(props) {
        super(props);

    }

    componentDidMount(){
        const that=this;
        axios.post('/api/public/role-choose/query?userId='+sessionStorage.userId,{}).then(function(response){
            if(response.data.success){
               data = response.data.rows;
               that.setState({loading:false})
            }else{
                Toast.info('获取用户角色失败', 1);
            }
        })
    }


    state = {
        loading:true,
        id:""
    };
    onChange = (id) => {
        this.setState({
            id,
        });
    };

    onSubmit =()=>{
       const id =this.state.id;
       if(id==""){
           Toast.info('请选择需要登录的角色', 1);
       }else{
        sessionStorage.roleId = id;
        //调取后端接口获取角色权限

           //跳转
           this.props.history.push('/home')
       }
       console.log("测试");

    }

    render() {
        const { id } = this.state;


        if(this.state.loading){

            return (
                <div className="loading-example">
                    <ActivityIndicator
                        text="Loading..."
                    />
                </div>
            );
        }else{

            return(

                <div>
                    <List   renderHeader="角色选择" style={{ margin: '5px 0', backgroundColor: 'white' }}>
                        {data.map(i=>(
                            <RadioItem   key={i.id} checked={id === i.id} onChange={() => this.onChange(i.id)} >
                                {i.name}
                            </RadioItem>
                        ))}

                    </List>

                    <Button className="am-button-primary"  onClick={this.onSubmit}>确认</Button><WhiteSpace />
                </div>
            );

        }


    }


}