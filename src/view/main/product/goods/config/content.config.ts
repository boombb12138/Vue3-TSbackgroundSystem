export const TableConfig = {
  title: '用户列表',
  // 选择展示的数据和表格列名 宽度
  propList: [
    { prop: 'name', label: '商品名称', minWidth: '100' },
    {
      prop: 'oldPrice',
      label: '原价格',
      minWidth: '100',
      slotname: 'oldPrice'
    },
    { prop: 'newPrice', label: '现价格', minWidth: '100' },
    { prop: 'imgUrl', label: '商品图片', minWidth: '120', slotname: 'image' },
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
