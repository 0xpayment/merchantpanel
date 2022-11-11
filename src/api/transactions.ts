import request from '@/utils/request'
import qs from 'qs'

export const getTransactions = (params: any) =>
  request({
    url: 'http://localhost:9090/links/orders',
    method: 'get',
    params
  })
