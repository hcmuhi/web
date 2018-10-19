import fetch from '@/utils/request'

export function page(query) {
  return fetch({
    url: '/kafu/uc/shipper/fetchShipperPage',
    method: 'get',
    params: query
  })
}
