import { createRouter, createWebHistory } from 'vue-router'
// import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(/#/),
  routes: [
    {
      path: '/',
      name: 'index',
      component: () => import('../views/HomeView.vue'),
      children: [
        {
          path: '',
          name: 'home',
          component: () => import('../views/HomePage.vue')
        },
        {
          path: 'CreateCourses',
          name: 'CreateCourses',
          component: () => import('../views/CreateCourses.vue'),
          children: [
            {
              path: 'BeATeacherStep1',
              name: 'BeATeacherStep1',
              component: () => import('../views/BeATeacherStep1.vue')
            },
            {
              path: 'BeATeacherStep2',
              name: 'BeATeacherStep2',
              component: () => import('../views/BeATeacherStep2.vue')
            },
            {
              path: 'BeATeacherStep3',
              name: 'BeATeacherStep3',
              component: () => import('../views/BeATeacherStep3.vue')
            },
            {
              path: 'BeATeacherStep4',
              name: 'BeATeacherStep4',
              component: () => import('../views/BeATeacherStep4.vue')
            },
          ]
        },
        {
          path: 'AllCourses',
          name: 'AllCourses',
          component: () => import('../views/AllCourses.vue')
        },
        {
          path: 'coursePage/:coursePageId',
          name: 'coursePageId',
          component: () => import('../views/coursePage.vue')
        },
        // 直接:TeacherPageId這樣寫會跟404衝突
        {
          path: 'teacherPage/:TeacherPageId',
          name: 'TeacherPageId',
          component: () => import('../views/TeacherPage.vue')
        },
        {
          path: 'MyCourses',
          name: 'MyCourses',
          component: () => import('../views/MyCourses.vue')
        },
        {
          path: 'MemberPage',
          name: 'MemberPage',
          component: () => import('../views/MemberPage.vue')
        },
        {
          path: 'CartPage',
          name: 'CartPage',
          component: () => import('../views/CartPage.vue')
        },
        {
          path: 'MyCalendar',
          name: 'MyCalendar',
          component: () => import('../views/MyCalendar.vue')
        },
        {
          path: 'AccountSetting',
          name: 'AccountSetting',
          component: () => import('../views/AccountSetting.vue')
        },
        {
          path: 'Q&A',
          name: 'Q&A',
          component: () => import('../views/Q&A.vue')
        },
        {
          path: 'PayHistory',
          name: 'PayHistory',
          component: () => import('../views/PayHistory.vue')
        },
      ],
    },
    {
      path: '/UserLogin',
      name: 'UserLogin',
      component: () => import('../views/UserLogin.vue')
    },
    {
      path: '/admin',
      name: 'admin',
      component: () => import('../views/admin/AdminView.vue'),
      children:[]
    },
    {
      path: '/:pathMatch(.*)*',
      name: '404Page',
      component: () => import('../views/404Page.vue')
    }
  ]
})


export default router
