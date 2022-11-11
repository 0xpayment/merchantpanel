<template>
  <div class="app-container">
    <el-form>
      <el-form-item label="Name">
        <el-input v-model.trim="merchant.name" />
      </el-form-item>
      <el-form-item label="Address">
      <el-input v-model.trim="merchant.address" />
      </el-form-item>
      <el-form-item>
      <el-button type="primary">
        Update
      </el-button>
      </el-form-item>
    </el-form>
  </div>

</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { defaultMerchantConfig, getMerchant } from '@/api/merchants'
import { IMerchantConfig } from '@/api/types'
import Pagination from '@/components/Pagination/index.vue'

@Component({
  name: 'MerchantConfig',
  components: {
    Pagination
  }
})

export default class extends Vue {
  private listLoading = true
  private listQuery = {
    page: 1,
    limit: 20
  }

  private merchant : IMerchantConfig = defaultMerchantConfig
  created() {
    console.log('in  created')
    this.getMerchantConfig()
  }

  private async getMerchantConfig() {
    this.listLoading = true
    console.log('list start')
    const { data } = await getMerchant({})
    console.log(data)
    this.merchant.name = data.name
    this.merchant.address = data.address
  }
}
</script>
