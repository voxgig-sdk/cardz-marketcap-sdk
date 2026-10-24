# CardzMarketcap Lua SDK Reference

Complete API reference for the CardzMarketcap Lua SDK.


## CardzMarketcapSDK

### Constructor

```lua
local sdk = require("cardz-marketcap_sdk")
local client = sdk.new(options)
```

Create a new SDK client instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `options` | `table` | SDK configuration options. |
| `options.base` | `string` | Base URL for API requests. |
| `options.prefix` | `string` | URL prefix appended after base. |
| `options.suffix` | `string` | URL suffix appended after path. |
| `options.headers` | `table` | Custom headers for all requests. |
| `options.feature` | `table` | Feature configuration. |
| `options.system` | `table` | System overrides (e.g. custom fetch). |


### Static Methods

#### `sdk.test(testopts?, sdkopts?)`

Create a test client with mock features active. Both arguments are optional.

```lua
local client = sdk.test()
```


### Instance Methods

#### `Card(data)`

Create a new `Card` entity instance. Pass `nil` for no initial data.

#### `Market(data)`

Create a new `Market` entity instance. Pass `nil` for no initial data.

#### `Resolution(data)`

Create a new `Resolution` entity instance. Pass `nil` for no initial data.

#### `Search(data)`

Create a new `Search` entity instance. Pass `nil` for no initial data.

#### `options_map() -> table`

Return a deep copy of the current SDK options.

#### `get_utility() -> Utility`

Return a copy of the SDK utility object.

#### `direct(fetchargs) -> table, err`

Make a direct HTTP request to any API endpoint.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `fetchargs.path` | `string` | URL path with optional `{param}` placeholders. |
| `fetchargs.method` | `string` | HTTP method (default: `"GET"`). |
| `fetchargs.params` | `table` | Path parameter values for `{param}` substitution. |
| `fetchargs.query` | `table` | Query string parameters. |
| `fetchargs.headers` | `table` | Request headers (merged with defaults). |
| `fetchargs.body` | `any` | Request body (tables are JSON-serialized). |
| `fetchargs.ctrl` | `table` | Control options (e.g. `{ explain = true }`). |

**Returns:** `table, err`

#### `prepare(fetchargs) -> table, err`

Prepare a fetch definition without sending the request. Accepts the
same parameters as `direct()`.

**Returns:** `table, err`


---

## CardEntity

```lua
local card = client:Card(nil)
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `cardLanguage` | `string` | Yes | Printing language: en, ja, ko, zhCN or zhTW. |
| `collectorNumber` | `string` | Yes |  |
| `historyDaily` | `table` | Yes | Daily history. |
| `historyReference` | `table` | Yes | Longer reference history. |
| `id` | `string` | Yes | Stable public card id (also the /card/{id} page segment). |
| `image` | `table` | Yes |  |
| `marketCap` | `table` | Yes | A published figure with its status and date. |
| `marketRank` | `number` | Yes | Rank by market cap across the whole index. |
| `name` | `table` | Yes | Text keyed by language code. |
| `officialName` | `string` | Yes | Canonical printing name. |
| `populationPsa10` | `table` | Yes | A published figure with its status and date. |
| `previousMarketRank` | `number` | No | Market rank in the previous snapshot. |
| `pricePsa10` | `table` | Yes | A published figure with its status and date. |
| `priceUngradedReference` | `any` | No | Card detail only: ungraded reference price. |
| `printingIdentity` | `table` | Yes |  |
| `rank` | `number` | Yes | Position in this response's ordering. |
| `salesSparkline` | `table` | Yes | Recent daily tracked-sales values for a sparkline. |
| `setName` | `table` | Yes | Text keyed by language code. |
| `story` | `table` | Yes | Card detail only: editorial story text keyed by language code. |
| `tcg` | `string` | Yes | "Pokémon" or "One Piece". |
| `viewRank` | `number` | Yes | Rank inside the requested scope. |
| `windows` | `table` | Yes | Change figures keyed by window: 1d, 7d, 30d, 90d, 180d, 365d. |

### Operations

#### `load(reqmatch, ctrl) -> any, err`

Load a single entity matching the given criteria. Returns the entity, whose record `data_get()` reads, or `nil` and an error on failure.

```lua
local result, err = client:Card():load({ id = "card_id" })
```

### Common Methods

#### `data_get() -> table`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> table`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `CardEntity` instance with the same client and
options.

#### `get_name() -> string`

Return the entity name.


---

## MarketEntity

```lua
local market = client:Market(nil)
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `cardLanguage` | `string` | Yes | Printing language: en, ja, ko, zhCN or zhTW. |
| `collectorNumber` | `string` | Yes |  |
| `historyDaily` | `table` | Yes | Daily history. |
| `historyReference` | `table` | Yes | Longer reference history. |
| `id` | `string` | Yes | Stable public card id (also the /card/{id} page segment). |
| `image` | `table` | Yes |  |
| `marketCap` | `table` | Yes | A published figure with its status and date. |
| `marketRank` | `number` | Yes | Rank by market cap across the whole index. |
| `name` | `table` | Yes | Text keyed by language code. |
| `officialName` | `string` | Yes | Canonical printing name. |
| `populationPsa10` | `table` | Yes | A published figure with its status and date. |
| `previousMarketRank` | `number` | No | Market rank in the previous snapshot. |
| `pricePsa10` | `table` | Yes | A published figure with its status and date. |
| `priceUngradedReference` | `any` | No | Card detail only: ungraded reference price. |
| `printingIdentity` | `table` | Yes |  |
| `rank` | `number` | Yes | Position in this response's ordering. |
| `salesSparkline` | `table` | Yes | Recent daily tracked-sales values for a sparkline. |
| `setName` | `table` | Yes | Text keyed by language code. |
| `story` | `table` | Yes | Card detail only: editorial story text keyed by language code. |
| `tcg` | `string` | Yes | "Pokémon" or "One Piece". |
| `viewRank` | `number` | Yes | Rank inside the requested scope. |
| `windows` | `table` | Yes | Change figures keyed by window: 1d, 7d, 30d, 90d, 180d, 365d. |

### Operations

#### `list(reqmatch, ctrl) -> any, err`

List entities matching the given criteria. Returns an array of entities, one per record, or `nil` and an error on failure.

```lua
local results, err = client:Market():list()
```

### Common Methods

#### `data_get() -> table`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> table`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `MarketEntity` instance with the same client and
options.

#### `get_name() -> string`

Return the entity name.


---

## ResolutionEntity

```lua
local resolution = client:Resolution(nil)
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `aliases` | `table` | No | Known nicknames (present on some cards). |
| `cardLanguage` | `string` | Yes |  |
| `collectorNumber` | `string` | Yes |  |
| `href` | `string` | Yes | Site-relative page path. |
| `id` | `string` | Yes | Card id (cmc_...) or box id. |
| `image` | `table` | Yes |  |
| `kind` | `string` | Yes | "card" or "box". |
| `marketCap` | `table` | Yes | A published figure with its status and date. |
| `marketRank` | `number` | Yes |  |
| `match` | `string` | Yes | How the query matched, e.g. |
| `name` | `table` | Yes | Text keyed by language code. |
| `officialName` | `string` | Yes |  |
| `populationPsa10` | `table` | Yes | A published figure with its status and date. |
| `pricePsa10` | `table` | Yes | A published figure with its status and date. |
| `setCode` | `string` | Yes |  |
| `setName` | `table` | Yes | Text keyed by language code. |
| `tcg` | `string` | Yes |  |
| `url` | `string` | Yes | Absolute page URL. |

### Operations

#### `list(reqmatch, ctrl) -> any, err`

List entities matching the given criteria. Returns an array of entities, one per record, or `nil` and an error on failure.

```lua
local results, err = client:Resolution():list({ q = "example" })
```

### Common Methods

#### `data_get() -> table`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> table`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `ResolutionEntity` instance with the same client and
options.

#### `get_name() -> string`

Return the entity name.


---

## SearchEntity

```lua
local search = client:Search(nil)
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `aliases` | `table` | No | Known nicknames (present on some cards). |
| `cardLanguage` | `string` | Yes |  |
| `collectorNumber` | `string` | Yes |  |
| `href` | `string` | Yes | Site-relative page path. |
| `id` | `string` | Yes | Card id (cmc_...) or box id. |
| `image` | `table` | Yes |  |
| `kind` | `string` | Yes | "card" or "box". |
| `marketCap` | `table` | Yes | A published figure with its status and date. |
| `marketRank` | `number` | Yes |  |
| `match` | `string` | Yes | How the query matched, e.g. |
| `name` | `table` | Yes | Text keyed by language code. |
| `officialName` | `string` | Yes |  |
| `populationPsa10` | `table` | Yes | A published figure with its status and date. |
| `pricePsa10` | `table` | Yes | A published figure with its status and date. |
| `setCode` | `string` | Yes |  |
| `setName` | `table` | Yes | Text keyed by language code. |
| `tcg` | `string` | Yes |  |
| `url` | `string` | Yes | Absolute page URL. |

### Operations

#### `list(reqmatch, ctrl) -> any, err`

List entities matching the given criteria. Returns an array of entities, one per record, or `nil` and an error on failure.

```lua
local results, err = client:Search():list({ q = "example" })
```

### Common Methods

#### `data_get() -> table`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> table`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `SearchEntity` instance with the same client and
options.

#### `get_name() -> string`

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

```lua
local client = sdk.new({
  feature = {
    ratelimit = { active = true },
    retry = { active = true },
    test = { active = true },
    timeout = { active = true },
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

