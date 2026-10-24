<?php
declare(strict_types=1);

// CardzMarketcap SDK configuration

class CardzMarketcapConfig
{
    /** @var array<string,mixed>|null */
    private static ?array $shared_config = null;

    /**
     * Return the process-wide config, built once on first use. The SDK reads
     * the config on every request and never writes to it, so one instance is
     * shared by every client rather than rebuilt per client.
     *
     * PHP arrays are copy-on-write, so callers that do mutate the result get
     * their own copy and cannot disturb the shared one.
     */
    public static function shared_config(): array
    {
        if (self::$shared_config === null) {
            self::$shared_config = self::make_config();
        }
        return self::$shared_config;
    }

    /**
     * Build a fresh, fully materialised config array. Every call rebuilds the
     * whole structure, so prefer shared_config unless you need a private copy.
     */
    public static function make_config(): array
    {
        return [
            "main" => [
                "name" => "CardzMarketcap",
                "slug" => "cardz-marketcap",
                "version" => "0.0.1",
                "target" => "php",
            ],
            "feature" => [
                "ratelimit" => [
          'options' => [
            'active' => false,
            'burst' => 5,
            'rate' => 5,
          ],
          'optspec' => [
            'now' => '`$FUNCTION`',
            'sleep' => '`$FUNCTION`',
          ],
          'strict' => false,
          'transport' => 'wrap',
        ],
                "retry" => [
          'options' => [
            'active' => false,
            'factor' => 2,
            'maxDelay' => 2000,
            'minDelay' => 50,
            'retries' => 2,
            'statuses' => [
              408,
              425,
              429,
              500,
              502,
              503,
              504,
            ],
          ],
          'optspec' => [
            'jitter' => '`$BOOLEAN`',
            'sleep' => '`$FUNCTION`',
          ],
          'strict' => false,
          'transport' => 'wrap',
        ],
                "test" => [
          'options' => [
            'active' => false,
          ],
          'optspec' => [
            'entity' => '`$MAP`',
            'net' => '`$MAP`',
          ],
          'strict' => false,
          'transport' => 'base',
        ],
                "timeout" => [
          'options' => [
            'active' => false,
            'ms' => 30000,
          ],
          'optspec' => [
            'clearTimer' => '`$FUNCTION`',
            'now' => '`$FUNCTION`',
            'setTimer' => '`$FUNCTION`',
          ],
          'strict' => false,
          'transport' => 'wrap',
        ],
            ],
            "options" => [
                "base" => "https://cardzmarketcap.com/api/v1",
                "headers" => [
          'content-type' => 'application/json',
        ],
                "entity" => [
                    "card" => [],
                    "market" => [],
                    "resolution" => [],
                    "search" => [],
                ],
            ],
            "entity" => [
        'card' => [
          'fields' => [
            [
              'name' => 'cardLanguage',
              'title' => 'Card Language',
              'type' => '`$STRING`',
              'req' => true,
              'short' => 'Printing language: en, ja, ko, zhCN or zhTW.',
            ],
            [
              'name' => 'collectorNumber',
              'title' => 'Collector Number',
              'type' => '`$STRING`',
              'req' => true,
            ],
            [
              'name' => 'historyDaily',
              'title' => 'History Daily',
              'type' => '`$ARRAY`',
              'req' => true,
              'short' => 'Daily history.',
            ],
            [
              'name' => 'historyReference',
              'title' => 'History Reference',
              'type' => '`$ARRAY`',
              'req' => true,
              'short' => 'Longer reference history.',
            ],
            [
              'name' => 'id',
              'title' => 'Id',
              'type' => '`$STRING`',
              'req' => true,
              'short' => 'Stable public card id (also the /card/{id} page segment).',
            ],
            [
              'name' => 'image',
              'title' => 'Image',
              'type' => '`$OBJECT`',
              'req' => true,
            ],
            [
              'name' => 'marketCap',
              'title' => 'Market Cap',
              'type' => '`$OBJECT`',
              'req' => true,
              'short' => 'A published figure with its status and date.',
            ],
            [
              'name' => 'marketRank',
              'title' => 'Market Rank',
              'type' => '`$INTEGER`',
              'req' => true,
              'short' => 'Rank by market cap across the whole index.',
            ],
            [
              'name' => 'name',
              'title' => 'Name',
              'type' => '`$OBJECT`',
              'req' => true,
              'short' => 'Text keyed by language code.',
            ],
            [
              'name' => 'officialName',
              'title' => 'Official Name',
              'type' => '`$STRING`',
              'req' => true,
              'short' => 'Canonical printing name.',
            ],
            [
              'name' => 'populationPsa10',
              'title' => 'Population Psa10',
              'type' => '`$OBJECT`',
              'req' => true,
              'short' => 'A published figure with its status and date.',
            ],
            [
              'name' => 'previousMarketRank',
              'title' => 'Previous Market Rank',
              'type' => '`$INTEGER`',
              'short' => 'Market rank in the previous snapshot.',
            ],
            [
              'name' => 'pricePsa10',
              'title' => 'Price Psa10',
              'type' => '`$OBJECT`',
              'req' => true,
              'short' => 'A published figure with its status and date.',
            ],
            [
              'name' => 'priceUngradedReference',
              'title' => 'Price Ungraded Reference',
              'type' => '`$ANY`',
              'short' => 'Card detail only: ungraded reference price.',
            ],
            [
              'name' => 'printingIdentity',
              'title' => 'Printing Identity',
              'type' => '`$OBJECT`',
              'req' => true,
            ],
            [
              'name' => 'rank',
              'title' => 'Rank',
              'type' => '`$INTEGER`',
              'req' => true,
              'short' => 'Position in this response\'s ordering.',
            ],
            [
              'name' => 'salesSparkline',
              'title' => 'Sales Sparkline',
              'type' => '`$ARRAY`',
              'req' => true,
              'short' => 'Recent daily tracked-sales values for a sparkline.',
            ],
            [
              'name' => 'setName',
              'title' => 'Set Name',
              'type' => '`$OBJECT`',
              'req' => true,
              'short' => 'Text keyed by language code.',
            ],
            [
              'name' => 'story',
              'title' => 'Story',
              'type' => '`$OBJECT`',
              'req' => true,
              'short' => 'Card detail only: editorial story text keyed by language code.',
            ],
            [
              'name' => 'tcg',
              'title' => 'Tcg',
              'type' => '`$STRING`',
              'req' => true,
              'short' => '"Pokémon" or "One Piece".',
            ],
            [
              'name' => 'viewRank',
              'title' => 'View Rank',
              'type' => '`$INTEGER`',
              'req' => true,
              'short' => 'Rank inside the requested scope.',
            ],
            [
              'name' => 'windows',
              'title' => 'Windows',
              'type' => '`$OBJECT`',
              'req' => true,
              'short' => 'Change figures keyed by window: 1d, 7d, 30d, 90d, 180d, 365d.',
            ],
          ],
          'id' => [
            'field' => 'id',
            'name' => 'id',
          ],
          'name' => 'card',
          'op' => [
            'load' => [
              'input' => 'data',
              'name' => 'load',
              'points' => [
                [
                  'kind' => 'http',
                  'method' => 'GET',
                  'orig' => '/cards/{id}',
                  'segments' => [
                    [
                      'lit' => 'cards',
                    ],
                    [
                      'var' => 'id',
                    ],
                  ],
                  'parts' => [
                    'cards',
                    '{id}',
                  ],
                  'rename' => [],
                  'transform' => [
                    'req' => '`reqdata`',
                    'res' => '`body`',
                  ],
                  'args' => [
                    'params' => [
                      [
                        'name' => 'id',
                        'orig' => 'id',
                        'type' => '`$STRING`',
                        'kind' => 'param',
                        'reqd' => true,
                        'example' => 'cmc_fc229f7ae1b256b2119fa79b',
                      ],
                    ],
                  ],
                  'select' => [
                    'exist' => [
                      'id',
                    ],
                  ],
                  'response' => [
                    'kind' => 'json',
                    'media' => 'application/json',
                  ],
                ],
              ],
            ],
          ],
          'relations' => [
            'ancestors' => [],
          ],
        ],
        'market' => [
          'fields' => [
            [
              'name' => 'cardLanguage',
              'title' => 'Card Language',
              'type' => '`$STRING`',
              'req' => true,
              'short' => 'Printing language: en, ja, ko, zhCN or zhTW.',
            ],
            [
              'name' => 'collectorNumber',
              'title' => 'Collector Number',
              'type' => '`$STRING`',
              'req' => true,
            ],
            [
              'name' => 'historyDaily',
              'title' => 'History Daily',
              'type' => '`$ARRAY`',
              'req' => true,
              'short' => 'Daily history.',
            ],
            [
              'name' => 'historyReference',
              'title' => 'History Reference',
              'type' => '`$ARRAY`',
              'req' => true,
              'short' => 'Longer reference history.',
            ],
            [
              'name' => 'id',
              'title' => 'Id',
              'type' => '`$STRING`',
              'req' => true,
              'short' => 'Stable public card id (also the /card/{id} page segment).',
            ],
            [
              'name' => 'image',
              'title' => 'Image',
              'type' => '`$OBJECT`',
              'req' => true,
            ],
            [
              'name' => 'marketCap',
              'title' => 'Market Cap',
              'type' => '`$OBJECT`',
              'req' => true,
              'short' => 'A published figure with its status and date.',
            ],
            [
              'name' => 'marketRank',
              'title' => 'Market Rank',
              'type' => '`$INTEGER`',
              'req' => true,
              'short' => 'Rank by market cap across the whole index.',
            ],
            [
              'name' => 'name',
              'title' => 'Name',
              'type' => '`$OBJECT`',
              'req' => true,
              'short' => 'Text keyed by language code.',
            ],
            [
              'name' => 'officialName',
              'title' => 'Official Name',
              'type' => '`$STRING`',
              'req' => true,
              'short' => 'Canonical printing name.',
            ],
            [
              'name' => 'populationPsa10',
              'title' => 'Population Psa10',
              'type' => '`$OBJECT`',
              'req' => true,
              'short' => 'A published figure with its status and date.',
            ],
            [
              'name' => 'previousMarketRank',
              'title' => 'Previous Market Rank',
              'type' => '`$INTEGER`',
              'short' => 'Market rank in the previous snapshot.',
            ],
            [
              'name' => 'pricePsa10',
              'title' => 'Price Psa10',
              'type' => '`$OBJECT`',
              'req' => true,
              'short' => 'A published figure with its status and date.',
            ],
            [
              'name' => 'priceUngradedReference',
              'title' => 'Price Ungraded Reference',
              'type' => '`$ANY`',
              'short' => 'Card detail only: ungraded reference price.',
            ],
            [
              'name' => 'printingIdentity',
              'title' => 'Printing Identity',
              'type' => '`$OBJECT`',
              'req' => true,
            ],
            [
              'name' => 'rank',
              'title' => 'Rank',
              'type' => '`$INTEGER`',
              'req' => true,
              'short' => 'Position in this response\'s ordering.',
            ],
            [
              'name' => 'salesSparkline',
              'title' => 'Sales Sparkline',
              'type' => '`$ARRAY`',
              'req' => true,
              'short' => 'Recent daily tracked-sales values for a sparkline.',
            ],
            [
              'name' => 'setName',
              'title' => 'Set Name',
              'type' => '`$OBJECT`',
              'req' => true,
              'short' => 'Text keyed by language code.',
            ],
            [
              'name' => 'story',
              'title' => 'Story',
              'type' => '`$OBJECT`',
              'req' => true,
              'short' => 'Card detail only: editorial story text keyed by language code.',
            ],
            [
              'name' => 'tcg',
              'title' => 'Tcg',
              'type' => '`$STRING`',
              'req' => true,
              'short' => '"Pokémon" or "One Piece".',
            ],
            [
              'name' => 'viewRank',
              'title' => 'View Rank',
              'type' => '`$INTEGER`',
              'req' => true,
              'short' => 'Rank inside the requested scope.',
            ],
            [
              'name' => 'windows',
              'title' => 'Windows',
              'type' => '`$OBJECT`',
              'req' => true,
              'short' => 'Change figures keyed by window: 1d, 7d, 30d, 90d, 180d, 365d.',
            ],
          ],
          'id' => [
            'field' => 'id',
            'name' => 'id',
          ],
          'name' => 'market',
          'op' => [
            'list' => [
              'input' => 'data',
              'name' => 'list',
              'points' => [
                [
                  'kind' => 'http',
                  'method' => 'GET',
                  'orig' => '/market',
                  'segments' => [
                    [
                      'lit' => 'market',
                    ],
                  ],
                  'parts' => [
                    'market',
                  ],
                  'rename' => [],
                  'transform' => [
                    'req' => '`reqdata`',
                    'res' => '`body`',
                  ],
                  'args' => [
                    'query' => [
                      [
                        'name' => 'page',
                        'orig' => 'page',
                        'type' => '`$INTEGER`',
                        'kind' => 'query',
                        'example' => 1,
                      ],
                      [
                        'name' => 'page_size',
                        'orig' => 'pageSize',
                        'type' => '`$INTEGER`',
                        'kind' => 'query',
                        'example' => 5,
                      ],
                      [
                        'name' => 'scope',
                        'orig' => 'scope',
                        'type' => '`$STRING`',
                        'kind' => 'query',
                        'example' => 'pokemon',
                      ],
                    ],
                  ],
                  'select' => [],
                  'response' => [
                    'kind' => 'json',
                    'media' => 'application/json',
                  ],
                ],
              ],
            ],
          ],
          'relations' => [
            'ancestors' => [],
          ],
        ],
        'resolution' => [
          'fields' => [
            [
              'name' => 'aliases',
              'title' => 'Aliases',
              'type' => '`$ARRAY`',
              'short' => 'Known nicknames (present on some cards).',
            ],
            [
              'name' => 'cardLanguage',
              'title' => 'Card Language',
              'type' => '`$STRING`',
              'req' => true,
            ],
            [
              'name' => 'collectorNumber',
              'title' => 'Collector Number',
              'type' => '`$STRING`',
              'req' => true,
            ],
            [
              'name' => 'href',
              'title' => 'Href',
              'type' => '`$STRING`',
              'req' => true,
              'short' => 'Site-relative page path.',
            ],
            [
              'name' => 'id',
              'title' => 'Id',
              'type' => '`$STRING`',
              'req' => true,
              'short' => 'Card id (cmc_...) or box id.',
            ],
            [
              'name' => 'image',
              'title' => 'Image',
              'type' => '`$OBJECT`',
              'req' => true,
            ],
            [
              'name' => 'kind',
              'title' => 'Kind',
              'type' => '`$STRING`',
              'req' => true,
              'short' => '"card" or "box".',
            ],
            [
              'name' => 'marketCap',
              'title' => 'Market Cap',
              'type' => '`$OBJECT`',
              'req' => true,
              'short' => 'A published figure with its status and date.',
            ],
            [
              'name' => 'marketRank',
              'title' => 'Market Rank',
              'type' => '`$INTEGER`',
              'req' => true,
            ],
            [
              'name' => 'match',
              'title' => 'Match',
              'type' => '`$STRING`',
              'req' => true,
              'short' => 'How the query matched, e.g.',
            ],
            [
              'name' => 'name',
              'title' => 'Name',
              'type' => '`$OBJECT`',
              'req' => true,
              'short' => 'Text keyed by language code.',
            ],
            [
              'name' => 'officialName',
              'title' => 'Official Name',
              'type' => '`$STRING`',
              'req' => true,
            ],
            [
              'name' => 'populationPsa10',
              'title' => 'Population Psa10',
              'type' => '`$OBJECT`',
              'req' => true,
              'short' => 'A published figure with its status and date.',
            ],
            [
              'name' => 'pricePsa10',
              'title' => 'Price Psa10',
              'type' => '`$OBJECT`',
              'req' => true,
              'short' => 'A published figure with its status and date.',
            ],
            [
              'name' => 'setCode',
              'title' => 'Set Code',
              'type' => '`$STRING`',
              'req' => true,
            ],
            [
              'name' => 'setName',
              'title' => 'Set Name',
              'type' => '`$OBJECT`',
              'req' => true,
              'short' => 'Text keyed by language code.',
            ],
            [
              'name' => 'tcg',
              'title' => 'Tcg',
              'type' => '`$STRING`',
              'req' => true,
            ],
            [
              'name' => 'url',
              'title' => 'Url',
              'type' => '`$STRING`',
              'req' => true,
              'short' => 'Absolute page URL.',
            ],
          ],
          'id' => [
            'field' => 'id',
            'name' => 'id',
          ],
          'name' => 'resolution',
          'op' => [
            'list' => [
              'input' => 'data',
              'name' => 'list',
              'points' => [
                [
                  'kind' => 'http',
                  'method' => 'GET',
                  'orig' => '/resolve',
                  'segments' => [
                    [
                      'lit' => 'resolve',
                    ],
                  ],
                  'parts' => [
                    'resolve',
                  ],
                  'rename' => [],
                  'transform' => [
                    'req' => '`reqdata`',
                    'res' => '`body`',
                  ],
                  'args' => [
                    'query' => [
                      [
                        'name' => 'lang',
                        'orig' => 'lang',
                        'type' => '`$STRING`',
                        'kind' => 'query',
                        'example' => 'en',
                      ],
                      [
                        'name' => 'q',
                        'orig' => 'q',
                        'type' => '`$STRING`',
                        'kind' => 'query',
                        'reqd' => true,
                        'example' => '085/SVP',
                      ],
                    ],
                  ],
                  'select' => [
                    'exist' => [
                      'q',
                    ],
                  ],
                  'response' => [
                    'kind' => 'json',
                    'media' => 'application/json',
                  ],
                ],
              ],
            ],
          ],
          'relations' => [
            'ancestors' => [],
          ],
        ],
        'search' => [
          'fields' => [
            [
              'name' => 'aliases',
              'title' => 'Aliases',
              'type' => '`$ARRAY`',
              'short' => 'Known nicknames (present on some cards).',
            ],
            [
              'name' => 'cardLanguage',
              'title' => 'Card Language',
              'type' => '`$STRING`',
              'req' => true,
            ],
            [
              'name' => 'collectorNumber',
              'title' => 'Collector Number',
              'type' => '`$STRING`',
              'req' => true,
            ],
            [
              'name' => 'href',
              'title' => 'Href',
              'type' => '`$STRING`',
              'req' => true,
              'short' => 'Site-relative page path.',
            ],
            [
              'name' => 'id',
              'title' => 'Id',
              'type' => '`$STRING`',
              'req' => true,
              'short' => 'Card id (cmc_...) or box id.',
            ],
            [
              'name' => 'image',
              'title' => 'Image',
              'type' => '`$OBJECT`',
              'req' => true,
            ],
            [
              'name' => 'kind',
              'title' => 'Kind',
              'type' => '`$STRING`',
              'req' => true,
              'short' => '"card" or "box".',
            ],
            [
              'name' => 'marketCap',
              'title' => 'Market Cap',
              'type' => '`$OBJECT`',
              'req' => true,
              'short' => 'A published figure with its status and date.',
            ],
            [
              'name' => 'marketRank',
              'title' => 'Market Rank',
              'type' => '`$INTEGER`',
              'req' => true,
            ],
            [
              'name' => 'match',
              'title' => 'Match',
              'type' => '`$STRING`',
              'req' => true,
              'short' => 'How the query matched, e.g.',
            ],
            [
              'name' => 'name',
              'title' => 'Name',
              'type' => '`$OBJECT`',
              'req' => true,
              'short' => 'Text keyed by language code.',
            ],
            [
              'name' => 'officialName',
              'title' => 'Official Name',
              'type' => '`$STRING`',
              'req' => true,
            ],
            [
              'name' => 'populationPsa10',
              'title' => 'Population Psa10',
              'type' => '`$OBJECT`',
              'req' => true,
              'short' => 'A published figure with its status and date.',
            ],
            [
              'name' => 'pricePsa10',
              'title' => 'Price Psa10',
              'type' => '`$OBJECT`',
              'req' => true,
              'short' => 'A published figure with its status and date.',
            ],
            [
              'name' => 'setCode',
              'title' => 'Set Code',
              'type' => '`$STRING`',
              'req' => true,
            ],
            [
              'name' => 'setName',
              'title' => 'Set Name',
              'type' => '`$OBJECT`',
              'req' => true,
              'short' => 'Text keyed by language code.',
            ],
            [
              'name' => 'tcg',
              'title' => 'Tcg',
              'type' => '`$STRING`',
              'req' => true,
            ],
            [
              'name' => 'url',
              'title' => 'Url',
              'type' => '`$STRING`',
              'req' => true,
              'short' => 'Absolute page URL.',
            ],
          ],
          'id' => [
            'field' => 'id',
            'name' => 'id',
          ],
          'name' => 'search',
          'op' => [
            'list' => [
              'input' => 'data',
              'name' => 'list',
              'points' => [
                [
                  'kind' => 'http',
                  'method' => 'GET',
                  'orig' => '/search',
                  'segments' => [
                    [
                      'lit' => 'search',
                    ],
                  ],
                  'parts' => [
                    'search',
                  ],
                  'rename' => [],
                  'transform' => [
                    'req' => '`reqdata`',
                    'res' => '`body`',
                  ],
                  'args' => [
                    'query' => [
                      [
                        'name' => 'kind',
                        'orig' => 'kind',
                        'type' => '`$STRING`',
                        'kind' => 'query',
                        'field' => true,
                      ],
                      [
                        'name' => 'lang',
                        'orig' => 'lang',
                        'type' => '`$STRING`',
                        'kind' => 'query',
                        'example' => 'en',
                      ],
                      [
                        'name' => 'limit',
                        'orig' => 'limit',
                        'type' => '`$INTEGER`',
                        'kind' => 'query',
                        'example' => 3,
                      ],
                      [
                        'name' => 'q',
                        'orig' => 'q',
                        'type' => '`$STRING`',
                        'kind' => 'query',
                        'reqd' => true,
                        'example' => 'pikachu',
                      ],
                      [
                        'name' => 'tcg',
                        'orig' => 'tcg',
                        'type' => '`$STRING`',
                        'kind' => 'query',
                        'example' => 'one-piece',
                        'field' => true,
                      ],
                    ],
                  ],
                  'select' => [
                    'exist' => [
                      'q',
                    ],
                  ],
                  'response' => [
                    'kind' => 'json',
                    'media' => 'application/json',
                  ],
                ],
              ],
            ],
          ],
          'relations' => [
            'ancestors' => [],
          ],
        ],
      ],
        ];
    }


    public static function make_feature(string $name)
    {
        require_once __DIR__ . '/features.php';
        return CardzMarketcapFeatures::make_feature($name);
    }
}
