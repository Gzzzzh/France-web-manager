import request from '@/utils/request'

export function getCarsousel() {
  return request({
    url:`/img/gssoai?part=carselImg`,
    method: 'get'
  })
}
export function deleteCarsousel(params) {
  return request({
    url: `/data/dss${params}`,
    method: 'get'
  })
}
