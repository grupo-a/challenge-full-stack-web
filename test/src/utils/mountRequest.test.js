import mountRequest from '../../../src/utils/mountRequest'
import { mountRequestReq } from '../../mocks/index.mock'

describe('mountRequest', () => {
  it('should return only body', () => {
    const mount = mountRequest('POST')
    const requestMounted = mount(mountRequestReq)
    expect(requestMounted).toEqual(mountRequestReq.body)
  })
  it('should return only query', () => {
    const mount = mountRequest('GET')
    const requestMounted = mount(mountRequestReq)
    expect(requestMounted).toEqual(mountRequestReq.query)
  })
  it('should return only params and body in same object', () => {
    const mount = mountRequest('PATCH')
    const requestMounted = mount(mountRequestReq)
    expect(requestMounted).toEqual({ ...mountRequestReq.params, ...mountRequestReq.body })
  })
  it('should return only params', () => {
    const mount = mountRequest('DELETE')
    const requestMounted = mount(mountRequestReq)
    expect(requestMounted).toEqual(mountRequestReq.params)
  })
  it('should return only headers', () => {
    const mount = mountRequest('MIDDLEWARE_AUTH')
    const requestMounted = mount(mountRequestReq)
    expect(requestMounted).toEqual(mountRequestReq.headers)
  })
})
