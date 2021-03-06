import React from 'react';
import { Flex, ImagePicker,WingBlank,Button,Toast,NavBar,Icon,InputItem,ActivityIndicator} from 'antd-mobile';
import '../common.css';
import { Player } from 'video-react';
import "./video-react.css";
import axios from "axios";
import Upload from 'antd-mobile-upload';
import moment from 'moment'
import Address from '../address/address'
import {createHashHistory} from 'history'  //返回上一页这段代码
const history = createHashHistory();//返回上一页这段代码

function save(_this) {

    const d = _this.state.time;
    const newDate = d.getFullYear() + '-' + (d.getMonth() + 1) + '-' + d.getDate() + ' '
        + d.getHours() + ':' + d.getMinutes() + ':' + d.getSeconds();
    const image = _this.state.image;
    //将图片拼接成字符串，并用逗号隔开
    var attPic = "";
    image.map((item, index)=>(attPic+=item.data+","))
    if (attPic.length > 0) {
        attPic = attPic.substr(0, attPic.length - 1);
    }

    axios.post('/api/public/moblie-printeryProcess/add?userId='+sessionStorage.userId+'&roleId='+sessionStorage.roleId,{
        'orderNo':_this.state.orderNo,
        'time':newDate,
        'attPic': attPic,
        'attVideo':_this.state.video,
        'remark':_this.state.remark,
        'produceStatus':_this.state.produceStatus,
        'address':_this.state.address
    }).then(function(response){
        if(response.data.success){
            history.goBack();
        }else{
            Toast.info(response.data.message);
        }
    })
}

function upload(before,image,type,index,_this) {

    if(type == 'add'){
        _this.setState({
            imageAnimating:true //图片上传中
        })
        const len = image.length;
        let formData = new FormData();
        const file = image[len - 1].file;
        const url = image[len - 1].url;//文件对应的前端生成的url 用来前端展示 因为后台返回的只有文件名称
        formData.append("file", file);
        axios({
            method: 'post',
            url: '/api/public/mobile-upload',
            data: formData,
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        }).then(
                res => {
                if(res.data.success){
                    console.log('上传成功！')
                    const newImage = {
                        //url:"http://localhost:8080/images/"+res.data.message,
                        url:url,
                        data:res.data.message
                    }
                    _this.setState({
                        image :_this.state.image.concat(newImage),
                        imageAnimating:false,//图片上传结束
                    })
                }
                }
            ).catch(
                err => {
                    Toast.info('该图片上传失败!!!', 1);
                    _this.setState({
                        imageAnimating:false,//图片上传结束
                    })
                }
            )
    }else if(type == 'remove'){
        _this.setState({
            image:image
        })
        console.log(image)

    }

}

export default class PrinteryProcessEnclosureAdd extends React.Component{
    state = {
        processSave:true,
        image: [],
        time: new Date(),
        video:'',
        remark:'',
        produceStatus:this.props.location.state.item.produceStatus,//生产状态
        orderNo:this.props.location.state.item.orderNo,//印单号
        address:'',
        imageAnimating:false,//图片是否上传中
    }

    componentDidMount(){
        const button =sessionStorage.button;
        const arr = button.split(",");
        //当前角色是否有新增进度的权限
        for (let i = 0; i < arr.length; i++) {
            if ('processSave' == arr[i]) {
                this.setState({
                    processSave:false,
                });
            }
        }
    }

    onChange = (image, type, index) => {
        console.log(image, type, index);
        const before = this.state.image;
        upload(before,image,type,index,this);
    };

    //视频文件保存成功后
    videoSave=(value)=>{
        this.setState({
            video: value.message
            }
        )
    }
    //返回按钮
    comeback=()=>{
        history.goBack();  //返回上一页这段代码
    }

    //备注输入change事件
    remarkOnchang=(value)=>{
        this.setState({
                remark: value
            }
        )
    }
    //获取当前地址
    getAddress(address){
        this.setState({
            address:address
        })
        console.log(address);
    }

    render() {


        const { image,time } = this.state;
        const _this = this;
        return (
            <div className="backgroundWhite line3" style={{height:"-webkit-fill-available"}}>
                <div>
                <NavBar mode="light" icon={<Icon type="left" />}
                        onLeftClick={this.comeback}>
                </NavBar>
                <Flex className="margin-left">
                    <div className="colorBlack flex1">日期</div>
                    <div className="colorBlack flex3 text_left">{moment(time).format('YYYY-MM-DD')}</div>
                </Flex>
                <div className="margin-left">附件图片</div>
                <ImagePicker
                    files={image}
                    onChange={this.onChange}
                    onImageClick={(index, fs) => console.log(index, fs)}
                    selectable={image.length < 5}
                    multiple={true}
                    capture={"camera"}//打开手机摄像头
                />
                    <ActivityIndicator
                        toast
                        text="Loading..."
                        animating={this.state.imageAnimating}
                    />

                <div className="margin-left">备注说明</div>
                    <InputItem
                        type="digit"
                        id="receiveMenge"
                        clear
                        autoAdjustHeight={true}
                        style={{borderColor: '#404040'}}
                        default={this.state.remark}
                        onChange={this.remarkOnchang}
                    ></InputItem>
                </div>

                <div className="margin-left">当前位置</div>
                <Address getAddress={this.getAddress.bind(this)}/>

                <div style={{position: 'absolute', bottom: '2%',width:'100%' }}>
                    <div hidden={this.state.processSave}>
                    <WingBlank size="md">
                        <Button  type="ghost" onClick={()=>save(_this)}   style={{color: '#108ee9',backgroundColor: 'white', borderRadius: '5px', border: '1px solid #108ee9'}}  >保存</Button>
                    </WingBlank>
                    </div>
                </div>
            </div>
        );
    }

}