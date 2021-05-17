import React,{useRef} from 'react';
import {PageContainer} from "@ant-design/pro-layout"
import ProTable from '@ant-design/pro-table';
import { Button,Avatar,Switch } from 'antd';
import { PlusOutlined, UserOutlined } from '@ant-design/icons';
import {getUsers} from "@/services/user"

const index = () => {


    const actionRef= useRef()

    const columns=[
        {
            title:"头像",
            dataIndex:"avatar_url",
            hideInSearch:true,
            render:(_,record)=> <Avatar src={record} size={32} icon={<UserOutlined />} />
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
            dataIndex:"created_at",
            hideInSearch:true,
        },
        {
            title:"操作",
            render:(_,record)=> <a onChange={()=>{}}>编辑</a>
        },
    ]

    // 获取用户列表数据
    const getData = async (params)=>{
      const response=await getUsers(params)
      return {
        data: response.data,
        // success 请返回 true，
        // 不然 table 会停止解析数据，即使有数据
        success: true,
        // 不传会使用 data 的长度，如果是分页一定要传
        total: response.meta.pagination.total,
      };

    }

    return (
        <PageContainer>
            <ProTable
              columns={columns}
              actionRef={actionRef}
              request={async (params = {})=> getData(params)}

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
                <Button key="button" icon={<PlusOutlined />} type="primary">
                  新建
                </Button>,

              ]}
            />
        </PageContainer>
    );
};

export default index;