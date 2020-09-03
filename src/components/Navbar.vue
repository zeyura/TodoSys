<template>
    <nav class="teal darken-1">
        <div class="nav-wrapper">
            <router-link to="/" class="brand-logo">Tasks</router-link>
            <ul id="nav-mobile" class="right hide-on-med-and-down">
                <router-link
                    tag="li"
                    to="/"
                    exact
                    active-class="active"
                >
                    <a href="#">Create</a>
                </router-link>
                <router-link
                        tag="li"
                        to="/list"
                        active-class="active"
                >
                    <a href="#">List</a>
                </router-link>
            </ul>
        </div>
    </nav>
</template>

<script>
    export default {
        name: "navbar"
    }
</script>

<style lang="scss" scoped>
    nav {
        padding-left: 2rem;

        ul {

            a {
                padding-left: 25px;
                padding-right: 25px;
            }
        }
    }
</style>