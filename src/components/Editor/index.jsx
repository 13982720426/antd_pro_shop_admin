import React from 'react';
// 引入编辑器组件
import BraftEditor from 'braft-editor';
// 引入编辑器样式
import 'braft-editor/dist/index.css';
import './index.less';

export default class EditorDemo extends React.Component {
  state = {
    // 创建一个空的editorState作为初始值
    editorState: BraftEditor.createEditorState(null),
  };

  // async componentDidMount() {
  //   // 假设此处从服务端获取html格式的编辑器内容
  //   const htmlContent = await fetchEditorContent();
  //   // 使用BraftEditor.createEditorState将html字符串转换为编辑器需要的editorStat
  //   this.setState({
  //     editorState: BraftEditor.createEditorState(htmlContent),
  //   });
  // }

  // submitContent = async () => {
  //   // 在编辑器获得焦点时按下ctrl+s会执行此方法
  //   // 编辑器内容提交到服务端之前，可直接调用editorState.toHTML()来获取HTML格式的内容
  //   const htmlContent = this.state.editorState.toHTML();
  //   const result = await saveEditorContent(htmlContent);
  // };

  handleEditorChange = (editorState) => {
    // 更新编辑器的状态
    this.setState({ editorState });
    // 要判断输入的内容，如果有内容设置输入的内容；如果没有内容设置成空字符串
    // 为什么要这样判断，因为即使是空内容editorState.toHTML()也是一对空标签，不能直接给表单使用
    if (!editorState.isEmpty()) {
      // 可直接调用editorState.toHTML()来获取HTML格式的内容
      const content = editorState.toHTML();
      // 调用父组件的函数，将编辑器输入的内容传递回去
      this.props.setDetails(content);
    } else {
      this.props.setDetails('');
    }
    console.log(editorState.isEmpty());
  };

  render() {
    const { editorState } = this.state;
    return (
      <div className="my-component">
        <BraftEditor
          value={editorState}
          onChange={this.handleEditorChange}
          // onSave={this.submitContent}
        />
      </div>
    );
  }
}
