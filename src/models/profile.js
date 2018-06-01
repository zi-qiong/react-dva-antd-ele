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
      const userId = getStore('user_token')
      if (userId) {
        const userInfo = yield call(getUserInfo, userId);
        yield put({
          type: 'save',
          payload: {userInfo: userInfo}
        });
      }
    },
    *loginOut({payload}, { call, put }) {
      yield call(loginOut)
      router.push('/profile')
      yield put({
        type: 'save',
        payload: {userInfo: {}}
      });
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
