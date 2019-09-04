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

	componentWillMount(){
	}
    render() {
        const manuscript = this.state.manuscriptItem;
        return (
		<div style={{  alignItems: 'right', justifyContent: 'right', height: '100%', backgroundColor: '#fff' }}>
			
			<div style={{color:'#787878',width:'100%'}}>
				<WingBlank size="md">
				<WhiteSpace/>
					<Flex >
					  <div style={{flex:3}}>征订期</div>
					  <div style={{flex:4,color:'#000000'}}>{manuscript.season}</div>
					</Flex>
					<WhiteSpace/>
					<Flex >
					  <div style={{flex:3}}>征订代码</div>
					  <div style={{flex:4,color:'#000000'}}>{manuscript.subCode}</div>
					</Flex>
					<WhiteSpace/>
					<Flex >
					  <div style={{flex:3}}>出版社</div>
					  <div style={{flex:4,color:'#000000'}}>{manuscript.press}</div>
					</Flex>
					<WhiteSpace/>
					<Flex >
					  <div style={{flex:3}}>计划印厂</div>
					  <div style={{flex:4,color:'#000000'}}>{manuscript.printeryCode}</div>
					</Flex>
					<WhiteSpace/>
					<Flex >
					  <div style={{flex:3}}>书名</div>
					  <div style={{flex:4,color:'#000000'}}>{manuscript.bookName}</div>
					</Flex>
					<WhiteSpace/>
					<Flex >
					  <div style={{flex:3}}>定稿日期</div>
					  <div style={{flex:4,color:'#000000'}}>{manuscript.finalDate}</div>
					</Flex>
					<WhiteSpace/>
					<Flex >
					  <div style={{flex:3}}>计划出片日期</div>
					  <div style={{flex:4,color:'#000000'}}>{manuscript.planReleaseDate}</div>
					</Flex>
					<WhiteSpace/>
					<Flex >
					  <div style={{flex:3}}>实际到片日期</div>
					  <div style={{flex:4,color:'#000000'}}>{manuscript.arriveDate}</div>
					</Flex>
					<WhiteSpace/>
				</WingBlank>
			</div>
		</div>
        );
    }
}