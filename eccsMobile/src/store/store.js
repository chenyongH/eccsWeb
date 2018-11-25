import Vue from 'vue'
import Vuex from 'vuex'
import personal from "./personal";

Vue.use(Vuex)


const state={
	procurementState:1,
	keyword:'',
	search:true,
	procurementDetails:true,
	procurement:'商机',
	loginState:0
}
const mutations={
	LOGINSTATE(state,variable){
		state.loginState = variable
	},
	PROCUREMENTSTATE(state,variable){
		state.procurementState = variable
	},
	KEYWORDCHANGE(state,variable){
		state.keyword = variable
	},
	SEARCHCHANGE(state){
		state.search = !state.search
	},
	PROCUREMENTDETAILS(state){
		state.procurementDetails = !state.procurementDetails
	},
	PROCUREMENT(state,variable){
		state.procurement = variable
	}
}

export default new Vuex.Store({
	state,
    mutations,
    modules: {
        personal: personal,
    },
})