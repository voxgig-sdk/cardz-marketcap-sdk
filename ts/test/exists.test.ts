
import { test, describe } from 'node:test'
import { equal } from 'node:assert'


import { CardzMarketcapSDK } from '..'


describe('exists', async () => {

  test('test-mode', () => {
    const testsdk = CardzMarketcapSDK.test()
    equal(testsdk instanceof CardzMarketcapSDK, true,
      'CardzMarketcapSDK.test() must return a client synchronously')
  })

})
