import { RouteRecordRaw } from 'vue-router'
import { IBreadCrumb } from '@/baseui/breadcrumb'
let firstMenu: any
export function mapMenuToRoutes(userMenu: any[]): RouteRecordRaw[] {
  const routes: RouteRecordRaw[] = []

  // 1.加载所有的映射关系
  const allRoutes: RouteRecordRaw[] = []
  const routesFiles = require.context('../router/main', true, /\.ts/)
  routesFiles.keys().forEach((item) => {
    // console.log(item) //拿到每个ts文件相对于main的路径
    //../router/main/an拿到每个文件里导出的对象
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const route = require('../router/main' + item.split('.')[1])
    allRoutes.push(route.default)
  })

  // 2.根据userMenu将需要的映射关系添加到routes中
  //遍历userMenu 得到menu menu.type ===1 不需要有页面组件 也就是不需要拿到route
  //但是需要进一步的遍历 直到type === 2
  const _recurseRoutes = (userMenu: any[]) => {
    for (const menu of userMenu) {
      if (menu.type === 2) {
        const path = menu.url
        // find可以遍历allRoutes数组里面的对象 返回符合回调函数里的规则的第一个对象
        const route = allRoutes.find((route) => route.path === path)
        if (route) {
          routes.push(route) //routes里面就是userMenu返回的url对应的对象
        }
        if (!firstMenu) {
          firstMenu = menu
        }
      } else {
        _recurseRoutes(menu.children)
      }
    }
  }
  _recurseRoutes(userMenu)
  return routes
}

// 写法1
export function pathMaptoBreadCrumb(userMenu: any[], currentpath: any): any {
  //  变量定义的位置不同 会影响结果
  const breadCrumb: IBreadCrumb[] = []
  pathMapToMenu(userMenu, currentpath, breadCrumb)
  return breadCrumb
}
// 写法2
// export function pathMaptoBreadCrumb(userMenu: any[], currentpath: any): any {
//   for (const menu of userMenu) {
//     if (menu.type === 1) {
//       const findMenu = pathMapToMenu(menu.children, currentpath)
//       if (findMenu) {
//         // 拿到一级菜单的name
//         breadCrumb.push({ name: menu.name, path: menu.url })
//         // 拿到二级菜单
//         breadCrumb.push({ name: findMenu.name, path: findMenu.url })
//         return findMenu
//       }
//     } else if (menu.type === 2) {
//       // 如果currentpath = /main是没有对应的url 就没有返回menu 在其他地方menu.id会报错
//       if (menu.url === currentpath) {
//         return menu
//       }
//     }
//   }
// }

export function pathMapToMenu(
  userMenu: any[],
  currentpath: any,
  breadCrumb?: IBreadCrumb[]
): any {
  for (const menu of userMenu) {
    if (menu.type === 1) {
      const findMenu = pathMapToMenu(menu.children, currentpath)
      if (findMenu) {
        // 拿到一级菜单的name
        breadCrumb?.push({ name: menu.name, path: menu.url })
        // 拿到二级菜单
        breadCrumb?.push({ name: findMenu.name, path: findMenu.url })
        return findMenu
      }
    } else if (menu.type === 2) {
      // 如果currentpath = /main是没有对应的url 就没有返回menu 在其他地方menu.id会报错
      if (menu.url === currentpath) {
        return menu
      }
    }
  }
}

export function mapMenuToPermission(usersMenu: any[]) {
  const permission: string[] = []
  const _recursePermission = (usersMenu: any[]) => {
    for (const menu of usersMenu) {
      if (menu.type === 1 || menu.type === 2) {
        _recursePermission(menu.children ?? [])
      } else if (menu.type === 3) {
        permission.push(menu.permission)
      }
    }
  }
  _recursePermission(usersMenu)
  return permission
}
export { firstMenu }
