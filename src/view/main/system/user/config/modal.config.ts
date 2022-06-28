import { IForm } from '@/baseui/form'
const modalformconfig: IForm = {
  formItem: [
    {
      field: 'name',
      type: 'input',
      label: '用戶名',
      placeholder: '请输入用户名'
    },
    {
      field: 'realname',
      type: 'input',
      label: '真实姓名',
      placeholder: '请输入真实姓名'
    },
    {
      field: 'password',
      type: 'password',
      label: '用户密码',
      placeholder: '请输入用户密码',
      isHidden: false
    },
    {
      field: 'cellphone',
      type: 'input',
      label: '电话号码',
      placeholder: '请输入电话号码'
    },
    {
      field: 'departmentId',
      type: 'select',
      label: '部门',
      placeholder: '请选择部门',
      options: []
    },
    {
      field: 'roleId',
      type: 'select',
      label: '角色',
      placeholder: '请选择角色',
      options: []
    }
  ],
  itemstyle: {},
  colLayout: {
    xs: 24,
    sm: 24,
    md: 24,
    lg: 24,
    xl: 24
  },
  labelWidth: '120px'
}
export default modalformconfig
