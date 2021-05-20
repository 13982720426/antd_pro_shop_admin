import React, { useRef, useState } from 'react';
import { PageContainer } from '@ant-design/pro-layout';
import ProTable from '@ant-design/pro-table';
import { Button, Image, Switch, message } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { getGoods } from '@/services/goods';
import CreateOrEdit from './components/CreateOrEdit';

const index = () => {
  const [isModalVisible, setisModalVisible] = useState(false);
  const [editId, setEditId] = useState(undefined);

  // 表格的ref，便于操作自定义操作表格
  const actionRef = useRef();

  // 获取商品列表数据
  const getData = async (params) => {
    const response = await getGoods(params);

    return {
      data: response.data,
      // success 请返回 true，
      // 不然 table 会停止解析数据，即使有数据
      success: true,
      // 不传会使用 data 的长度，如果是分页一定要传
      total: response.meta.pagination.total,
    };
  };

  // 禁启用
  const heandleLockUser = async (uid) => {
    const response = await lockUser(uid);
    if (response.status === undefined) {
      message.success('操作成功！');
    }
  };

  // 控制新建/添加用户模态框显示和隐藏
  const isShowModal = (show, id = undefined) => {
    setEditId(id);
    setisModalVisible(show);
  };

  const columns = [
    {
      title: '商品图',
      dataIndex: 'cover_url',
      hideInSearch: true,
      render: (_, record) => (
        <Image
          width={64}
          src={record.cover_url}
          placeholder={<Image preview={false} src={record.cover_url} width={200} />}
        />
      ),
    },
    {
      title: '标题',
      dataIndex: 'title',
    },
    {
      title: '价格',
      dataIndex: 'price',
      hideInSearch: true,
    },
    {
      title: '库存',
      dataIndex: 'stock',
      hideInSearch: true,
    },
    {
      title: '销量',
      dataIndex: 'sales',
      hideInSearch: true,
    },

    {
      title: '是否上架',
      dataIndex: 'is_on',
      render: (_, record) => (
        <Switch
          checkedChildren="已上架"
          unCheckedChildren="未上架"
          defaultChecked={record.is_on === 1}
          onChange={() => {
            heandleLockUser(record.id);
          }}
        />
      ),
      valueType: 'radioButton',
      valueEnum: {
        1: { text: '已上架' },
        0: { text: '未上架' },
      },
    },
    {
      title: '是否推荐',
      dataIndex: 'is_recommend',
      render: (_, record) => (
        <Switch
          checkedChildren="已推荐"
          unCheckedChildren="未推荐"
          defaultChecked={record.is_recommend === 1}
          onChange={() => {
            heandleLockUser(record.id);
          }}
        />
      ),
      valueType: 'radioButton',
      valueEnum: {
        1: { text: '已推荐' },
        0: { text: '未推荐' },
      },
    },
    {
      title: '创建时间',
      dataIndex: 'created_at',
      hideInSearch: true,
    },
    {
      title: '操作',
      hideInSearch: true,
      render: (_, record) => <a onClick={() => isShowModal(true, record.id)}>编辑</a>,
    },
  ];

  return (
    <PageContainer>
      <ProTable
        columns={columns}
        actionRef={actionRef}
        request={async (params = {}) => getData(params)}
        rowKey="id"
        search={{
          labelWidth: 'auto',
        }}
        pagination={{
          pageSize: 10,
        }}
        dateFormatter="string"
        headerTitle="用户列表"
        toolBarRender={() => [
          <Button
            key="button"
            icon={<PlusOutlined />}
            type="primary"
            onClick={() => isShowModal(true)}
          >
            新建
          </Button>,
        ]}
      />

      {
        // 模态框隐藏的时候，不挂载组件，显示的时候挂载组件，这是为了触发子组件的生命周期
        !isModalVisible ? (
          ''
        ) : (
          <CreateOrEdit
            isModalVisible={isModalVisible}
            isShowModal={isShowModal}
            actionRef={actionRef}
            editId={editId}
          />
        )
      }
    </PageContainer>
  );
};

export default index;
