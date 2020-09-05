import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    tasks: JSON.parse( localStorage.getItem('tasks') || '[]' )
  },
  mutations: {
      createTask(state, task) {
        state.tasks.push(task);

        localStorage.setItem('tasks', JSON.stringify(state.tasks));
      },
      updateTask(state, {id, description, tags, date}) {
          const tasks = this.state.tasks.concat() //  copy this.state.tasks
          const ind   = tasks.findIndex( t => t.id === id );
          const task  = tasks[ind]

          const status = new Date(date) > Date.now() ? 'active' : 'outdated'

          tasks[ind]  = {...task, date, description, status, tags}

          state.tasks = tasks;

          localStorage.setItem('tasks', JSON.stringify(state.tasks));
      }
  },
  actions: {
      createTask({commit}, task) {
        commit('createTask', task)
      },
      updateTask({commit}, task) {
          commit('updateTask', task)
      }
  },
  getters: {
      tasks: state => state.tasks,
      taskByID: state => id => state.tasks.find( t => t.id === id ),

  },
  modules: {

  }
})
