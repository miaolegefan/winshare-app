import React from 'react';
import ManuscriptComponent from './manuscript_component'
import axios from 'axios';

export default class Manuscript extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            manuscript: []
           
        };
    }
	componentDidMount(){
		const _this=this;    //先存一下this，以防使用箭头函数this会指向我们不希望它所指向的对象。
		axios.post('/api/public/press/manuscript/select?userId='+localStorage.userId,{}).then(function(response){
				 if(response.data.success){
					 _this.setState({
						 manuscript : response.data.rows
					 });
				 }
			})
	}

    render() {
        const manuscript = this.state.manuscript;

        const manuscriptList = <ManuscriptComponent manuscript={manuscript} />
           

        return (
            <div >
                {manuscriptList}
            </div>
        );
    }
}