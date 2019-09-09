import React from 'react';
import axios from 'axios';
import {Button, Flex, WhiteSpace, WingBlank} from 'antd-mobile';
import './preOrder.css'







export default class PreOrderDetailsHead extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            preOrderHead: this.props.item,
			rolePermission:this.props.rolePermission,
			printeyConfirm:true,
			cancelPrinteryConfirm:true,
			materialsConfirm:true,
			cancelMaterialsConfirm:true
        };
    }



	componentDidMount(){
    	//对角色及值进行控制判断
		const printeryConfirm=this.state.preOrderHead.printeryConfirm==null?0:this.state.preOrderHead.printeryConfirm;
		const materialsConfirm=this.state.preOrderHead.materialsConfirm==null?0:this.state.preOrderHead.materialsConfirm;

		const printery = this.state.rolePermission.printery;
		const materials = this.state.rolePermission.materials;


	if(printery){		//印厂按钮控制
		if(printeryConfirm == '1'){
			this.setState({
				printeyConfirm:false,
				cancelPrinteryConfirm:true
			});
		}else{
			this.setState({
				printeyConfirm:true,
				cancelPrinteryConfirm:false
			});
		}
	}

	if(materials){//物资公司
		if(materialsConfirm == '1'){
			this.setState({
				materialsConfirm:false,
				cancelMaterialsConfirm:true
			});
		}else{
			this.setState({
				materialsConfirm:true,
				cancelMaterialsConfirm:false
			});
		}
	}

	}



    render() {
        const preOrderHead = this.state.preOrderHead;
        return (

        <div style={{width:'100%'}}>
		<div className="line2" style={{color:'#787878',width:'100%'}}>
		<WingBlank size="md">
		<WhiteSpace/>
			<Flex>
			  <div className="text_left flex1">预印单号</div>
			  <div className="text_right flex1 colorBlack">{preOrderHead.preOrderNo}</div>
			</Flex>
			<WhiteSpace/>
			<Flex >
			  <div  className="text_left flex1">征订期</div>
			  <div className="text_right"style={{flex:1,color:'#000000'}}>{preOrderHead.season}</div>
			</Flex>
			<WhiteSpace/>
			<Flex >
			  <div  className="text_left flex1">征订代码</div>
			  <div className="text_right flex1 colorBlack">{preOrderHead.subCode}</div>
			</Flex>
			<WhiteSpace/>
			<Flex >
			  <div  className="text_left flex1">出版社</div>
			  <div className="text_right flex1 colorBlack">{preOrderHead.press}</div>
			</Flex>
			<WhiteSpace/>
			<Flex >
			  <div  className="text_left flex1">印厂</div>
			  <div className="text_right flex1 colorBlack">{preOrderHead.printery}</div>
			</Flex>
			<WhiteSpace/>
			<Flex >
			  <div  className="text_left flex1">书名</div>
			  <div className="text_right flex1 colorBlack">{preOrderHead.bookName}</div>
			</Flex>
			<WhiteSpace/>
			<Flex >
			  <div  className="text_left flex1">印厂接收确认</div>
			  <div className="text_right flex1 colorBlack">{preOrderHead.printeryConfirm}</div>
			</Flex>
			<WhiteSpace/>
			<Flex >
			  <div  className="text_left flex1">印厂接收确认时间</div>
			  <div className="text_right flex1 colorBlack">{preOrderHead.printeryConfirmDate}</div>
			</Flex>
			<WhiteSpace/>
			<Flex >
			  <div  className="text_left flex1">物资公司接收确认</div>
			  <div className="text_right flex1 colorBlack">{preOrderHead.materialsConfirm}</div>
			</Flex>
			<WhiteSpace/>
			<Flex >
			  <div  className="text_left flex1">物资公司接收确认时间</div>
			  <div className="text_right flex1 colorBlack">{preOrderHead.materialsConfirmDate}</div>
			</Flex>
			<WhiteSpace/>
			<Flex >
			  <div  className="text_left flex1">物资公司接收确认人</div>
			  <div className="text_right flex1 colorBlack">{preOrderHead.materialsConfirmPerson}</div>
			</Flex>
			<WhiteSpace/>
			<Flex >
			  <div  className="text_left flex1">印数</div>
			  <div className="text_right flex1 colorBlack">{preOrderHead.preMenge}</div>
			</Flex>
			</WingBlank>
		</div>



<div style={{position: 'absolute', bottom: 0, left: 0, right: 0 }}>
	<div hidden={this.state.printeyConfirm} >
	<WingBlank size="md"><Button  type="ghost"  style={{color: '#108ee9', 'background-color': 'white', 'border-radius': '5px', border: '1px solid #108ee9'}}  size="small">印厂接收确认</Button></WingBlank>
	</div>
	<div hidden={this.state.materialsConfirm}>
	<WingBlank size="md"><Button  type="ghost"  style={{color: '#108ee9', 'background-color': 'white', 'border-radius': '5px', border: '1px solid #108ee9'}}  size="small">物资公司接收确认</Button></WingBlank>
	</div>
	<div hidden={this.state.cancelPrinteryConfirm}>
	<WingBlank size="md"><Button  type="ghost"  style={{color: '#787878', 'background-color': 'white', 'border-radius': '5px', border: '1px solid #108ee9'}} size="small">取消印厂接收确认</Button></WingBlank>
	</div>
	<div hidden={this.state.cancelMaterialsConfirm}>
	<WingBlank size="md"><Button id="p1" type="ghost" className=".button-cancel" size="small">取消物资公司接收确认</Button></WingBlank>
	</div>
</div>
		</div>

		);
    }
}