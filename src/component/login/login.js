import React from 'react';
import './style.css';
import {Checkbox} from "antd-mobile";

export default class login extends React.Component{

    constructor(props) {
        super(props);
        this.state={
            check:true
        }
    }

    onChange=()=>{
        this.setState({
            check:!this.state.check
        })
    }

    onLogin=()=>{
        const test = '';
    }

    render() {
            const check = this.state.check;
        return(
                <div className="denglu">
                    <h4 className="comf1">文轩出版社</h4>
                    <h4 className="comf2">移动平台</h4>
                    <div className="denglu_1">
                            <ul className="dengluk">
                                <li><input name="loginId" type="text" className="denglu_2" placeholder="  用户名"/></li>
                                <li><input name="password" type="password" className="denglu_2 denglu_21"
                                           placeholder="  密码"/></li>
                                <li style={{   height: '0.37rem'}}><Checkbox style={{marginRight:'60%'}} checked={check} onChange={this.onChange}>关联账号</Checkbox></li>
                                <button  style={{width: '100%',height:'0.9rem'}} onClick={this.onLogin}>立即登录</button>
                            </ul>
                    </div>
                </div>
        );
    }

}