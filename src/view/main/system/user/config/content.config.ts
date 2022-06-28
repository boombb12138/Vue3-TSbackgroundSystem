export const TableConfig = {
  title: '用户列表',
  // 选择展示的数据和表格列名 宽度
  propList: [
    { prop: 'name', label: '用户名', minWidth: '100' },
    { prop: 'realname', label: '真实姓名', minWidth: '100' },
    { prop: 'enable', label: '状态', minWidth: '100', slotname: 'status' },
    { prop: 'cellphone', label: '电话号码', minWidth: '120' },
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
