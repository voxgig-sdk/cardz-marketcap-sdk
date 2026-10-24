# CardzMarketcap SDK utility: make_context
require_relative '../core/context'
module CardzMarketcapUtilities
  MakeContext = ->(ctxmap, basectx) {
    CardzMarketcapContext.new(ctxmap, basectx)
  }
end
