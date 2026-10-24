# CardzMarketcap SDK feature factory

require_relative 'feature/base_feature'
require_relative 'feature/ratelimit_feature'
require_relative 'feature/retry_feature'
require_relative 'feature/test_feature'
require_relative 'feature/timeout_feature'


module CardzMarketcapFeatures
  def self.make_feature(name)
    case name
    when "base"
      CardzMarketcapBaseFeature.new
    when "ratelimit"
      CardzMarketcapRatelimitFeature.new
    when "retry"
      CardzMarketcapRetryFeature.new
    when "test"
      CardzMarketcapTestFeature.new
    when "timeout"
      CardzMarketcapTimeoutFeature.new
    else
      CardzMarketcapBaseFeature.new
    end
  end
end
