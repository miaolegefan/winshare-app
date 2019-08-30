import React from 'react';
import './style.scss';
import { Grid,WhiteSpace } from 'antd-mobile';
import {Link} from 'react-router-dom'
		
class Home extends React.Component {
    render() {
       
       const girdList = [
			  {
				  text: '稿件型片',
				  imgSrc: require('../assets/icon-grid-music.png'),
				  link:"/manuscript"
			  },
			  {
				  text: '印单',
				  imgSrc: require('../assets/icon-grid-download.png'),
				  link:"/Home2"
			  },
			  {
				  text: '预印单',
				  imgSrc: require('../assets/icon-grid-recent.png'),
				  link:"/PreOrder"
			  },
			  {
				  text: '生产进度',
				  imgSrc: require('../assets/icon-grid-favorite.png'),
				  link:"/Home2"
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
