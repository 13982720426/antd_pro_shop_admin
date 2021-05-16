import { history } from 'umi';
import { fakeAccountLogin, logout } from '@/services/login';

import { message } from 'antd';

const Model = {
  namespace: 'login',
  state: {},
  effects: {
    *login({ payload }, { call, put }) {
      // loading
      const load = message.loading('登录中...');

      const response = yield call(fakeAccountLogin, payload);
      // 判断是否登陆成功
      if (response.status === undefined) {
        yield put({
          type: 'changeLoginStatus',
          payload: response,
        }); // Login successfully

        // 跳转到首页
        history.replace('/');
        message.success('🎉 🎉 🎉  登录成功！');
      }
      load();
    },

    *logout(_, { call }) {
      // loading
      const load = message.loading('退出中...');

      // 请求Api，退出登录
      const response = yield call(logout);

      // 判断是否成功退出
      if (response.status === undefined) {
        // 删除本地存储的token和userInfo
        localStorage.removeItem('access_token');
        localStorage.removeItem('userInfo');
        // 重定向到登录页
        history.replace('/login');
        message.success('🎉 🎉 🎉  退出成功！');
      }
      load();
    },
  },
  reducers: {
    changeLoginStatus(state, { payload }) {
      // 将token存入localStorage
      localStorage.setItem('access_token', payload.access_token);
      return { ...state };
    },
  },
};
export default Model;
