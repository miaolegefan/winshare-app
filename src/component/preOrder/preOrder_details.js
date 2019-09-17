import React from 'react'
import {Tabs,NavBar,Icon} from 'antd-mobile';
import PreOrderDetailsHead from './preOrder_details_head'
import PreOrderDetailsItem from './preOrder_details_item'
import '../tabs.css'
import {createHashHistory} from 'history'  //返回上一页这段代码
const history = createHashHistory();//返回上一页这段代码

export default class PreOrderDetails extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }
	//返回按钮
	comeback=()=>{
		history.goBack();  //返回上一页这段代码
	}

  render() {
	let item = this.props.location.item;
	let rolePermission = this.props.location.rolePermission;

	const tabs2 = [
		{ title: '预印单信息', sub: '1' },
		{ title: '明细信息', sub: '2' },
	];
    return (
      <div style={{ position: 'fixed', height: '100%', width: '100%', top: 0 }}>
          <NavBar mode="light" icon={<Icon type="left" />}
                  onLeftClick={this.comeback}>
          </NavBar>
        <Tabs tabs={tabs2} initialPage={0} tabBarInactiveTextColor='#108ee9'>
			<div style={{ display: 'flex', alignItems: 'right', justifyContent: 'right', height: '100%', backgroundColor: '#fff' }}>
				<PreOrderDetailsHead item= {item} rolePermission={rolePermission}/>
			</div>
			<div style={{  alignItems: 'right', justifyContent: 'right', height: '100%', backgroundColor: '#fff' }}>
				<PreOrderDetailsItem preOrderNo= {item.preOrderNo}/>
			</div>
		</Tabs>
      </div>
    );
  }
}