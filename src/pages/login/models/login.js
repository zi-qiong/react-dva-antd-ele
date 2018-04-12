import { getcaptchas, login } from '../services/login';
import { Toast } from 'antd-mobile';
import router from 'umi/router';

export default {
  namespace: 'login',
  state: {
    captchas: {}
  },
  reducers: {
    save(state, { payload }) {
      return { ...state, ...payload };
    },
  },
  effects: {
    *fetch({ payload }, { call, put }) {
      const captchas = yield call(getcaptchas);
      yield put({ type: 'save', payload: {captchas: captchas} });
    },
    *login({ payload }, { call, put }) {
      const userInfo = yield call(login, payload);
      if (!userInfo.user_id) {
        Toast.info(userInfo.message)
        yield put({type: 'fetch'})
      } else {
        router.go(-1);
      }
    }
  },
  subscriptions: {
    setup({ dispatch, history }) {
      return history.listen(({ pathname, query }) => {
        if (pathname === '/login') {
          dispatch({ type: 'fetch' });
        }
      });
    },
  },
};
