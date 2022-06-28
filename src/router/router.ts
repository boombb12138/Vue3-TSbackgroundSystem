import { createRouter, createWebHashHistory } from 'vue-router'
import type { RouteRecordRaw } from 'vue-router'
import LocalCache from '@/utils/cache'
import { firstMenu } from '@/utils/map-menu'
const routes: RouteRecordRaw[] = [
  {
    path: '/',
    redirect: '/main'
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('../view/login/view-login.vue')
  },
  {
    path: '/main',
    name: 'main',
    component: () => import('../view/main/view-main.vue')
    //children:[{},{},{}] 根据userMenu -> 映射关系
  },
  // 当url错误时，返回NotFound
  {
    path: '/:pathMatch(.*)*',
    name: 'notfound',
    component: () => import('../view/NotFound/NotFound.vue')
  }
]

const router = createRouter({
  routes: routes,
  history: createWebHashHistory()
})

// 路由导航守卫
// 默认跳转到首页后 如果没有登录就跳转到登录页面
router.beforeEach((to) => {
  if (to.path !== '/login') {
    const token = LocalCache.getCache('token')
    if (!token) {
      return '/login'
    }
    // console.log(router.getRoutes())
    // console.log(to) //to对象是route对象 是真正要跳转到的对象
    // 会根据to.name找对应的路由此时to.name=notfound 所以加载notfound组件
    if (to.path === '/main') {
      // 跳转页面是用return
      console.log(firstMenu.url)
      return firstMenu.url
    }
  }
})

export default router
