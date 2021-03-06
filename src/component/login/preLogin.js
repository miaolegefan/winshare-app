import React from 'react';
import axios from 'axios';
import { Redirect} from 'react-router-dom'

export default class PreLogin extends React.Component {
	
	constructor() {
		super();
		this.state = {
			corpid : 'wwb67a7fe3bcd6865f',
			// corpsecret : '49Por68DiDY7VLbq72yi9MEevoIyyzPOYdp89bRBSLM',
            corpsecret : '_men4qHj6LqOHRNk625kVyZdQoWI-O1JkGPWsm8mOn0',
			access_token :'',
			code : '',
			userId :'',
		}
		
	}
	componentDidMount(){
		//表示存在id
		if (sessionStorage.userId && sessionStorage.userId!==''&&sessionStorage.userId!== 'undefined') {
		    this.setState({userId:sessionStorage.userId});
		}else{
			const _this=this;    //先存一下this，以防使用箭头函数this会指向我们不希望它所指向的对象。
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
			console.log(this.props);
			 
			
			axios.get('/weixin/cgi-bin/gettoken?corpid='+this.state.corpid+
				  '&corpsecret=' + this.state.corpsecret).then(function(response){
					if(response.data.errmsg === 'ok'){
						access_token = response.data.access_token;
						_this.setState({
							access_token : response.data.access_token
						});
						axios.get('/weixin/cgi-bin/user/getuserinfo?access_token='+access_token+
							  '&code=' + code).then(function(response){
								  //用户信息返回的数据 是 UserId（第一个字母大写）
								  var userId = response.data.UserId;
								   sessionStorage.userId = userId;
								   console.log(sessionStorage.userId);
								  _this.setState({
									userId : userId
								  }); 
							  });
					}
				})
		}
			 
	}


	render(){
		 var userId = this.state.userId;
		 
		 console.log(userId!=='' && userId!== 'undefined');
		 if(userId && userId!=='' && userId!== 'undefined'){
		 /* return (<Redirect to={`/home`}></Redirect>) */
		 return(<div >{userId}</div>)
		 }else{
		return(<div >{userId} 企业微信登录中……</div>)
		}
	}
}