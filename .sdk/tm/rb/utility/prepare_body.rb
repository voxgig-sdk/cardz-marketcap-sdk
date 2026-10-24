# CardzMarketcap SDK utility: prepare_body
require_relative 'media'
module CardzMarketcapUtilities
  PrepareBody = ->(ctx) {
    return nil unless ctx.op.input == "data"
    return CardzMarketcapUtilities.raw_body(ctx.reqdata) if CardzMarketcapUtilities.raw_request?(ctx.point)
    ctx.utility.transform_request.call(ctx)
  }
end
