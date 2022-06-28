module.exports = {
  root: true,
  env: {
    node: true
  },
  extends: [
    'plugin:vue/vue3-essential',
    'eslint:recommended',
    '@vue/typescript/recommended',
    'plugin:prettier/recommended'
  ],
  parserOptions: {
    ecmaVersion: 2020
  },
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-explicit-any': 'off',
    'vue/no-var-requires':
      process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    // 'vue/no-mutating-props':
    //   process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'vue/multi-word-component-names': 'off',
    'vue/return-in-computed-property': 'off',
    'vue/no-non-null-assertion': 'off'
  }
}
