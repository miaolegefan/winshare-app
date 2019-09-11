import React from 'react';
import { Flex, ImagePicker,WingBlank,Button } from 'antd-mobile';
import '../common.css';
import { Player } from 'video-react';
import "./video-react.css";

function save(_this) {

}
export default class PrinteryProcessEnclosureAdd extends React.Component{
    state = {
        image: [],
    }
    onChange = (image, type, index) => {
        console.log(image, type, index);
        this.setState({
            image,
        });
    };
    render() {
        const { image } = this.state;
        const time = this.props.location.time;
        const remark = this.props.location.remark;
        const _this = this;
        return (
            <div className="backgroundWhite line3" style={{height:"-webkit-fill-available"}}>
                <Flex className="margin-left">
                    <div className="colorBlack flex1">日期</div>
                    <div className="colorBlack flex3 text_left">{time}</div>
                </Flex>
                <div className="margin-left">附件图片</div>
                <ImagePicker
                    files={image}
                    onChange={this.onChange}
                    onImageClick={(index, fs) => console.log(index, fs)}
                    selectable={image.length < 5}
                    multiple={true}
                    capture={"camera"}
                />
                <div className="margin-left">附件视频</div>
                <Player ref="player" videoId="video-1" style={{hidden:true}}>
                    <source src="https://media.w3.org/2010/05/sintel/trailer_hd.mp4"/>
                </Player>
                <div className="margin-left">备注说明</div>
                <div style={{border: "thin #E8E8E8 solid",height: "200px",marginLeft: "0.16rem",marginRight: "0.16rem"}}>
                    {"备注说明测试"}
                </div>
                <div style={{position: 'absolute', bottom: 0,width:'100%'}}>
                    <WingBlank size="md">
                        <Button  type="ghost" onClick={()=>save(_this)}   style={{color: '#108ee9', 'backgroundColor': 'white', 'borderRadius': '5px', border: '1px solid #108ee9'}}  size="small">确认工价</Button>
                    </WingBlank>
                </div>
            </div>
        );
    }

}