import request from '@/utils/request';

export async function fakeAccountLogin(params) {
  return request('/auth/login', {
    method: 'POST',
    data: params,
  });
}
export async function logout() {
  return request.post('/auth/logout');
}
