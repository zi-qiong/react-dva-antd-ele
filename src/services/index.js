import request from 'utils/request';

export function cityGuess() {
  return request('/api/v1/cities?type=guess');
}

export function hotcity() {
  return request('/api/v1/cities?type=hot');
}

export function groupcity() {
  return request('/api/v1/cities?type=group');
}
