import { msiteAddress, msiteFoodTypes } from 'services/msite';

export default {
  namespace: 'msite',
  state: {
    msiteAddressData: {},
    FoodTypesData: []
  },
  reducers: {
    save(state, { payload }) {
      return { ...state, ...payload };
    },
  },
  effects: {
    *fetch({ payload }, { call, put }) {
      const msiteAddressData = yield call(msiteAddress, payload.geohash)
      const FoodTypesData = yield call(msiteFoodTypes, payload.geohash)
      yield put({
        type: 'save',
        payload: {msiteAddressData, FoodTypesData}
      });
    },
  }
};
