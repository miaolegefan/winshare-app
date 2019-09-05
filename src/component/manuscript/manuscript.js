import React from 'react';
import ManuscriptComponent from './manuscript_component'
import axios from 'axios';
import {Button, SearchBar} from "antd-mobile";


function query(_this,inputCondition) {
    axios.post('/api/public/moblie-manuscript/query?userId='+localStorage.userId,{'inputCondition':inputCondition}).then(function(response){
        if(response.data.success){
            _this.setState({
                manuscript : response.data.rows,
                search:response.data.rows
            });
        }
    })

}

function search(arr, q) {
    return arr.filter(v => Object.values(v).some(v => new RegExp(q + '').test(v)));
}


export default class Manuscript extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            manuscript: [],
            search:[]

        };
    }
	componentDidMount(){
        query(this);
	}


	//查询事件
    onSearch = (val) => {
        const value = search(this.state.search,val);


        this.setState({
            manuscript: value
        });

    }

    render() {
        const manuscript = this.state.manuscript;

        const manuscriptList = <ManuscriptComponent manuscript={manuscript} />
        return (
            <div  >
                <SearchBar
                    placeholder="Search"
                    onChange={this.onSearch}
                />
                {manuscriptList}
            </div>
        );
    }
}