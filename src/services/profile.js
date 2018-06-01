import request from 'utils/request';

export function getUserInfo(param) {
  return request(`/api/v1/user?user_id=${param}`);
}

export function loginOut() {
  return request('/api/v2/signout');
}
