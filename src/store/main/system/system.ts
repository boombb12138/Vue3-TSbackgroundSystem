import { IRootState } from '@/store/types'
import { Module } from 'vuex'
import { ISystemState } from './type'
import {
  getPageListData,
  deletePageData,
  createPageListData,
  editPageListData
} from '@/service/main/system/system'

// Module<S, R> S是当前模块的state的类型 R是根的state的类型
const system: Module<ISystemState, IRootState> = {
  namespaced: true,
  state() {
    return {
      usersList: [],
      usersCount: 0,
      roleList: [],
      roleCount: 0,
      goodsList: [],
      goodsCount: 0,
      menuList: [],
      menuCount: 0
    }
  },
  mutations: {
    changeUsersList(state, userList: any[]) {
      state.usersList = userList
    },
    changeUsersCount(state, userCount: number) {
      state.usersCount = userCount
    },
    changeRoleList(state, list: any[]) {
      state.roleList = list
    },
    changeRoleCount(state, count: number) {
      state.roleCount = count
    },
    changeGoodsList(state, list: any[]) {
      state.goodsList = list
    },
    changeGoodsCount(state, count: number) {
      state.goodsCount = count
    },
    changeMenuList(state, list: any[]) {
      state.menuList = list
    },
    changeMenuCount(state, count: number) {
      state.menuCount = count
    }
  },
  getters: {
    getPageData(state) {
      return (pageName: string) => {
        switch (pageName) {
          case 'users':
            return state.usersList
          case 'role':
            return state.roleList
          case 'goods':
            return state.goodsList
          case 'menu':
            return state.menuList
          default:
            break
        }
      }
    },
    getPageCount(state) {
      return (pageName: string) => {
        switch (pageName) {
          case 'users':
            return state.usersCount
          case 'role':
            return state.roleCount
          case 'goods':
            return state.goodsCount
          case 'menu':
            return state.menuCount
          default:
            break
        }
      }
    }
  },
  actions: {
    // 获取
    async getPageList(context, payload: any) {
      const pageName = payload.pageName
      // 如果服务器返回的路径很统一、规范
      const pageUrl = `/${pageName}/list`

      // 如果服务器返回的路径不统一 有变化
      // let pageUrl = ''
      // switch (pageName) {
      //   case 'users':
      //     pageUrl = 'users/list'
      //     break
      //   case 'role':
      //     pageUrl = 'role/list'
      //     break
      //   default:
      //     break
      // }
      // 1 发送网络请求
      const dataResult = await getPageListData(pageUrl, payload.queryInfo)
      // const { list, totalCount } = dataResult.data
      const list = dataResult.data.list
      const totalCount = dataResult.data.totalCount
      switch (pageName) {
        case 'users':
          context.commit('changeUsersList', list)
          context.commit('changeUsersCount', totalCount)
          break
        case 'role':
          context.commit('changeRoleList', list)
          context.commit('changeRoleCount', totalCount)
          break
        case 'goods':
          context.commit('changeGoodsList', list)
          context.commit('changeGoodsCount', totalCount)
          break
        case 'menu':
          context.commit('changeMenuList', list)
          context.commit('changeMenuCount', totalCount)
          break
        default:
          break
      }
    },

    // 删除
    async deletePageDataAction(context, payload: any) {
      // 1. 获取url
      // url pageName id
      const { pageName, id } = payload
      const url = `/${pageName}/${id}`
      // 2.调用删除网络请求
      await deletePageData(url)
      // 3.重新请求数据
      context.dispatch('getPageList', {
        pageName,
        queryInfo: {
          offset: 0,
          size: 10
        }
      })
    },

    // 新建
    async createPageDataAction(context, payload: any) {
      // 1.创建数据的请求
      const { pageName, newData } = payload
      const url = `/${pageName}`
      await createPageListData(url, newData)
      // 2. 请求最新的数据
      context.dispatch('getPageList', {
        pageName: pageName,
        queryInfo: {
          offset: 0,
          size: 10
        }
      })
    },

    // 编辑
    async editPageDataAction(context, payload: any) {
      const { pageName, editData, id } = payload
      const url = `/${pageName}/${id}`
      await editPageListData(url, editData)

      context.dispatch('getPageList', {
        pageName: pageName,
        queryInfo: {
          offset: 0,
          size: 10
        }
      })
    }
  }
}
export default system
