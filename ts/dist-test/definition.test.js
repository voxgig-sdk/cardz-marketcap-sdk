"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const node_test_1 = require("node:test");
const __1 = require("..");
const definition_runner_1 = require("./definition-runner");
const utility_1 = require("./utility");
// Generated from the API definition, not from the model this SDK was built
// from: the route, the declared query parameters, the credential the security
// scheme names, and the definition's own response example.
const PLAN = [
    {
        "entity": "card",
        "accessor": "Card",
        "op": "load",
        "method": "GET",
        "path": "/cards/{id}",
        "args": [
            {
                "name": "id",
                "wire": "id",
                "value": "cmc_fc229f7ae1b256b2119fa79b"
            }
        ],
        "select": {},
        "headers": [],
        "cookies": [],
        "responseMedia": [
            "application/json"
        ],
        "query": [],
        "queryArgs": [],
        "auth": null,
        "status": 200,
        "sample": {
            "id": "x",
            "rank": 1,
            "marketRank": 1,
            "viewRank": 1,
            "previousMarketRank": 1,
            "tcg": "x",
            "cardLanguage": "x",
            "printingIdentity": {
                "setCode": "x",
                "finishCode": "x"
            },
            "collectorNumber": "x",
            "officialName": "x",
            "name": {
                "en": "x"
            },
            "setName": {
                "en": "x"
            },
            "story": {
                "en": "x"
            },
            "image": {
                "url": "x",
                "alt": "x",
                "kind": "x",
                "variants": {},
                "width": 1,
                "height": 1
            },
            "pricePsa10": {
                "value": 1,
                "status": "x",
                "asOf": "2026-01-01T00:00:00Z",
                "sourcePeriodAt": "2026-01-01T00:00:00Z",
                "saleAt": "2026-01-01T00:00:00Z",
                "checkedAt": "2026-01-01T00:00:00Z",
                "sourceSwitched": true
            },
            "priceUngradedReference": {
                "value": 1,
                "status": "x",
                "asOf": "2026-01-01T00:00:00Z",
                "sourcePeriodAt": "2026-01-01T00:00:00Z",
                "saleAt": "2026-01-01T00:00:00Z",
                "checkedAt": "2026-01-01T00:00:00Z",
                "sourceSwitched": true
            },
            "populationPsa10": {
                "value": 1,
                "status": "x",
                "asOf": "2026-01-01T00:00:00Z",
                "sourcePeriodAt": "2026-01-01T00:00:00Z",
                "saleAt": "2026-01-01T00:00:00Z",
                "checkedAt": "2026-01-01T00:00:00Z",
                "sourceSwitched": true
            },
            "marketCap": {
                "value": 1,
                "status": "x",
                "asOf": "2026-01-01T00:00:00Z",
                "sourcePeriodAt": "2026-01-01T00:00:00Z",
                "saleAt": "2026-01-01T00:00:00Z",
                "checkedAt": "2026-01-01T00:00:00Z",
                "sourceSwitched": true
            },
            "windows": {},
            "historyDaily": [
                {
                    "at": "2026-01-01T00:00:00Z",
                    "priceUsd": 1,
                    "priceStatus": "x",
                    "trackedSalesValueUsd": 1,
                    "trackedSalesCount": 1,
                    "salesCoverage": "x",
                    "salesVerifiedZero": true
                }
            ],
            "historyReference": [
                {
                    "at": "2026-01-01T00:00:00Z",
                    "priceUsd": 1,
                    "priceStatus": "x",
                    "trackedSalesValueUsd": 1,
                    "trackedSalesCount": 1,
                    "salesCoverage": "x",
                    "salesVerifiedZero": true
                }
            ],
            "salesSparkline": [
                1
            ]
        },
        "idField": "id"
    },
    {
        "entity": "market",
        "accessor": "Market",
        "op": "list",
        "method": "GET",
        "path": "/market",
        "args": [],
        "select": {
            "page": 1,
            "page_size": 5,
            "scope": "pokemon"
        },
        "headers": [],
        "cookies": [],
        "responseMedia": [
            "application/json"
        ],
        "query": [
            "scope",
            "page",
            "pageSize"
        ],
        "queryArgs": [
            {
                "name": "page",
                "wire": "page"
            },
            {
                "name": "page_size",
                "wire": "pageSize"
            },
            {
                "name": "scope",
                "wire": "scope"
            }
        ],
        "auth": null,
        "status": 200,
        "sample": {
            "generation": {
                "id": "x"
            },
            "generatedAt": "2026-01-01T00:00:00Z",
            "effectiveAt": "2026-01-01T00:00:00Z",
            "coverage": {
                "claim": "x",
                "requestedCount": 1,
                "verifiedCount": 1
            },
            "count": 1,
            "cards": [
                {
                    "id": "x",
                    "rank": 1,
                    "marketRank": 1,
                    "viewRank": 1,
                    "previousMarketRank": 1,
                    "tcg": "x",
                    "cardLanguage": "x",
                    "printingIdentity": {
                        "setCode": "x",
                        "finishCode": "x"
                    },
                    "collectorNumber": "x",
                    "officialName": "x",
                    "name": {
                        "en": "x"
                    },
                    "setName": {
                        "en": "x"
                    },
                    "story": {
                        "en": "x"
                    },
                    "image": {
                        "url": "x",
                        "alt": "x",
                        "kind": "x",
                        "variants": {},
                        "width": 1,
                        "height": 1
                    },
                    "pricePsa10": {
                        "value": 1,
                        "status": "x",
                        "asOf": "2026-01-01T00:00:00Z",
                        "sourcePeriodAt": "2026-01-01T00:00:00Z",
                        "saleAt": "2026-01-01T00:00:00Z",
                        "checkedAt": "2026-01-01T00:00:00Z",
                        "sourceSwitched": true
                    },
                    "priceUngradedReference": {
                        "value": 1,
                        "status": "x",
                        "asOf": "2026-01-01T00:00:00Z",
                        "sourcePeriodAt": "2026-01-01T00:00:00Z",
                        "saleAt": "2026-01-01T00:00:00Z",
                        "checkedAt": "2026-01-01T00:00:00Z",
                        "sourceSwitched": true
                    },
                    "populationPsa10": {
                        "value": 1,
                        "status": "x",
                        "asOf": "2026-01-01T00:00:00Z",
                        "sourcePeriodAt": "2026-01-01T00:00:00Z",
                        "saleAt": "2026-01-01T00:00:00Z",
                        "checkedAt": "2026-01-01T00:00:00Z",
                        "sourceSwitched": true
                    },
                    "marketCap": {
                        "value": 1,
                        "status": "x",
                        "asOf": "2026-01-01T00:00:00Z",
                        "sourcePeriodAt": "2026-01-01T00:00:00Z",
                        "saleAt": "2026-01-01T00:00:00Z",
                        "checkedAt": "2026-01-01T00:00:00Z",
                        "sourceSwitched": true
                    },
                    "windows": {},
                    "historyDaily": [
                        {
                            "at": "2026-01-01T00:00:00Z",
                            "priceUsd": 1,
                            "priceStatus": "x",
                            "trackedSalesValueUsd": 1,
                            "trackedSalesCount": 1,
                            "salesCoverage": "x",
                            "salesVerifiedZero": true
                        }
                    ],
                    "historyReference": [
                        {
                            "at": "2026-01-01T00:00:00Z",
                            "priceUsd": 1,
                            "priceStatus": "x",
                            "trackedSalesValueUsd": 1,
                            "trackedSalesCount": 1,
                            "salesCoverage": "x",
                            "salesVerifiedZero": true
                        }
                    ],
                    "salesSparkline": [
                        1
                    ]
                }
            ]
        },
        "idField": "id"
    },
    {
        "entity": "resolution",
        "accessor": "Resolution",
        "op": "list",
        "method": "GET",
        "path": "/resolve",
        "args": [],
        "select": {
            "q": "085/SVP",
            "lang": "en"
        },
        "headers": [],
        "cookies": [],
        "responseMedia": [
            "application/json"
        ],
        "query": [
            "q",
            "lang"
        ],
        "queryArgs": [
            {
                "name": "lang",
                "wire": "lang"
            },
            {
                "name": "q",
                "wire": "q"
            }
        ],
        "auth": null,
        "status": 200,
        "sample": {
            "generation": {
                "id": "x"
            },
            "generatedAt": "2026-01-01T00:00:00Z",
            "effectiveAt": "2026-01-01T00:00:00Z",
            "query": "x",
            "lang": "x",
            "kind": "x",
            "tcg": "x",
            "total": 1,
            "citation": "x",
            "ambiguous": true,
            "resolved": {
                "id": "x",
                "kind": "x",
                "match": "x",
                "url": "x",
                "href": "x",
                "officialName": "x",
                "name": {
                    "en": "x"
                },
                "collectorNumber": "x",
                "setName": {
                    "en": "x"
                },
                "setCode": "x",
                "tcg": "x",
                "cardLanguage": "x",
                "marketRank": 1,
                "image": {
                    "url": "x",
                    "alt": "x"
                },
                "aliases": [
                    "x"
                ],
                "pricePsa10": {
                    "value": 1,
                    "status": "x",
                    "asOf": "2026-01-01T00:00:00Z",
                    "sourcePeriodAt": "2026-01-01T00:00:00Z",
                    "saleAt": "2026-01-01T00:00:00Z",
                    "checkedAt": "2026-01-01T00:00:00Z",
                    "sourceSwitched": true
                },
                "populationPsa10": {
                    "value": 1,
                    "status": "x",
                    "asOf": "2026-01-01T00:00:00Z",
                    "sourcePeriodAt": "2026-01-01T00:00:00Z",
                    "saleAt": "2026-01-01T00:00:00Z",
                    "checkedAt": "2026-01-01T00:00:00Z",
                    "sourceSwitched": true
                },
                "marketCap": {
                    "value": 1,
                    "status": "x",
                    "asOf": "2026-01-01T00:00:00Z",
                    "sourcePeriodAt": "2026-01-01T00:00:00Z",
                    "saleAt": "2026-01-01T00:00:00Z",
                    "checkedAt": "2026-01-01T00:00:00Z",
                    "sourceSwitched": true
                }
            },
            "hits": [
                {
                    "id": "x",
                    "kind": "x",
                    "match": "x",
                    "url": "x",
                    "href": "x",
                    "officialName": "x",
                    "name": {
                        "en": "x"
                    },
                    "collectorNumber": "x",
                    "setName": {
                        "en": "x"
                    },
                    "setCode": "x",
                    "tcg": "x",
                    "cardLanguage": "x",
                    "marketRank": 1,
                    "image": {
                        "url": "x",
                        "alt": "x"
                    },
                    "aliases": [
                        "x"
                    ],
                    "pricePsa10": {
                        "value": 1,
                        "status": "x",
                        "asOf": "2026-01-01T00:00:00Z",
                        "sourcePeriodAt": "2026-01-01T00:00:00Z",
                        "saleAt": "2026-01-01T00:00:00Z",
                        "checkedAt": "2026-01-01T00:00:00Z",
                        "sourceSwitched": true
                    },
                    "populationPsa10": {
                        "value": 1,
                        "status": "x",
                        "asOf": "2026-01-01T00:00:00Z",
                        "sourcePeriodAt": "2026-01-01T00:00:00Z",
                        "saleAt": "2026-01-01T00:00:00Z",
                        "checkedAt": "2026-01-01T00:00:00Z",
                        "sourceSwitched": true
                    },
                    "marketCap": {
                        "value": 1,
                        "status": "x",
                        "asOf": "2026-01-01T00:00:00Z",
                        "sourcePeriodAt": "2026-01-01T00:00:00Z",
                        "saleAt": "2026-01-01T00:00:00Z",
                        "checkedAt": "2026-01-01T00:00:00Z",
                        "sourceSwitched": true
                    }
                }
            ]
        },
        "idField": "id"
    },
    {
        "entity": "search",
        "accessor": "Search",
        "op": "list",
        "method": "GET",
        "path": "/search",
        "args": [],
        "select": {
            "q": "pikachu",
            "kind": "v1",
            "lang": "en",
            "limit": 3,
            "tcg": "one-piece"
        },
        "headers": [],
        "cookies": [],
        "responseMedia": [
            "application/json"
        ],
        "query": [
            "q",
            "lang",
            "kind",
            "tcg",
            "limit"
        ],
        "queryArgs": [
            {
                "name": "kind",
                "wire": "kind"
            },
            {
                "name": "lang",
                "wire": "lang"
            },
            {
                "name": "limit",
                "wire": "limit"
            },
            {
                "name": "q",
                "wire": "q"
            },
            {
                "name": "tcg",
                "wire": "tcg"
            }
        ],
        "auth": null,
        "status": 200,
        "sample": {
            "generation": {
                "id": "x"
            },
            "generatedAt": "2026-01-01T00:00:00Z",
            "effectiveAt": "2026-01-01T00:00:00Z",
            "query": "x",
            "lang": "x",
            "kind": "x",
            "tcg": "x",
            "total": 1,
            "citation": "x",
            "count": 1,
            "hits": [
                {
                    "id": "x",
                    "kind": "x",
                    "match": "x",
                    "url": "x",
                    "href": "x",
                    "officialName": "x",
                    "name": {
                        "en": "x"
                    },
                    "collectorNumber": "x",
                    "setName": {
                        "en": "x"
                    },
                    "setCode": "x",
                    "tcg": "x",
                    "cardLanguage": "x",
                    "marketRank": 1,
                    "image": {
                        "url": "x",
                        "alt": "x"
                    },
                    "aliases": [
                        "x"
                    ],
                    "pricePsa10": {
                        "value": 1,
                        "status": "x",
                        "asOf": "2026-01-01T00:00:00Z",
                        "sourcePeriodAt": "2026-01-01T00:00:00Z",
                        "saleAt": "2026-01-01T00:00:00Z",
                        "checkedAt": "2026-01-01T00:00:00Z",
                        "sourceSwitched": true
                    },
                    "populationPsa10": {
                        "value": 1,
                        "status": "x",
                        "asOf": "2026-01-01T00:00:00Z",
                        "sourcePeriodAt": "2026-01-01T00:00:00Z",
                        "saleAt": "2026-01-01T00:00:00Z",
                        "checkedAt": "2026-01-01T00:00:00Z",
                        "sourceSwitched": true
                    },
                    "marketCap": {
                        "value": 1,
                        "status": "x",
                        "asOf": "2026-01-01T00:00:00Z",
                        "sourcePeriodAt": "2026-01-01T00:00:00Z",
                        "saleAt": "2026-01-01T00:00:00Z",
                        "checkedAt": "2026-01-01T00:00:00Z",
                        "sourceSwitched": true
                    }
                }
            ]
        },
        "idField": "id"
    }
];
(0, node_test_1.describe)('definition', () => {
    for (const point of PLAN) {
        (0, node_test_1.test)(point.entity + '.' + point.op + ' ' + point.method + ' ' + point.path, async (t) => {
            const control = (0, utility_1.isControlSkipped)('entityOp', point.entity + '.' + point.op, 'definition');
            if (control.skip) {
                t.skip(control.reason || 'skipped via sdk-test-control.json');
                return;
            }
            await (0, definition_runner_1.runDefinitionPoint)(__1.SDK, point);
        });
    }
});
//# sourceMappingURL=definition.test.js.map