<template>
  <div class="row">
    <div class="col s6 offset-s3">
      <h1>Create Task</h1>
      <form @submit.prevent="submitHandler">
        <div class="input-field ">
          <input id="title" type="text" class="validate" required v-model="title">
          <label for="title">Title</label>
          <span class="helper-text" data-error="please enter title" ></span>
        </div>

        <div class="chips" ref="chips"></div>

        <div class="input-field ">
          <textarea id="description" class="materialize-textarea" v-model="description"></textarea>
          <label for="description">Description</label>
          <span class="character-counter" style="float: right; font-size: 12px;">{{description.length}}/1024</span>
        </div>

        <input type="text" ref="datepicker">

        <button class="btn" type="submit">Create Task</button>
      </form>
    </div>

  </div>
</template>

<script>
// @ is an alias to /src
//import HelloWorld from '@/components/HelloWorld.vue'

export default {
  name: 'Create',
  components: {

  },
  data: () => ({
      description: '',
      title: '',
      chips: null,
      date:  null
  }),
  mounted() {
      this.chips = M.Chips.init(this.$refs.chips, {
          placeholder: 'Task tags'
      });

      this.date = M.Datepicker.init(this.$refs.datepicker, {
          format: 'dd.mm.yyyy',
          firstDay: 1,
          defaultDate: new Date(),
          setDefaultDate: true
      });

  },
   methods: {
        submitHandler() {
            const task = {
                id: Date.now(),
                title: this.title,
                description: this.description,
                status: 'active',
                tags: this.chips.chipsData,
                date: this.date.date
            }
            this.$store.dispatch('createTask', task)
            this.$router.push('/list')
        }
   },
   destroyed(){
      // удаляем объекты плагинов
      // в нашем случае это плагина Материалайз  M.Chips  и   M.Datepicker
      if( this.date && this.date.destroy ) {
          this.date.destroy()
      }
       if( this.chips && this.chips.destroy ) {
           this.chips.destroy()
       }
   }

}
</script>

<style scoped lang="scss">
  .chips {
    margin: 15px 0 50px;
  }

  .btn {
    margin-bottom: 50px;
    margin-top: 25px;
  }

</style>