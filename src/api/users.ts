import request from '@/utils/request'
import qs from 'qs'
import settings from '../settings'

export const getUsers = (params: any) =>
  request({
    url: '/users',
    method: 'get',
    params
  })

export const getUserInfo = (data: any) =>
  request({
    url: '/users/info',
    method: 'post',
    data
  })

export const getUserByName = (username: string) =>
  request({
    url: `/users/${username}`,
    method: 'get'
  })

export const updateUser = (username: string, data: any) =>
  request({
    url: `/users/${username}`,
    method: 'put',
    data
  })

export const deleteUser = (username: string) =>
  request({
    url: `/users/${username}`,
    method: 'delete'
  })

const token = `${settings.serverToken}`
const nodeUrl = process.env.NODE_ENV === 'staging'
  ? `${settings.nodeTestServer}` + '/oauth/token'
  : `${settings.nodeServer}` + '/oauth/token'

export const login = (data: any) =>
  request({
    // url: '/users/login',
    url: nodeUrl,
    method: 'post',
    data: qs.stringify(data),
    headers: { 'content-type': 'application/x-www-form-urlencoded', Authorization: 'Basic MHhQYXktV2ViOnBpbg==' }
  })

export const signup = (data: any) =>
  request({
    // url: '/users/login',
    url: 'http://localhost:9090/oauth/signup',
    method: 'post',
    data,
    headers: { 'content-type': 'application/json' }
  })

export const logout = () =>
  request({
    url: '/users/logout',
    method: 'post'
  })

export const register = (data: any) =>
  request({
    url: '/users/register',
    method: 'post',
    data
  })
