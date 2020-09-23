// router.js

import Vue from 'vue'
import Router from 'vue-router' // 引入vue-router
import Detail from '../components/detail/Detail.vue'
import List from '../components/list/List.vue'
import Friend from "../components/firend/Friend.vue"
import Tags from "../components/tags/Tags.vue"

Vue.use(Router) //使用vue-router

export default new Router({
    routes: [
        {
            path: '/',
            redirect: '/index/1'
        },
        {
            path: "/index/:page",
            name: "list",
            component: List
        },
        {
            path: "/detail/:id",
            name: "detail",
            component: Detail
        },
        {
            path: "/friend",
            name: "friend",
            component: Friend
        },
        {
            path: "/tag",
            name: "tag/",
            component: Tags
        },
    ]
})