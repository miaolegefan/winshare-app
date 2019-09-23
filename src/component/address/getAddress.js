import React from 'react';
import axios from 'axios';
import { NavBar, Icon, WingBlank, Button} from 'antd-mobile';
import Address from './address'


export default class GetAddress extends React.Component{


    constructor(props){
        super(props);
        this.state={
           address:''
        }
    }

    getAddress(address){
        this.setState({
            address:address
        })
        console.log(address);
    }
    render() {
        const _this = this;
        return(<div><Address getAddress={this.getAddress.bind(this)}/></div>);
    }
}