import request from '@/utils/request'

export function getAdvice({ page, limit }) {
  return request({
    url: `/user/gfb/${page}/${limit}`,
    method: 'get'
  })
}
export function deleteAdvice(params) { // 删除成员
  return request({
    url: `/user/bdfb${params}`,
    method: 'get'
  })
}
