# CardzMarketcap SDK configuration


# The sekreto plugin DEFINITIONS the model selected per feature, imported
# above by name from the modules the catalogue's active `plugin.def`
# entries declare. Handed to each feature (secrets builds its Sekreto
# with them): a provider kind not listed here is unknown to that SDK.
FEATURE_PLUGINS = {
}


_shared_config = None


def shared_config():
    """Return the process-wide config, built once on first use.

    The SDK reads the config on every request and never writes to it, so one
    instance is shared by every client rather than rebuilt per client.

    The returned dict is shared: treat it as read-only. Callers that need to
    mutate should use make_config, which always returns a fresh copy.
    """
    global _shared_config
    if _shared_config is None:
        _shared_config = make_config()
    return _shared_config


def make_config():
    """Build a fresh, fully materialised config dict.

    Every call rebuilds the whole structure, so prefer shared_config unless
    you need a private copy you intend to mutate.
    """
    return {
        "main": {
            "name": "CardzMarketcap",
            "slug": "cardz-marketcap",
            "version": "0.0.1",
            "target": "py",
        },
        "feature": {
            "ratelimit": {
        "options": {
          "active": False,
          "burst": 5,
          "rate": 5,
        },
        "optspec": {
          "now": "`$FUNCTION`",
          "sleep": "`$FUNCTION`",
        },
        "strict": False,
        "transport": "wrap",
      },
            "retry": {
        "options": {
          "active": False,
          "factor": 2,
          "maxDelay": 2000,
          "minDelay": 50,
          "retries": 2,
          "statuses": [
            408,
            425,
            429,
            500,
            502,
            503,
            504,
          ],
        },
        "optspec": {
          "jitter": "`$BOOLEAN`",
          "sleep": "`$FUNCTION`",
        },
        "strict": False,
        "transport": "wrap",
      },
            "test": {
        "options": {
          "active": False,
        },
        "optspec": {
          "entity": "`$MAP`",
          "net": "`$MAP`",
        },
        "strict": False,
        "transport": "base",
      },
            "timeout": {
        "options": {
          "active": False,
          "ms": 30000,
        },
        "optspec": {
          "clearTimer": "`$FUNCTION`",
          "now": "`$FUNCTION`",
          "setTimer": "`$FUNCTION`",
        },
        "strict": False,
        "transport": "wrap",
      },
        },
        "options": {
            "base": "https://cardzmarketcap.com/api/v1",
            "headers": {
        "content-type": "application/json",
      },
            "entity": {
                "card": {},
                "market": {},
                "resolution": {},
                "search": {},
            },
        },
        "entity": {
      "card": {
        "fields": [
          {
            "name": "cardLanguage",
            "title": "Card Language",
            "type": "`$STRING`",
            "req": True,
            "short": "Printing language: en, ja, ko, zhCN or zhTW.",
          },
          {
            "name": "collectorNumber",
            "title": "Collector Number",
            "type": "`$STRING`",
            "req": True,
          },
          {
            "name": "historyDaily",
            "title": "History Daily",
            "type": "`$ARRAY`",
            "req": True,
            "short": "Daily history.",
          },
          {
            "name": "historyReference",
            "title": "History Reference",
            "type": "`$ARRAY`",
            "req": True,
            "short": "Longer reference history.",
          },
          {
            "name": "id",
            "title": "Id",
            "type": "`$STRING`",
            "req": True,
            "short": "Stable public card id (also the /card/{id} page segment).",
          },
          {
            "name": "image",
            "title": "Image",
            "type": "`$OBJECT`",
            "req": True,
          },
          {
            "name": "marketCap",
            "title": "Market Cap",
            "type": "`$OBJECT`",
            "req": True,
            "short": "A published figure with its status and date.",
          },
          {
            "name": "marketRank",
            "title": "Market Rank",
            "type": "`$INTEGER`",
            "req": True,
            "short": "Rank by market cap across the whole index.",
          },
          {
            "name": "name",
            "title": "Name",
            "type": "`$OBJECT`",
            "req": True,
            "short": "Text keyed by language code.",
          },
          {
            "name": "officialName",
            "title": "Official Name",
            "type": "`$STRING`",
            "req": True,
            "short": "Canonical printing name.",
          },
          {
            "name": "populationPsa10",
            "title": "Population Psa10",
            "type": "`$OBJECT`",
            "req": True,
            "short": "A published figure with its status and date.",
          },
          {
            "name": "previousMarketRank",
            "title": "Previous Market Rank",
            "type": "`$INTEGER`",
            "short": "Market rank in the previous snapshot.",
          },
          {
            "name": "pricePsa10",
            "title": "Price Psa10",
            "type": "`$OBJECT`",
            "req": True,
            "short": "A published figure with its status and date.",
          },
          {
            "name": "priceUngradedReference",
            "title": "Price Ungraded Reference",
            "type": "`$ANY`",
            "short": "Card detail only: ungraded reference price.",
          },
          {
            "name": "printingIdentity",
            "title": "Printing Identity",
            "type": "`$OBJECT`",
            "req": True,
          },
          {
            "name": "rank",
            "title": "Rank",
            "type": "`$INTEGER`",
            "req": True,
            "short": "Position in this response's ordering.",
          },
          {
            "name": "salesSparkline",
            "title": "Sales Sparkline",
            "type": "`$ARRAY`",
            "req": True,
            "short": "Recent daily tracked-sales values for a sparkline.",
          },
          {
            "name": "setName",
            "title": "Set Name",
            "type": "`$OBJECT`",
            "req": True,
            "short": "Text keyed by language code.",
          },
          {
            "name": "story",
            "title": "Story",
            "type": "`$OBJECT`",
            "req": True,
            "short": "Card detail only: editorial story text keyed by language code.",
          },
          {
            "name": "tcg",
            "title": "Tcg",
            "type": "`$STRING`",
            "req": True,
            "short": "\"Pokémon\" or \"One Piece\".",
          },
          {
            "name": "viewRank",
            "title": "View Rank",
            "type": "`$INTEGER`",
            "req": True,
            "short": "Rank inside the requested scope.",
          },
          {
            "name": "windows",
            "title": "Windows",
            "type": "`$OBJECT`",
            "req": True,
            "short": "Change figures keyed by window: 1d, 7d, 30d, 90d, 180d, 365d.",
          },
        ],
        "id": {
          "field": "id",
          "name": "id",
        },
        "name": "card",
        "op": {
          "load": {
            "input": "data",
            "name": "load",
            "points": [
              {
                "kind": "http",
                "method": "GET",
                "orig": "/cards/{id}",
                "segments": [
                  {
                    "lit": "cards",
                  },
                  {
                    "var": "id",
                  },
                ],
                "parts": [
                  "cards",
                  "{id}",
                ],
                "rename": {},
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "args": {
                  "params": [
                    {
                      "name": "id",
                      "orig": "id",
                      "type": "`$STRING`",
                      "kind": "param",
                      "reqd": True,
                      "example": "cmc_fc229f7ae1b256b2119fa79b",
                    },
                  ],
                },
                "select": {
                  "exist": [
                    "id",
                  ],
                },
                "response": {
                  "kind": "json",
                  "media": "application/json",
                },
              },
            ],
          },
        },
        "relations": {
          "ancestors": [],
        },
      },
      "market": {
        "fields": [
          {
            "name": "cardLanguage",
            "title": "Card Language",
            "type": "`$STRING`",
            "req": True,
            "short": "Printing language: en, ja, ko, zhCN or zhTW.",
          },
          {
            "name": "collectorNumber",
            "title": "Collector Number",
            "type": "`$STRING`",
            "req": True,
          },
          {
            "name": "historyDaily",
            "title": "History Daily",
            "type": "`$ARRAY`",
            "req": True,
            "short": "Daily history.",
          },
          {
            "name": "historyReference",
            "title": "History Reference",
            "type": "`$ARRAY`",
            "req": True,
            "short": "Longer reference history.",
          },
          {
            "name": "id",
            "title": "Id",
            "type": "`$STRING`",
            "req": True,
            "short": "Stable public card id (also the /card/{id} page segment).",
          },
          {
            "name": "image",
            "title": "Image",
            "type": "`$OBJECT`",
            "req": True,
          },
          {
            "name": "marketCap",
            "title": "Market Cap",
            "type": "`$OBJECT`",
            "req": True,
            "short": "A published figure with its status and date.",
          },
          {
            "name": "marketRank",
            "title": "Market Rank",
            "type": "`$INTEGER`",
            "req": True,
            "short": "Rank by market cap across the whole index.",
          },
          {
            "name": "name",
            "title": "Name",
            "type": "`$OBJECT`",
            "req": True,
            "short": "Text keyed by language code.",
          },
          {
            "name": "officialName",
            "title": "Official Name",
            "type": "`$STRING`",
            "req": True,
            "short": "Canonical printing name.",
          },
          {
            "name": "populationPsa10",
            "title": "Population Psa10",
            "type": "`$OBJECT`",
            "req": True,
            "short": "A published figure with its status and date.",
          },
          {
            "name": "previousMarketRank",
            "title": "Previous Market Rank",
            "type": "`$INTEGER`",
            "short": "Market rank in the previous snapshot.",
          },
          {
            "name": "pricePsa10",
            "title": "Price Psa10",
            "type": "`$OBJECT`",
            "req": True,
            "short": "A published figure with its status and date.",
          },
          {
            "name": "priceUngradedReference",
            "title": "Price Ungraded Reference",
            "type": "`$ANY`",
            "short": "Card detail only: ungraded reference price.",
          },
          {
            "name": "printingIdentity",
            "title": "Printing Identity",
            "type": "`$OBJECT`",
            "req": True,
          },
          {
            "name": "rank",
            "title": "Rank",
            "type": "`$INTEGER`",
            "req": True,
            "short": "Position in this response's ordering.",
          },
          {
            "name": "salesSparkline",
            "title": "Sales Sparkline",
            "type": "`$ARRAY`",
            "req": True,
            "short": "Recent daily tracked-sales values for a sparkline.",
          },
          {
            "name": "setName",
            "title": "Set Name",
            "type": "`$OBJECT`",
            "req": True,
            "short": "Text keyed by language code.",
          },
          {
            "name": "story",
            "title": "Story",
            "type": "`$OBJECT`",
            "req": True,
            "short": "Card detail only: editorial story text keyed by language code.",
          },
          {
            "name": "tcg",
            "title": "Tcg",
            "type": "`$STRING`",
            "req": True,
            "short": "\"Pokémon\" or \"One Piece\".",
          },
          {
            "name": "viewRank",
            "title": "View Rank",
            "type": "`$INTEGER`",
            "req": True,
            "short": "Rank inside the requested scope.",
          },
          {
            "name": "windows",
            "title": "Windows",
            "type": "`$OBJECT`",
            "req": True,
            "short": "Change figures keyed by window: 1d, 7d, 30d, 90d, 180d, 365d.",
          },
        ],
        "id": {
          "field": "id",
          "name": "id",
        },
        "name": "market",
        "op": {
          "list": {
            "input": "data",
            "name": "list",
            "points": [
              {
                "kind": "http",
                "method": "GET",
                "orig": "/market",
                "segments": [
                  {
                    "lit": "market",
                  },
                ],
                "parts": [
                  "market",
                ],
                "rename": {},
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "args": {
                  "query": [
                    {
                      "name": "page",
                      "orig": "page",
                      "type": "`$INTEGER`",
                      "kind": "query",
                      "example": 1,
                    },
                    {
                      "name": "page_size",
                      "orig": "pageSize",
                      "type": "`$INTEGER`",
                      "kind": "query",
                      "example": 5,
                    },
                    {
                      "name": "scope",
                      "orig": "scope",
                      "type": "`$STRING`",
                      "kind": "query",
                      "example": "pokemon",
                    },
                  ],
                },
                "select": {},
                "response": {
                  "kind": "json",
                  "media": "application/json",
                },
              },
            ],
          },
        },
        "relations": {
          "ancestors": [],
        },
      },
      "resolution": {
        "fields": [
          {
            "name": "aliases",
            "title": "Aliases",
            "type": "`$ARRAY`",
            "short": "Known nicknames (present on some cards).",
          },
          {
            "name": "cardLanguage",
            "title": "Card Language",
            "type": "`$STRING`",
            "req": True,
          },
          {
            "name": "collectorNumber",
            "title": "Collector Number",
            "type": "`$STRING`",
            "req": True,
          },
          {
            "name": "href",
            "title": "Href",
            "type": "`$STRING`",
            "req": True,
            "short": "Site-relative page path.",
          },
          {
            "name": "id",
            "title": "Id",
            "type": "`$STRING`",
            "req": True,
            "short": "Card id (cmc_...) or box id.",
          },
          {
            "name": "image",
            "title": "Image",
            "type": "`$OBJECT`",
            "req": True,
          },
          {
            "name": "kind",
            "title": "Kind",
            "type": "`$STRING`",
            "req": True,
            "short": "\"card\" or \"box\".",
          },
          {
            "name": "marketCap",
            "title": "Market Cap",
            "type": "`$OBJECT`",
            "req": True,
            "short": "A published figure with its status and date.",
          },
          {
            "name": "marketRank",
            "title": "Market Rank",
            "type": "`$INTEGER`",
            "req": True,
          },
          {
            "name": "match",
            "title": "Match",
            "type": "`$STRING`",
            "req": True,
            "short": "How the query matched, e.g.",
          },
          {
            "name": "name",
            "title": "Name",
            "type": "`$OBJECT`",
            "req": True,
            "short": "Text keyed by language code.",
          },
          {
            "name": "officialName",
            "title": "Official Name",
            "type": "`$STRING`",
            "req": True,
          },
          {
            "name": "populationPsa10",
            "title": "Population Psa10",
            "type": "`$OBJECT`",
            "req": True,
            "short": "A published figure with its status and date.",
          },
          {
            "name": "pricePsa10",
            "title": "Price Psa10",
            "type": "`$OBJECT`",
            "req": True,
            "short": "A published figure with its status and date.",
          },
          {
            "name": "setCode",
            "title": "Set Code",
            "type": "`$STRING`",
            "req": True,
          },
          {
            "name": "setName",
            "title": "Set Name",
            "type": "`$OBJECT`",
            "req": True,
            "short": "Text keyed by language code.",
          },
          {
            "name": "tcg",
            "title": "Tcg",
            "type": "`$STRING`",
            "req": True,
          },
          {
            "name": "url",
            "title": "Url",
            "type": "`$STRING`",
            "req": True,
            "short": "Absolute page URL.",
          },
        ],
        "id": {
          "field": "id",
          "name": "id",
        },
        "name": "resolution",
        "op": {
          "list": {
            "input": "data",
            "name": "list",
            "points": [
              {
                "kind": "http",
                "method": "GET",
                "orig": "/resolve",
                "segments": [
                  {
                    "lit": "resolve",
                  },
                ],
                "parts": [
                  "resolve",
                ],
                "rename": {},
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "args": {
                  "query": [
                    {
                      "name": "lang",
                      "orig": "lang",
                      "type": "`$STRING`",
                      "kind": "query",
                      "example": "en",
                    },
                    {
                      "name": "q",
                      "orig": "q",
                      "type": "`$STRING`",
                      "kind": "query",
                      "reqd": True,
                      "example": "085/SVP",
                    },
                  ],
                },
                "select": {
                  "exist": [
                    "q",
                  ],
                },
                "response": {
                  "kind": "json",
                  "media": "application/json",
                },
              },
            ],
          },
        },
        "relations": {
          "ancestors": [],
        },
      },
      "search": {
        "fields": [
          {
            "name": "aliases",
            "title": "Aliases",
            "type": "`$ARRAY`",
            "short": "Known nicknames (present on some cards).",
          },
          {
            "name": "cardLanguage",
            "title": "Card Language",
            "type": "`$STRING`",
            "req": True,
          },
          {
            "name": "collectorNumber",
            "title": "Collector Number",
            "type": "`$STRING`",
            "req": True,
          },
          {
            "name": "href",
            "title": "Href",
            "type": "`$STRING`",
            "req": True,
            "short": "Site-relative page path.",
          },
          {
            "name": "id",
            "title": "Id",
            "type": "`$STRING`",
            "req": True,
            "short": "Card id (cmc_...) or box id.",
          },
          {
            "name": "image",
            "title": "Image",
            "type": "`$OBJECT`",
            "req": True,
          },
          {
            "name": "kind",
            "title": "Kind",
            "type": "`$STRING`",
            "req": True,
            "short": "\"card\" or \"box\".",
          },
          {
            "name": "marketCap",
            "title": "Market Cap",
            "type": "`$OBJECT`",
            "req": True,
            "short": "A published figure with its status and date.",
          },
          {
            "name": "marketRank",
            "title": "Market Rank",
            "type": "`$INTEGER`",
            "req": True,
          },
          {
            "name": "match",
            "title": "Match",
            "type": "`$STRING`",
            "req": True,
            "short": "How the query matched, e.g.",
          },
          {
            "name": "name",
            "title": "Name",
            "type": "`$OBJECT`",
            "req": True,
            "short": "Text keyed by language code.",
          },
          {
            "name": "officialName",
            "title": "Official Name",
            "type": "`$STRING`",
            "req": True,
          },
          {
            "name": "populationPsa10",
            "title": "Population Psa10",
            "type": "`$OBJECT`",
            "req": True,
            "short": "A published figure with its status and date.",
          },
          {
            "name": "pricePsa10",
            "title": "Price Psa10",
            "type": "`$OBJECT`",
            "req": True,
            "short": "A published figure with its status and date.",
          },
          {
            "name": "setCode",
            "title": "Set Code",
            "type": "`$STRING`",
            "req": True,
          },
          {
            "name": "setName",
            "title": "Set Name",
            "type": "`$OBJECT`",
            "req": True,
            "short": "Text keyed by language code.",
          },
          {
            "name": "tcg",
            "title": "Tcg",
            "type": "`$STRING`",
            "req": True,
          },
          {
            "name": "url",
            "title": "Url",
            "type": "`$STRING`",
            "req": True,
            "short": "Absolute page URL.",
          },
        ],
        "id": {
          "field": "id",
          "name": "id",
        },
        "name": "search",
        "op": {
          "list": {
            "input": "data",
            "name": "list",
            "points": [
              {
                "kind": "http",
                "method": "GET",
                "orig": "/search",
                "segments": [
                  {
                    "lit": "search",
                  },
                ],
                "parts": [
                  "search",
                ],
                "rename": {},
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "args": {
                  "query": [
                    {
                      "name": "kind",
                      "orig": "kind",
                      "type": "`$STRING`",
                      "kind": "query",
                      "field": True,
                    },
                    {
                      "name": "lang",
                      "orig": "lang",
                      "type": "`$STRING`",
                      "kind": "query",
                      "example": "en",
                    },
                    {
                      "name": "limit",
                      "orig": "limit",
                      "type": "`$INTEGER`",
                      "kind": "query",
                      "example": 3,
                    },
                    {
                      "name": "q",
                      "orig": "q",
                      "type": "`$STRING`",
                      "kind": "query",
                      "reqd": True,
                      "example": "pikachu",
                    },
                    {
                      "name": "tcg",
                      "orig": "tcg",
                      "type": "`$STRING`",
                      "kind": "query",
                      "example": "one-piece",
                      "field": True,
                    },
                  ],
                },
                "select": {
                  "exist": [
                    "q",
                  ],
                },
                "response": {
                  "kind": "json",
                  "media": "application/json",
                },
              },
            ],
          },
        },
        "relations": {
          "ancestors": [],
        },
      },
    },
    }
