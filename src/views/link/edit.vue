<template>
  <article-detail :is-edit="true" />
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import LinkDetail from './components/LinkDetail.vue'

@Component({
  name: 'EditLink',
  components: {
    LinkDetail
  }
})
export default class extends Vue {}
</script>
