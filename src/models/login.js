import { getcaptchas, login } from 'services/login';
import { Toast } from 'antd-mobile';
import router from 'umi/router';
import { setStore } from 'utils/localStorage'
export default {
  namespace: 'login',
  state: {
    captchas: {},
    userInfo: {}
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
        yield put({ type: 'save', payload: {userInfo} });
        setStore('user_token',userInfo.id)
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
