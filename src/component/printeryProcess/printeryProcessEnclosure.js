import React from 'react';
import { Flex, ImagePicker,NavBar,Icon } from 'antd-mobile';
import '../common.css';
import { Player } from 'video-react';
import "./video-react.css";
import creatHistory from 'history/createHashHistory'  //返回上一页这段代码
const history = creatHistory();//返回上一页这段代码

const data = [{
    url: 'https://zos.alipayobjects.com/rmsportal/PZUUCKTRIHWiZSY.jpeg'
}, {
    url: 'https://zos.alipayobjects.com/rmsportal/hqQWgTXdrlmVVYi.jpeg',
}];

export default class PrinteryProcessEnclosure extends React.Component{
    state = {
        files: data,
        multiple: false,
    }
    onChange = (files, type, index) => {
        console.log(files, type, index);
        this.setState({
            files,
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
        const { files } = this.state;
        const time = this.props.location.time;
        const remark = this.props.location.remark;
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
                    files={files}
                    onChange={this.onChange}
                    onImageClick={(index, fs) => console.log(index, fs)}
                    selectable={false}//隐藏添加按钮
                    disableDelete={true}//隐藏删除按钮
                    multiple={true}
                    //capture={"camera"}//打开手机摄像头
                />
                <div className="margin-left">附件视频</div>
                <Player ref="player" videoId="video-1">
                    <source src="https://media.w3.org/2010/05/sintel/trailer_hd.mp4"/>
                </Player>
                <div className="margin-left">备注说明</div>
                <div style={{border: "thin #E8E8E8 solid",height: "200px",marginLeft: "0.16rem",marginRight: "0.16rem"}}>
                    {"备注说明测试"}
                </div>

            </div>
        );
    }

}