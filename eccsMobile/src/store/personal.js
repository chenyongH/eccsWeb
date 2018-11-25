/**
 * Created by Administrator on 2018/10/29 0029.
 */
const state = {
    head:'新闻资讯'
};
const mutations = {
    change_head (state, type) {
        state.head = type;
    },
};
const actions = {
    changehead ({commit},type) {
        commit("change_head", type)
    },
};
const getters = {
    head:(state)=>{
        return state.head
    },
};

export default {
    state,
    mutations,
    actions,
    getters
}