export const rules = {
  name: [
    {
      required: true,
      message: '账号为必传的内容',
      trigger: 'blur'
    },
    {
      pattern: /^[a-z0-9]{5,10}$/,
      message: '账号必须为5-10个字母或数字',
      trigger: 'blur'
    }
  ],
  password: [
    {
      required: true,
      message: '密码为必传的内容',
      trigger: 'blur'
    },
    {
      // 正则做字符串匹配
      pattern: /^[a-z0-9]{6,}$/,
      message: '密码必须为6位以上的字母或数字',
      trigger: 'blur'
    }
  ]
}
