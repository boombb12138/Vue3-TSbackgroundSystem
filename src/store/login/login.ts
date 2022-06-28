import { Module } from 'vuex'
// Module<S, R> S 代表当前组件的state的类型 R代表根组件的state的类型
import { ILoginModule } from './types'
import { IRootState } from '../types'
import accountLoginRequest from '@/service/login/login'
import { requestUserInfoById } from '@/service/login/login'
import { requestUserMenu } from '@/service/login/login'
import { IAccount } from '@/service/login/type'
import LocalCache from '@/utils/cache'
import { useModal } from 'element-plus'
import router from '@/router/router'
import { mapMenuToRoutes, mapMenuToPermission } from '@/utils/map-menu'

const login: Module<ILoginModule, IRootState> = {
  namespaced: true,
  state() {
    return {
      token: '',
      userInfo: '',
      userMenu: '',
      permission: []
    }
  },
  mutations: {
    changeToken(state, token: string) {
      // 修改、保存state里面的数据必须要在mutations里面
      state.token = token
    },
    changeUserInfo(state, userInfo: any) {
      state.userInfo = userInfo
    },
    changeUserMenu(state, userMenu: any[]) {
      state.userMenu = userMenu
      // userMenu -> routes
      const routes = mapMenuToRoutes(userMenu)
      // routes -> main.children
      routes.forEach((route) => {
        // 动态添加二级路由
        router.addRoute('main', route)
      })
      // 获取用户按钮权限
      const permission = mapMenuToPermission(state.userMenu)
      state.permission = permission
    }
  },
  actions: {
    async accountLoginAction(context, payload: IAccount) {
      // 1. 实现登录逻辑
      // 通过async将异步变为同步
      const loginResult = await accountLoginRequest(payload)
      const token = loginResult.data.token
      const id = loginResult.data.id
      LocalCache.setCache('token', loginResult.data.token)
      context.commit('changeToken', token)

      // 2.获取用户信息
      const usersInfoResult = await requestUserInfoById(id)
      const userInfo = usersInfoResult.data
      console.log(userInfo)
      context.commit('changeUserInfo', userInfo)
      // 登录成功过后 下次再登录直接跳到首页 所以用户信息要本地缓存
      LocalCache.setCache('userInfo', userInfo)

      //3.请求用户菜单
      const userMenuResult = await requestUserMenu(userInfo.role.id)
      const userMenu = userMenuResult.data
      context.commit('changeUserMenu', userMenu)
      LocalCache.setCache('userMenu', userMenu)

      // 4.跳转到首页
      router.push('/main')
    },
    phoneLoginAction(context, payload) {
      console.log('phoneLoginAction被调用', payload)
    },
    // 以下操作是为了确保如果用户刷新 vuex里面还有数据
    async loginLocalLogin(context) {
      const token = LocalCache.getCache('token')
      if (token) {
        context.commit('changeToken', token)
      }
      const userInfo = LocalCache.getCache('userInfo')
      if (userInfo) {
        context.commit('changeUserInfo', userInfo)
      }
      const userMenu = LocalCache.getCache('userMenu')
      if (userMenu) {
        context.commit('changeUserMenu', userMenu)
      }
    }
  }
}
export default login
