import Vue from 'vue'
import VueRouter from 'vue-router'
import HomePage from '../components/pages/Home.vue'
import { RouteNames } from './routes'
import PostPage from '@/components/pages/PostPage.vue'
import PostsPage from '@/components/pages/PostsPage.vue'
import EditPostPage from '@/components/pages/EditPostPage.vue'
import CreatePostPage from '@/components/pages/CreatePostPage.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: RouteNames.HOME,
    component: HomePage
  },
  {
    path: '/posts',
    name: RouteNames.POSTS,
    component: PostsPage
  },
  {
    path: '/posts/:id',
    name: RouteNames.POST,
    component: PostPage
  },
  {
    path: '/posts/:id/edit',
    name: RouteNames.EDIT,
    component: EditPostPage
  },
  {
    path: '/create',
    name: RouteNames.CREATE,
    component: CreatePostPage
  }
]

const router = new VueRouter({
  mode: 'history',
  base: '/',
  routes
})

export default router
