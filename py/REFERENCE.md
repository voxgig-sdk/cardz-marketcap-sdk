# CardzMarketcap Python SDK Reference

Complete API reference for the CardzMarketcap Python SDK.


## CardzMarketcapSDK

### Constructor

```python
from cardzmarketcap_sdk import CardzMarketcapSDK

client = CardzMarketcapSDK(options)
```

Create a new SDK client instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `options` | `dict` | SDK configuration options. |
| `options["base"]` | `str` | Base URL for API requests. |
| `options["prefix"]` | `str` | URL prefix appended after base. |
| `options["suffix"]` | `str` | URL suffix appended after path. |
| `options["headers"]` | `dict` | Custom headers for all requests. |
| `options["feature"]` | `dict` | Feature configuration. |
| `options["system"]` | `dict` | System overrides (e.g. custom fetch). |


### Static Methods

#### `CardzMarketcapSDK.test(testopts=None, sdkopts=None)`

Create a test client with mock features active. Both arguments may be `None`.

```python
client = CardzMarketcapSDK.test()
```


### Instance Methods

#### `Card(data=None)`

Create a new `CardEntity` instance. Pass `None` for no initial data.

#### `Market(data=None)`

Create a new `MarketEntity` instance. Pass `None` for no initial data.

#### `Resolution(data=None)`

Create a new `ResolutionEntity` instance. Pass `None` for no initial data.

#### `Search(data=None)`

Create a new `SearchEntity` instance. Pass `None` for no initial data.

#### `options_map() -> dict`

Return a deep copy of the current SDK options.

#### `get_utility() -> Utility`

Return a copy of the SDK utility object.

#### `direct(fetchargs=None) -> dict`

Make a direct HTTP request to any API endpoint. Returns a result `dict` with `ok`, `status`, `headers`, and `data` (or `err` on failure). This escape hatch never raises — branch on `result["ok"]`.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `fetchargs["path"]` | `str` | URL path with optional `{param}` placeholders. |
| `fetchargs["method"]` | `str` | HTTP method (default: `"GET"`). |
| `fetchargs["params"]` | `dict` | Path parameter values. |
| `fetchargs["query"]` | `dict` | Query string parameters. |
| `fetchargs["headers"]` | `dict` | Request headers (merged with defaults). |
| `fetchargs["body"]` | `any` | Request body (dicts are JSON-serialized). |

**Returns:** `result_dict`

#### `prepare(fetchargs=None) -> dict`

Prepare a fetch definition without sending. Returns the `fetchdef` and raises on error.


---

## CardEntity

```python
card = client.Card()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `cardLanguage` | `str` | Yes | Printing language: en, ja, ko, zhCN or zhTW. |
| `collectorNumber` | `str` | Yes |  |
| `historyDaily` | `list` | Yes | Daily history. |
| `historyReference` | `list` | Yes | Longer reference history. |
| `id` | `str` | Yes | Stable public card id (also the /card/{id} page segment). |
| `image` | `dict` | Yes |  |
| `marketCap` | `dict` | Yes | A published figure with its status and date. |
| `marketRank` | `int` | Yes | Rank by market cap across the whole index. |
| `name` | `dict` | Yes | Text keyed by language code. |
| `officialName` | `str` | Yes | Canonical printing name. |
| `populationPsa10` | `dict` | Yes | A published figure with its status and date. |
| `previousMarketRank` | `int` | No | Market rank in the previous snapshot. |
| `pricePsa10` | `dict` | Yes | A published figure with its status and date. |
| `priceUngradedReference` | `Any` | No | Card detail only: ungraded reference price. |
| `printingIdentity` | `dict` | Yes |  |
| `rank` | `int` | Yes | Position in this response's ordering. |
| `salesSparkline` | `list` | Yes | Recent daily tracked-sales values for a sparkline. |
| `setName` | `dict` | Yes | Text keyed by language code. |
| `story` | `dict` | Yes | Card detail only: editorial story text keyed by language code. |
| `tcg` | `str` | Yes | "Pokémon" or "One Piece". |
| `viewRank` | `int` | Yes | Rank inside the requested scope. |
| `windows` | `dict` | Yes | Change figures keyed by window: 1d, 7d, 30d, 90d, 180d, 365d. |

### Operations

#### `load(reqmatch, ctrl=None) -> CardEntity`

Load a single entity matching the given criteria. Returns the entity, whose record `data_get()` reads, and raises on error.

```python
result = client.Card().load({"id": "card_id"})
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `CardEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## MarketEntity

```python
market = client.Market()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `cardLanguage` | `str` | Yes | Printing language: en, ja, ko, zhCN or zhTW. |
| `collectorNumber` | `str` | Yes |  |
| `historyDaily` | `list` | Yes | Daily history. |
| `historyReference` | `list` | Yes | Longer reference history. |
| `id` | `str` | Yes | Stable public card id (also the /card/{id} page segment). |
| `image` | `dict` | Yes |  |
| `marketCap` | `dict` | Yes | A published figure with its status and date. |
| `marketRank` | `int` | Yes | Rank by market cap across the whole index. |
| `name` | `dict` | Yes | Text keyed by language code. |
| `officialName` | `str` | Yes | Canonical printing name. |
| `populationPsa10` | `dict` | Yes | A published figure with its status and date. |
| `previousMarketRank` | `int` | No | Market rank in the previous snapshot. |
| `pricePsa10` | `dict` | Yes | A published figure with its status and date. |
| `priceUngradedReference` | `Any` | No | Card detail only: ungraded reference price. |
| `printingIdentity` | `dict` | Yes |  |
| `rank` | `int` | Yes | Position in this response's ordering. |
| `salesSparkline` | `list` | Yes | Recent daily tracked-sales values for a sparkline. |
| `setName` | `dict` | Yes | Text keyed by language code. |
| `story` | `dict` | Yes | Card detail only: editorial story text keyed by language code. |
| `tcg` | `str` | Yes | "Pokémon" or "One Piece". |
| `viewRank` | `int` | Yes | Rank inside the requested scope. |
| `windows` | `dict` | Yes | Change figures keyed by window: 1d, 7d, 30d, 90d, 180d, 365d. |

### Operations

#### `list(reqmatch=None, ctrl=None) -> list[MarketEntity]`

List entities matching the given criteria. The match is optional — call `list()` with no argument to list all records. Returns a list of entities, one per record, and raises on error.

```python
results = client.Market().list()
for market in results:
    print(market.data_get())
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `MarketEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## ResolutionEntity

```python
resolution = client.Resolution()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `aliases` | `list` | No | Known nicknames (present on some cards). |
| `cardLanguage` | `str` | Yes |  |
| `collectorNumber` | `str` | Yes |  |
| `href` | `str` | Yes | Site-relative page path. |
| `id` | `str` | Yes | Card id (cmc_...) or box id. |
| `image` | `dict` | Yes |  |
| `kind` | `str` | Yes | "card" or "box". |
| `marketCap` | `dict` | Yes | A published figure with its status and date. |
| `marketRank` | `int` | Yes |  |
| `match` | `str` | Yes | How the query matched, e.g. |
| `name` | `dict` | Yes | Text keyed by language code. |
| `officialName` | `str` | Yes |  |
| `populationPsa10` | `dict` | Yes | A published figure with its status and date. |
| `pricePsa10` | `dict` | Yes | A published figure with its status and date. |
| `setCode` | `str` | Yes |  |
| `setName` | `dict` | Yes | Text keyed by language code. |
| `tcg` | `str` | Yes |  |
| `url` | `str` | Yes | Absolute page URL. |

### Operations

#### `list(reqmatch=None, ctrl=None) -> list[ResolutionEntity]`

List entities matching the given criteria. The match is optional — call `list()` with no argument to list all records. Returns a list of entities, one per record, and raises on error.

```python
results = client.Resolution().list({"q": "example"})
for resolution in results:
    print(resolution.data_get())
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `ResolutionEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## SearchEntity

```python
search = client.Search()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `aliases` | `list` | No | Known nicknames (present on some cards). |
| `cardLanguage` | `str` | Yes |  |
| `collectorNumber` | `str` | Yes |  |
| `href` | `str` | Yes | Site-relative page path. |
| `id` | `str` | Yes | Card id (cmc_...) or box id. |
| `image` | `dict` | Yes |  |
| `kind` | `str` | Yes | "card" or "box". |
| `marketCap` | `dict` | Yes | A published figure with its status and date. |
| `marketRank` | `int` | Yes |  |
| `match` | `str` | Yes | How the query matched, e.g. |
| `name` | `dict` | Yes | Text keyed by language code. |
| `officialName` | `str` | Yes |  |
| `populationPsa10` | `dict` | Yes | A published figure with its status and date. |
| `pricePsa10` | `dict` | Yes | A published figure with its status and date. |
| `setCode` | `str` | Yes |  |
| `setName` | `dict` | Yes | Text keyed by language code. |
| `tcg` | `str` | Yes |  |
| `url` | `str` | Yes | Absolute page URL. |

### Operations

#### `list(reqmatch=None, ctrl=None) -> list[SearchEntity]`

List entities matching the given criteria. The match is optional — call `list()` with no argument to list all records. Returns a list of entities, one per record, and raises on error.

```python
results = client.Search().list({"q": "example"})
for search in results:
    print(search.data_get())
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `SearchEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## Features

| Feature | Version | Description |
| --- | --- | --- |
| `ratelimit` | 0.0.1 | Rate limiting |
| `retry` | 0.0.1 | Retry |
| `test` | 0.0.1 | Test transport |
| `timeout` | 0.0.1 | Timeout |


Features are activated via the `feature` option:

```python
client = CardzMarketcapSDK({
    "feature": {
        "ratelimit": {"active": True},
        "retry": {"active": True},
        "test": {"active": True},
        "timeout": {"active": True},
    },
})
```


### Configuring features

Each feature is inactive until switched on, and an SDK with no feature
configured does no feature work at all. Every option below keeps its default
unless you name it.

The array form of \`feature\` is significant: several features wrap the
transport, and the order you list them in is the order they nest.

#### Ordering

`ratelimit`, `retry`, `timeout` wrap the transport. Each
wraps whatever is already installed, so **activation order is nesting order**:
a feature activated later sits OUTSIDE one activated earlier, and sees the call
first.

That decides behaviour, not just sequence: a feature that short-circuits the
call, such as a cache serving a hit, stops every feature nested inside it from
ever seeing that call.

`test` attach to pipeline hooks
rather than the transport, so their order does not affect what they observe.

#### `ratelimit`

Rate limiting.

**Configuration**

| Option | Default |
|---|---|
| `active` | `false` |
| `burst` | `5` |
| `rate` | `5` |

| Option | Type |
|---|---|
| `now` | function |
| `sleep` | function |

These take no default: the feature behaves one way when you supply them and
another when you do not.

**Usage**

Set `feature.ratelimit.active` to true in the client options, and override any option above in the same entry. Every option keeps
its default unless you name it.

**Considerations**

- Wraps the transport: its place in the activation order decides what it
  sees. See [Ordering](#ordering) above.
- Inactive by default: leaving it out costs nothing at runtime.

#### `retry`

Retry.

**Configuration**

| Option | Default |
|---|---|
| `active` | `false` |
| `factor` | `2` |
| `maxDelay` | `2000` |
| `minDelay` | `50` |
| `retries` | `2` |
| `statuses` | `[408, 425, 429, 500, 502, 503, 504]` |

| Option | Type |
|---|---|
| `jitter` | boolean |
| `sleep` | function |

These take no default: the feature behaves one way when you supply them and
another when you do not.

**Usage**

Set `feature.retry.active` to true in the client options, and override any option above in the same entry. Every option keeps
its default unless you name it.

**Considerations**

- Wraps the transport: its place in the activation order decides what it
  sees. See [Ordering](#ordering) above.
- Inactive by default: leaving it out costs nothing at runtime.

#### `test`

Test transport.

**Configuration**

| Option | Default |
|---|---|
| `active` | `false` |

| Option | Type |
|---|---|
| `entity` | map |
| `net` | map |

These take no default: the feature behaves one way when you supply them and
another when you do not.

**Usage**

Set `feature.test.active` to true in the client options, and override any option above in the same entry. Every option keeps
its default unless you name it.

**Considerations**

- Attaches to pipeline hooks, not the transport, so activation order does
  not change what it observes.
- Installs the BASE transport that the wrapping features wrap, so it must be
  activated before them.
- Inactive by default: leaving it out costs nothing at runtime.

#### `timeout`

Timeout.

**Configuration**

| Option | Default |
|---|---|
| `active` | `false` |
| `ms` | `30000` |

| Option | Type |
|---|---|
| `clearTimer` | function |
| `now` | function |
| `setTimer` | function |

These take no default: the feature behaves one way when you supply them and
another when you do not.

**Usage**

Set `feature.timeout.active` to true in the client options, and override any option above in the same entry. Every option keeps
its default unless you name it.

**Considerations**

- Wraps the transport: its place in the activation order decides what it
  sees. See [Ordering](#ordering) above.
- Inactive by default: leaving it out costs nothing at runtime.

