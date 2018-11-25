/**
 * Created by Administrator on 2018/10/29 0029.
 */
/* eslint-disable */
const state = {
    Admission: "",/*入驻类型 0,1,2*/
    Status:'',
};
const mutations = {
    change_Admission (state, type) {
        state.Admission = type;
    },
    change_Status (state, type) {
        state.Status = type;
    }
};
const actions = {
    changeAdmission ({commit},type) {
        commit("change_Admission", type)
    },
    changeStatus ({commit},type) {
        commit("change_Status", type)
    }
};
const getters = {
    types:(state)=>{
        return state.Admission
    },
    Status:(state)=>{
        return state.Status
    }
};

// 不要忘记把state, mutations等暴露出去。
export default {
    state,
    mutations,
    actions,
    getters
}