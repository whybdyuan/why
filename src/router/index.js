import { createRouter, createWebHistory } from 'vue-router'
import Layout from '../components/Layout.vue'
import HomeView from '../views/HomeView.vue'
import ArticleDetailView from '../views/ArticleDetailView.vue'
import CategoryView from '../views/CategoryView.vue'
import SearchResultView from '../views/SearchResultView.vue'
import LoginView from '../views/LoginView.vue'
import RegisterView from '../views/RegisterView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/login',
      name: 'login',
      component: LoginView
    },
    {
      path: '/register',
      name: 'register',
      component: RegisterView
    },
    {
      path: '/',
      name: 'layout',
      component: Layout,
      children: [
        {
          path: '',
          name: 'home',
          component: HomeView
        },
        {
          path: '/article/:id',
          name: 'articleDetail',
          component: ArticleDetailView,
          props: true
        },
        {
          path: '/category/:id',
          name: 'category',
          component: CategoryView,
          props: true
        },
        {
          path: '/search/:keyword',
          name: 'search',
          component: SearchResultView,
          props: true
        }
      ]
    }
  ]
})

export default router