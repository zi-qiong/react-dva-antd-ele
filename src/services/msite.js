import request from 'utils/request';
import { stringify } from 'qs'

export function msiteAddress(param) {
  return request(`/api/v2/pois/${param}`);
}

export function msiteFoodTypes(param) {
  return request(`/api/v2/index_entry?geohash=${param}&group_type=1&flags[]=F`);
}

export function shopList(latitude, longitude, offset, restaurant_category_id = '', restaurant_category_ids = '', order_by = '', delivery_mode = '', support_ids = []) {
  let supportStr = '';
  support_ids.forEach(item => {
		if (item.status) {
			supportStr += '&support_ids[]=' + item.id;
		}
	});
  let data = {
		latitude,
		longitude,
		offset,
		limit: '20',
		'extras[]': 'activities',
		keyword: '',
		restaurant_category_id,
		'restaurant_category_ids[]': restaurant_category_ids,
		order_by,
		'delivery_mode[]': delivery_mode + supportStr
	};
  return request(`/api/shopping/restaurants?${stringify(data)}`);
}
