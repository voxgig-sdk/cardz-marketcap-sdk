# CardzMarketcap PHP SDK Reference

Complete API reference for the CardzMarketcap PHP SDK.


## CardzMarketcapSDK

### Constructor

```php
require_once __DIR__ . '/cardzmarketcap_sdk.php';

$client = new CardzMarketcapSDK($options);
```

Create a new SDK client instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `$options` | `array` | SDK configuration options. |
| `$options["base"]` | `string` | Base URL for API requests. |
| `$options["prefix"]` | `string` | URL prefix appended after base. |
| `$options["suffix"]` | `string` | URL suffix appended after path. |
| `$options["headers"]` | `array` | Custom headers for all requests. |
| `$options["feature"]` | `array` | Feature configuration. |
| `$options["system"]` | `array` | System overrides (e.g. custom fetch). |


### Static Methods

#### `CardzMarketcapSDK::test($testopts = null, $sdkopts = null)`

Create a test client with mock features active. Both arguments may be `null`.

```php
$client = CardzMarketcapSDK::test();
```


### Instance Methods

#### `Card($data = null)`

Create a new `CardEntity` instance. Pass `null` for no initial data.

#### `Market($data = null)`

Create a new `MarketEntity` instance. Pass `null` for no initial data.

#### `Resolution($data = null)`

Create a new `ResolutionEntity` instance. Pass `null` for no initial data.

#### `Search($data = null)`

Create a new `SearchEntity` instance. Pass `null` for no initial data.

#### `options_map(): array`

Return a deep copy of the current SDK options.

#### `get_utility(): CardzMarketcapUtility`

Return a copy of the SDK utility object.

#### `direct(array $fetchargs = []): array`

Make a direct HTTP request to any API endpoint. This is the raw-HTTP escape
hatch: it does **not** throw. It returns a result array
`["ok" => bool, "status" => int, "headers" => array, "data" => mixed]`, or
`["ok" => false, "err" => \Exception]` on failure. Branch on `$result["ok"]`.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `$fetchargs["path"]` | `string` | URL path with optional `{param}` placeholders. |
| `$fetchargs["method"]` | `string` | HTTP method (default: `"GET"`). |
| `$fetchargs["params"]` | `array` | Path parameter values for `{param}` substitution. |
| `$fetchargs["query"]` | `array` | Query string parameters. |
| `$fetchargs["headers"]` | `array` | Request headers (merged with defaults). |
| `$fetchargs["body"]` | `mixed` | Request body (arrays are JSON-serialized). |
| `$fetchargs["ctrl"]` | `array` | Control options. |

**Returns:** `array` — the result dict (see above); never throws.

#### `prepare(array $fetchargs = []): mixed`

Prepare a fetch definition without sending the request. Returns the
`$fetchdef` array. Throws on error.


---

## CardEntity

```php
$card = $client->Card();
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `cardLanguage` | `string` | Yes | Printing language: en, ja, ko, zhCN or zhTW. |
| `collectorNumber` | `string` | Yes |  |
| `historyDaily` | `array` | Yes | Daily history. |
| `historyReference` | `array` | Yes | Longer reference history. |
| `id` | `string` | Yes | Stable public card id (also the /card/{id} page segment). |
| `image` | `array` | Yes |  |
| `marketCap` | `array` | Yes | A published figure with its status and date. |
| `marketRank` | `int` | Yes | Rank by market cap across the whole index. |
| `name` | `array` | Yes | Text keyed by language code. |
| `officialName` | `string` | Yes | Canonical printing name. |
| `populationPsa10` | `array` | Yes | A published figure with its status and date. |
| `previousMarketRank` | `int` | No | Market rank in the previous snapshot. |
| `pricePsa10` | `array` | Yes | A published figure with its status and date. |
| `priceUngradedReference` | `mixed` | No | Card detail only: ungraded reference price. |
| `printingIdentity` | `array` | Yes |  |
| `rank` | `int` | Yes | Position in this response's ordering. |
| `salesSparkline` | `array` | Yes | Recent daily tracked-sales values for a sparkline. |
| `setName` | `array` | Yes | Text keyed by language code. |
| `story` | `array` | Yes | Card detail only: editorial story text keyed by language code. |
| `tcg` | `string` | Yes | "Pokémon" or "One Piece". |
| `viewRank` | `int` | Yes | Rank inside the requested scope. |
| `windows` | `array` | Yes | Change figures keyed by window: 1d, 7d, 30d, 90d, 180d, 365d. |

### Operations

#### `load(array $reqmatch, ?array $ctrl = null): mixed`

Load a single entity matching the given criteria. Returns the entity, whose record `data_get()` reads, and throws on error.

```php
$result = $client->Card()->load(["id" => "card_id"]);
```

### Common Methods

#### `data_get(): array`

Get the entity data. Returns a copy of the current data.

#### `data_set($data): void`

Set the entity data.

#### `match_get(): array`

Get the entity match criteria.

#### `match_set($match): void`

Set the entity match criteria.

#### `make(): CardEntity`

Create a new `CardEntity` instance with the same client and
options.

#### `get_name(): string`

Return the entity name.


---

## MarketEntity

```php
$market = $client->Market();
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `cardLanguage` | `string` | Yes | Printing language: en, ja, ko, zhCN or zhTW. |
| `collectorNumber` | `string` | Yes |  |
| `historyDaily` | `array` | Yes | Daily history. |
| `historyReference` | `array` | Yes | Longer reference history. |
| `id` | `string` | Yes | Stable public card id (also the /card/{id} page segment). |
| `image` | `array` | Yes |  |
| `marketCap` | `array` | Yes | A published figure with its status and date. |
| `marketRank` | `int` | Yes | Rank by market cap across the whole index. |
| `name` | `array` | Yes | Text keyed by language code. |
| `officialName` | `string` | Yes | Canonical printing name. |
| `populationPsa10` | `array` | Yes | A published figure with its status and date. |
| `previousMarketRank` | `int` | No | Market rank in the previous snapshot. |
| `pricePsa10` | `array` | Yes | A published figure with its status and date. |
| `priceUngradedReference` | `mixed` | No | Card detail only: ungraded reference price. |
| `printingIdentity` | `array` | Yes |  |
| `rank` | `int` | Yes | Position in this response's ordering. |
| `salesSparkline` | `array` | Yes | Recent daily tracked-sales values for a sparkline. |
| `setName` | `array` | Yes | Text keyed by language code. |
| `story` | `array` | Yes | Card detail only: editorial story text keyed by language code. |
| `tcg` | `string` | Yes | "Pokémon" or "One Piece". |
| `viewRank` | `int` | Yes | Rank inside the requested scope. |
| `windows` | `array` | Yes | Change figures keyed by window: 1d, 7d, 30d, 90d, 180d, 365d. |

### Operations

#### `list(?array $reqmatch = null, ?array $ctrl = null): mixed`

List entities matching the given criteria (call with no argument to list all). Returns an array of entities, one per record, and throws on error.

```php
$results = $client->Market()->list();
```

### Common Methods

#### `data_get(): array`

Get the entity data. Returns a copy of the current data.

#### `data_set($data): void`

Set the entity data.

#### `match_get(): array`

Get the entity match criteria.

#### `match_set($match): void`

Set the entity match criteria.

#### `make(): MarketEntity`

Create a new `MarketEntity` instance with the same client and
options.

#### `get_name(): string`

Return the entity name.


---

## ResolutionEntity

```php
$resolution = $client->Resolution();
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `aliases` | `array` | No | Known nicknames (present on some cards). |
| `cardLanguage` | `string` | Yes |  |
| `collectorNumber` | `string` | Yes |  |
| `href` | `string` | Yes | Site-relative page path. |
| `id` | `string` | Yes | Card id (cmc_...) or box id. |
| `image` | `array` | Yes |  |
| `kind` | `string` | Yes | "card" or "box". |
| `marketCap` | `array` | Yes | A published figure with its status and date. |
| `marketRank` | `int` | Yes |  |
| `match` | `string` | Yes | How the query matched, e.g. |
| `name` | `array` | Yes | Text keyed by language code. |
| `officialName` | `string` | Yes |  |
| `populationPsa10` | `array` | Yes | A published figure with its status and date. |
| `pricePsa10` | `array` | Yes | A published figure with its status and date. |
| `setCode` | `string` | Yes |  |
| `setName` | `array` | Yes | Text keyed by language code. |
| `tcg` | `string` | Yes |  |
| `url` | `string` | Yes | Absolute page URL. |

### Operations

#### `list(?array $reqmatch = null, ?array $ctrl = null): mixed`

List entities matching the given criteria (call with no argument to list all). Returns an array of entities, one per record, and throws on error.

```php
$results = $client->Resolution()->list(["q" => "example"]);
```

### Common Methods

#### `data_get(): array`

Get the entity data. Returns a copy of the current data.

#### `data_set($data): void`

Set the entity data.

#### `match_get(): array`

Get the entity match criteria.

#### `match_set($match): void`

Set the entity match criteria.

#### `make(): ResolutionEntity`

Create a new `ResolutionEntity` instance with the same client and
options.

#### `get_name(): string`

Return the entity name.


---

## SearchEntity

```php
$search = $client->Search();
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `aliases` | `array` | No | Known nicknames (present on some cards). |
| `cardLanguage` | `string` | Yes |  |
| `collectorNumber` | `string` | Yes |  |
| `href` | `string` | Yes | Site-relative page path. |
| `id` | `string` | Yes | Card id (cmc_...) or box id. |
| `image` | `array` | Yes |  |
| `kind` | `string` | Yes | "card" or "box". |
| `marketCap` | `array` | Yes | A published figure with its status and date. |
| `marketRank` | `int` | Yes |  |
| `match` | `string` | Yes | How the query matched, e.g. |
| `name` | `array` | Yes | Text keyed by language code. |
| `officialName` | `string` | Yes |  |
| `populationPsa10` | `array` | Yes | A published figure with its status and date. |
| `pricePsa10` | `array` | Yes | A published figure with its status and date. |
| `setCode` | `string` | Yes |  |
| `setName` | `array` | Yes | Text keyed by language code. |
| `tcg` | `string` | Yes |  |
| `url` | `string` | Yes | Absolute page URL. |

### Operations

#### `list(?array $reqmatch = null, ?array $ctrl = null): mixed`

List entities matching the given criteria (call with no argument to list all). Returns an array of entities, one per record, and throws on error.

```php
$results = $client->Search()->list(["q" => "example"]);
```

### Common Methods

#### `data_get(): array`

Get the entity data. Returns a copy of the current data.

#### `data_set($data): void`

Set the entity data.

#### `match_get(): array`

Get the entity match criteria.

#### `match_set($match): void`

Set the entity match criteria.

#### `make(): SearchEntity`

Create a new `SearchEntity` instance with the same client and
options.

#### `get_name(): string`

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

```php
$client = new CardzMarketcapSDK([
  "feature" => [
    "ratelimit" => ["active" => true],
    "retry" => ["active" => true],
    "test" => ["active" => true],
    "timeout" => ["active" => true],
  ],
]);
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

