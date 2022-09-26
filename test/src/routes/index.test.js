import router from '../../../src/routes/index.js'
import { routesDep } from '../../mocks/index.mock.js'
describe('router', () => {
  const routerInstance = router(routesDep)
  it('should successfully execute router', () => {
    expect(routerInstance).toBeInstanceOf(Function)
    expect(routerInstance.stack[0].route.path).toBe('/v1/authentication')
    expect(routerInstance.stack[0].route.stack.length).toBe(1)
    expect(routerInstance.stack[0].route.methods).toEqual({ post: true })

    expect(routerInstance.stack[1].route.path).toBe('/v1/students')
    expect(routerInstance.stack[1].route.stack.length).toBe(2)
    expect(routerInstance.stack[1].route.methods).toEqual({ post: true })

    expect(routerInstance.stack[2].route.path).toBe('/v1/students/:id')
    expect(routerInstance.stack[2].route.stack.length).toBe(2)
    expect(routerInstance.stack[2].route.methods).toEqual({ patch: true })

    expect(routerInstance.stack[3].route.path).toBe('/v1/students/:id')
    expect(routerInstance.stack[3].route.stack.length).toBe(2)
    expect(routerInstance.stack[3].route.methods).toEqual({ delete: true })

    expect(routerInstance.stack[4].route.path).toBe('/v1/students')
    expect(routerInstance.stack[4].route.stack.length).toBe(2)
    expect(routerInstance.stack[4].route.methods).toEqual({ get: true })

    expect(routerInstance.stack[5].route.path).toBe('/v1/swagger.json')
    expect(routerInstance.stack[5].route.stack.length).toBe(1)
    expect(routerInstance.stack[5].route.methods).toEqual({ get: true })
  })
})
