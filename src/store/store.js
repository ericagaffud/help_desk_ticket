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
        issues: [],
        offices: [],
    },
    mutations: {
      //syncrous
/*       setCurrentJoke(state, payload) {
        state.currentJoke = payload;
        state.allJokes.push(payload);
      } */
      setIssue(state, newIssue) {
        state.email = newIssue
        state.office = newIssue
        state.client = newIssue
        state.number = newIssue
        state.selectProblem = newIssue
        state.issues.push(newIssue)
      }
    },
    actions: {
      //asyncronous
/*       async setCurrentJoke(state) {
        const joke = await fetch(url, { headers });
        const j = await joke.json();
        state.commit("setCurrentJoke", j.joke);
      } */

      async myIssue(state) {
        const res = await fetch('http://localhost:5000/issues')
        const data = await res.json()
        state.commit("myIssue", data.res)
      }
    },
    modules: {},
    getters: {
      getCurrentJoke: state => state.currentJoke,
      getAllJokes: state => state.allJokes
    }
  });