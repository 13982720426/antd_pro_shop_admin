import React from 'react';
import { Upload, message } from 'antd';
import { ossConfig } from '@/services/commom';
export default class AliyunOSSUpload extends React.Component {
  state = {
    OSSData: {},
  };

  // 组件挂载完成后，进行初始化获取oss配置
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
  onChange = ({ file }) => {
    if (file.status === 'done') {
      const { setCoverKey, insertImage } = this.props;
      if (setCoverKey) {
        // 上传成功之后，把文件的key，设置成表单某个字段的值
        setCoverKey(file.key);
      }

      // 上传完成之后，如果需要url，那么返回url给父组件【
      if (insertImage) {
        insertImage(file.url);
      }

      message.success('上传成功');
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

    // 如果签名过期了就重新获取
    if (expire < Date.now()) {
      await this.init();
    }

    const dir = 'react/'; // 定义上传的目录

    const suffix = file.name.slice(file.name.lastIndexOf('.'));
    const filename = OSSData.dir + dir + Date.now() + suffix;
    file.key = OSSData.dir + dir + filename; // 在getExtraData 函数中会用到，在云存储的文件的 key
    file.url = OSSData.host + OSSData.dir + dir + filename; // 上传完成后，用于显示内容

    return file;
  };

  render() {
    const { value, accept, showUploadList } = this.props;
    const props = {
      accept: accept || '',
      name: 'file',
      fileList: value,
      action: this.state.OSSData.host,
      onChange: this.onChange,
      data: this.getExtraData,
      beforeUpload: this.beforeUpload,
      listType: 'picture',
      maxCount: 1,
      showUploadList,
    };

    return (
      <Upload {...props}>
        {/* 将Button标签放在在AliyunOSSUpload组件里写，这里直接使用{this.props.children}，会报错 */}
        {/* 这里的解决方案是，Button标签封装在AliyunOSSUpload组件内部，其他函数使用AliyunOSSUpload组件时，只需要将AliyunOSSUpload写成双标签，里边写显示的文字 */}
        {/* <Button icon={<UploadOutlined />}>{this.props.children}</Button> */}
        {/* 修复直接使用{this.props.children}，会报错的bug */}
        {this.props.children}
      </Upload>
    );
  }
}
