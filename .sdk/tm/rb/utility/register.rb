# CardzMarketcap SDK utility registration
require_relative '../core/utility_type'
require_relative 'clean'
require_relative 'done'
require_relative 'make_error'
require_relative 'feature_add'
require_relative 'feature_hook'
require_relative 'feature_init'
require_relative 'fetcher'
require_relative 'make_fetch_def'
require_relative 'make_context'
require_relative 'make_options'
require_relative 'make_request'
require_relative 'make_response'
require_relative 'make_result'
require_relative 'make_point'
require_relative 'make_spec'
require_relative 'make_url'
require_relative 'param'
require_relative 'prepare_auth'
require_relative 'prepare_body'
require_relative 'prepare_headers'
require_relative 'prepare_method'
require_relative 'prepare_params'
require_relative 'prepare_path'
require_relative 'prepare_query'
require_relative 'graphql'
require_relative 'result_basic'
require_relative 'result_body'
require_relative 'result_headers'
require_relative 'transform_request'
require_relative 'transform_response'

CardzMarketcapUtility.registrar = ->(u) {
  u.clean = CardzMarketcapUtilities::Clean
  u.clean_add = CardzMarketcapUtilities::CleanAdd
  u.clean_explain = CardzMarketcapUtilities::CleanExplain
  u.done = CardzMarketcapUtilities::Done
  u.make_error = CardzMarketcapUtilities::MakeError
  u.feature_add = CardzMarketcapUtilities::FeatureAdd
  u.feature_hook = CardzMarketcapUtilities::FeatureHook
  u.feature_init = CardzMarketcapUtilities::FeatureInit
  u.fetcher = CardzMarketcapUtilities::Fetcher
  u.make_fetch_def = CardzMarketcapUtilities::MakeFetchDef
  u.make_context = CardzMarketcapUtilities::MakeContext
  u.make_options = CardzMarketcapUtilities::MakeOptions
  u.make_request = CardzMarketcapUtilities::MakeRequest
  u.make_response = CardzMarketcapUtilities::MakeResponse
  u.make_result = CardzMarketcapUtilities::MakeResult
  u.make_point = CardzMarketcapUtilities::MakePoint
  u.make_spec = CardzMarketcapUtilities::MakeSpec
  u.make_url = CardzMarketcapUtilities::MakeUrl
  u.param = CardzMarketcapUtilities::Param
  u.prepare_auth = CardzMarketcapUtilities::PrepareAuth
  u.prepare_body = CardzMarketcapUtilities::PrepareBody
  u.prepare_headers = CardzMarketcapUtilities::PrepareHeaders
  u.prepare_method = CardzMarketcapUtilities::PrepareMethod
  u.prepare_params = CardzMarketcapUtilities::PrepareParams
  u.prepare_path = CardzMarketcapUtilities::PreparePath
  u.prepare_query = CardzMarketcapUtilities::PrepareQuery
  u.graphql_body = CardzMarketcapUtilities::GraphqlBody
  u.graphql_errors = CardzMarketcapUtilities::GraphqlErrors
  u.result_basic = CardzMarketcapUtilities::ResultBasic
  u.result_body = CardzMarketcapUtilities::ResultBody
  u.result_headers = CardzMarketcapUtilities::ResultHeaders
  u.transform_request = CardzMarketcapUtilities::TransformRequest
  u.transform_response = CardzMarketcapUtilities::TransformResponse
}
