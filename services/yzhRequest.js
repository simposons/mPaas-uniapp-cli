import config from '@/config';
import requests from './request.js';

const { baseApi, env } = config;
const { request, ajax } = requests;
const URL = 'main_url';
const BASE_API = baseApi[URL][env];

const yzhRequest = {
	testAjax(param) {
		const params={
			funcNo: '1',
			...param
		};
		return ajax.post(BASE_API, params);
	},
	testRequest(params) {
		return request(BASE_API, 'POST', params, false);
	},
};
export default yzhRequest;
