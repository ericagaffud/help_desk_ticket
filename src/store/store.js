import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)
export default new Vuex.Store({
    state: {
        email: '',
        office: '',
        client: '',
        phone: '09',
        selectProblem: '',
        softwareSub: '',
        hardwareSub: '',
        connectivitySub: '',
        selectedFile: null, 
        description: '' 
    },

    mutations:{

      homeStore(state, payload){
        state.email = payload.email
        state.office = payload.office
        state.client = payload.client
        state.phone = payload.phone
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
        state.selectedFile = payload.selectedFile
        state.description = payload.description
      }
      
    }
  });