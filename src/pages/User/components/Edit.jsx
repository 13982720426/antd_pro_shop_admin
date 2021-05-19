import React, { useEffect, useState } from 'react';
import ProForm, { ProFormText } from '@ant-design/pro-form';
import { Modal, message, Skeleton } from 'antd';
import { showUser, updateUser } from '@/services/user';

const Edit = (props) => {
  const { isModalVisible, isShowModal, actionRef, editId } = props;
  const [initialValues, setinitialValues] = useState(undefined);

  useEffect(async () => {
    // 发送请求，获取用户详情
    if (editId !== undefined) {
      const response = await showUser(editId);
      setinitialValues({
        name: response.name,
        email: response.email,
      });
    }
  }, []);

  /**
   * 添加用户
   * @param {表单数据} values
   */
  const editUser = async (values) => {
    // 发送请求，更新用户
    const response = await updateUser(editId, values);
    if (response.status === undefined) {
      message.success('更新成功！');
      // 刷新表格数据
      actionRef.current.reload();
      // 关闭模态框
      isShowModal(false);
    }
  };

  return (
    <Modal
      title="编辑用户"
      visible={isModalVisible}
      onCancel={() => isShowModal(false)}
      footer={null}
      destroyOnClose={true}
    >
      {initialValues === undefined ? (
        <Skeleton active={true} paragraph={{ rows: 4 }} />
      ) : (
        <ProForm
          initialValues={initialValues}
          onFinish={(values) => {
            editUser(values);
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
        </ProForm>
      )}
    </Modal>
  );
};

export default Edit;
