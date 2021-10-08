import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)
export default new Vuex.Store({
    state: {
        email: '',
        office: '',
        client: '',
        number: '',
        selectProblem: '',
        softwareSub: '',
        hardwareSub: '',
        connectivitySub: '',
        file1: null, 
        description: '' 
    },

    mutations:{

      homeStore(state, payload){
        state.email = payload.email
        state.office = payload.office
        state.client = payload.client
        state.number = payload.number
        state.selectProblem = payload.selectProblem

      },

      softwareStore(state, payload){
        state.softwareSub = payload.softwareSub
      },

      hardwareStore(state, payload){
        state.hardwareSub = payload.hardwareSub
      },

      connectivityStore(state, payload){
        state.connectivitySub = payload.connectivitySub
      },

      subStore(state, payload){
        state.file1 = payload.file1
        state.description = payload.description
      }
      
    }
  });