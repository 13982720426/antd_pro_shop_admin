import request from '@/utils/request';

// 获取当前登录用户信息
export async function queryCurrent() {
  return request('/admin/user');
}

// 获取用户列表
export async function getUsers(params) {
  return request('/admin/users', { params });
}

/**
 * 禁用和启用
 * @param {用户id} uid
 * @returns
 */
export async function lockUser(uid) {
  return request.patch(`/admin/users/${uid}/lock`);
}

/**
 * 添加用户
 * @param {*} params
 * @returns
 */
export async function addUser(params) {
  return request.post('/admin/users', { params });
}
/**
 * 更新用户
 * @param {*} params
 * @returns
 */
export async function updateUser(editId, params) {
  return request.put(`/admin/users/${editId}`, { params });
}
/**
 * 用户详情
 * @param {*} editId
 * @returns
 */
export async function showUser(editId) {
  return request(`/admin/users/${editId}`);
}
