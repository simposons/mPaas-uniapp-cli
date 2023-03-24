import dayjs from "dayjs";

const state = {
	appStartTime: dayjs(),
	selectedCustomers: [], // 选中的目标客户
	reason: "", // 一键营销-推荐理由
	versionStatus: false, // 审核状态
};

const mutations = {
	initTime: state => {
		state.appStartTime = dayjs();
	},
	setSelectedCustomers(state, value) {
		state.selectedCustomers = value;
	},
	setReason(state, value) {
		state.reason = value;
	},
	setVersionStatus(state, value) {
		state.versionStatus = value;
	}
};
const actions = {};

export default {
	namespaced: true,
	state,
	mutations,
	actions
};
