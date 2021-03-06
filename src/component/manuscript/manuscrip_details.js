import React from 'react';
import axios from 'axios';
import {Flex, WhiteSpace, NavBar, Icon, WingBlank} from 'antd-mobile';
import '../common.css';
import moment from 'moment';
import {createHashHistory} from 'history'
const history = createHashHistory();//返回上一页这段代码

export default class ManuscriptDetails extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            manuscriptItem: this.props.location.item,
            manuscriptState:this.props.location.manuscriptState
        };
    }
    //返回按钮
    comeback=()=>{
        history.goBack();  //返回上一页这段代码
        this.props.history.push({pathname:'/manuscript',manuscriptState:this.state.manuscriptState});//带父页面参数返回
    }

    render() {
        const manuscript = this.state.manuscriptItem;
        return (
		 <div style={{ position: 'fixed', height: '100%', width: '100%', top: 0 }}>

             <NavBar mode="light" icon={<Icon type="left" />}
                     onLeftClick={this.comeback}>
             </NavBar>
			<div style={{ display: 'flex', alignItems: 'right', height: '100%',justifyContent: 'right',backgroundColor: '#fff' }}>
				<div className="datails text_center" >
					<WhiteSpace  size="xl"/>
					<Flex>
						<div className="text_left flex1">征订期:</div>
						<div className="text_right flex1 colorBlack">{manuscript.season}</div>
					</Flex>
					<Flex>
						<div className="text_left flex1">征订代码:</div>
						<div className="text_right flex1 colorBlack">{manuscript.subCode}</div>
					</Flex>
					<Flex>
						<div className="text_left flex1">出版社:</div>
						<div className="text_right flex1 colorBlack">{manuscript.press}</div>
					</Flex>
					<Flex>
						<div className="text_left flex1">计划印厂:</div>
						<div className="text_right flex1 colorBlack">{manuscript.printeryName}</div>
					</Flex>
					<Flex>
						<div className="text_left flex1">书名:</div>
						<div className="text_right flex1 colorBlack">{manuscript.bookName}</div>
					</Flex>
					<Flex>
						<div className="text_left flex1">定稿日期:</div>
						<div className="text_right flex1 colorBlack">{manuscript.finalDate?moment(manuscript.finalDate).format('YYYY-MM-DD'):manuscript.finalDate}</div>
					</Flex>
					<Flex>
						<div className="text_left flex1">计划出片日期:</div>
						<div className="text_right flex1 colorBlack">{manuscript.planReleaseDate?moment(manuscript.planReleaseDate).format('YYYY-MM-DD'):manuscript.planReleaseDate}</div>
					</Flex>
					<Flex>
						<div className="text_left flex1">实际到片日期:</div>
						<div className="text_right flex1 colorBlack">{manuscript.arriveDate?moment(manuscript.arriveDate).format('YYYY-MM-DD'):manuscript.arriveDate}</div>
					</Flex>
				</div>
			</div>
			</div>
        );
    }
}