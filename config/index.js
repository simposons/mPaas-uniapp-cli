import baseApi from './baseApi.json'
import imgUrl from './imgUrl.json';

let env = 'sit'  // 环境变量
let isUpdate = true; // 是否提示更新


// #ifdef PROD
console.log("生产环境");
env = 'prod'
// #endif



const config = {
	env,
	isUpdate,
	baseApi,
	imgUrl,
};
export default config;
