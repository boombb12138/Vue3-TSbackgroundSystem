export const TableConfig = {
  title: '角色列表',
  // 选择展示的数据和表格列名 宽度
  propList: [
    { prop: 'name', label: '角色名', minWidth: '100' },
    { prop: 'intro', label: '所有权限', minWidth: '120' },
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
  showIndexColum: true,
  showSelect: true
}
