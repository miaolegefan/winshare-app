import React from 'react';
import ManuscriptComponent from './manuscript_component'
import axios from 'axios';
import {Button, SearchBar} from "antd-mobile";


function query(_this,inputCondition) {
    axios.post('/api/public/moblie-manuscript/query?userId='+localStorage.userId,{'inputCondition':inputCondition}).then(function(response){
        if(response.data.success){
            _this.setState({
                manuscript : response.data.rows
            });
        }
    })
    
}


export default class Manuscript extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            manuscript: []
           
        };
    }
	componentDidMount(){
        query(this);
	}

	onCancel=(value)=>{
        query(this);

    }

    onSearch=(value)=>{
        query(this,value);
    }

    render() {
        const manuscript = this.state.manuscript;

        const manuscriptList = <ManuscriptComponent manuscript={manuscript} />
        return (
            <div  >
                <SearchBar
                    placeholder="Search"
                    onSubmit={this.onSearch}
                    onCancel={this.onCancel}
                />
                {manuscriptList}
            </div>
        );
    }
}