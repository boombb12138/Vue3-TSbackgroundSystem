const role = () => import('@/view/main/system/role/role.vue')
export default {
  path: '/main/system/role', //要和服务器返回的对应的路径保持一致
  name: 'role',
  component: role,
  children: []
}
