-- CardzMarketcap SDK exists test

local sdk = require("cardz-marketcap_sdk")

describe("CardzMarketcapSDK", function()
  it("should create test SDK", function()
    local testsdk = sdk.test(nil, nil)
    assert.is_not_nil(testsdk)
  end)
end)
