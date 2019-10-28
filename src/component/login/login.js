import React from 'react';
import './style.css';
import {Checkbox,InputItem} from "antd-mobile";
import {Toast} from "antd-mobile/lib/index";
import axios from "axios/index";

export default class login extends React.Component{

    constructor(props) {
        super(props);
        this.state={
            check:true,
            wechatUser: sessionStorage.wechatUser,//微信号
            loginId:'',
            password:'',
        }
    }
    componentDidMount() {

        const _this = this;    //先存一下this，以防使用箭头函数this会指向我们不希望它所指向的对象。
        //表示存在id
        if (sessionStorage.userId && sessionStorage.userId !== '' && sessionStorage.userId !== 'undefined') {
            this.setState({userId: sessionStorage.userId});
            _this.props.history.push('/roleChoose')
        }
    }
    onChange=()=>{
        this.setState({
            check:!this.state.check
        })
    }

    onLogin=()=>{
        const _this=this;
        axios.post('/api/public/moblie/login',{
            check:this.state.check,
            wechatUser: this.state.wechatUser,//微信号
            loginId:this.state.loginId,
            password:this.state.password,
        }).then(function(response){
            if(response.data.success) {
                sessionStorage.userId = response.data.rows[0].userId;
                //跳转角色选择页面
                _this.props.history.push('/roleChoose');
                console.log(response);
            }else{
                Toast.info(response.data.message);
            }
        })
    }

    loginOnChange=(event)=>{
        this.setState({
            loginId:event.target.value,
        })
    }

    passwordOnChange=(event)=>{
        this.setState({
            password:event.target.value,
        })
    }

    render() {
            const check = this.state.check;
        return(
                <div className="denglu">
                    <h4 className="comf1">印制生产信息平台V2.0</h4>
                    <h4 className="comf2">移动平台</h4>
                    <div className="denglu_1">
                            <ul className="dengluk">
                                <li>
                                    <input name="loginId" type="text" className="denglu_2" placeholder="  用户名"
                                               default={this.state.loginId} onChange={this.loginOnChange}
                                    />
                                </li>
                                <li>
                                    <input name="password" type="password" className="denglu_2 denglu_21" placeholder="  密码"
                                           default={this.state.password} onChange={this.passwordOnChange}/>
                                </li>
                                <li style={{   height: '0.37rem'}}><Checkbox style={{marginRight:'60%'}} checked={check} onChange={this.onChange}>关联账号</Checkbox></li>
                                <button  style={{width: '100%',height:'0.9rem'}} onClick={this.onLogin}>立即登录</button>
                            </ul>
                    </div>
                </div>
        );
    }
}