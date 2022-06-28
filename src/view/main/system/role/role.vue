<template>
  <div class="role">
    <page-search :formconfig="formconfig"></page-search>
    <page-content
      :pageName="pageName"
      :TableConfig="TableConfig"
    ></page-content>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

import { TableConfig } from './config/content.config'
import pageContent from '@/components/page-content/index'

import formconfig from './config/searchFormconfig'
import pageSearch from '@/components/page-search'
export default defineComponent({
  name: 'role',
  components: { pageContent, pageSearch },
  setup() {
    const pageName = 'role'
    return { pageName, TableConfig, formconfig }
  }
})
</script>

<style scoped></style>
