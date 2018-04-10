import { cityGuess, hotcity, groupcity} from '../services/index';

export default {
  namespace: 'home',
  state: {
    groupcityData: {},
    cityGuessData: {},
    hotcityData: []
  },
  reducers: {
    save(state, { payload }) {
      return { ...state, ...payload };
    },
  },
  effects: {
    *fetch({ payload }, { call, put }) {
      const cityGuessData = yield call(cityGuess);
      const hotcityData = yield call(hotcity);
      const groupcityData = yield call(groupcity);
      yield put({
        type: 'save',
        payload: {cityGuessData, hotcityData, groupcityData}
      });
    },
  },
  subscriptions: {
    setup({ dispatch, history }) {
      return history.listen(({ pathname }) => {
        if (pathname === '/') {
          dispatch({ type: 'fetch' });
        }
      });
    },
  },
};
