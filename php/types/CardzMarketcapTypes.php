<?php
declare(strict_types=1);

// Typed models for the CardzMarketcap SDK.
//
// GENERATED from the API model: main.kit.entity.<e>.fields{} and per-op
// params (op.<name>.points[].g.params[]). Field/param types come from the
// canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
// @voxgig/apidef VALID_CANON). Do not edit by hand.
//
// These are documentation-grade value objects (PHP 8 typed properties),
// registered on the composer classmap autoload. The SDK boundary exchanges
// assoc-arrays; these classes name the shapes for tooling and typed callers.

/** Card entity data model. */
class Card
{
    public string $cardLanguage;
    public string $collectorNumber;
    public array $historyDaily;
    public array $historyReference;
    public string $id;
    public array $image;
    public array $marketCap;
    public int $marketRank;
    public array $name;
    public string $officialName;
    public array $populationPsa10;
    public ?int $previousMarketRank = null;
    public array $pricePsa10;
    public mixed $priceUngradedReference = null;
    public array $printingIdentity;
    public int $rank;
    public array $salesSparkline;
    public array $setName;
    public array $story;
    public string $tcg;
    public int $viewRank;
    public array $windows;
}

/** Request payload for Card#load. */
class CardLoadMatch
{
    public string $id;
}

/** Market entity data model. */
class Market
{
    public string $cardLanguage;
    public string $collectorNumber;
    public array $historyDaily;
    public array $historyReference;
    public string $id;
    public array $image;
    public array $marketCap;
    public int $marketRank;
    public array $name;
    public string $officialName;
    public array $populationPsa10;
    public ?int $previousMarketRank = null;
    public array $pricePsa10;
    public mixed $priceUngradedReference = null;
    public array $printingIdentity;
    public int $rank;
    public array $salesSparkline;
    public array $setName;
    public array $story;
    public string $tcg;
    public int $viewRank;
    public array $windows;
}

/** Request payload for Market#list. */
class MarketListMatch
{
    public ?int $page = null;
    public ?int $page_size = null;
    public ?string $scope = null;
}

/** Resolution entity data model. */
class Resolution
{
    public ?array $aliases = null;
    public string $cardLanguage;
    public string $collectorNumber;
    public string $href;
    public string $id;
    public array $image;
    public string $kind;
    public array $marketCap;
    public int $marketRank;
    public string $match;
    public array $name;
    public string $officialName;
    public array $populationPsa10;
    public array $pricePsa10;
    public string $setCode;
    public array $setName;
    public string $tcg;
    public string $url;
}

/** Request payload for Resolution#list. */
class ResolutionListMatch
{
    public ?string $lang = null;
    public string $q;
}

/** Search entity data model. */
class Search
{
    public ?array $aliases = null;
    public string $cardLanguage;
    public string $collectorNumber;
    public string $href;
    public string $id;
    public array $image;
    public string $kind;
    public array $marketCap;
    public int $marketRank;
    public string $match;
    public array $name;
    public string $officialName;
    public array $populationPsa10;
    public array $pricePsa10;
    public string $setCode;
    public array $setName;
    public string $tcg;
    public string $url;
}

/** Request payload for Search#list. */
class SearchListMatch
{
    public ?string $kind = null;
    public ?string $lang = null;
    public ?int $limit = null;
    public string $q;
    public ?string $tcg = null;
}

