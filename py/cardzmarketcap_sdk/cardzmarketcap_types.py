# Typed models for the CardzMarketcap SDK.
#
# GENERATED from the API model: main.kit.entity.<e>.fields{} and per-op
# params (op.<name>.points[].g.params[]). Field/param types come from the
# canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
# @voxgig/apidef VALID_CANON). Do not edit by hand.
#
# These are TypedDicts, not dataclasses: the SDK ops return/accept plain dicts
# at runtime, and a TypedDict IS a dict shape, so the types match the runtime.
# Optional (req:false) keys are modelled as TypedDict key-optionality
# (total=False), split into a required base + total=False subclass when a type
# has both required and optional keys.

from __future__ import annotations

from typing import TypedDict, Any


class CardRequired(TypedDict):
    cardLanguage: str
    collectorNumber: str
    historyDaily: list
    historyReference: list
    id: str
    image: dict
    marketCap: dict
    marketRank: int
    name: dict
    officialName: str
    populationPsa10: dict
    pricePsa10: dict
    printingIdentity: dict
    rank: int
    salesSparkline: list
    setName: dict
    story: dict
    tcg: str
    viewRank: int
    windows: dict


class Card(CardRequired, total=False):
    previousMarketRank: int
    priceUngradedReference: Any


class CardLoadMatch(TypedDict):
    id: str


class MarketRequired(TypedDict):
    cardLanguage: str
    collectorNumber: str
    historyDaily: list
    historyReference: list
    id: str
    image: dict
    marketCap: dict
    marketRank: int
    name: dict
    officialName: str
    populationPsa10: dict
    pricePsa10: dict
    printingIdentity: dict
    rank: int
    salesSparkline: list
    setName: dict
    story: dict
    tcg: str
    viewRank: int
    windows: dict


class Market(MarketRequired, total=False):
    previousMarketRank: int
    priceUngradedReference: Any


class MarketListMatch(TypedDict, total=False):
    page: int
    page_size: int
    scope: str


class ResolutionRequired(TypedDict):
    cardLanguage: str
    collectorNumber: str
    href: str
    id: str
    image: dict
    kind: str
    marketCap: dict
    marketRank: int
    match: str
    name: dict
    officialName: str
    populationPsa10: dict
    pricePsa10: dict
    setCode: str
    setName: dict
    tcg: str
    url: str


class Resolution(ResolutionRequired, total=False):
    aliases: list


class ResolutionListMatchRequired(TypedDict):
    q: str


class ResolutionListMatch(ResolutionListMatchRequired, total=False):
    lang: str


class SearchRequired(TypedDict):
    cardLanguage: str
    collectorNumber: str
    href: str
    id: str
    image: dict
    kind: str
    marketCap: dict
    marketRank: int
    match: str
    name: dict
    officialName: str
    populationPsa10: dict
    pricePsa10: dict
    setCode: str
    setName: dict
    tcg: str
    url: str


class Search(SearchRequired, total=False):
    aliases: list


class SearchListMatchRequired(TypedDict):
    q: str


class SearchListMatch(SearchListMatchRequired, total=False):
    kind: str
    lang: str
    limit: int
    tcg: str
