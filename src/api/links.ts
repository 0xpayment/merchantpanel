import request from '@/utils/request'
import { ILinkData } from './types'

export const defaultLinkData: ILinkData = {
  name: '',
  description: '',
  amount: 0
}

export const getLinks = (params: any) =>
  request({
    url: process.env.NODE_ENV === 'staging'
      ? 'http://dev.maplefin.com:9090' + '/links/getTestLinks'
      : 'http://localhost:9090' + '/links',
    method: 'get'
  })

export const getLink = (id: number, params: any) =>
  request({
    url: `/links/${id}`,
    method: 'get',
    params
  })

export const createLink = (data: any) =>
  request({
    url: process.env.NODE_ENV === 'staging'
      ? 'http://dev.maplefin.com:9090' + '/links'
      : 'http://localhost:9090' + '/links',
    method: 'post',
    data
  })

export const deleteLink = (id: number) =>
  request({
    url: `/links/${id}`,
    method: 'delete'
  })

export const getPageviews = (params: any) =>
  request({
    url: '/pageviews',
    method: 'get',
    params
  })
