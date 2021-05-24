import React from 'react';
import { Form, Upload, message, Button } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import { ossConfig } from '@/services/commom';

export default class AliyunOSSUpload extends React.Component {
  state = {
    OSSData: {},
  };

  async componentDidMount() {
    await this.init();
  }

  // 初始化获取oss上传签名
  init = async () => {
    try {
      const OSSData = await ossConfig();

      this.setState({
        OSSData,
      });
    } catch (error) {
      message.error(error);
    }
  };

  // 文件上传过程中触发的回调函数，直到上传完成
  onChange = ({ fileList }) => {
    const { onChange } = this.props;
    console.log('Aliyun OSS:', fileList);
    if (onChange) {
      onChange([...fileList]);
    }
  };

  // 额外的上传参数
  getExtraData = (file) => {
    const { OSSData } = this.state;

    return {
      key: file.key,
      OSSAccessKeyId: OSSData.accessid, // 注意查看后端返回的字段是否和官方的OSSData一致
      policy: OSSData.policy,
      Signature: OSSData.signature,
    };
  };

  // 选择文件之后，上传文件之前，执行的回调
  beforeUpload = async (file) => {
    const { OSSData } = this.state;
    const expire = OSSData.expire * 1000;

    if (expire < Date.now()) {
      await this.init();
    }
    const dir = 'react/';

    const suffix = file.name.slice(file.name.lastIndexOf('.'));
    const filename = OSSData.dir + dir + Date.now() + suffix;
    file.key = OSSData.dir + dir + filename;
    file.url = OSSData.host + OSSData.dir + dir + filename;

    return file;
  };

  render() {
    const { value } = this.props;
    const props = {
      name: 'file',
      fileList: value,
      action: this.state.OSSData.host,
      onChange: this.onChange,
      // onRemove: this.onRemove,
      data: this.getExtraData,
      beforeUpload: this.beforeUpload,
      listType: 'picture',
      maxCount: 1,
    };

    return (
      <Upload {...props}>
        {console.log(this.props.children)}
        {this.props.children}
      </Upload>
    );
  }
}
