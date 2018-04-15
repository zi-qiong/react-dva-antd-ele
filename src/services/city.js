import { stringify } from 'qs'
import request from 'utils/request';

export function currentcity(params) {
  return request(`/api/v1/cities/${params}`);
}

export function searchplace(params) {
  return request(`/api/v1/pois?${stringify(params)}`);
}
