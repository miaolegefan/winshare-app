import React from 'react';
import {Link} from 'react-router-dom';
import './manuscript_component.css'
export default class ManuscriptComponent extends React.Component{


    render(){

        const manuscriptList=this.props.manuscript.map((manuscriptItem, index) => (
            <Link to={`/manuscript/details/${manuscriptItem.id}`} key={index}>
               <section className='manuscript_sec' >
                    <div > 
						<div style={{float: 'left',color:'#787878'}}>{manuscriptItem.season}</div>
						<div style={{float: 'right'}}>{manuscriptItem.printeryName}</div>
						<div style={{clear:'both',color:'#000000'}}><strong>{manuscriptItem.bookName}</strong></div>
                        <div style={{color:'#787878'}}>{manuscriptItem.planReleaseDate}</div>
                        <div style={{color:'#787878'}}>{manuscriptItem.arriveDate}</div>
                    </div>
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












