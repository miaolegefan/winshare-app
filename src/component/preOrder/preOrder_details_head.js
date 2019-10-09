import React from 'react';
import axios from 'axios';
import { Flex, WhiteSpace,WingBlank,Button,Toast } from 'antd-mobile';
import '../common.css';
import moment from 'moment'

//印厂状态改变
function changePrinteryConfrim(preOrderNo,printeryConfirm,_this) {

	axios.post('/api/public/moblie-preOrder/confirm?userId='+sessionStorage.userId,{preOrderNo,printeryConfirm}).then(function(response){
		if(response.data.success){
			if(printeryConfirm == '1'){
				_this.setState({
					printeyConfirm:true,
					cancelPrinteryConfirm:false
				});

			}else{
				_this.setState({
					printeyConfirm:false,
					cancelPrinteryConfirm:true
				});
			}
			Toast.info('更改印厂确认状态成功', 2);
		}else{
			Toast.info('更改印厂确认状态失败', 2);
		}

	})
}

//物资状态改变
function changeMaterialsConfrim(preOrderNo,materialsConfirm,_this) {

	axios.post('/api/public/moblie-preOrder/confirm?userId='+sessionStorage.userId,{preOrderNo,materialsConfirm}).then(function(response){
		if(response.data.success){
			if(materialsConfirm == '1'){
				_this.setState({
					materialsConfirm:true,
					cancelMaterialsConfirm:false
				});
			}else{
				_this.setState({
					materialsConfirm:false,
					cancelMaterialsConfirm:true
				});
			}
			Toast.info('更改物资确认状态成功', 2);
		}else{
			Toast.info('更改物资确认状态失败', 2);
		}

	})
}




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

		var printery = this.state.rolePermission.printery;
		var materials = this.state.rolePermission.materials;


	if(printery){		//印厂按钮控制
		if(printeryConfirm == '1'){
			this.setState({
				printeyConfirm:true,
				cancelPrinteryConfirm:false
			});
		}else{
			this.setState({
				printeyConfirm:false,
				cancelPrinteryConfirm:true
			});
		}
	}

	if(materials){//物资公司
		if(materialsConfirm == '1'){
			this.setState({
				materialsConfirm:true,
				cancelMaterialsConfirm:false
			});
		}else{
			this.setState({
				materialsConfirm:false,
				cancelMaterialsConfirm:true
			});
		}
	}

	}

    render() {
        const preOrderHead = this.state.preOrderHead;
        const _this = this;
        return (

			<div >
			<div style={{	marginBottom: '400px'}} className="datails">
				<Flex>
				  <div className="text_left flex1">预印单号</div>
				  <div className="text_right flex1 colorBlack">{preOrderHead.preOrderNo}</div>
				</Flex>
				<Flex >
				  <div  className="text_left flex1">征订期</div>
				  <div className="text_right flex1 colorBlack">{preOrderHead.season}</div>
				</Flex>
				<Flex >
				  <div  className="text_left flex1">征订代码</div>
				  <div className="text_right flex1 colorBlack">{preOrderHead.subCode}</div>
				</Flex>
				<Flex >
				  <div  className="text_left flex1">出版社</div>
				  <div className="text_right flex1 colorBlack">{preOrderHead.press}</div>
				</Flex>
				<Flex >
				  <div  className="text_left flex1">印厂</div>
				  <div className="text_right flex1 colorBlack">{preOrderHead.printery}</div>
				</Flex>
				<Flex >
				  <div  className="text_left flex1">书名</div>
				  <div className="text_right flex1 colorBlack">{preOrderHead.bookName}</div>
				</Flex>
				<Flex >
				  <div  className="text_left flex1">印厂接收确认</div>
				  <div className="text_right flex1 colorBlack">{preOrderHead.printeryConfirm}</div>
				</Flex>
				<Flex >
				  <div  className="text_left flex1">印厂接收确认时间</div>
				  <div className="text_right flex1 colorBlack">
                      {preOrderHead.printeryConfirmDate?
						  moment(preOrderHead.printeryConfirmDate).format('YYYY-MM-DD'):
                          preOrderHead.printeryConfirmDate}</div>
				</Flex>
				<Flex >
				  <div  className="text_left flex1">物资公司接收确认</div>
				  <div className="text_right flex1 colorBlack">{preOrderHead.materialsConfirm}</div>
				</Flex>
				<Flex >
				  <div  className="text_left flex1">物资公司接收确认时间</div>
				  <div className="text_right flex1 colorBlack">
                      {preOrderHead.materialsConfirmDate?
                          moment(preOrderHead.materialsConfirmDate).format('YYYY-MM-DD'):
                          preOrderHead.materialsConfirmDate}</div>
				</Flex>
				<Flex >
				  <div  className="text_left flex1">物资公司接收确认人</div>
				  <div className="text_right flex1 colorBlack">{preOrderHead.materialsConfirmPerson}</div>
				</Flex>
				<Flex >
				  <div  className="text_left flex1">印数</div>
				  <div className="text_right flex1 colorBlack">{preOrderHead.preMenge}</div>
				</Flex>
			</div>

				<div style={{bottom:'8%',position: 'absolute',width:'100%'}} id="footer">
					<div hidden={this.state.printeyConfirm} >
						<WingBlank size="md"><Button  type="ghost" onClick={()=>changePrinteryConfrim(preOrderHead.preOrderNo,'1',_this)} style={{color: '#108ee9', 'backgroundColor': 'white', 'borderRadius': '5px', border: '1px solid #108ee9'}}  size="small">印厂接收确认</Button></WingBlank>
					</div>
					<div hidden={this.state.materialsConfirm}>
						<WingBlank size="md"><Button  type="ghost" onClick={()=>changeMaterialsConfrim(preOrderHead.preOrderNo,'1',_this)} style={{color: '#108ee9', 'backgroundColor': 'white', 'borderRadius': '5px', border: '1px solid #108ee9'}}  size="small">物资公司接收确认</Button></WingBlank>
					</div>
					<div hidden={this.state.cancelPrinteryConfirm}>
						<WingBlank size="md"><Button  type="ghost" onClick={()=>changePrinteryConfrim(preOrderHead.preOrderNo,'0',_this)} style={{color: '#787878', 'backgroundColor': 'white', 'borderRadius': '5px', border: '1px solid #108ee9'}} size="small">取消印厂接收确认</Button></WingBlank>
					</div>
					<div hidden={this.state.cancelMaterialsConfirm}>
						<WingBlank size="md"><Button id="p1" type="ghost" onClick={()=>changeMaterialsConfrim(preOrderHead.preOrderNo,'0',_this)} style={{color: '#787878', 'backgroundColor': 'white', 'borderRadius': '5px', border: '1px solid #108ee9'}} size="small">取消物资公司接收确认</Button></WingBlank>
					</div>
				</div>

		    </div>

        );
        
    }
}