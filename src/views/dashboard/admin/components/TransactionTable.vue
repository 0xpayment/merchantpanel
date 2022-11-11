<template>
  <el-table
    :data="list"
    style="width: 100%;padding-top: 15px;"
  >
    <el-table-column
      label="Payment ID"
      min-width="150"
    >
      <template slot-scope="{row}">
        {{ row.id }}
      </template>
    </el-table-column>
    <el-table-column
      label="Link ID"
      min-width="150"
    >
      <template slot-scope="{row}">
        {{ row.linkId }}
      </template>
    </el-table-column>
    <el-table-column
      label="Amount"
      width="90"
      align="center"
    >
      <template slot-scope="{row}">
        ${{ row.amount  }}
      </template>
    </el-table-column>
    <el-table-column
      label="Status"
      width="120"
      align="center"
    >
      <template slot-scope="{row}">
        <el-tag :type="row.state">
          {{ row.state }}
        </el-tag>
      </template>
    </el-table-column>
  </el-table>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { getTransactions } from '@/api/transactions'
import { ITransactionData } from '@/api/types'

@Component({
  name: 'TransactionTable',
  filters: {
    transactionStatusFilter: (status: string) => {
      const statusMap: { [key: string]: string } = {
        success: 'success',
        pending: 'danger'
      }
      return statusMap[status]
    },
    orderNoFilter: (str: string) => str.substring(0, 30),
    // Input 10000 => Output "10,000"
    toThousandFilter: (num: number) => {
      return (+num || 0).toString().replace(/^-?\d+/g, m => m.replace(/(?=(?!\b)(\d{3})+$)/g, ','))
    }
  }
})
export default class extends Vue {
  private list: ITransactionData[] = []

  created() {
    this.fetchData()
  }

  private async fetchData() {
    const { data } = await getTransactions({})
    this.list = data.items.slice(0, 8)
  }
}
</script>
