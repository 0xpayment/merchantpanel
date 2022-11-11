<template>
  <link-detail :is-edit="false" />
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import LinkDetail from './components/LinkDetail.vue'

@Component({
  name: 'CreateLink',
  components: {
    LinkDetail
  }
})
export default class extends Vue {}
</script>
