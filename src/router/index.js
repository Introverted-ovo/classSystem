import Vue from 'vue'
import VueRouter from 'vue-router'
import HomeView from '../views/HomeView.vue'
import systemView from "@/views/SystemView.vue";

Vue.use(VueRouter)

const routes = [
  {
    path: '/login',
    name: 'Login',
    component: () => import( '../views/LoginView.vue')
  },
  {
    path: '/register',
    name: 'register',
    component: () => import( '../views/RegisterView.vue')
  },
  {
    path: '/',
    name: 'System',
    component: systemView,
    redirect: 'home',
    children: [
      {
        path: 'home',
        name: 'home',
        component: HomeView
      },
      {
        path: 'admin',
        name: 'admin',
        component: () => import('../views/AdminView.vue')
      },
      {
        path: 'teacher',
        name: 'teacher',
        component: () => import( '../views/TeacherView.vue')
      },
      {
        path: 'student',
        name: 'student',
        component: () => import( '../views/StudentView.vue')
      },
      {
        path: 'course',
        name: 'course',
        component: () => import( '../views/CourseView.vue')
      },
      {
        path: 'teacher0',
        name: 'teacher0',
        component: () => import( '../views/Teacher0View.vue')
      },
      {
        path: 'classroom',
        name: 'classroom',
        component: () => import( '../views/ClassroomView.vue')
      },
      {
        path: 'timetable',
        name: 'timetable',
        component: () => import( '../views/TimetableView.vue')
      }
    ]
  }

]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})


//路由守卫
router.beforeEach((to, from, next) => {
  if (to.path === "/login" || to.path === "/register") {
    next();
  } else {
    const user = localStorage.getItem("user");
    if (!user) {
      return next("/login");
    }
    next();
  }
});



export default router
