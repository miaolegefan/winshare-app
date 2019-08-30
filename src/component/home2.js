import React from 'react';
import './style.scss';
import { Grid } from 'antd-mobile';
import {Link} from 'react-router-dom'
		
class Home2 extends React.Component {
    render() {
       
       const girdList = [
			  {
				  text: '稿件型片',
				  imgSrc: require('../assets/icon-grid-music.png'),
				  link:"/Home2"
			  },
			  {
				  text: '印单',
				  imgSrc: require('../assets/icon-grid-download.png'),
				  link:"/Home2"
			  },
			  {
				  text: '预印单',
				  imgSrc: require('../assets/icon-grid-recent.png'),
				  link:"/Home2"
			  },
			  {
				  text: '生产进度',
				  imgSrc: require('../assets/icon-grid-favorite.png'),
				  link:"/Home2"
			  }
		  ]
       
        return (
            <div className="qqmusic-home-body">
			<div >我的应用</div>
			  <div >
                <Grid
                    data={girdList}
					columnNum={4}
					hasLine={false}
					renderItem={
					    item => (
						<Link to={item.link} >
					        <div >
					            <img style={{width:'20px',height:'30px'}}  src={item.imgSrc} />
					            <p >{item.text}</p>
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

export default Home2;
