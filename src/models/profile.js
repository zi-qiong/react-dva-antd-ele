import { getUserInfo, loginOut } from 'services/profile';
import { getStore } from 'utils/localStorage'
import router from 'umi/router';

export default {
  namespace: 'profile',
  state: {
    userInfo: {}
  },
  reducers: {
    save(state, { payload }) {
      return { ...state, ...payload };
    },
  },
  effects: {
    *fetch({ payload }, { call, put }) {
      const userInfo = {}
      if (getStore('user_token')) {
        userInfo = yield call(getUserInfo, getStore('user_token'));
      }
      yield put({
        type: 'save',
        payload: {userInfo: userInfo}
      });
    },
    *loginOut({payload}, { call }) {
      yield call(loginOut)
      router.push('/profile')
    }
  },
  subscriptions: {
    setup({ dispatch, history }) {
      return history.listen(({ pathname }) => {
        if (pathname === '/profile' || pathname === '/profile/info') {
          dispatch({ type: 'fetch' });
        }
      });
    },
  },
};
