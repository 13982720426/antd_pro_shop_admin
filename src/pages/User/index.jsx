import React,{useRef,useState} from 'react';
import {PageContainer} from "@ant-design/pro-layout"
import ProTable from '@ant-design/pro-table';
import { Button,Avatar,Switch, message,Modal } from 'antd';
import { PlusOutlined, UserOutlined } from '@ant-design/icons';
  import {getUsers,lockUser} from "@/services/user"
  import ProForm, { ProFormText } from '@ant-design/pro-form';


const index = () => {

    const [isModalVisible, setisModalVisible] = useState(false)

    const actionRef= useRef()

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

    // 禁启用
    const heandleLockUser= async (uid)=>{
      const response = await lockUser(uid)
      if(response.status===undefined){
        message.success('操作成功！')
      }else{
        message.error("操作失败！")
      }
    }

    // 关闭模态框
    const closeModal=()=>{
      setisModalVisible(false)
    }
    // 打开添加表单
    const openCreateForm=()=>{
      setisModalVisible(true)
    }


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
              onChange={()=>{heandleLockUser(record.id)}}
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
                <Button key="button" icon={<PlusOutlined />} type="primary" onClick={()=>openCreateForm()}>
                  新建
                </Button>,
              ]}
            />
          <Modal title="添加用户" 
            visible={isModalVisible} 
            onCancel={closeModal}
            footer={null}
            >
              <ProForm
                onFinish={ (values) => {
    
                  message.success('提交成功');
                }}
   
              >
                <ProFormText
                  name="name"
                  label="昵称"
                  placeholder="请输入昵称"
                  rules={[
                    {required:true,message:'请输入昵称'}
                  ]}
                />
                <ProFormText
                  name="email"
                  label="邮箱"
                  placeholder="请输入邮箱"
                  rules={[
                    {required:true,message:'请输入邮箱'},
                    {type:"email",message:'邮箱格式不正确'},
                  ]}
                />
                <ProFormText.Password
                  name="password"
                  label="密码"
                  placeholder="请输入密码"
                  rules={[
                    {required:true,message:'请输入密码'},
                    {min:6,message:'密码最小6位'},
                  ]}
                />
              </ProForm>
          </Modal>

        </PageContainer>
    );
};

export default index;