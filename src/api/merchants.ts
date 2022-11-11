import request from '@/utils/request'
import { IMerchantConfig } from './types'

export const defaultMerchantConfig: IMerchantConfig = {
  name: 'loading...',
  address: 'loading...'
}

export const getMerchant = (params: any) =>
  request({
    url: 'http://localhost:9090/merchant/',
    method: 'get'
  })
