import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    tasks: JSON.parse( localStorage.getItem('tasks') || '[]' ).map( task => {
        if( new Date(task.date) < new Date ) task.status = 'outdated';
        return task;
    })
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
      },
      completeTask(state, id) {
          const ind   = this.state.tasks.findIndex( t => t.id === id );
          this.state.tasks[ind].status = 'completed';

          localStorage.setItem('tasks', JSON.stringify(state.tasks));
      }
  },
  actions: {
      createTask({commit}, task) {
        commit('createTask', task)
      },
      updateTask({commit}, task) {
          commit('updateTask', task)
      },
      completeTask({commit}, task) {
          commit('completeTask', task)
      }
  },
  getters: {
      tasks: state => state.tasks,
      taskByID: state => id => state.tasks.find( t => t.id === id ),

  },
  modules: {

  }
})
