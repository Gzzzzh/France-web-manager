import request from '@/utils/request'
import { type } from 'os';

export function fetchMembersList({page,limit}) { //获取成员列表
  return request({
    url: `/user/bgami/${page}/${limit}`,
    method: 'get'
  })
}

export function fetchMember(id) { //获取单个成员
  return request({
    url: `/user/bgomi/${id}`,
    method: 'get'
  })
}

export function uploadMember(formdata) { //上传成员
  return request({
    url: `/user/mis`,
    method: 'post',
    data:formdata
  })
}

export function deleteMembers(params) { //删除成员
  return request({
    url: `/user/bdmi`,
    method: 'get',
    params
  })
}