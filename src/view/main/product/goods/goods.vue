<template>
  <div class="goods">
    <page-content :TableConfig="TableConfig" pageName="goods">
      <template #image="scope">
        <el-image
          style="width: 100px; height: 120px"
          :src="scope.row.imgUrl"
        ></el-image>
      </template>
      <template #oldPrice="slotProps">
        {{ '￥' + slotProps.row.oldPrice }}
      </template>
    </page-content>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { TableConfig } from './config/content.config'
import pageContent from '@/components/page-content'
export default defineComponent({
  name: 'goods',
  components: { pageContent },
  setup() {
    return { TableConfig }
  }
})
</script>

<style scoped></style>
