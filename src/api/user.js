import request from '@/utils/request'
import qs from 'qs'

export function login(data) {
  return request({
    url: '/user/login',
    method: 'post',
    data: qs.stringify(data)
  })
}

export function getInfo() {
  return request({
    url: '/user/isLogin',
    method: 'get'
  })
}

/* export function logout() {
  return request({
    url: '/user/logout',
    method: 'post'
  })
} */
