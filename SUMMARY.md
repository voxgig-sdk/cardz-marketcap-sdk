# CardZ Marketcap API

Public read-only JSON API of CardZ Marketcap, a PSA 10 market cap index of Pokémon and One Piece trading cards (market cap = verified PSA 10 population x PSA 10 reference price, all in USD), rebuilt once a day. No key; CORS open; responses edge-cached ~5 minutes. Fair use: cache responses and do not poll faster than the daily snapshot; excessive traffic may be rate limited. Licence: CC BY 4.0 with attribution to CardZ Marketcap, a link, and the effectiveAt date. Knowledge source: https://cardzmarketcap.com/data, the field dictionary in https://cardzmarketcap.com/llms-full.txt, and the JSON-LD on the data page (which names /search and /resolve), with every endpoint probed live on 2026-10-23. Observed but not documented: market cards also carry rank, previousMarketRank, printingIdentity, image, salesSparkline and per-window trackedSalesChangePct; historyDaily/historyReference are empty arrays in /market and filled in /cards/&#123;id&#125;, which also adds story and priceUngradedReference; search takes kind, tcg and limit filters. Unverified: the pageSize and limit maxima; whether /resolve honours kind/tcg; the full value sets of status, coverage and match.

## Start here

This guide introduces the API, the client libraries, and the companion tools in this repository. Start with the API capabilities, choose a client for your application, and use the linked reference when you need exact request and response details.

The selected API surface contains 4 entities and 4 HTTP routes. There are 6 SDK targets and 2 companion tools.

An entity groups related API operations. An operation can have several routes with different inputs or authentication requirements. The SDK exposes the entity and its operations using the conventions of the selected language.

## What the API provides

### Card

Results: The card.

SDK operations: `load`.

Key fields to recognise:

- `cardLanguage`: Printing language: en, ja, ko, zhCN or zhTW.
- `historyDaily`: Daily history. Empty in /market responses; filled by /cards/&#123;id&#125;.
- `historyReference`: Longer reference history. Empty in /market responses; filled by /cards/&#123;id&#125;.
- `id`: Stable public card id (also the /card/&#123;id&#125; page segment).
- `marketCap`: A published figure with its status and date.

### Market

Results: A page of ranked cards.

SDK operations: `list`.

Key fields to recognise:

- `cardLanguage`: Printing language: en, ja, ko, zhCN or zhTW.
- `historyDaily`: Daily history. Empty in /market responses; filled by /cards/&#123;id&#125;.
- `historyReference`: Longer reference history. Empty in /market responses; filled by /cards/&#123;id&#125;.
- `id`: Snapshot build id, for example &quot;`db3308_a8cad73265fdce2e`&quot;.
- `marketCap`: A published figure with its status and date.

### Resolution

Results: The resolution.

SDK operations: `list`.

Key fields to recognise:

- `aliases`: Known nicknames (present on some cards).
- `href`: Site-relative page path.
- `id`: Snapshot build id, for example &quot;`db3308_a8cad73265fdce2e`&quot;.
- `kind`: Kind filter applied: all, card or box.
- `marketCap`: A published figure with its status and date.

### Search

Results: Search hits.

SDK operations: `list`.

Key fields to recognise:

- `aliases`: Known nicknames (present on some cards).
- `href`: Site-relative page path.
- `id`: Snapshot build id, for example &quot;`db3308_a8cad73265fdce2e`&quot;.
- `kind`: Kind filter applied: all, card or box.
- `marketCap`: A published figure with its status and date.

### Route map

Use this map to locate a capability. Consult the entity reference before supplying request data; routes for the same operation can require different fields.

| Entity | SDK operation | HTTP route | Authentication |
| --- | --- | --- | --- |
| Card | `load` | `GET /cards/{id}` | See reference |
| Market | `list` | `GET /market` | See reference |
| Resolution | `list` | `GET /resolve` | See reference |
| Search | `list` | `GET /search` | See reference |

## Connect to the API

- Production server: `https://cardzmarketcap.com/api/v1`

Check authentication for the route you plan to call. A route that declares no authentication can be used without credentials; this does not change the requirements of other routes. Keep credentials in environment variables or a configured secret provider, and keep them out of source control and logs.

## Make a first request

1. Choose the API server and an operation that matches your task.
2. Check the operation’s required input and authentication. Use values valid for your account and environment.
3. Send one request and inspect the returned data before adding retries, concurrency, or a larger batch.

For an SDK call, install or build the chosen client, create a client instance with its documented configuration, and call the required entity operation. Language references describe the argument shape, asynchronous behaviour, and returned values.

## Choose an SDK

Choose the language already used by your application or service. The clients represent the same API model, while package setup, naming, and return types follow each language. Check the selected client’s reference and tests before integrating it into an existing application.

| Client | Repository directory | Distribution |
| --- | --- | --- |
| Golang | `go/` | Build from source |
| Lua | `lua/` | Build from source |
| PHP | `php/` | Build from source |
| Python | `py/` | Build from source |
| Ruby | `rb/` | Build from source |
| TypeScript | `ts/` | Build from source |

Build-from-source entries are not marked as published in the project model. Follow the build instructions in that target’s README, then consume the resulting package using your language’s local dependency mechanism. Published entries give the installation command recorded for that client.

## Companion tools

These targets provide another way to use the API. Their available commands or tools can cover a smaller set of operations than the client libraries.

### Go CLI

Use the command-line interface for shell-based tasks and scripts.

Repository directory: `go-cli/`. Not published. Build from the go-cli directory.


### Go MCP server

Use the MCP server to expose supported API operations to an MCP client.

Repository directory: `go-mcp/`. Not published. Build from the go-mcp directory.

- `cardz-marketcap_list`: List records for an entity. Supported entities: `market`, `resolution`, `search`.
- `cardz-marketcap_load`: Load one record for an entity. Supported entities: `card`.

## Operational features

Features supply behaviour around API calls, such as request handling, diagnostics, or local testing. Inclusion in this project does not mean a feature is enabled at runtime. Check the selected SDK’s supported features and configuration defaults, then enable the behaviour your application needs.

- `ratelimit`: Client-side rate limiting via a token bucket
- `retry`: Automatic retry of transient failures with exponential backoff
- `test`: In-memory mock transport for testing without a live server
- `timeout`: Per-request timeout with transport abort

Start with the default client configuration. Add request limits and diagnostics as needed, test error paths, and review retry behaviour before using operations that change data. A retry can repeat an operation unless the API provides a suitable guarantee.

## Continue with the documentation

- Follow the first-call guide for the setup sequence.
- Read the authentication guide before using protected routes.
- Use the API reference for request schemas, response formats, and status codes.
- Check the chosen SDK or companion tool reference for its configuration and supported operations.

