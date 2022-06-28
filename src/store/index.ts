import { createStore, Store, useStore as useVuexStore } from 'vuex'

import { IRootState } from './types'
import { IStore } from './types'
import login from './login/login'
import system from './main/system/system'
import { getPageListData } from '@/service/main/system/system'
const store = createStore<IRootState>({
  state: () => {
    return {
      name: 'coderwhy',
      age: 18,
      entireDepartment: [],
      entireRole: []
    }
  },
  mutations: {
    changeEntireDepartment: (state, list: []) => {
      state.entireDepartment = list
      console.log(state.entireDepartment)
    },
    changeEntireRole: (state, list: []) => {
      state.entireRole = list
    }
  },
  actions: {
    async getInitialDataAction(context) {
      const departmentResult = await getPageListData('/department/list', {
        offset: 0,
        size: 100
      })
      // 先对对象解构 再对属性起别名
      console.log(departmentResult)
      const { list: departmentList } = departmentResult.data
      const roleResult = await getPageListData('/role/list', {
        offset: 0,
        size: 100
      })
      const { list: roleList } = roleResult.data
      context.commit('changeEntireDepartment', departmentList)
      context.commit('changeEntireRole', roleList)
    }
  },
  modules: {
    login,
    system
  }
})

export function setupStore() {
  // 触发login模块下面的loginLocalLogin方法
  store.dispatch('login/loginLocalLogin')
  store.dispatch('getInitialDataAction')
}

export function useStore(): Store<IStore> {
  return useVuexStore()
}
export default store
