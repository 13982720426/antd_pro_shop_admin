import React,{useRef} from 'react';
import {PageContainer} from "@ant-design/pro-layout"
import ProTable from '@ant-design/pro-table';
import { Button,Avatar,Switch, Tag, Space, Menu, Dropdown } from 'antd';
import { PlusOutlined, UserOutlined } from '@ant-design/icons';


const index = () => {


    const actionRef= useRef()

    const columns=[
        {
            title:"头像",
            dataIndex:"avatar_url",
            hideInSearch:true,
            render:(_,record)=> <Avatar src={record} size={64} icon={<UserOutlined />} />
        },
        {
            title:"姓名",
            dataIndex:"name",
        },
        {
            title:"邮箱",
            dataIndex:"email",
        },
        {
            title:"是否禁用",
            dataIndex:"is_locked",
            hideInSearch:true,
            render:(_,record)=> <Switch 
                checkedChildren="启用" 
                unCheckedChildren="禁用" 
                defaultChecked={record.is_locked === 0}
                onChange={()=>{}}
            />
        },
        {
            title:"创建时间",
            dataIndex:"create_at",
            hideInSearch:true,
        },
        {
            title:"操作",
            render:(_,record)=> <a onChange={()=>{}}>编辑</a>
        },
    ]

    return (
        <PageContainer>
            <ProTable
      columns={columns}
      actionRef={actionRef}
    //   request={async (params = {}, sort, filter) => {
    //     console.log(sort, filter);
    //     return request('https://proapi.azurewebsites.net/github/issues', {
    //       params,
    //     });
    //   }}
      editable={{
        type: 'multiple',
      }}
      rowKey="id"
      search={{
        labelWidth: 'auto',
      }}
      form={{
        // 由于配置了 transform，提交的参与与定义的不同这里需要转化一下
        syncToUrl: (values, type) => {
          if (type === 'get') {
            return {
              ...values,
              created_at: [values.startTime, values.endTime],
            };
          }
          return values;
        },
      }}
      pagination={{
        pageSize: 10,
      }}
      dateFormatter="string"
      headerTitle="用户列表"
      toolBarRender={() => [
        <Button key="button" icon={<PlusOutlined />} type="primary">
          新建
        </Button>,

      ]}
    />
        </PageContainer>
    );
};

export default index;