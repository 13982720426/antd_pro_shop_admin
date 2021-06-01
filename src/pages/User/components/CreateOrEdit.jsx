import React, { useEffect, useState } from 'react';
import ProForm, { ProFormText } from '@ant-design/pro-form';
import { Modal, message, Skeleton, Button } from 'antd';
import { showUser, updateUser, addUser } from '@/services/user';

const CreateOrEdit = (props) => {
  /**
   * isModalVisible 模态框是否显示
   * isShowModal 操作模态框显示隐藏的方法
   * actionRef 父组件传来的表格的引用，可以用来操作表格，比如刷新表单
   * editId 要编辑的id，添加的时候是undefined，只有编辑时才有
   */
  const { isModalVisible, isShowModal, actionRef, editId } = props;

  // 将表单初始化的值设置成状态，在编辑的时候使用这个状态
  const [initialValues, setinitialValues] = useState(undefined);

  // 添加或者编辑的描述
  const type = editId === undefined ? '添加' : '编辑';

  useEffect(async () => {
    // 发送请求，获取用户详情
    if (editId !== undefined) {
      const response = await showUser(editId);
      // 获取数据之后,修改状态；状态改变，组件重新渲染，骨架框消失，编辑表单出现
      setinitialValues({
        name: response.name,
        email: response.email,
      });
    }
  }, []);

  // 提交表单，执行编辑或者添加
  const handleSubmit = async (values) => {
    let response = [];
    if (editId === undefined) {
      // 执行添加
      // 发送请求，添加用户
      response = await addUser(values);
    } else {
      // 执行编辑
      // 发送请求，更新用户
      response = await updateUser(editId, values);
    }
    if (response.status === undefined) {
      message.success(`${type}成功！`);
      // 刷新表格数据
      actionRef.current.reload();
      // 关闭模态框
      isShowModal(false);
    }
  };

  return (
    <Modal
      title={`${type}用户`}
      visible={isModalVisible}
      onCancel={() => isShowModal(false)}
      footer={null}
      destroyOnClose={true}
      forceRender
    >
      {
        // 只有是编辑的情况下，并且要显示的数据还有返回，才显示骨架框
        initialValues === undefined && editId !== undefined ? (
          <Skeleton active={true} paragraph={{ rows: 4 }} />
        ) : (
          <ProForm
            initialValues={initialValues}
            onFinish={(values) => {
              handleSubmit(values);
            }}
          >
            <ProFormText
              name="name"
              label="昵称"
              placeholder="请输入昵称"
              rules={[{ required: true, message: '请输入昵称' }]}
            />
            <ProFormText
              name="email"
              label="邮箱"
              placeholder="请输入邮箱"
              rules={[
                { required: true, message: '请输入邮箱' },
                { type: 'email', message: '邮箱格式不正确' },
              ]}
            />
            {
              // 只有添加initialValues才有密码框
              editId !== undefined ? (
                ''
              ) : (
                <ProFormText.Password
                  name="password"
                  label="密码"
                  placeholder="请输入密码"
                  rules={[
                    { required: true, message: '请输入密码' },
                    { min: 6, message: '密码最小6位' },
                  ]}
                />
              )
            }
          </ProForm>
        )
      }
    </Modal>
  );
};

export default CreateOrEdit;
