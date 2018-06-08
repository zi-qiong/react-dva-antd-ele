import { msiteAddress, msiteFoodTypes, shopList } from 'services/msite';

export default {
  namespace: 'msite',
  state: {
    msiteAddressData: {},
    FoodTypesData: [],
    shopListData: []
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
      const shopListData = yield call(shopList, payload.latitude, payload.longitude, 0, '')
      yield put({
        type: 'save',
        payload: {msiteAddressData, FoodTypesData, shopListData}
      });
    },
  }
};
