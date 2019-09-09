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
        //query(this);
		this.setState({
            manuscript: [{"_token":"00b4984af4933b678252edb4b29227c3","objectVersionNumber":1,"id":30,"isbn":null,
			"season":"16CJ00","subCode":"36784","bookName":"高中新课标语文选修 中国民俗文化(配人教)/点金训练",
			"bookCode":null,"planReleaseDate":"2016-07-18 00:00:00","finalDate":"2016-10-01 00:00:00",
			"arriveDate":null,"press":"川教","pressCode":null,"remark":null,"receiverUserid":null,
			"printeryCode":"5646","planMenge":131,"isDeleted":"0","printeryName":"印厂名称","inputCondition":null,
			"arrivalStartDate":null,"arrivalDeadline":null,"regStartDate":null,"regDeadline":null},
			{"_token":"2c2fe83bdf6d4f37e494b1a64cc8ce0f","objectVersionNumber":1,"id":31,"isbn":null,
			"season":"16CJ00","subCode":"36785","bookName":"高中新课标点金训练物理选修1-2(配教科)",
			"bookCode":null,"planReleaseDate":"2016-07-19 00:00:00","finalDate":"2016-10-02 00:00:00",
			"arriveDate":null,"press":"川教","pressCode":null,"remark":null,"receiverUserid":null,
			"printeryCode":"1001","planMenge":132,"isDeleted":"0","printeryName":"印厂名称","inputCondition":null,
			"arrivalStartDate":null,"arrivalDeadline":null,"regStartDate":null,"regDeadline":null},
			],
			search: [{"_token":"00b4984af4933b678252edb4b29227c3","objectVersionNumber":1,"id":30,"isbn":null,
			"season":"16CJ00","subCode":"36784","bookName":"高中新课标语文选修 中国民俗文化(配人教)/点金训练",
			"bookCode":null,"planReleaseDate":"2016-07-18 00:00:00","finalDate":"2016-10-01 00:00:00",
			"arriveDate":null,"press":"川教","pressCode":null,"remark":null,"receiverUserid":null,
			"printeryCode":"5646","planMenge":131,"isDeleted":"0","printeryName":"印厂名称","inputCondition":null,
			"arrivalStartDate":null,"arrivalDeadline":null,"regStartDate":null,"regDeadline":null},
			{"_token":"2c2fe83bdf6d4f37e494b1a64cc8ce0f","objectVersionNumber":1,"id":31,"isbn":null,
			"season":"16CJ00","subCode":"36785","bookName":"高中新课标点金训练物理选修1-2(配教科)",
			"bookCode":null,"planReleaseDate":"2016-07-19 00:00:00","finalDate":"2016-10-02 00:00:00",
			"arriveDate":null,"press":"川教","pressCode":null,"remark":null,"receiverUserid":null,
			"printeryCode":"1001","planMenge":132,"isDeleted":"0","printeryName":"印厂名称","inputCondition":null,
			"arrivalStartDate":null,"arrivalDeadline":null,"regStartDate":null,"regDeadline":null},
			]
		});
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