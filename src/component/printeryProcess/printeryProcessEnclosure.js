import React from 'react';
import { Flex, ImagePicker,WingBlank,SearchBar } from 'antd-mobile';
import '../common.css';

const data = [{
    url: 'https://zos.alipayobjects.com/rmsportal/PZUUCKTRIHWiZSY.jpeg',
    id: '2121',
}, {
    url: 'https://zos.alipayobjects.com/rmsportal/hqQWgTXdrlmVVYi.jpeg',
    id: '2122',
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
    }
    render() {
        const { files } = this.state;
        const time = this.props.location.time;

        return (
            <div>
                <Flex>
                    <div className="colorBlack flex1">开机</div>
                    <div className="colorBlack flex3 text_left">开机</div>
                </Flex>
                <WingBlank>
                    <ImagePicker
                        files={files}
                        onChange={this.onChange}
                        onImageClick={(index, fs) => console.log(index, fs)}
                        selectable={files.length < 7}
                        multiple={true}
                        capture={"camera"}
                    />
                </WingBlank>
            </div>
        );
    }

}