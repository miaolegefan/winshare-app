import React from 'react';
import axios from "axios/index";
import {Picker,List} from 'antd-mobile';
// 引入 ECharts 主模块
import echarts from 'echarts/lib/echarts';
import 'echarts/lib/chart/pie';
import 'echarts/lib/chart/bar';
import 'echarts/lib/component/tooltip';
import 'echarts/lib/component/title';
import 'echarts/lib/component/legend';
import 'echarts/lib/component/markPoint';
import ReactEcharts from 'echarts-for-react';

//先查询该用户可以查看的印单
function getPrintert(_this) {
    axios.get('/api/public/moblie/getPrintert?userId='+sessionStorage.userId+'&roleId='+sessionStorage.roleId).then(function(response){
        if(response.data.success){
            _this.setState({
                printeryList : response.data.rows
            });
        }
    })
}
//查印厂开单数、入库数、预约数
function queryPrinteryAmount(_this) {
    axios.post('/api/public/moblie/queryPrinteryAmount?userId='+sessionStorage.userId+'&roleId='+sessionStorage.roleId,{
        printeryCode:_this.state.printery,
    }).then(function(response){
        if(response.data.success){
            _this.setState({
                printMenge : response.data.rows[0].printMenge,
                inputMenge : response.data.rows[0].inputMenge,
                appointMenge : response.data.rows[0].appointMenge,
            });
        }
    })
}
export default class PrinteryAmount extends React.Component{
    constructor(props){
        super(props);
        this.state={
            printeryList:[],
            printery:'',
            printMenge:0,
            inputMenge:0,
            appointMenge:0,
        }
    }
    UNSAFE_componentWillMount (){
        //先查询该用户可以查看的印单
        getPrintert(this);
        queryPrinteryAmount(this);
        //默认全部变量 印厂为空
        sessionStorage.printeryCode='';
    }
    componentDidMount(){

    }
    getOption =(_this)=> {
        const printMenge = _this.state.printMenge;
        const inputMenge = _this.state.inputMenge;
        const appointMenge = _this.state.appointMenge;
        let option = {
            title:{
                text:'',
                x:'center'
            },
            textStyle: {
                fontSize: 25,
            },
            legend:{
                orient:'vertical',
                right:10,
                top:20,
                bottom:20,
                textStyle:{
                    fontSize:20,
                },
                data:['开单数','入库数','预约数']
            },
            tooltip:{
                trigger:'item',
                textStyle: {
                    fontSize: 25,
                },
                formatter:'{a}<br/>{b}:{c}({d}%)' //自定义展示的tootip
            },
            series:[
                //饼图中的series没有x,y轴，所以通过series中必须有value和name
                {
                    name:'印厂',
                    type:'pie',
                    label: {
                        normal: {
                            textStyle: {
                                fontSize: 25,
                            },
                            formatter:'{b}:{c}({d}%)'
                        }
                    },
                    data:[
                        {
                            value:printMenge,
                            name:'开单数',
                        },{
                            value:inputMenge,
                            name:'入库数',
                        },{
                            value:appointMenge,
                            name:'预约数',
                        },
                    ]
                }
            ]
        }
        return option
    };

    getOption2 =(_this)=> {
        const printMenge = _this.state.printMenge;
        const inputMenge = _this.state.inputMenge;
        const appointMenge = _this.state.appointMenge;
        let option = {
            title:{
                text:'',
                x:'center'
            },
            tooltip:{
                trigger:'axis',
                textStyle:{
                    fontSize:25,
                },
            },
            grid: {
                /*top: '2%',
                left: '3%',
                right: '4%',*/
                x:25,
                y:45,
                x2:5,
                y2:20,
                bottom: 5,
                containLabel: true,
                height: 450,
            },
            xAxis:{
                data:['开单数','入库数','预约数'],
                axisLabel: { //调整x轴的lable
                    fontSize: 30 // 让字体变大
                }
            },
            yAxis:{
                type:'value',
                axisLabel:{
                    fontSize:25
                }
            },
            series:[
                {
                    type:'bar',
                    barWidth : 50,//柱图宽度
                    data:[printMenge,inputMenge,appointMenge],
                    itemStyle: {
                        normal: {
                            //每根柱子颜色设置
                            color: function(params) {
                                let colorList = [
                                    "#c23531",
                                    "#2f4554",
                                    "#61a0a8",
                                ];
                                return colorList[params.dataIndex];
                            }
                        }
                    },
                    //柱状图上显示数据
                    label: {
                        show: "true",
                        position: "top",
                        color: "#FFF",
                        fontWeight: "bolder",
                        backgroundColor: "auto",
                        fontSize: "30"
                    },
                }
            ]
        }
        return option
    };

    onChange = (value) => {
        this.setState({
            printery: value[0],
        });
        //全局变量印厂为当前页面选的印厂
        sessionStorage.printeryCode=value[0];
        queryPrinteryAmount(this);
    }

    render(){
        const choose = [{value:'',label:'全部'}];
            this.state.printeryList.map((item,index)=>{
            choose.push({
                value:item.printeryCode,
                label:item.printeryName})
        });

        return(<div>
            <div style={{marginTop:"10px"}}>
                <Picker
                    data={choose}
                    onChange={this.onChange}
                    value={[this.state.printery]}
                    cols={1}
                    style={{width:"100%"}}
                >
                    <List.Item style={{}} arrow="horizontal">印厂</List.Item>
                </Picker>
                <ReactEcharts option={this.getOption2(this)} theme="Imooc"  style={{ height: 600,backgroundColor: '#fff' }}/>
            </div>
        </div>)
    }
}