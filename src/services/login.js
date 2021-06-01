import request from '@/utils/request';

export async function fakeAccountLogin(data) {
  return request('/auth/login', {
    method: 'POST',
    data,
  });
}
export async function logout() {
  return request.post('/auth/logout');
}
