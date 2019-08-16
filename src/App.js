import React from 'react';
import { Grid } from 'antd-mobile';
import './App.css';

 const girdList = [
            {
                text: '稿件型片',
                //imgSrc: require('./assets/icon-grid-music.png')
            },
            {
                text: '印单',
                //imgSrc: require('./assets/icon-grid-download.png')
            },
            {
                text: '预印单',
                //imgSrc: require('./assets/icon-grid-recent.png')
            },
            {
                text: '生产进度',
                //imgSrc: require('./assets/icon-grid-favorite.png')
            }
        ]
		
function App() {
  return (
    <div className="App">
      <div>常用应用</div>
	    <Grid  data={girdList} columnNum={4}  />
    </div>
  );
}

export default App;
