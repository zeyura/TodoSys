<template>
    <div>

        <h1>List</h1>

        <hr>

        <table v-if="tasks.length">
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
                    v-for="(task,ind) in tasks"
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
        computed: {
            tasks() {
                return this.$store.getters.tasks;
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
        max-width: 600px;

        div {
            white-space: nowrap;
            text-overflow: ellipsis;
            overflow: hidden;
        }
    }

</style>