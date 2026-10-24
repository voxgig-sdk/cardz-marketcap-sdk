# CardzMarketcap Ruby SDK Reference

Complete API reference for the CardzMarketcap Ruby SDK.


## CardzMarketcapSDK

### Constructor

```ruby
require_relative 'CardzMarketcap_sdk'

client = CardzMarketcapSDK.new(options)
```

Create a new SDK client instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `options` | `Hash` | SDK configuration options. |
| `options["base"]` | `String` | Base URL for API requests. |
| `options["prefix"]` | `String` | URL prefix appended after base. |
| `options["suffix"]` | `String` | URL suffix appended after path. |
| `options["headers"]` | `Hash` | Custom headers for all requests. |
| `options["feature"]` | `Hash` | Feature configuration. |
| `options["system"]` | `Hash` | System overrides (e.g. custom fetch). |


### Static Methods

#### `CardzMarketcapSDK.test(testopts = nil, sdkopts = nil)`

Create a test client with mock features active. Both arguments may be `nil`.

```ruby
client = CardzMarketcapSDK.test
```


### Instance Methods

#### `Card(data = nil)`

Create a new `Card` entity instance. Pass `nil` for no initial data.

#### `Market(data = nil)`

Create a new `Market` entity instance. Pass `nil` for no initial data.

#### `Resolution(data = nil)`

Create a new `Resolution` entity instance. Pass `nil` for no initial data.

#### `Search(data = nil)`

Create a new `Search` entity instance. Pass `nil` for no initial data.

#### `options_map -> Hash`

Return a deep copy of the current SDK options.

#### `get_utility -> Utility`

Return a copy of the SDK utility object.

#### `direct(fetchargs = {}) -> Hash`

Make a direct HTTP request to any API endpoint. Returns a result hash
(`{ "ok" => ..., "status" => ..., "data" => ..., "err" => ... }`); it
does not raise — inspect `result["ok"]`.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `fetchargs["path"]` | `String` | URL path with optional `{param}` placeholders. |
| `fetchargs["method"]` | `String` | HTTP method (default: `"GET"`). |
| `fetchargs["params"]` | `Hash` | Path parameter values for `{param}` substitution. |
| `fetchargs["query"]` | `Hash` | Query string parameters. |
| `fetchargs["headers"]` | `Hash` | Request headers (merged with defaults). |
| `fetchargs["body"]` | `any` | Request body (hashes are JSON-serialized). |
| `fetchargs["ctrl"]` | `Hash` | Control options (e.g. `{ "explain" => true }`). |

**Returns:** `Hash`

#### `prepare(fetchargs = {}) -> Hash`

Prepare a fetch definition without sending the request. Accepts the
same parameters as `direct()`. Raises on error.

**Returns:** `Hash` (the fetch definition; raises on error)


---

## CardEntity

```ruby
card = client.Card
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `cardLanguage` | `String` | Yes | Printing language: en, ja, ko, zhCN or zhTW. |
| `collectorNumber` | `String` | Yes |  |
| `historyDaily` | `Array` | Yes | Daily history. |
| `historyReference` | `Array` | Yes | Longer reference history. |
| `id` | `String` | Yes | Stable public card id (also the /card/{id} page segment). |
| `image` | `Hash` | Yes |  |
| `marketCap` | `Hash` | Yes | A published figure with its status and date. |
| `marketRank` | `Integer` | Yes | Rank by market cap across the whole index. |
| `name` | `Hash` | Yes | Text keyed by language code. |
| `officialName` | `String` | Yes | Canonical printing name. |
| `populationPsa10` | `Hash` | Yes | A published figure with its status and date. |
| `previousMarketRank` | `Integer` | No | Market rank in the previous snapshot. |
| `pricePsa10` | `Hash` | Yes | A published figure with its status and date. |
| `priceUngradedReference` | `Object` | No | Card detail only: ungraded reference price. |
| `printingIdentity` | `Hash` | Yes |  |
| `rank` | `Integer` | Yes | Position in this response's ordering. |
| `salesSparkline` | `Array` | Yes | Recent daily tracked-sales values for a sparkline. |
| `setName` | `Hash` | Yes | Text keyed by language code. |
| `story` | `Hash` | Yes | Card detail only: editorial story text keyed by language code. |
| `tcg` | `String` | Yes | "Pokémon" or "One Piece". |
| `viewRank` | `Integer` | Yes | Rank inside the requested scope. |
| `windows` | `Hash` | Yes | Change figures keyed by window: 1d, 7d, 30d, 90d, 180d, 365d. |

### Operations

#### `load(reqmatch, ctrl = nil) -> result`

Load a single entity matching the given criteria. Returns the entity, whose record `data_get` reads, and raises on error.

```ruby
result = client.Card.load({ "id" => "card_id" })
```

### Common Methods

#### `data_get -> Hash`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get -> Hash`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make -> Entity`

Create a new `CardEntity` instance with the same client and
options.

#### `get_name -> String`

Return the entity name.


---

## MarketEntity

```ruby
market = client.Market
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `cardLanguage` | `String` | Yes | Printing language: en, ja, ko, zhCN or zhTW. |
| `collectorNumber` | `String` | Yes |  |
| `historyDaily` | `Array` | Yes | Daily history. |
| `historyReference` | `Array` | Yes | Longer reference history. |
| `id` | `String` | Yes | Stable public card id (also the /card/{id} page segment). |
| `image` | `Hash` | Yes |  |
| `marketCap` | `Hash` | Yes | A published figure with its status and date. |
| `marketRank` | `Integer` | Yes | Rank by market cap across the whole index. |
| `name` | `Hash` | Yes | Text keyed by language code. |
| `officialName` | `String` | Yes | Canonical printing name. |
| `populationPsa10` | `Hash` | Yes | A published figure with its status and date. |
| `previousMarketRank` | `Integer` | No | Market rank in the previous snapshot. |
| `pricePsa10` | `Hash` | Yes | A published figure with its status and date. |
| `priceUngradedReference` | `Object` | No | Card detail only: ungraded reference price. |
| `printingIdentity` | `Hash` | Yes |  |
| `rank` | `Integer` | Yes | Position in this response's ordering. |
| `salesSparkline` | `Array` | Yes | Recent daily tracked-sales values for a sparkline. |
| `setName` | `Hash` | Yes | Text keyed by language code. |
| `story` | `Hash` | Yes | Card detail only: editorial story text keyed by language code. |
| `tcg` | `String` | Yes | "Pokémon" or "One Piece". |
| `viewRank` | `Integer` | Yes | Rank inside the requested scope. |
| `windows` | `Hash` | Yes | Change figures keyed by window: 1d, 7d, 30d, 90d, 180d, 365d. |

### Operations

#### `list(reqmatch = nil, ctrl = nil) -> Array`

List entities matching the given criteria (call with no argument to list all). Returns an array of entities, one per record; `data_get` reads each record. Raises on error.

```ruby
results = client.Market.list
results.each { |item| puts item.data_get }
```

### Common Methods

#### `data_get -> Hash`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get -> Hash`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make -> Entity`

Create a new `MarketEntity` instance with the same client and
options.

#### `get_name -> String`

Return the entity name.


---

## ResolutionEntity

```ruby
resolution = client.Resolution
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `aliases` | `Array` | No | Known nicknames (present on some cards). |
| `cardLanguage` | `String` | Yes |  |
| `collectorNumber` | `String` | Yes |  |
| `href` | `String` | Yes | Site-relative page path. |
| `id` | `String` | Yes | Card id (cmc_...) or box id. |
| `image` | `Hash` | Yes |  |
| `kind` | `String` | Yes | "card" or "box". |
| `marketCap` | `Hash` | Yes | A published figure with its status and date. |
| `marketRank` | `Integer` | Yes |  |
| `match` | `String` | Yes | How the query matched, e.g. |
| `name` | `Hash` | Yes | Text keyed by language code. |
| `officialName` | `String` | Yes |  |
| `populationPsa10` | `Hash` | Yes | A published figure with its status and date. |
| `pricePsa10` | `Hash` | Yes | A published figure with its status and date. |
| `setCode` | `String` | Yes |  |
| `setName` | `Hash` | Yes | Text keyed by language code. |
| `tcg` | `String` | Yes |  |
| `url` | `String` | Yes | Absolute page URL. |

### Operations

#### `list(reqmatch = nil, ctrl = nil) -> Array`

List entities matching the given criteria (call with no argument to list all). Returns an array of entities, one per record; `data_get` reads each record. Raises on error.

```ruby
results = client.Resolution.list({ "q" => "example" })
results.each { |item| puts item.data_get }
```

### Common Methods

#### `data_get -> Hash`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get -> Hash`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make -> Entity`

Create a new `ResolutionEntity` instance with the same client and
options.

#### `get_name -> String`

Return the entity name.


---

## SearchEntity

```ruby
search = client.Search
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `aliases` | `Array` | No | Known nicknames (present on some cards). |
| `cardLanguage` | `String` | Yes |  |
| `collectorNumber` | `String` | Yes |  |
| `href` | `String` | Yes | Site-relative page path. |
| `id` | `String` | Yes | Card id (cmc_...) or box id. |
| `image` | `Hash` | Yes |  |
| `kind` | `String` | Yes | "card" or "box". |
| `marketCap` | `Hash` | Yes | A published figure with its status and date. |
| `marketRank` | `Integer` | Yes |  |
| `match` | `String` | Yes | How the query matched, e.g. |
| `name` | `Hash` | Yes | Text keyed by language code. |
| `officialName` | `String` | Yes |  |
| `populationPsa10` | `Hash` | Yes | A published figure with its status and date. |
| `pricePsa10` | `Hash` | Yes | A published figure with its status and date. |
| `setCode` | `String` | Yes |  |
| `setName` | `Hash` | Yes | Text keyed by language code. |
| `tcg` | `String` | Yes |  |
| `url` | `String` | Yes | Absolute page URL. |

### Operations

#### `list(reqmatch = nil, ctrl = nil) -> Array`

List entities matching the given criteria (call with no argument to list all). Returns an array of entities, one per record; `data_get` reads each record. Raises on error.

```ruby
results = client.Search.list({ "q" => "example" })
results.each { |item| puts item.data_get }
```

### Common Methods

#### `data_get -> Hash`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get -> Hash`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make -> Entity`

Create a new `SearchEntity` instance with the same client and
options.

#### `get_name -> String`

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

```ruby
client = CardzMarketcapSDK.new({
  "feature" => {
    "ratelimit" => { "active" => true },
    "retry" => { "active" => true },
    "test" => { "active" => true },
    "timeout" => { "active" => true },
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

