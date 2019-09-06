import React from 'react';
import {Link} from 'react-router-dom';
import '../common.css';
import { Flex, WhiteSpace,WingBlank } from 'antd-mobile';
import moment from 'moment'

export default class ManuscriptComponent extends React.Component{


    render(){

        const manuscriptList=this.props.manuscript.map((item, index) => (
            <Link to={{pathname:'/manuscript/details',item:item}} key={index}>
               <section className='section' >
					<Flex>
						<div className="font07 text_left flex1">{item.season}-{item.subCode}</div>
						<div className="font07 text_right flex1" >{item.press}</div>
					</Flex>
					<Flex>
						<div className="text_left flex3 colorBlack"><strong>{item.bookName}</strong></div>
					</Flex>	
					<Flex>
						<div className="font07 text_left ">计划印厂:</div>
						<div className="font07 text_left margin-left">{item.printeryName}</div>
					</Flex>	
					<Flex>
						<div className="font07 text_left ">计划出片时间:</div>
						<div className="font07 text_left margin-left">{item.planReleaseDate?moment(item.planReleaseDate).format('YYYY-MM-DD'):item.planReleaseDate}</div>
					</Flex>	
					<Flex>
						<div className="font07 text_left ">实际出片时间:</div>
						<div className="font07 text_left margin-left">{item.arriveDate?moment(item.arriveDate).format('YYYY-MM-DD'):item.arriveDate}</div>
					</Flex>	
                </section>
            </Link>

        ));
        return(
            <div>
            {manuscriptList}
            </div>
        );
    }
}












