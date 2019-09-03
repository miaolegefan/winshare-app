import React from 'react';
import {Link} from 'react-router-dom';
import './manuscript_component.css'
import { Flex, WhiteSpace,WingBlank } from 'antd-mobile';

export default class ManuscriptComponent extends React.Component{


    render(){

        const manuscriptList=this.props.manuscript.map((manuscriptItem, index) => (
            <Link to={`/manuscript/details/${manuscriptItem.id}`} key={index}>
               <section className='manuscript_sec' style={{backgroundColor:'#fff'}}>
				   <WingBlank size="md">
					   <div style={{color:'#787878'}}>
							<Flex >
								<div style={{flex:1}}>{manuscriptItem.season}</div>
								<div style={{flex:2}}/>
								<div style={{flex:1}}>{manuscriptItem.printeryName}</div>
							</Flex>
							<WhiteSpace/>
							<Flex style={{color:'#000000'}}><strong>{manuscriptItem.bookName}</strong></Flex>
							<WhiteSpace/>
							<Flex >
								<div style={{flex:1}}>计划出片时间:</div>
								<div style={{flex:2}}>{manuscriptItem.planReleaseDate}</div>
							</Flex>
							<Flex >
							  <div style={{flex:1}}>实际出片时间:</div>
							  <div style={{flex:2}}>{manuscriptItem.arriveDate}</div>
							</Flex>
						</div>
					</WingBlank>
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












