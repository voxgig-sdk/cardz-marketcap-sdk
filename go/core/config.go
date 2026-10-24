package core

import (
	"sync"
)

// MakeConfig builds a fresh, fully materialised config map. Every call
// rebuilds the whole structure, so prefer SharedConfig unless you need a
// private copy you intend to mutate.
func MakeConfig() map[string]any {
	return map[string]any{
		"main": map[string]any{
			"name": "CardzMarketcap",
			"slug": "cardz-marketcap",
			"version": "0.0.1",
			"target": "go",
		},
		"feature": map[string]any{
			"ratelimit": map[string]any{
				"options": map[string]any{
					"active": false,
					"burst": 5,
					"rate": 5,
				},
				"optspec": map[string]any{
					"now": "`$FUNCTION`",
					"sleep": "`$FUNCTION`",
				},
				"strict": false,
				"transport": "wrap",
			},
			"retry": map[string]any{
				"options": map[string]any{
					"active": false,
					"factor": 2,
					"maxDelay": 2000,
					"minDelay": 50,
					"retries": 2,
					"statuses": []any{
						408,
						425,
						429,
						500,
						502,
						503,
						504,
					},
				},
				"optspec": map[string]any{
					"jitter": "`$BOOLEAN`",
					"sleep": "`$FUNCTION`",
				},
				"strict": false,
				"transport": "wrap",
			},
			"test": map[string]any{
				"options": map[string]any{
					"active": false,
				},
				"optspec": map[string]any{
					"entity": "`$MAP`",
					"net": "`$MAP`",
				},
				"strict": false,
				"transport": "base",
			},
			"timeout": map[string]any{
				"options": map[string]any{
					"active": false,
					"ms": 30000,
				},
				"optspec": map[string]any{
					"clearTimer": "`$FUNCTION`",
					"now": "`$FUNCTION`",
					"setTimer": "`$FUNCTION`",
				},
				"strict": false,
				"transport": "wrap",
			},
		},
		"options": map[string]any{
			"base": "https://cardzmarketcap.com/api/v1",
			"headers": map[string]any{
				"content-type": "application/json",
			},
			"entity": map[string]any{
				"card": map[string]any{},
				"market": map[string]any{},
				"resolution": map[string]any{},
				"search": map[string]any{},
			},
		},
		"entity": map[string]any{
			"card": map[string]any{
				"fields": []any{
					map[string]any{
						"name": "cardLanguage",
						"title": "Card Language",
						"type": "`$STRING`",
						"req": true,
						"short": "Printing language: en, ja, ko, zhCN or zhTW.",
					},
					map[string]any{
						"name": "collectorNumber",
						"title": "Collector Number",
						"type": "`$STRING`",
						"req": true,
					},
					map[string]any{
						"name": "historyDaily",
						"title": "History Daily",
						"type": "`$ARRAY`",
						"req": true,
						"short": "Daily history.",
					},
					map[string]any{
						"name": "historyReference",
						"title": "History Reference",
						"type": "`$ARRAY`",
						"req": true,
						"short": "Longer reference history.",
					},
					map[string]any{
						"name": "id",
						"title": "Id",
						"type": "`$STRING`",
						"req": true,
						"short": "Stable public card id (also the /card/{id} page segment).",
					},
					map[string]any{
						"name": "image",
						"title": "Image",
						"type": "`$OBJECT`",
						"req": true,
					},
					map[string]any{
						"name": "marketCap",
						"title": "Market Cap",
						"type": "`$OBJECT`",
						"req": true,
						"short": "A published figure with its status and date.",
					},
					map[string]any{
						"name": "marketRank",
						"title": "Market Rank",
						"type": "`$INTEGER`",
						"req": true,
						"short": "Rank by market cap across the whole index.",
					},
					map[string]any{
						"name": "name",
						"title": "Name",
						"type": "`$OBJECT`",
						"req": true,
						"short": "Text keyed by language code.",
					},
					map[string]any{
						"name": "officialName",
						"title": "Official Name",
						"type": "`$STRING`",
						"req": true,
						"short": "Canonical printing name.",
					},
					map[string]any{
						"name": "populationPsa10",
						"title": "Population Psa10",
						"type": "`$OBJECT`",
						"req": true,
						"short": "A published figure with its status and date.",
					},
					map[string]any{
						"name": "previousMarketRank",
						"title": "Previous Market Rank",
						"type": "`$INTEGER`",
						"short": "Market rank in the previous snapshot.",
					},
					map[string]any{
						"name": "pricePsa10",
						"title": "Price Psa10",
						"type": "`$OBJECT`",
						"req": true,
						"short": "A published figure with its status and date.",
					},
					map[string]any{
						"name": "priceUngradedReference",
						"title": "Price Ungraded Reference",
						"type": "`$ANY`",
						"short": "Card detail only: ungraded reference price.",
					},
					map[string]any{
						"name": "printingIdentity",
						"title": "Printing Identity",
						"type": "`$OBJECT`",
						"req": true,
					},
					map[string]any{
						"name": "rank",
						"title": "Rank",
						"type": "`$INTEGER`",
						"req": true,
						"short": "Position in this response's ordering.",
					},
					map[string]any{
						"name": "salesSparkline",
						"title": "Sales Sparkline",
						"type": "`$ARRAY`",
						"req": true,
						"short": "Recent daily tracked-sales values for a sparkline.",
					},
					map[string]any{
						"name": "setName",
						"title": "Set Name",
						"type": "`$OBJECT`",
						"req": true,
						"short": "Text keyed by language code.",
					},
					map[string]any{
						"name": "story",
						"title": "Story",
						"type": "`$OBJECT`",
						"req": true,
						"short": "Card detail only: editorial story text keyed by language code.",
					},
					map[string]any{
						"name": "tcg",
						"title": "Tcg",
						"type": "`$STRING`",
						"req": true,
						"short": "\"Pokémon\" or \"One Piece\".",
					},
					map[string]any{
						"name": "viewRank",
						"title": "View Rank",
						"type": "`$INTEGER`",
						"req": true,
						"short": "Rank inside the requested scope.",
					},
					map[string]any{
						"name": "windows",
						"title": "Windows",
						"type": "`$OBJECT`",
						"req": true,
						"short": "Change figures keyed by window: 1d, 7d, 30d, 90d, 180d, 365d.",
					},
				},
				"id": map[string]any{
					"field": "id",
					"name": "id",
				},
				"name": "card",
				"op": map[string]any{
					"load": map[string]any{
						"input": "data",
						"name": "load",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "GET",
								"orig": "/cards/{id}",
								"segments": []any{
									map[string]any{
										"lit": "cards",
									},
									map[string]any{
										"var": "id",
									},
								},
								"parts": []any{
									"cards",
									"{id}",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"name": "id",
											"orig": "id",
											"type": "`$STRING`",
											"kind": "param",
											"reqd": true,
											"example": "cmc_fc229f7ae1b256b2119fa79b",
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
										"id",
									},
								},
								"response": map[string]any{
									"kind": "json",
									"media": "application/json",
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{},
				},
			},
			"market": map[string]any{
				"fields": []any{
					map[string]any{
						"name": "cardLanguage",
						"title": "Card Language",
						"type": "`$STRING`",
						"req": true,
						"short": "Printing language: en, ja, ko, zhCN or zhTW.",
					},
					map[string]any{
						"name": "collectorNumber",
						"title": "Collector Number",
						"type": "`$STRING`",
						"req": true,
					},
					map[string]any{
						"name": "historyDaily",
						"title": "History Daily",
						"type": "`$ARRAY`",
						"req": true,
						"short": "Daily history.",
					},
					map[string]any{
						"name": "historyReference",
						"title": "History Reference",
						"type": "`$ARRAY`",
						"req": true,
						"short": "Longer reference history.",
					},
					map[string]any{
						"name": "id",
						"title": "Id",
						"type": "`$STRING`",
						"req": true,
						"short": "Stable public card id (also the /card/{id} page segment).",
					},
					map[string]any{
						"name": "image",
						"title": "Image",
						"type": "`$OBJECT`",
						"req": true,
					},
					map[string]any{
						"name": "marketCap",
						"title": "Market Cap",
						"type": "`$OBJECT`",
						"req": true,
						"short": "A published figure with its status and date.",
					},
					map[string]any{
						"name": "marketRank",
						"title": "Market Rank",
						"type": "`$INTEGER`",
						"req": true,
						"short": "Rank by market cap across the whole index.",
					},
					map[string]any{
						"name": "name",
						"title": "Name",
						"type": "`$OBJECT`",
						"req": true,
						"short": "Text keyed by language code.",
					},
					map[string]any{
						"name": "officialName",
						"title": "Official Name",
						"type": "`$STRING`",
						"req": true,
						"short": "Canonical printing name.",
					},
					map[string]any{
						"name": "populationPsa10",
						"title": "Population Psa10",
						"type": "`$OBJECT`",
						"req": true,
						"short": "A published figure with its status and date.",
					},
					map[string]any{
						"name": "previousMarketRank",
						"title": "Previous Market Rank",
						"type": "`$INTEGER`",
						"short": "Market rank in the previous snapshot.",
					},
					map[string]any{
						"name": "pricePsa10",
						"title": "Price Psa10",
						"type": "`$OBJECT`",
						"req": true,
						"short": "A published figure with its status and date.",
					},
					map[string]any{
						"name": "priceUngradedReference",
						"title": "Price Ungraded Reference",
						"type": "`$ANY`",
						"short": "Card detail only: ungraded reference price.",
					},
					map[string]any{
						"name": "printingIdentity",
						"title": "Printing Identity",
						"type": "`$OBJECT`",
						"req": true,
					},
					map[string]any{
						"name": "rank",
						"title": "Rank",
						"type": "`$INTEGER`",
						"req": true,
						"short": "Position in this response's ordering.",
					},
					map[string]any{
						"name": "salesSparkline",
						"title": "Sales Sparkline",
						"type": "`$ARRAY`",
						"req": true,
						"short": "Recent daily tracked-sales values for a sparkline.",
					},
					map[string]any{
						"name": "setName",
						"title": "Set Name",
						"type": "`$OBJECT`",
						"req": true,
						"short": "Text keyed by language code.",
					},
					map[string]any{
						"name": "story",
						"title": "Story",
						"type": "`$OBJECT`",
						"req": true,
						"short": "Card detail only: editorial story text keyed by language code.",
					},
					map[string]any{
						"name": "tcg",
						"title": "Tcg",
						"type": "`$STRING`",
						"req": true,
						"short": "\"Pokémon\" or \"One Piece\".",
					},
					map[string]any{
						"name": "viewRank",
						"title": "View Rank",
						"type": "`$INTEGER`",
						"req": true,
						"short": "Rank inside the requested scope.",
					},
					map[string]any{
						"name": "windows",
						"title": "Windows",
						"type": "`$OBJECT`",
						"req": true,
						"short": "Change figures keyed by window: 1d, 7d, 30d, 90d, 180d, 365d.",
					},
				},
				"id": map[string]any{
					"field": "id",
					"name": "id",
				},
				"name": "market",
				"op": map[string]any{
					"list": map[string]any{
						"input": "data",
						"name": "list",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "GET",
								"orig": "/market",
								"segments": []any{
									map[string]any{
										"lit": "market",
									},
								},
								"parts": []any{
									"market",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"query": []any{
										map[string]any{
											"name": "page",
											"orig": "page",
											"type": "`$INTEGER`",
											"kind": "query",
											"example": 1,
										},
										map[string]any{
											"name": "page_size",
											"orig": "pageSize",
											"type": "`$INTEGER`",
											"kind": "query",
											"example": 5,
										},
										map[string]any{
											"name": "scope",
											"orig": "scope",
											"type": "`$STRING`",
											"kind": "query",
											"example": "pokemon",
										},
									},
								},
								"select": map[string]any{},
								"response": map[string]any{
									"kind": "json",
									"media": "application/json",
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{},
				},
			},
			"resolution": map[string]any{
				"fields": []any{
					map[string]any{
						"name": "aliases",
						"title": "Aliases",
						"type": "`$ARRAY`",
						"short": "Known nicknames (present on some cards).",
					},
					map[string]any{
						"name": "cardLanguage",
						"title": "Card Language",
						"type": "`$STRING`",
						"req": true,
					},
					map[string]any{
						"name": "collectorNumber",
						"title": "Collector Number",
						"type": "`$STRING`",
						"req": true,
					},
					map[string]any{
						"name": "href",
						"title": "Href",
						"type": "`$STRING`",
						"req": true,
						"short": "Site-relative page path.",
					},
					map[string]any{
						"name": "id",
						"title": "Id",
						"type": "`$STRING`",
						"req": true,
						"short": "Card id (cmc_...) or box id.",
					},
					map[string]any{
						"name": "image",
						"title": "Image",
						"type": "`$OBJECT`",
						"req": true,
					},
					map[string]any{
						"name": "kind",
						"title": "Kind",
						"type": "`$STRING`",
						"req": true,
						"short": "\"card\" or \"box\".",
					},
					map[string]any{
						"name": "marketCap",
						"title": "Market Cap",
						"type": "`$OBJECT`",
						"req": true,
						"short": "A published figure with its status and date.",
					},
					map[string]any{
						"name": "marketRank",
						"title": "Market Rank",
						"type": "`$INTEGER`",
						"req": true,
					},
					map[string]any{
						"name": "match",
						"title": "Match",
						"type": "`$STRING`",
						"req": true,
						"short": "How the query matched, e.g.",
					},
					map[string]any{
						"name": "name",
						"title": "Name",
						"type": "`$OBJECT`",
						"req": true,
						"short": "Text keyed by language code.",
					},
					map[string]any{
						"name": "officialName",
						"title": "Official Name",
						"type": "`$STRING`",
						"req": true,
					},
					map[string]any{
						"name": "populationPsa10",
						"title": "Population Psa10",
						"type": "`$OBJECT`",
						"req": true,
						"short": "A published figure with its status and date.",
					},
					map[string]any{
						"name": "pricePsa10",
						"title": "Price Psa10",
						"type": "`$OBJECT`",
						"req": true,
						"short": "A published figure with its status and date.",
					},
					map[string]any{
						"name": "setCode",
						"title": "Set Code",
						"type": "`$STRING`",
						"req": true,
					},
					map[string]any{
						"name": "setName",
						"title": "Set Name",
						"type": "`$OBJECT`",
						"req": true,
						"short": "Text keyed by language code.",
					},
					map[string]any{
						"name": "tcg",
						"title": "Tcg",
						"type": "`$STRING`",
						"req": true,
					},
					map[string]any{
						"name": "url",
						"title": "Url",
						"type": "`$STRING`",
						"req": true,
						"short": "Absolute page URL.",
					},
				},
				"id": map[string]any{
					"field": "id",
					"name": "id",
				},
				"name": "resolution",
				"op": map[string]any{
					"list": map[string]any{
						"input": "data",
						"name": "list",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "GET",
								"orig": "/resolve",
								"segments": []any{
									map[string]any{
										"lit": "resolve",
									},
								},
								"parts": []any{
									"resolve",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"query": []any{
										map[string]any{
											"name": "lang",
											"orig": "lang",
											"type": "`$STRING`",
											"kind": "query",
											"example": "en",
										},
										map[string]any{
											"name": "q",
											"orig": "q",
											"type": "`$STRING`",
											"kind": "query",
											"reqd": true,
											"example": "085/SVP",
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
										"q",
									},
								},
								"response": map[string]any{
									"kind": "json",
									"media": "application/json",
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{},
				},
			},
			"search": map[string]any{
				"fields": []any{
					map[string]any{
						"name": "aliases",
						"title": "Aliases",
						"type": "`$ARRAY`",
						"short": "Known nicknames (present on some cards).",
					},
					map[string]any{
						"name": "cardLanguage",
						"title": "Card Language",
						"type": "`$STRING`",
						"req": true,
					},
					map[string]any{
						"name": "collectorNumber",
						"title": "Collector Number",
						"type": "`$STRING`",
						"req": true,
					},
					map[string]any{
						"name": "href",
						"title": "Href",
						"type": "`$STRING`",
						"req": true,
						"short": "Site-relative page path.",
					},
					map[string]any{
						"name": "id",
						"title": "Id",
						"type": "`$STRING`",
						"req": true,
						"short": "Card id (cmc_...) or box id.",
					},
					map[string]any{
						"name": "image",
						"title": "Image",
						"type": "`$OBJECT`",
						"req": true,
					},
					map[string]any{
						"name": "kind",
						"title": "Kind",
						"type": "`$STRING`",
						"req": true,
						"short": "\"card\" or \"box\".",
					},
					map[string]any{
						"name": "marketCap",
						"title": "Market Cap",
						"type": "`$OBJECT`",
						"req": true,
						"short": "A published figure with its status and date.",
					},
					map[string]any{
						"name": "marketRank",
						"title": "Market Rank",
						"type": "`$INTEGER`",
						"req": true,
					},
					map[string]any{
						"name": "match",
						"title": "Match",
						"type": "`$STRING`",
						"req": true,
						"short": "How the query matched, e.g.",
					},
					map[string]any{
						"name": "name",
						"title": "Name",
						"type": "`$OBJECT`",
						"req": true,
						"short": "Text keyed by language code.",
					},
					map[string]any{
						"name": "officialName",
						"title": "Official Name",
						"type": "`$STRING`",
						"req": true,
					},
					map[string]any{
						"name": "populationPsa10",
						"title": "Population Psa10",
						"type": "`$OBJECT`",
						"req": true,
						"short": "A published figure with its status and date.",
					},
					map[string]any{
						"name": "pricePsa10",
						"title": "Price Psa10",
						"type": "`$OBJECT`",
						"req": true,
						"short": "A published figure with its status and date.",
					},
					map[string]any{
						"name": "setCode",
						"title": "Set Code",
						"type": "`$STRING`",
						"req": true,
					},
					map[string]any{
						"name": "setName",
						"title": "Set Name",
						"type": "`$OBJECT`",
						"req": true,
						"short": "Text keyed by language code.",
					},
					map[string]any{
						"name": "tcg",
						"title": "Tcg",
						"type": "`$STRING`",
						"req": true,
					},
					map[string]any{
						"name": "url",
						"title": "Url",
						"type": "`$STRING`",
						"req": true,
						"short": "Absolute page URL.",
					},
				},
				"id": map[string]any{
					"field": "id",
					"name": "id",
				},
				"name": "search",
				"op": map[string]any{
					"list": map[string]any{
						"input": "data",
						"name": "list",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "GET",
								"orig": "/search",
								"segments": []any{
									map[string]any{
										"lit": "search",
									},
								},
								"parts": []any{
									"search",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"query": []any{
										map[string]any{
											"name": "kind",
											"orig": "kind",
											"type": "`$STRING`",
											"kind": "query",
											"field": true,
										},
										map[string]any{
											"name": "lang",
											"orig": "lang",
											"type": "`$STRING`",
											"kind": "query",
											"example": "en",
										},
										map[string]any{
											"name": "limit",
											"orig": "limit",
											"type": "`$INTEGER`",
											"kind": "query",
											"example": 3,
										},
										map[string]any{
											"name": "q",
											"orig": "q",
											"type": "`$STRING`",
											"kind": "query",
											"reqd": true,
											"example": "pikachu",
										},
										map[string]any{
											"name": "tcg",
											"orig": "tcg",
											"type": "`$STRING`",
											"kind": "query",
											"example": "one-piece",
											"field": true,
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
										"q",
									},
								},
								"response": map[string]any{
									"kind": "json",
									"media": "application/json",
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{},
				},
			},
		},
	}
}

// The plugin definitions the model selected per feature, as []any so a
// feature package can consume them without core naming its types. Empty
// when no active feature declares active plugin groups for this target.
var featurePlugins = map[string][]any{
}

// FeaturePlugins is the definitions list for one feature's chain.
func FeaturePlugins(name string) []any {
	return featurePlugins[name]
}

var (
	sharedConfigOnce sync.Once
	sharedConfigVal  map[string]any
)

// SharedConfig returns the process-wide config, built once on first use.
// The SDK reads the config on every request and never writes to it, so one
// instance is shared by every client rather than rebuilt per client.
//
// The returned map is shared: treat it as read-only. Callers that need to
// mutate should use MakeConfig, which always returns a fresh copy.
func SharedConfig() map[string]any {
	sharedConfigOnce.Do(func() {
		sharedConfigVal = MakeConfig()
	})
	return sharedConfigVal
}

func makeFeature(name string) Feature {
	switch name {
	case "ratelimit":
		if NewRatelimitFeatureFunc != nil {
			return NewRatelimitFeatureFunc()
		}
	case "retry":
		if NewRetryFeatureFunc != nil {
			return NewRetryFeatureFunc()
		}
	case "test":
		if NewTestFeatureFunc != nil {
			return NewTestFeatureFunc()
		}
	case "timeout":
		if NewTimeoutFeatureFunc != nil {
			return NewTimeoutFeatureFunc()
		}
	default:
		if NewBaseFeatureFunc != nil {
			return NewBaseFeatureFunc()
		}
	}
	return nil
}
