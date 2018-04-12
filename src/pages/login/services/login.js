import request from '../../../utils/request';

export function getcaptchas() {
  return request('/api/v1/captchas', {method: 'POST'});
}

export function login(params) {
  return request('/api/v2/login', {method: 'POST', body: JSON.stringify(params)});
}
