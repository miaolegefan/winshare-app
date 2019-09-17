import React from 'react';
import { Flex, ImagePicker,WingBlank,Button,Toast,NavBar,Icon} from 'antd-mobile';
import '../common.css';
import { Player } from 'video-react';
import "./video-react.css";
import axios from "axios";
import Upload from 'antd-mobile-upload';
import moment from 'moment'
import {createHashHistory} from 'history'  //返回上一页这段代码
const history = createHashHistory();//返回上一页这段代码


function save(_this) {

    const d = _this.state.time;
    const newDate = d.getFullYear() + '-' + (d.getMonth() + 1) + '-' + d.getDate() + ' '
        + d.getHours() + ':' + d.getMinutes() + ':' + d.getSeconds();

    axios.post('/api/public/moblie-printeryProcess/add?userId='+sessionStorage.userId,{
        'orderNo':"W420180012",
        'time':newDate,
        'attPic':"123",
        'attVideo':"123",
        'remark':"123",
        'produceStatus':"1",
    }).then(function(response){
        if(response.data.success){
            // _this.setState({
            //     manuscript : response.data.rows,
            //     search:response.data.rows
            // });
        }else{
            Toast.info(response.data.message);
        }
    })



}


function upload(before,image,type,index) {

if(type == 'add'){
    const len = image.length;
    let formData = new FormData();
    const file = image[len - 1].file;
    formData.append("file", file);
    axios({
        method: 'post',
        url: '/api/public/mobile-upload',
        data: formData,
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    })
        .then(
            res => {
                console.log('上传成功！')
            }
        )
        .catch(
            err => {
                Toast.info('该图片上传失败!!!', 1);
            }
        )
}else if(type == 'remove'){




}

}










const data = [{
    url:'http://10.100.5.148/image/winShare.jpg'
}];

export default class PrinteryProcessEnclosureAdd extends React.Component{
    state = {
        image: [],
        time: new Date(),
        video:'',
        remark:'',
        produceStatus:'',//生产状态
        orderNo:'',//印单号

    }
    onChange = (image, type, index) => {
        console.log(image, type, index);
        const before = this.state.image;
        this.setState({
            image,

        });

        upload(before,image,type,index);
    };
    handleUpload = (e) => {
        e.preventDefault();

        let file = e.target.files[0];
        const formdata = new FormData();
        formdata.append('file', file);

        for (var value of formdata.values()) {
            console.log(value);
        }
    };

    //返回按钮
    comeback=()=>{
        history.goBack();  //返回上一页这段代码
    }

    render() {


        const { image,time } = this.state;
        const _this = this;
        return (
            <div className="backgroundWhite line3" style={{height:"-webkit-fill-available"}}>
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
                    // onAddImageClick={upload}
                    // capture={"camera"}
                />
                <div className="margin-left">附件视频</div>

                <Player ref="player" videoId="video-1" style={{hidden:true}}>
                    <source src="https://media.w3.org/2010/05/sintel/trailer_hd.mp4"/>
                </Player>

                <Upload multiple action={'/api/public/mobile-upload'} />

                <input type="file" onChange={this.handleUpload}/>
                <div className="margin-left">备注说明</div>
                <div style={{border: "thin #E8E8E8 solid",height: "200px",marginLeft: "0.16rem",marginRight: "0.16rem"}}>
                    {this.state.remark}
                </div>

                <div style={{position: 'absolute', bottom: 0, left: 0, right: 0 }}>
                    <WingBlank size="md">
                        <Button  type="ghost" onClick={()=>save(_this)}   style={{color: '#108ee9', 'backgroundColor': 'white', 'borderRadius': '5px', border: '1px solid #108ee9'}}  size="small">保存</Button>
                    </WingBlank>
                </div>



            </div>
        );
    }

}