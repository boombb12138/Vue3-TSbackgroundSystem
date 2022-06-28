type IFormType = 'input' | 'select' | 'datepicker' | 'password'

export interface IFormItem {
  field: string
  type: IFormType
  label: string
  placeholder?: string
  // select标签的选项
  options?: any[]
  // 其他选项
  otherOptions?: any
  isHidden?: boolean
}

export interface IForm {
  formItem: IFormItem[]
  itemstyle: any
  colLayout: any
  labelWidth: string
}
