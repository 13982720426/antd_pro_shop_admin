import request from '@/utils/request';

// 获取当前登录用户信息
export async function queryCurrent() {
  return request('/admin/user');
}

// 获取用户列表
export async function getUsers(params) {
  return request('/admin/users', { params });
}
