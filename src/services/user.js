import request from '@/utils/request';

/**
 * 关于 request 第二参数，常用两个传参方式
 *
 * 1.params 传参，也就是query传参，多用于get请求，查询数据使用，类型是对象或者 URLSearchParams
 * 2.data 传参，也就是body传参，多用于提交表单数据，类型是any，推荐使用对象
 */

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
export async function addUser(data) {
  return request.post('/admin/users', { data });
}
/**
 * 更新用户
 * @param {*} params
 * @returns
 */
export async function updateUser(editId, data) {
  return request.put(`/admin/users/${editId}`, { data });
}
/**
 * 用户详情
 * @param {*} editId
 * @returns
 */
export async function showUser(editId) {
  return request(`/admin/users/${editId}`);
}
