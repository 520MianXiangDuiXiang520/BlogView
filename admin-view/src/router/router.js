// // router.js

import Vue from 'vue'
import Router from 'vue-router' // 引入vue-router
import NewArticle from '../components/article/NewArticle.vue'
import Friendship from '../components/friendship/Friendship.vue'
import HelloWorld from '../components/HelloWorld.vue'
import Detail from '../components/detail/Detail.vue'
import List from '../components/list/List.vue'
import Tag from '../components/tag/Tag.vue'


Vue.use(Router) //使用vue-router

export default new Router({
    routes: [
        {
            path: "/index",
            name: "HelloWorld",
            component: HelloWorld
        },
        {
            path: "/newArticle",
            name: "newArticle",
            component: NewArticle
        },
        {
            path: "/friendship",
            name: "Friendship",
            component: Friendship
        },
        {
            path: '/list',
            redirect: '/list/1'
        },
        {
            path: "/list/:page",
            name: "list",
            component: List
        },
        {
            path: "/detail/:id",
            name: "detail",
            component: Detail
        },
        {
            path: "/tag",
            name: "tag",
            component: Tag
        }
    ]
})