<template>
  <div class="app-container">
    <el-table
      v-loading="listLoading"
      :data="list"
      border
      fit
      highlight-current-row
      style="width: 100%"
      :header-cell-style="{background: 'rgb(32, 160, 255)', color: '#FFFFFF'}"
    >
      <el-table-column
        width="180px"
        align="center"
        label="Product Name"
      >
        <template slot-scope="{row}">
          <span>{{ row.name }}</span>
        </template>
      </el-table-column>

      <el-table-column
        class-name="status-col"
        label="Price"
        width="100"
      >
        <template slot-scope="{row}">
          <span>{{ row.amount }}</span>
        </template>
      </el-table-column>

      <el-table-column
        class-name="status-col"
        label="Cryptocurrency"
        width="150"
      >
        <template slot-scope="{row}">
          <span>{{ row.currency }}</span>
        </template>
      </el-table-column>

      <el-table-column
        class-name="status-col"
        label="Created"
        width="150"
      >
        <template slot-scope="{row}">
          <span>{{ row.createdAt | parseTime }}</span>
        </template>
      </el-table-column>

      <el-table-column
        class-name="status-col"
        label="Product Description"
      >
        <template slot-scope="{row}">
          <span>{{ row.description }}</span>
        </template>
      </el-table-column>

      <el-table-column
        min-width="80px"
        align="center"
        label="Action"
      >
        <template slot-scope="{row}">
          <template>
            <el-button
              class="delete-btn"
              size="small"
              icon="el-icon-delete"
              type="danger"
              @click="handleDelete(row, $index)"
            >
              Delete
            </el-button>
            <el-button
              class="pan-btn green-btn"
              size="small"
              icon="el-icon-document"
              type="primary"
              @click="handleDocument(row, $index)"
            >
              Display
            </el-button>
          </template>
        </template>
      </el-table-column>

    </el-table>

  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { getLinks } from '@/api/links'
import { ILinkData } from '@/api/types'
import Pagination from '@/components/Pagination/index.vue'
import settings from '../../settings'

@Component({
  name: 'LinkList',
  components: {
    Pagination
  }
})
export default class extends Vue {
  private list: ILinkData[] = []
  private listLoading = true
  private listQuery = {
    page: 1,
    limit: 20
  }

  created() {
    console.log('in list created')
    this.getList()
  }

  private handleDocument(row: any, index: number) {
    console.log('handleDocument:' + row.id)
    console.log(row)
    const url = `${settings.checkoutServer}/link/${row.id}`
    window.open(url, '_blank')
  }

  private handleDelete(row: any, index: number) {
    console.log('row:' + row.name)
    this.$notify({
      title: 'Success',
      message: 'Delete Successfully',
      type: 'success',
      duration: 2000
    })
    this.list.splice(index, 1)
  }

  private async getList() {
    this.listLoading = true
    // console.log("list start" );
    const { data } = await getLinks(this.listQuery)
    const links = data.links
    this.list = links.map((v: any) => {
      this.$set(v, 'edit', false) // https://vuejs.org/v2/guide/reactivity.html
      v.originalTitle = v.title // will be used when user click the cancel botton
      return v
    })
    // Just to simulate the time of the request
    setTimeout(() => {
      this.listLoading = false
    }, 0.5 * 1000)
  }
}
</script>

<style lang="scss" scoped>
.edit-input {
  padding-right: 100px;
}

.cancel-btn {
  position: absolute;
  right: 15px;
  top: 10px;
}
</style>
