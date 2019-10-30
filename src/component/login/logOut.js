import React from 'react';
import './style.css';
import {Checkbox,InputItem} from "antd-mobile";
import {Toast} from "antd-mobile/lib/index";
import axios from "axios/index";

export default class logOut extends React.Component{

    constructor(props) {
        super(props);
        this.state={
        }
    }
    componentDidMount() {
        //将本地保存的用户清掉，并调整到登录页面
        sessionStorage.userId ='';
        this.props.history.push('/login')

    }

    render() {

        return(
                <div>退出登录</div>
        );
    }
}