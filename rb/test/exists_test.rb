# CardzMarketcap SDK exists test

require "minitest/autorun"
require_relative "../CardzMarketcap_sdk"

class ExistsTest < Minitest::Test
  def test_create_test_sdk
    testsdk = CardzMarketcapSDK.test(nil, nil)
    assert !testsdk.nil?
  end
end
