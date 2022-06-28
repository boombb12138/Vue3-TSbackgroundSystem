<template>
  <div class="notFound"><h2>NotFound</h2></div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
export default defineComponent({
  setup() {
    return {}
  }
})
</script>
<style scoped lang="less">
.notFound {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  h2 {
    margin-bottom: 130px;
  }
}
</style>
