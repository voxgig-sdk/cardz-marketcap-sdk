package core

var UtilityRegistrar func(u *Utility)

var NewBaseFeatureFunc func() Feature

var NewRatelimitFeatureFunc func() Feature

var NewRetryFeatureFunc func() Feature

var NewTestFeatureFunc func() Feature

var NewTimeoutFeatureFunc func() Feature

var NewCardEntityFunc func(client *CardzMarketcapSDK, entopts map[string]any) CardzMarketcapEntity

var NewMarketEntityFunc func(client *CardzMarketcapSDK, entopts map[string]any) CardzMarketcapEntity

var NewResolutionEntityFunc func(client *CardzMarketcapSDK, entopts map[string]any) CardzMarketcapEntity

var NewSearchEntityFunc func(client *CardzMarketcapSDK, entopts map[string]any) CardzMarketcapEntity

