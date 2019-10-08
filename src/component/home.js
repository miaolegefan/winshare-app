import React from 'react';
import './style.scss';
import { Grid,WhiteSpace } from 'antd-mobile';
import {Link} from 'react-router-dom'
import PrinteryAmount from './printeryAmount/printeryAmount'
import WorkFlow from  './workFlow/workFlow';

class Home extends React.Component {
    render() {
       
		const gridList = [
			{
				id:'manuscript',
				text: '稿件型片',
				imgSrc: require('../assets/12.png'),
				link:"/manuscript",
			},
			{
                id:'order',
				text: '印单',
				imgSrc: require('../assets/13.png'),
				link:"/order"
			},
			{
                id:'preOrder',
				text: '预印单',
				imgSrc: require('../assets/14.png'),
				link:"/preOrder"
			},
			{
                id:'printeryProcess',
				text: '生产进度',
				imgSrc: require('../assets/15.png'),
				link:"/printeryProcess"
			},
			{
                id:'wlConfirm',
				text: '物流确认',
				imgSrc: require('../assets/21.png'),
				link:"/wlConfirm"
			},
			{
                id:'workFlow',
				text: '我的待办',
				imgSrc: require('../assets/22.png'),
				link:"/workFlow"
			},
			{
                id:'invDc',
				text: '入库地址',
				imgSrc: require('../assets/25.png'),
				link:"/invDc"
			}
		]
		const grids =sessionStorage.grids;
		const gridList2 = [];
        const arr = grids.split(",");
		gridList.map((item, index)=> {
            for (let i = 0; i < arr.length; i++) {
                if (item.id == arr[i]) {
                    gridList2.push(item)
                }
            }
        })
        return (
            <div className="qqmusic-home-body">
			<div className="qqmusic-mycenter-top">
			    <div style={{background: 'white'}}>我的应用<WhiteSpace/></div>
                <Grid className="qqmusic-mycenter-grid" data={gridList2} columnNum={4} hasLine={true}
					renderItem={item => (
						<Link to={item.link} >
					        <div className="qqmusic-mycenter-grid-item">
					            <img className="image"  src={item.imgSrc} />
					            <div className="text">{item.text}</div>
					        </div>
						</Link>
					    )
					}
                />
				<PrinteryAmount/>
				<div style={{marginTop:"10px",background: 'white'}}>
                    <div >我的代办<WhiteSpace/></div>
					<WorkFlow hiddenNavBar={true} />
				</div>
				</div>
            </div>
        )
    }
}

export default Home;
