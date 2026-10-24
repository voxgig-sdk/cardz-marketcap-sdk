package voxgigcardzmarketcapsdk

import (
	"github.com/voxgig-sdk/cardz-marketcap-sdk/go/core"
	"github.com/voxgig-sdk/cardz-marketcap-sdk/go/entity"
	"github.com/voxgig-sdk/cardz-marketcap-sdk/go/feature"
	_ "github.com/voxgig-sdk/cardz-marketcap-sdk/go/utility"
)

// Type aliases preserve external API.
type CardzMarketcapSDK = core.CardzMarketcapSDK
type Context = core.Context
type Utility = core.Utility
type Feature = core.Feature
type Entity = core.Entity
type CardzMarketcapEntity = core.CardzMarketcapEntity
type StreamItem = core.StreamItem
type FetcherFunc = core.FetcherFunc
type Spec = core.Spec
type Result = core.Result
type Response = core.Response
type Operation = core.Operation
type Control = core.Control
type CardzMarketcapError = core.CardzMarketcapError

// BaseFeature from feature package.
type BaseFeature = feature.BaseFeature

func init() {
	core.NewBaseFeatureFunc = func() core.Feature {
		return feature.NewBaseFeature()
	}
	core.NewRatelimitFeatureFunc = func() core.Feature {
		return feature.NewRatelimitFeature()
	}
	core.NewRetryFeatureFunc = func() core.Feature {
		return feature.NewRetryFeature()
	}
	core.NewTestFeatureFunc = func() core.Feature {
		return feature.NewTestFeature()
	}
	core.NewTimeoutFeatureFunc = func() core.Feature {
		return feature.NewTimeoutFeature()
	}
	core.NewCardEntityFunc = func(client *core.CardzMarketcapSDK, entopts map[string]any) core.CardzMarketcapEntity {
		return entity.NewCardEntity(client, entopts)
	}
	core.NewMarketEntityFunc = func(client *core.CardzMarketcapSDK, entopts map[string]any) core.CardzMarketcapEntity {
		return entity.NewMarketEntity(client, entopts)
	}
	core.NewResolutionEntityFunc = func(client *core.CardzMarketcapSDK, entopts map[string]any) core.CardzMarketcapEntity {
		return entity.NewResolutionEntity(client, entopts)
	}
	core.NewSearchEntityFunc = func(client *core.CardzMarketcapSDK, entopts map[string]any) core.CardzMarketcapEntity {
		return entity.NewSearchEntity(client, entopts)
	}
}

// Constructor re-exports.
var NewCardzMarketcapSDK = core.NewCardzMarketcapSDK
var TestSDK = core.TestSDK
var NewContext = core.NewContext
var NewSpec = core.NewSpec
var NewResult = core.NewResult
var NewResponse = core.NewResponse
var NewOperation = core.NewOperation
var MakeConfig = core.MakeConfig
var SharedConfig = core.SharedConfig

// No-arg convenience constructors. Go has no default-argument syntax,
// so these aliases let callers write `sdk.New()` / `sdk.Test()`
// instead of `sdk.NewCardzMarketcapSDK(nil)` / `sdk.TestSDK(nil, nil)`
// for the common no-options case.
func New() *CardzMarketcapSDK  { return NewCardzMarketcapSDK(nil) }
func Test() *CardzMarketcapSDK { return TestSDK(nil, nil) }
var NewBaseFeature = feature.NewBaseFeature
var NewRatelimitFeature = feature.NewRatelimitFeature
var NewRetryFeature = feature.NewRetryFeature
var NewTestFeature = feature.NewTestFeature
var NewTimeoutFeature = feature.NewTimeoutFeature
