<template>
    <div class="row">
        <div v-if="task" class="col s6 offset-s3">
            <h1>{{task.title}}</h1>

            <form @submit.prevent="submitHandler">

                <div class="chips" ref="chips"></div>

                <div class="input-field ">
                    <textarea id="description" class="materialize-textarea" v-model="description"></textarea>
                    <label for="description">Description</label>
                    <span class="character-counter" style="float: right; font-size: 12px;">{{description.length}}/1024</span>
                </div>

                <input type="text" ref="datepicker">

                <button class="btn" type="submit" style="margin-right: 1rem">Update</button>
                <button class="btn orange" type="button">Complete</button>

            </form>
        </div>
        <p v-else>Task not found!</p>
    </div>
</template>

<script>
    export default {
        name: "task",
        data: () => ({
            description: '',
           // title: '',
            chips: null,
            date:  null
        }),
        mounted() {
            this.description = this.task.description;

            this.chips = M.Chips.init(this.$refs.chips, {
                placeholder: 'Task tags',
                data: this.task.tags,
            });

            this.date = M.Datepicker.init(this.$refs.datepicker, {
                format: 'dd.mm.yyyy',
                firstDay: 1,
                defaultDate: new Date( this.task.date ),
                setDefaultDate: true
            });

            setTimeout(() => {
               M.updateTextFields()
            }, 50)

        },
        computed: {
            task() {
                // console.log( typeof( this.$route.params.id ) )
                return this.$store.getters.taskByID(+this.$route.params.id) // $route.params.id -> String
            }

        },
        methods: {
            submitHandler() {

                this.$store.dispatch('updateTask', {
                    id: this.task.id,
                    description: this.description,
                   // status: this.task.status,
                    tags: this.chips.chipsData,
                    date: this.date.date
                })

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
        },

    }

</script>

<style lang="scss" scoped>

    .chips {
        margin: 15px 0 50px;
    }

    .btn {
        margin-bottom: 50px;
        margin-top: 25px;
    }

    textarea {
        min-height: 58px;
    }

</style>