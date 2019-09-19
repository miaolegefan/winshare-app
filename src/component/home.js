import React from 'react';
import './style.scss';
import { Grid,WhiteSpace } from 'antd-mobile';
import {Link} from 'react-router-dom'
		
class Home extends React.Component {
    render() {
       
       const girdList = [
			  {
				  text: '稿件型片',
				  imgSrc: require('../assets/12.png'),
				  link:"/manuscript",
				  hidden:true,
			  },
			  {
				  text: '印单',
				  imgSrc: require('../assets/13.png'),
				  link:"/order"
			  },
			  {
				  text: '预印单',
				  imgSrc: require('../assets/14.png'),
				  link:"/PreOrder"
			  },
			  {
				  text: '生产进度',
				  imgSrc: require('../assets/15.png'),
				  link:"/printeryProcess"
			  },
		  	 {
			   text: '物流确认',
			   imgSrc: require('../assets/21.png'),
			   link:"/wlConfirm"
		   },
		   {
			   text: '我的待办',
			   imgSrc: require('../assets/22.png'),
			   link:"/workFlow"
		   },
		   {
			   text: '入库地址',
			   imgSrc: require('../assets/25.png'),
			   link:"/invDc"
		   }
		  ]
       
        return (
            <div className="qqmusic-home-body">
			<div className="qqmusic-mycenter-top">
			    <div style={{background: 'white'}}>我的应用<WhiteSpace/></div>
                <Grid className="qqmusic-mycenter-grid" data={girdList} columnNum={4} hasLine={true}
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
				</div>
            </div>
        )
    }
}

export default Home;
