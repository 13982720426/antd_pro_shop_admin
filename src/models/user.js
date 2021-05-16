import { queryCurrent, query as queryUsers } from '@/services/user';

const UserModel = {
  namespace: 'user',
  state: {
    currentUser: {},
  },
  effects: {
    *fetch(_, { call, put }) {
      const response = yield call(queryUsers);
      yield put({
        type: 'save',
        payload: response,
      });
    },
    // 获取用户信息
    *fetchCurrent(_, { call, put }) {
      // 查看localstorage是否有用户信息，没有再去请求
      let userInfo = JSON.parse(localStorage.getItem('userInfo'));
      if (!userInfo) {
        userInfo = yield call(queryCurrent);
        if (userInfo.useCache !== false) localStorage.setItem('userInfo', JSON.stringify(userInfo));
      }

      yield put({
        type: 'saveCurrentUser',
        payload: userInfo,
      });
    },
  },
  reducers: {
    saveCurrentUser(state, action) {
      return { ...state, currentUser: action.payload || {} };
    },
  },
};
export default UserModel;
