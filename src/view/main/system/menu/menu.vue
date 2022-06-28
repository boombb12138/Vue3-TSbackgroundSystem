<template>
  <div class="menu">
    <page-content :TableConfig="TableConfig" pageName="menu"></page-content>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { TableConfig } from './content.config'
import pageContent from '@/components/page-content'
export default defineComponent({
  name: 'menu',
  components: { pageContent },
  setup() {
    return { TableConfig }
  }
})
</script>

<style scoped></style>
