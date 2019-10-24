import React from 'react';
import axios from 'axios';
import { Redirect} from 'react-router-dom'
import {Toast} from "antd-mobile/lib/index";

export default class GetWechatUser extends React.Component {
	
	constructor() {
		super();
		this.state = {
			message : '',
			code : '',
			userId :'',
		}
		
	}
	componentDidMount(){
        //默认用户值 测试用 之后删除
        // sessionStorage.userId = '10021';

        const _this=this;    //先存一下this，以防使用箭头函数this会指向我们不希望它所指向的对象。
		//表示存在id
		if (sessionStorage.userId && sessionStorage.userId!==''&&sessionStorage.userId!== 'undefined') {
		    this.setState({userId:sessionStorage.userId});
            _this.props.history.push('/roleChoose')
		}else if (sessionStorage.wechatUser && sessionStorage.wechatUser!==''&&sessionStorage.wechatUser!== 'undefined') {
            _this.props.history.push('/login')
        }else{
			var code = '';
			var access_token = '';
			if(this.props.location.search!=null){
				var search = this.props.location.search;
				//截取url地址字符串
				code = search.substring(search.indexOf("=")+1,search.lastIndexOf("&"));
				_this.setState({
					code : code
				});
			}
			
			axios.post('/api/public/moblie/getWechatUser?code='+code).then(function(response){
					console.log(response);
					if(response.data.success){

                        if(response.data.rows[0].wechatIsBind =="true"){
                            sessionStorage.userId =response.data.rows[0].userId;
                            sessionStorage.wechatUser=response.data.rows[0].wechatUser;
                            //跳转角色选择页面
                            _this.props.history.push('/roleChoose');
                        }else{
                            sessionStorage.wechatUser=response.data.rows[0].wechatUser;
                            //Toast.info(response.data.message,10);
                            //跳转登录页面
                            setTimeout(() => {
                                _this.props.history.push('/login')
                            },10)
                        }

					}else{
                        _this.setState({
                            message : response.data.message
                        });
                        Toast.info(response.data.message);
					}
				})
		}
			 
	}


	render(){
		 var userId = this.state.userId;

        var message = this.state.message;
		return(<div >{message}{userId} </div>)

	}
}