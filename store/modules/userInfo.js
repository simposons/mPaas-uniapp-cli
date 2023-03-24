const state = {
	isAdviser: false,
	adviserInfo: {},
	shareData: {},
	userInfo: {},
	uuid: ""
};

const mutations = {
	setAdviser: (state, value) => {
		state.isAdviser = value;
	},
	setAdviserInfo(state, value) {
		state.adviserInfo = value;
	},
	setShareData(state, value) {
		state.shareData = value;
	},
	setUserInfo(state, value) {
		state.userInfo = value;
	},
	setUuid(state, value) {
		state.uuid = value;
	}
};
const actions = {};

export default {
	namespaced: true,
	state,
	mutations,
	actions
};
