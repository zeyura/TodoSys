<template>
    <div>

        <h1>List</h1>

        <div class="row" v-if="tasks.length">
            <div class="input-field col s12 m6 l4">
                <select class="" v-model="filter" ref="selectFilter">
                    <option value="all" selected>All tasks</option>
                    <option value="active">Active</option>
                    <option value="outdated">Outdated</option>
                    <option value="completed">Completed</option>
                </select>
                <label>Status Filter</label>
            </div>
            <div class="input-field col s12 m6 l4">
                <select class="" v-model="sorter" ref="selectSorter"  @change="sortChange()">
                    <option value="date" selected>By Date &uparrow;</option>
                    <option value="dateAgo">By Date &darr;</option>
                    <option value="ask">Ask</option>
                    <option value="desk">Desk</option>
                </select>
                <label>Tasks sort </label>
            </div>
        </div>

        <table v-if="filteredTasks.length">
            <thead>
                <tr>
                    <th>#</th>
                    <th>Title</th>
                    <th style="width: 99px">Date</th>
                    <th>Description</th>
                    <th>Status</th>
                    <th style="width: 80px">Open</th>
                </tr>
            </thead>
            <tbody>
                <tr
                    v-for="(task,ind) in filteredTasks"
                    :key="task.id"
                >
                    <td>{{ind+1}}</td>
                    <td class="td-title">{{task.title}}</td>
                    <td style="width: 99px">{{ new Date(task.date).toLocaleDateString() }}</td>
                    <td class="td-description"><div>{{task.description}}</div></td>
                    <td>{{task.status}}</td>
                    <td style="width: 80px">
                        <router-link tag="button" class="btn btn-small" :to="'/task/' + task.id">
                            Open
                        </router-link>
                    </td>
                </tr>
            </tbody>
        </table>

        <p v-else>No tasks!</p>

    </div>
</template>

<script>
    export default {
        name: "list",
        data: () => ({
           tasksArr: [],
           filter: 'all',
           sorter: localStorage.getItem('tasksSort'),
        }),
        computed: {
            tasks() {
                if( this.sorter === 'date' ) return this.tasksArr.sort((a,b) => new Date(a.date) > new Date(b.date) ? 1 : -1 );
                else if( this.sorter === 'dateAgo' ) return this.tasksArr.sort((a,b) => new Date(a.date) < new Date(b.date) ? 1 : -1 );
                else if( this.sorter === 'ask' ) return this.tasksArr.sort((a,b) => a.title > b.title ? 1 : -1 );
                else if( this.sorter === 'desk') return this.tasksArr.sort((a,b) => a.title < b.title ? 1 : -1 );
                else return this.tasksArr;
            },
            filteredTasks() {
                return this.tasks.filter( t => {
                    if( this.filter === 'all' ) {
                        return true;
                    } else {
                        return t.status === this.filter;
                    }
                })
            }
        },
        mounted() {
            this.selectFilter = M.FormSelect.init(this.$refs.selectFilter, {});
            this.selectSorter = M.FormSelect.init(this.$refs.selectSorter, {});
        },
        methods: {
            sortChange() {
                localStorage.setItem('tasksSort', this.sorter);
            }
        },
        created() {
            this.tasksArr   = this.$store.getters.tasks;

            if(!localStorage.getItem('tasksSort')) {
                localStorage.setItem('tasksSort', 'date');
                this.sorter = localStorage.getItem('tasksSort');
            }
        }
    }
</script>

<style lang="scss" scoped>

    td, th {
        padding: 12px 4px;
    }
    td {
        //vertical-align: top;
    }
    .td-title {
        max-width: 150px;
    }
    .td-description {
        max-width: 150px;

        div {
            white-space: nowrap;
            text-overflow: ellipsis;
            overflow: hidden;
        }
    }

    @media only screen and (min-width: 601px) {
        .td-description { max-width: 200px; }
    }
    @media only screen and (min-width: 768px) {
        .td-description { max-width: 400px; }
    }
    @media only screen and (min-width: 993px) {
        .td-description { max-width: 600px; }
    }

</style>