import { currentcity, searchplace } from 'services/city';

export default {
  namespace: 'city',
  state: {
    currentcityData: {},
    placeData: []
  },
  reducers: {
    save(state, { payload }) {
      return { ...state, ...payload };
    },
  },
  effects: {
    *fetch({ payload }, { call, put }) {
      const currentcityData = yield call(currentcity, payload);
      yield put({
        type: 'save',
        payload: {currentcityData}
      });
    },
    *serch({ payload }, { call, put }) {
      const placeData = yield call(searchplace, payload);
      yield put({
        type: 'save',
        payload: {placeData}
      });
    }
  },
  subscriptions: {
    setup({ dispatch, history }) {
      return history.listen(({ pathname }) => {
        if (pathname.indexOf('/city/') === 0) {
          let querys = pathname.split('/')
          let cityId = querys[querys.length - 1]
          dispatch({ type: 'fetch', payload: cityId });
        }
      });
    },
  },
};
