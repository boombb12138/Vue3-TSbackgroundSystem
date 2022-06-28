export const TableConfig = {
  title: '菜单列表',
  // 选择展示的数据和表格列名 宽度
  propList: [
    { prop: 'name', label: '菜单名称', minWidth: '100' },
    { prop: 'type', label: '类型', minWidth: '100' },
    { prop: 'url', label: '菜单url', minWidth: '100', slotname: 'status' },
    { prop: 'icon', label: '菜单icon', minWidth: '120' },
    { prop: 'permission', label: '按钮权限', minWidth: '120' },
    {
      prop: 'createAt',
      label: '创建时间',
      minWidth: '150',
      slotname: 'createAt'
    },
    {
      label: '操作',
      minWidth: '120',
      slotname: 'handle'
    }
  ],
  showIndexColum: false,
  showSelect: false,
  childrenProps: {
    rowKey: 'id',
    treeProps: {
      children: 'children'
    }
  }
}
