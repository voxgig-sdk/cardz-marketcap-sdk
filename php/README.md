# CardzMarketcap PHP SDK



The PHP SDK for the CardzMarketcap API — an entity-oriented client using PHP conventions.

The SDK exposes the API as capitalised, semantic **Entities** — for example `$client->Card()` — with named operations (`list`/`load`) instead of raw URL paths and query strings. Working with resources and verbs keeps call sites self-describing and reduces cognitive load.

> Other languages, the CLI, and MCP server live alongside this one — see
> the [top-level README](../README.md).


## Install
This package is not yet published to Packagist. Install it from the
GitHub release tag (`php/vX.Y.Z`, see [Tags](https://github.com/voxgig-sdk/cardz-marketcap-sdk/tags)), or
from a clone as a Composer path repository:

```bash
git clone https://github.com/voxgig-sdk/cardz-marketcap-sdk
composer config repositories.cardz-marketcap-sdk path ./cardz-marketcap-sdk/php
composer require voxgig-sdk/cardz-marketcap-sdk:@dev
```


## Tutorial: your first API call

This tutorial walks through creating a client, listing entities, and
loading a specific record.

### 1. Create a client

```php
<?php
require_once 'cardzmarketcap_sdk.php';

$client = new CardzMarketcapSDK();
```

### 3. Load a card

```php
try {
    // load() returns the ENTITY — call data_get() for the Card record (throws on error).
    $card = $client->Card()->load(["id" => "example_id"]);
    print_r($card->data_get());
} catch (\Throwable $err) {
    echo "Error: " . $err->getMessage();
}
```


## Error handling

Entity operations throw a `\Throwable` on failure, so wrap them in
`try` / `catch`:

```php
try {
    $markets = $client->Market()->list();
} catch (\Throwable $err) {
    echo "Error: " . $err->getMessage();
}
```

`direct()` does **not** throw — it returns the result array. Branch on
`ok`; on failure `status` holds the HTTP status (for error responses) and
`err` holds a transport error, so read both defensively:

```php
$result = $client->direct([
    "path" => "/api/resource/{id}",
    "method" => "GET",
    "params" => ["id" => "example_id"],
]);

if (! $result["ok"]) {
    $err = $result["err"] ?? null;
    echo "request failed: " . ($err ? $err->getMessage() : "HTTP " . $result["status"]);
}
```


## How-to guides

### Make a direct HTTP request

For endpoints not covered by entity methods:

```php
// direct() is the raw-HTTP escape hatch: it returns a result array
// (it does not throw). Branch on $result["ok"].
$result = $client->direct([
    "path" => "/api/resource/{id}",
    "method" => "GET",
    "params" => ["id" => "example"],
]);

if ($result["ok"]) {
    echo $result["status"];  // 200
    print_r($result["data"]);  // response body
} else {
    // On an HTTP error status there is no err (only a transport failure sets
    // it), so fall back to the status code.
    $err = $result["err"] ?? null;
    echo "Error: " . ($err ? $err->getMessage() : "HTTP " . $result["status"]);
}
```

### Prepare a request without sending it

```php
// prepare() throws on error and returns the fetch definition.
$fetchdef = $client->prepare([
    "path" => "/api/resource/{id}",
    "method" => "DELETE",
    "params" => ["id" => "example"],
]);

echo $fetchdef["url"];
echo $fetchdef["method"];
print_r($fetchdef["headers"]);
```

### Use test mode

Create a mock client for unit testing — no server required. Seed fixture
data via the `entity` option so offline calls resolve without a live server:

```php
$client = CardzMarketcapSDK::test([
    "entity" => ["card" => ["test01" => ["id" => "test01"]]],
]);

// Entity ops return the ENTITY (throws on error);
// call data_get() for the mock record.
$card = $client->Card()->load(["id" => "test01"]);
print_r($card->data_get());
```

### Use a custom fetch function

Replace the HTTP transport with your own function:

```php
$mock_fetch = function ($url, $init) {
    return [
        [
            "status" => 200,
            "statusText" => "OK",
            "headers" => [],
            "json" => function () { return ["id" => "mock01"]; },
        ],
        null,
    ];
};

$client = new CardzMarketcapSDK([
    "base" => "http://localhost:8080",
    "system" => [
        "fetch" => $mock_fetch,
    ],
]);
```

### Run live tests

Create a `.env.local` file at the project root:

```
CARDZ_MARKETCAP_TEST_LIVE=TRUE
```

Then run:

```bash
cd php && ./vendor/bin/phpunit test/
```


## Reference

### CardzMarketcapSDK

```php
require_once 'cardzmarketcap_sdk.php';
$client = new CardzMarketcapSDK($options);
```

Creates a new SDK client.

| Option | Type | Description |
| --- | --- | --- |
| `base` | `string` | Base URL of the API server. |
| `prefix` | `string` | URL path prefix prepended to all requests. |
| `suffix` | `string` | URL path suffix appended to all requests. |
| `feature` | `array` | Feature activation flags. |
| `extend` | `array` | Additional Feature instances to load. |
| `system` | `array` | System overrides (e.g. custom `fetch` callable). |

### test

```php
$client = CardzMarketcapSDK::test($testopts, $sdkopts);
```

Creates a test-mode client with mock transport. Both arguments may be `null`.

### CardzMarketcapSDK methods

| Method | Signature | Description |
| --- | --- | --- |
| `options_map` | `(): array` | Deep copy of current SDK options. |
| `get_utility` | `(): Utility` | Copy of the SDK utility object. |
| `prepare` | `(array $fetchargs): array` | Build an HTTP request definition without sending. |
| `direct` | `(array $fetchargs): array` | Build and send an HTTP request. |
| `Card` | `($data): CardEntity` | Create a Card entity instance. |
| `Market` | `($data): MarketEntity` | Create a Market entity instance. |
| `Resolution` | `($data): ResolutionEntity` | Create a Resolution entity instance. |
| `Search` | `($data): SearchEntity` | Create a Search entity instance. |

### Entity interface

All entities share the same interface.

| Method | Signature | Description |
| --- | --- | --- |
| `load` | `($reqmatch, $ctrl): mixed` | Load a single entity by match criteria, and return it. |
| `list` | `(?array $reqmatch = null, $ctrl): mixed` | List entities matching the criteria (call with no argument to list all), one per record. |
| `data_get` | `(): array` | Get entity data. |
| `data_set` | `($data): void` | Set entity data. |
| `match_get` | `(): array` | Get entity match criteria. |
| `match_set` | `($match): void` | Set entity match criteria. |
| `make` | `(): Entity` | Create a new instance with the same options. |
| `get_name` | `(): string` | Return the entity name. |

### Result shape

Entity operations return the entity, and `list` an `array` of entities, one
per record; an entity's `data_get()` reads its record (an `array`). They
throw on error, so wrap calls in `try`/`catch` to handle failures.

The `direct()` escape hatch never throws — it returns a result `array`
you branch on via `$result["ok"]`:

| Key | Type | Description |
| --- | --- | --- |
| `ok` | `bool` | `true` if the HTTP status is 2xx. |
| `status` | `int` | HTTP status code. |
| `headers` | `array` | Response headers. |
| `data` | `mixed` | Parsed JSON response body. |

On error, `ok` is `false` and `$err` contains the error value.

### Entities

#### Card

| Field | Description |
| --- | --- |
| `cardLanguage` | Printing language: en, ja, ko, zhCN or zhTW. |
| `collectorNumber` |  |
| `historyDaily` | Daily history. |
| `historyReference` | Longer reference history. |
| `id` | Stable public card id (also the /card/{id} page segment). |
| `image` |  |
| `marketCap` | A published figure with its status and date. |
| `marketRank` | Rank by market cap across the whole index. |
| `name` | Text keyed by language code. |
| `officialName` | Canonical printing name. |
| `populationPsa10` | A published figure with its status and date. |
| `previousMarketRank` | Market rank in the previous snapshot. |
| `pricePsa10` | A published figure with its status and date. |
| `priceUngradedReference` | Card detail only: ungraded reference price. |
| `printingIdentity` |  |
| `rank` | Position in this response's ordering. |
| `salesSparkline` | Recent daily tracked-sales values for a sparkline. |
| `setName` | Text keyed by language code. |
| `story` | Card detail only: editorial story text keyed by language code. |
| `tcg` | "Pokémon" or "One Piece". |
| `viewRank` | Rank inside the requested scope. |
| `windows` | Change figures keyed by window: 1d, 7d, 30d, 90d, 180d, 365d. |

Operations: Load.

API path: `/cards/{id}`

#### Market

| Field | Description |
| --- | --- |
| `cardLanguage` | Printing language: en, ja, ko, zhCN or zhTW. |
| `collectorNumber` |  |
| `historyDaily` | Daily history. |
| `historyReference` | Longer reference history. |
| `id` | Stable public card id (also the /card/{id} page segment). |
| `image` |  |
| `marketCap` | A published figure with its status and date. |
| `marketRank` | Rank by market cap across the whole index. |
| `name` | Text keyed by language code. |
| `officialName` | Canonical printing name. |
| `populationPsa10` | A published figure with its status and date. |
| `previousMarketRank` | Market rank in the previous snapshot. |
| `pricePsa10` | A published figure with its status and date. |
| `priceUngradedReference` | Card detail only: ungraded reference price. |
| `printingIdentity` |  |
| `rank` | Position in this response's ordering. |
| `salesSparkline` | Recent daily tracked-sales values for a sparkline. |
| `setName` | Text keyed by language code. |
| `story` | Card detail only: editorial story text keyed by language code. |
| `tcg` | "Pokémon" or "One Piece". |
| `viewRank` | Rank inside the requested scope. |
| `windows` | Change figures keyed by window: 1d, 7d, 30d, 90d, 180d, 365d. |

Operations: List.

API path: `/market`

#### Resolution

| Field | Description |
| --- | --- |
| `aliases` | Known nicknames (present on some cards). |
| `cardLanguage` |  |
| `collectorNumber` |  |
| `href` | Site-relative page path. |
| `id` | Card id (cmc_...) or box id. |
| `image` |  |
| `kind` | "card" or "box". |
| `marketCap` | A published figure with its status and date. |
| `marketRank` |  |
| `match` | How the query matched, e.g. |
| `name` | Text keyed by language code. |
| `officialName` |  |
| `populationPsa10` | A published figure with its status and date. |
| `pricePsa10` | A published figure with its status and date. |
| `setCode` |  |
| `setName` | Text keyed by language code. |
| `tcg` |  |
| `url` | Absolute page URL. |

Operations: List.

API path: `/resolve`

#### Search

| Field | Description |
| --- | --- |
| `aliases` | Known nicknames (present on some cards). |
| `cardLanguage` |  |
| `collectorNumber` |  |
| `href` | Site-relative page path. |
| `id` | Card id (cmc_...) or box id. |
| `image` |  |
| `kind` | "card" or "box". |
| `marketCap` | A published figure with its status and date. |
| `marketRank` |  |
| `match` | How the query matched, e.g. |
| `name` | Text keyed by language code. |
| `officialName` |  |
| `populationPsa10` | A published figure with its status and date. |
| `pricePsa10` | A published figure with its status and date. |
| `setCode` |  |
| `setName` | Text keyed by language code. |
| `tcg` |  |
| `url` | Absolute page URL. |

Operations: List.

API path: `/search`



## Entities


### Card

Create an instance: `$card = $client->Card();`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `cardLanguage` | `string` | Printing language: en, ja, ko, zhCN or zhTW. |
| `collectorNumber` | `string` |  |
| `historyDaily` | `array` | Daily history. |
| `historyReference` | `array` | Longer reference history. |
| `id` | `string` | Stable public card id (also the /card/{id} page segment). |
| `image` | `array` |  |
| `marketCap` | `array` | A published figure with its status and date. |
| `marketRank` | `int` | Rank by market cap across the whole index. |
| `name` | `array` | Text keyed by language code. |
| `officialName` | `string` | Canonical printing name. |
| `populationPsa10` | `array` | A published figure with its status and date. |
| `previousMarketRank` | `int` | Market rank in the previous snapshot. |
| `pricePsa10` | `array` | A published figure with its status and date. |
| `priceUngradedReference` | `mixed` | Card detail only: ungraded reference price. |
| `printingIdentity` | `array` |  |
| `rank` | `int` | Position in this response's ordering. |
| `salesSparkline` | `array` | Recent daily tracked-sales values for a sparkline. |
| `setName` | `array` | Text keyed by language code. |
| `story` | `array` | Card detail only: editorial story text keyed by language code. |
| `tcg` | `string` | "Pokémon" or "One Piece". |
| `viewRank` | `int` | Rank inside the requested scope. |
| `windows` | `array` | Change figures keyed by window: 1d, 7d, 30d, 90d, 180d, 365d. |

#### Example: Load

```php
// load() returns the ENTITY — call data_get() for the Card record (throws on error).
$card = $client->Card()->load(["id" => "card_id"]);
```


### Market

Create an instance: `$market = $client->Market();`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `cardLanguage` | `string` | Printing language: en, ja, ko, zhCN or zhTW. |
| `collectorNumber` | `string` |  |
| `historyDaily` | `array` | Daily history. |
| `historyReference` | `array` | Longer reference history. |
| `id` | `string` | Stable public card id (also the /card/{id} page segment). |
| `image` | `array` |  |
| `marketCap` | `array` | A published figure with its status and date. |
| `marketRank` | `int` | Rank by market cap across the whole index. |
| `name` | `array` | Text keyed by language code. |
| `officialName` | `string` | Canonical printing name. |
| `populationPsa10` | `array` | A published figure with its status and date. |
| `previousMarketRank` | `int` | Market rank in the previous snapshot. |
| `pricePsa10` | `array` | A published figure with its status and date. |
| `priceUngradedReference` | `mixed` | Card detail only: ungraded reference price. |
| `printingIdentity` | `array` |  |
| `rank` | `int` | Position in this response's ordering. |
| `salesSparkline` | `array` | Recent daily tracked-sales values for a sparkline. |
| `setName` | `array` | Text keyed by language code. |
| `story` | `array` | Card detail only: editorial story text keyed by language code. |
| `tcg` | `string` | "Pokémon" or "One Piece". |
| `viewRank` | `int` | Rank inside the requested scope. |
| `windows` | `array` | Change figures keyed by window: 1d, 7d, 30d, 90d, 180d, 365d. |

#### Example: List

```php
// list() returns an array of Market entities, one per record (throws on error).
$markets = $client->Market()->list();
```


### Resolution

Create an instance: `$resolution = $client->Resolution();`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `aliases` | `array` | Known nicknames (present on some cards). |
| `cardLanguage` | `string` |  |
| `collectorNumber` | `string` |  |
| `href` | `string` | Site-relative page path. |
| `id` | `string` | Card id (cmc_...) or box id. |
| `image` | `array` |  |
| `kind` | `string` | "card" or "box". |
| `marketCap` | `array` | A published figure with its status and date. |
| `marketRank` | `int` |  |
| `match` | `string` | How the query matched, e.g. |
| `name` | `array` | Text keyed by language code. |
| `officialName` | `string` |  |
| `populationPsa10` | `array` | A published figure with its status and date. |
| `pricePsa10` | `array` | A published figure with its status and date. |
| `setCode` | `string` |  |
| `setName` | `array` | Text keyed by language code. |
| `tcg` | `string` |  |
| `url` | `string` | Absolute page URL. |

#### Example: List

```php
// list() returns an array of Resolution entities, one per record (throws on error).
$resolutions = $client->Resolution()->list(["q" => "example"]);
```


### Search

Create an instance: `$search = $client->Search();`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `aliases` | `array` | Known nicknames (present on some cards). |
| `cardLanguage` | `string` |  |
| `collectorNumber` | `string` |  |
| `href` | `string` | Site-relative page path. |
| `id` | `string` | Card id (cmc_...) or box id. |
| `image` | `array` |  |
| `kind` | `string` | "card" or "box". |
| `marketCap` | `array` | A published figure with its status and date. |
| `marketRank` | `int` |  |
| `match` | `string` | How the query matched, e.g. |
| `name` | `array` | Text keyed by language code. |
| `officialName` | `string` |  |
| `populationPsa10` | `array` | A published figure with its status and date. |
| `pricePsa10` | `array` | A published figure with its status and date. |
| `setCode` | `string` |  |
| `setName` | `array` | Text keyed by language code. |
| `tcg` | `string` |  |
| `url` | `string` | Absolute page URL. |

#### Example: List

```php
// list() returns an array of Search entities, one per record (throws on error).
$searchs = $client->Search()->list(["q" => "example"]);
```

## Features

This SDK ships 4 optional features. Each is **inactive until you
switch it on**, so an SDK you have not configured behaves exactly as if none of
them existed — no retries, no cache, no logging, no measurable overhead.

Activate a feature by name in the client options, alongside the options shown
above:

| Feature | What it does |
|---|---|
| [`ratelimit`](#ratelimit) | Rate limiting |
| [`retry`](#retry) | Retry |
| [`test`](#test) | Test transport |
| [`timeout`](#timeout) | Timeout |

> **Order matters for `ratelimit`, `retry`, `timeout`.** These wrap the
> transport, so each one wraps whatever is already installed: the order you
> activate them in IS the nesting order. Activating them as an ordered list
> rather than a map is what fixes that order.

### ratelimit

Rate limiting.

| Option | Default |
|---|---|
| `active` | `false` |
| `burst` | `5` |
| `rate` | `5` |

Set `feature.ratelimit.active` to enable it, then override any of the options above.

`ratelimit` wraps the transport, so its position among the other
transport features decides what it sees. A feature activated later wraps one
activated earlier.

### retry

Retry.

| Option | Default |
|---|---|
| `active` | `false` |
| `factor` | `2` |
| `maxDelay` | `2000` |
| `minDelay` | `50` |
| `retries` | `2` |
| `statuses` | `[408, 425, 429, 500, 502, 503, 504]` |

Set `feature.retry.active` to enable it, then override any of the options above.

`retry` wraps the transport, so its position among the other
transport features decides what it sees. A feature activated later wraps one
activated earlier.

### test

Test transport.

| Option | Default |
|---|---|
| `active` | `false` |

Set `feature.test.active` to enable it, then override any of the options above.

### timeout

Timeout.

| Option | Default |
|---|---|
| `active` | `false` |
| `ms` | `30000` |

Set `feature.timeout.active` to enable it, then override any of the options above.

`timeout` wraps the transport, so its position among the other
transport features decides what it sees. A feature activated later wraps one
activated earlier.


## Advanced

> The sections above cover everyday use. The material below explains the
> SDK's internals — useful when extending it with custom features, but not
> needed for normal use.

### The operation pipeline

Every entity operation follows a six-stage pipeline. Each stage fires a
feature hook before executing:

```
PrePoint → PreSpec → PreRequest → PreResponse → PreResult → PreDone
```

- **PrePoint**: Resolves which API endpoint to call based on the
  operation name and entity configuration.
- **PreSpec**: Builds the HTTP spec — URL, method, headers, body —
  from the resolved point and the caller's parameters.
- **PreRequest**: Sends the HTTP request. Features can intercept here
  to replace the transport (as TestFeature does with mocks).
- **PreResponse**: Parses the raw HTTP response.
- **PreResult**: Extracts the business data from the parsed response.
- **PreDone**: Final stage before returning to the caller. Entity
  state (match, data) is updated here.

If any stage errors, the pipeline short-circuits and the error surfaces
to the caller — see [Error handling](#error-handling) for how that looks
in this language.

### Features and hooks

Features are the extension mechanism. A feature is a PHP class
with hook methods named after pipeline stages (e.g. `PrePoint`,
`PreSpec`). Each method receives the context.

The SDK ships with built-in features:

- **RatelimitFeature**: Rate limiting
- **RetryFeature**: Retry
- **TestFeature**: Test transport
- **TimeoutFeature**: Timeout

Features are initialized in order. Hooks fire in the order features
were added, so later features can override earlier ones.

### Data as arrays

The PHP SDK uses plain PHP associative arrays throughout rather than typed
objects. This mirrors the dynamic nature of the API and keeps the
SDK flexible — no code generation is needed when the API schema
changes.

Use `Helpers::to_map()` to safely validate that a value is an array.

### Directory structure

```
php/
├── cardzmarketcap_sdk.php          -- Main SDK class
├── config.php                     -- Configuration
├── schema.php                     -- Generated option + entity specs
├── features.php                   -- Feature factory
├── core/                          -- Core types and context
├── entity/                        -- Entity implementations
├── feature/                       -- Built-in features (Base, Test, Log)
├── utility/                       -- Utility functions and struct library
└── test/                          -- Test suites
```

The main class (`cardzmarketcap_sdk.php`) exports the SDK class
and test helper. Import entity or utility modules directly only
when needed.

### Entity state

Entity instances are stateful. After a successful `list`, the entity
stores the returned data and match criteria internally.

```php
$market = $client->Market();
$market->list();

// $market->data_get() now returns the market data from the last list
// $market->match_get() returns the last match criteria
```

Call `make()` to create a fresh instance with the same configuration
but no stored state.

### Direct vs entity access

The entity interface handles URL construction, parameter placement,
and response parsing automatically. Use it for standard CRUD operations.

`direct()` gives full control over the HTTP request. Use it for
non-standard endpoints, bulk operations, or any path not modelled as
an entity. `prepare()` builds the request without sending it — useful
for debugging or custom transport.


## Full Reference

See [REFERENCE.md](REFERENCE.md) for complete API reference
documentation including all method signatures, entity field schemas,
and detailed usage examples.
