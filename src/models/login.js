import { stringify } from 'querystring';
import { history } from 'umi';
import { fakeAccountLogin } from '@/services/login';
import { setAuthority } from '@/utils/authority';
import { getPageQuery } from '@/utils/utils';
import { message } from 'antd';

const Model = {
  namespace: 'login',
  state: {},
  effects: {
    *login({ payload }, { call, put }) {
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
    },

    logout() {
      const { redirect } = getPageQuery(); // Note: There may be security issues, please note

      if (window.location.pathname !== '/user/login' && !redirect) {
        history.replace({
          pathname: '/user/login',
          search: stringify({
            redirect: window.location.href,
          }),
        });
      }
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
