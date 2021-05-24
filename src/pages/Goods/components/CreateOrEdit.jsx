import React, { useEffect, useState } from 'react';
import ProForm, {
  ProFormText,
  ProFormTextArea,
  ProFormDigit,
  ProFormUploadButton,
  UploadOutlined,
} from '@ant-design/pro-form';
import { Modal, message, Skeleton, Cascader, Button } from 'antd';
import { showUser, updateUser, addUser } from '@/services/user';
import { getCategory } from '@/services/category';
import AliyunOSSUpload from '@/components/AliyunOSSUpload';

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
  const [options, setOptions] = useState([]);

  // 添加或者编辑的描述
  const type = editId === undefined ? '添加' : '编辑';

  useEffect(async () => {
    // 查询分类数据
    const resCategory = await getCategory();
    if (resCategory.status === undefined) setOptions(resCategory);

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
      title={`${type}商品`}
      visible={isModalVisible}
      onCancel={() => isShowModal(false)}
      footer={null}
      destroyOnClose={true}
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
            <ProForm.Item
              name="category_id"
              label="分类"
              rules={[{ required: true, message: '请输入分类' }]}
            >
              <Cascader
                fieldNames={{ label: 'name', value: 'id' }}
                options={options}
                placeholder="请输入分类"
              />
            </ProForm.Item>
            <ProFormText
              name="title"
              label="商品名"
              placeholder="请输入商品名"
              rules={[{ required: true, message: '请输入商品名' }]}
            />
            <ProFormTextArea
              name="description"
              label="描述"
              placeholder="请输入商品描述"
              rules={[{ required: true, message: '请输入商品描述' }]}
            />
            <ProFormDigit
              name="price"
              label="价格"
              placeholder="请输入商品价格"
              min={0}
              max={99999999}
              rules={[{ required: true, message: '请输入商商品价格' }]}
            />
            <ProFormDigit
              name="stock"
              label="库存"
              placeholder="请输入商品库存"
              min={0}
              max={99999999}
              rules={[{ required: true, message: '请输入商品库存' }]}
            />

            <ProForm.Item
              name="cover"
              label="上传商品主图"
              rules={[{ required: true, message: '请选择商品主图' }]}
            >
              <AliyunOSSUpload>点击上传商品主图</AliyunOSSUpload>
            </ProForm.Item>

            <ProFormTextArea
              name="details"
              label="详情"
              placeholder="请输入商品详情"
              rules={[{ required: true, message: '请输入商品详情' }]}
            />
          </ProForm>
        )
      }
    </Modal>
  );
};

export default CreateOrEdit;
