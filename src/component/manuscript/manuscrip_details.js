import React from 'react';
import axios from 'axios';
import { Flex, WhiteSpace,WingBlank } from 'antd-mobile';

export default class ManuscriptDetails extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            manuscriptItem: this.props.location.query
        };
    }

<<<<<<< HEAD
	componentWillMount(){
=======
	componentDidMount(){
		const _this=this;    //先存一下this，以防使用箭头函数this会指向我们不希望它所指向的对象。
		axios.post('/api/public/press/manuscript/select?userId='+localStorage.userId,{"id":this.props.match.params.id}).then(function(response){
				 if(response.data.success){
					 _this.setState({
						 manuscriptItem : response.data.rows[0]
					 });
					 console.log(_this.state.manuscriptItem);
				 }
			})
>>>>>>> 87b15ec2054dad3405cbe331e5c413e8ec529613
	}
    render() {
        const manuscript = this.state.manuscriptItem;
        return (
		<div style={{  alignItems: 'center', justifyContent: 'center', height: '100%', backgroundColor: '#fff' }}>
			
			<div style={{color:'#787878',width:'100%'}}>
				<WingBlank size="md">
				<WhiteSpace/>
					<Flex >
					  <div style={{flex:1}}>征订期</div>
					  <div style={{flex:2,color:'#000000'}}>{manuscript.season}</div>
					</Flex>
					<WhiteSpace/>
					<Flex >
					  <div style={{flex:1}}>征订代码</div>
					  <div style={{flex:2,color:'#000000'}}>{manuscript.subCode}</div>
					</Flex>
					<WhiteSpace/>
					<Flex >
					  <div style={{flex:1}}>出版社</div>
					  <div style={{flex:2,color:'#000000'}}>{manuscript.press}</div>
					</Flex>
					<WhiteSpace/>
					<Flex >
<<<<<<< HEAD
					  <div style={{flex:3}}>计划印厂</div>
					  <div style={{flex:4,color:'#000000'}}>{manuscript.printeryCode}</div>
=======
					  <div style={{flex:1}}>计划印厂</div>
					  <div style={{flex:2,color:'#000000'}}>{manuscript.printeryName}</div>
>>>>>>> 87b15ec2054dad3405cbe331e5c413e8ec529613
					</Flex>
					<WhiteSpace/>
					<Flex >
					  <div style={{flex:1}}>书名</div>
					  <div style={{flex:2,color:'#000000'}}>{manuscript.bookName}</div>
					</Flex>
					<WhiteSpace/>
					<Flex >
					  <div style={{flex:1}}>定稿日期</div>
					  <div style={{flex:2,color:'#000000'}}>{manuscript.finalDate}</div>
					</Flex>
					<WhiteSpace/>
					<Flex >
					  <div style={{flex:1}}>计划出片日期</div>
					  <div style={{flex:2,color:'#000000'}}>{manuscript.planReleaseDate}</div>
					</Flex>
					<WhiteSpace/>
					<Flex >
					  <div style={{flex:1}}>实际到片日期</div>
					  <div style={{flex:2,color:'#000000'}}>{manuscript.arriveDate}</div>
					</Flex>
					<WhiteSpace/>
				</WingBlank>
			</div>
		</div>
        );
    }
}