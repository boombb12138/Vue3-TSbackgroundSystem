<template>
  <div class="qn-form">
    <div class="header">
      <slot name="header"></slot>
    </div>
    <!-- label-width输入框名称同一宽度靠右对齐 -->
    <el-form :label-width="labelWidth">
      <el-row>
        <template v-for="item in formItem" :key="item.label">
          <el-col :span="8" v-bind="colLayout">
            <el-form-item
              v-if="!item.isHidden"
              :label="item.label"
              :style="itemstyle"
            >
              <template
                v-if="item.type === 'password' || item.type === 'input'"
              >
                <!-- formData[`${item.field}`]使用模板字符串 从item.field中取到name 再在formData里找对应的值 -->
                <el-input
                  :placeholder="item.placeholder"
                  :show-password="item.type === 'password'"
                  :model-value="modelValue[item.field]"
                  @update:modelValue="handleValueChange($event, item.field)"
                ></el-input>
              </template>
              <template v-else-if="item.type === 'select'">
                <el-select
                  :placeholder="item.placeholder"
                  style="width: 100%"
                  :model-value="modelValue[item.field]"
                  @update:modelValue="handleValueChange($event, item.field)"
                >
                  <el-option
                    :value="option.value"
                    v-for="option in item.options"
                    :key="option.value"
                    >{{ option.title }}</el-option
                  >
                </el-select>
              </template>
              <template v-else-if="item.type === 'datepicker'">
                <!--v-bind="对象" 可以把对象的所有属性给到绑定的元素  -->
                <el-date-picker
                  style="width: 100%"
                  v-bind="item.otherOptions"
                  :model-value="modelValue[item.field]"
                  @update:modelValue="handleValueChange($event, item.field)"
                ></el-date-picker>
              </template>
            </el-form-item>
          </el-col>
        </template>
      </el-row>
    </el-form>
    <div class="search">
      <slot name="search"></slot>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'
import { IFormItem } from '../index'
export default defineComponent({
  props: {
    formItem: {
      // formItem是[{},{}]类型
      // 可以类型断言 说Array是IForm[]类型 PropType可以传泛型 所以用PropType
      type: Array as PropType<IFormItem[]>,
      default: () => [] //在vue3+TS结合使用时，数组类型和对象类型的默认值需要用箭头函数
    },
    labelWidth: {
      type: String,
      default: '100px'
    },
    itemstyle: {
      type: Object,
      default: () => {
        return {
          padding: '20px 40px'
        }
      }
    },
    colLayout: {
      type: Object,
      default: () => {
        return {
          xs: 24,
          sm: 24,
          md: 12,
          lg: 8,
          xl: 6
        }
      }
    },
    modelValue: {
      type: Object,
      required: true
    }
  },
  emits: ['update:modelValue'],
  setup(props, context) {
    //方法1 弊端 修改了props属性中的modelValue
    // const formData = computed({
    //   get: () => {
    //     return props.modelValue
    //   },
    //   set: (newValue) => {
    //     // 不会来到set方法
    //     // console.log('====')
    //     // context.emit('update:modelValue', newValue)
    //   }
    // })
    // 方法2 真正实现了组件的v-model
    // formData是一个新的对象
    // const formData = ref({ ...props.modelValue })
    // // 监听formData的变化 如果formData改变了 就触发update:modelValue 改变user组件的formData
    // watch(
    //   formData,
    //   (newValue) => {
    //     context.emit('update:modelValue', newValue)
    //   },
    //   { deep: true }
    // )
    // 方法3 不用双向绑定(不采用v-model的语法糖)
    const handleValueChange = (value: any, field: string) => {
      context.emit('update:modelValue', {
        ...props.modelValue,
        [field]: value
      })
    }
    return { handleValueChange }
  }
})
</script>
<style scoped lang="less">
.qn-form {
  padding-top: 18px;
}
</style>
