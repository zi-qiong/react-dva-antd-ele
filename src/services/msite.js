import request from 'utils/request';

export function msiteAddress(param) {
  return request(`/api/v2/pois/${param}`);
}

export function msiteFoodTypes(param) {
  return request(`/api/v2/index_entry?geohash=${param}&group_type=1&flags[]=F`);
}
