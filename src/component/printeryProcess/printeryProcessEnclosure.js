import React from 'react';
import {Flex, ImagePicker, NavBar, Icon, Button,WhiteSpace} from 'antd-mobile';
import '../common.css';
import { Player } from 'video-react';
import axios from "axios";
import "./video-react.css";
import {createHashHistory} from 'history'  //返回上一页这段代码
const history = createHashHistory();//返回上一页这段代码








export default class PrinteryProcessEnclosure extends React.Component{
    constructor(props) {
        super(props)
        this.state={
            files: [],
            images:[],
            multiple: false,
        }
    }

    componentWillMount() {
        const files = this.props.location.filePath;
        let filePath = [];
        const images = this.props.location.imagePath;
        let imagePath=[];
        if(files != null){
            const arr = files.split(",");
            for(let i=0;i<arr.length;i++){
                const url ={
                    // url:"http://localhost:3000/image/"+arr[i]
                    // url:"/images/"+arr[i]
                    url:arr[i]
                }
                filePath.push(url)
            }
        }
        if(images != null){
            const arr = images.split(",");
            for(let i=0;i<arr.length;i++){
                const url ={
                    // url:"http://localhost:3000/image/"+arr[i]
                    // url:"/images/"+arr[i]
                    url:arr[i]
                }
                imagePath.push(url)
            }
        }
        this.setState({
            files:filePath,
            images:imagePath
        })
    }


    onChange = (images, type, index) => {
        console.log(images, type, index);
        this.setState({
            images,
        });
    };


    onAddImageClick = (e) => {
        e.preventDefault();
        // this.setState({
        //     files: this.state.files.concat({
        //         url: 'https://zos.alipayobjects.com/rmsportal/hqQWgTXdrlmVVYi.jpeg',
        //         id: '3',
        //     }),
        // });
    };

    //返回按钮
    comeback=()=>{
        history.goBack();  //返回上一页这段代码
    }

    render() {
        const { files,images } = this.state;
        const time = this.props.location.time;
        const remark = this.props.location.remark;

        const filesList = files.map((item,index) =>(

            <div key={index}>
                <Player ref="player" >
                    <source src={item.url}/>
                </Player>
                <WhiteSpace size="lg"/>
            </div>

        ))

        const address = this.props.location.address;
        return (
            <div className="backgroundWhite line3" style={{height:"-webkit-fill-available"}}>
                <NavBar mode="light" icon={<Icon type="left" />}
                        onLeftClick={this.comeback}>
                </NavBar>

                <Flex className="margin-left">
                    <div className="colorBlack flex1">日期</div>
                    <div className="colorBlack flex3 text_left">{time}</div>
                </Flex>
                <div className="margin-left">附件图片</div>
                <ImagePicker
                    files={images}
                    onChange={this.onChange}
                    onImageClick={(index, fs) => console.log(index, fs)}
                    selectable={false}//隐藏添加按钮
                    disableDelete={true}//隐藏删除按钮
                    multiple={true}
                    //capture={"camera"}//打开手机摄像头
                />
                <div className="margin-left">附件视频</div>
                {filesList}
                <div className="margin-left">位置</div>
                <div style={{border: "thin #E8E8E8 solid",marginLeft: "0.16rem",marginRight: "0.16rem"}}>
                    {address}
                </div>
                <div className="margin-left">备注说明</div>
                <div style={{border: "thin #E8E8E8 solid",height: "200px",marginLeft: "0.16rem",marginRight: "0.16rem"}}>
                    {remark}
                </div>

            </div>
        );
    }

}