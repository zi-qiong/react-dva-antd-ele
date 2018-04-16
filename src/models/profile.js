import { cityGuess, hotcity, groupcity} from 'services/index';

export default {
  namespace: 'profile',
  state: {
  },
  reducers: {
    save(state, { payload }) {
      return { ...state, ...payload };
    },
  },
  effects: {
    *fetch({ payload }, { call, put }) {
      yield put({
        type: 'save',
        payload: {}
      });
    },
  },
  subscriptions: {
    setup({ dispatch, history }) {
      return history.listen(({ pathname }) => {
        if (pathname === '/msite') {
          dispatch({ type: 'fetch' });
        }
      });
    },
  },
};
