import {createRouter, createWebHashHistory} from 'vue-router'
import NProgress from 'nprogress'

const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'layout',
      component: () => import('@/layout/index.vue'),
      children: [
        {
          path: '/home',
          name: 'home',
          meta: {
            title: 'SaaS短链接平台'
          },
          component: () => import('@/views/home/index.vue'),
          children: [
            {
              path: '',
              name: 'empty',
              meta: {
                title: '首页'
              },
              component: () => import('@/views/home/empty/index.vue')
            },
            {
              path: '/home/user',
              name: 'user',
              meta: {
                title: '用户信息'
              },
              component: () => import('@/views/home/user/index.vue')
            },
            // {
            //   path: '/home/dashboard',
            //   name: 'dashboard',
            //   meta: {
            //     title: '仪表盘'
            //   },
            //   component: () => import('@/views/home/dashboard/index.vue')
            // },
            {
              path: '/home/:groupName',
              name: 'space',
              meta: {
                title: '短链接分组'
              },
              component: () => import('@/views/home/space/index.vue')
            },
            {
              path: '/home/recyclebin',
              name: 'recyclebin',
              meta: {
                title: '回收站'
              },
              component: () => import('@/views/home/recyclebin/index.vue')
            }
          ]
        }
      ]
    },
    {
      path: '/login',
      name: 'login',
      meta: {
        title: '用户登录页'
      },
      component: () => import('@/views/login/index.vue')
    }
  ],
})



router.beforeEach(async (to,from, next) => {
  if (to.path === '/login') {
    next();
  }
  // await checkUserLogin().then((res: boolean) => {
  //   if (res) {
  //     next();
  //   } else {
  //     // 移除 userInfo
  //     removeUserInfo();
  //     next('/login');
  //   }
  // })
  if (to.path === '/') {
    next('/home');
  }
  if (to.meta?.title) {
    document.title = to.meta.title as string;
  }
  NProgress.start();
  next();
})


router.afterEach(() => {
  NProgress.done();
})
export default router
