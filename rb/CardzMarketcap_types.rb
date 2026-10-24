# frozen_string_literal: true

# Typed models for the CardzMarketcap SDK.
#
# GENERATED from the API model: main.kit.entity.<e>.fields{} and per-op
# params (op.<name>.points[].g.params[]). Member types come from the
# canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
# @voxgig/apidef VALID_CANON). Ruby types are unenforced; these YARD
# annotations document the shapes. Do not edit by hand.

# Card entity data model.
#
# @!attribute [rw] cardLanguage
#   @return [String]
#
# @!attribute [rw] collectorNumber
#   @return [String]
#
# @!attribute [rw] historyDaily
#   @return [Array]
#
# @!attribute [rw] historyReference
#   @return [Array]
#
# @!attribute [rw] id
#   @return [String]
#
# @!attribute [rw] image
#   @return [Hash]
#
# @!attribute [rw] marketCap
#   @return [Hash]
#
# @!attribute [rw] marketRank
#   @return [Integer]
#
# @!attribute [rw] name
#   @return [Hash]
#
# @!attribute [rw] officialName
#   @return [String]
#
# @!attribute [rw] populationPsa10
#   @return [Hash]
#
# @!attribute [rw] previousMarketRank
#   @return [Integer, nil]
#
# @!attribute [rw] pricePsa10
#   @return [Hash]
#
# @!attribute [rw] priceUngradedReference
#   @return [Object, nil]
#
# @!attribute [rw] printingIdentity
#   @return [Hash]
#
# @!attribute [rw] rank
#   @return [Integer]
#
# @!attribute [rw] salesSparkline
#   @return [Array]
#
# @!attribute [rw] setName
#   @return [Hash]
#
# @!attribute [rw] story
#   @return [Hash]
#
# @!attribute [rw] tcg
#   @return [String]
#
# @!attribute [rw] viewRank
#   @return [Integer]
#
# @!attribute [rw] windows
#   @return [Hash]
Card = Struct.new(
  :cardLanguage,
  :collectorNumber,
  :historyDaily,
  :historyReference,
  :id,
  :image,
  :marketCap,
  :marketRank,
  :name,
  :officialName,
  :populationPsa10,
  :previousMarketRank,
  :pricePsa10,
  :priceUngradedReference,
  :printingIdentity,
  :rank,
  :salesSparkline,
  :setName,
  :story,
  :tcg,
  :viewRank,
  :windows,
  keyword_init: true
)

# Request payload for Card#load.
#
# @!attribute [rw] id
#   @return [String]
CardLoadMatch = Struct.new(
  :id,
  keyword_init: true
)

# Market entity data model.
#
# @!attribute [rw] cardLanguage
#   @return [String]
#
# @!attribute [rw] collectorNumber
#   @return [String]
#
# @!attribute [rw] historyDaily
#   @return [Array]
#
# @!attribute [rw] historyReference
#   @return [Array]
#
# @!attribute [rw] id
#   @return [String]
#
# @!attribute [rw] image
#   @return [Hash]
#
# @!attribute [rw] marketCap
#   @return [Hash]
#
# @!attribute [rw] marketRank
#   @return [Integer]
#
# @!attribute [rw] name
#   @return [Hash]
#
# @!attribute [rw] officialName
#   @return [String]
#
# @!attribute [rw] populationPsa10
#   @return [Hash]
#
# @!attribute [rw] previousMarketRank
#   @return [Integer, nil]
#
# @!attribute [rw] pricePsa10
#   @return [Hash]
#
# @!attribute [rw] priceUngradedReference
#   @return [Object, nil]
#
# @!attribute [rw] printingIdentity
#   @return [Hash]
#
# @!attribute [rw] rank
#   @return [Integer]
#
# @!attribute [rw] salesSparkline
#   @return [Array]
#
# @!attribute [rw] setName
#   @return [Hash]
#
# @!attribute [rw] story
#   @return [Hash]
#
# @!attribute [rw] tcg
#   @return [String]
#
# @!attribute [rw] viewRank
#   @return [Integer]
#
# @!attribute [rw] windows
#   @return [Hash]
Market = Struct.new(
  :cardLanguage,
  :collectorNumber,
  :historyDaily,
  :historyReference,
  :id,
  :image,
  :marketCap,
  :marketRank,
  :name,
  :officialName,
  :populationPsa10,
  :previousMarketRank,
  :pricePsa10,
  :priceUngradedReference,
  :printingIdentity,
  :rank,
  :salesSparkline,
  :setName,
  :story,
  :tcg,
  :viewRank,
  :windows,
  keyword_init: true
)

# Request payload for Market#list.
#
# @!attribute [rw] page
#   @return [Integer, nil]
#
# @!attribute [rw] page_size
#   @return [Integer, nil]
#
# @!attribute [rw] scope
#   @return [String, nil]
MarketListMatch = Struct.new(
  :page,
  :page_size,
  :scope,
  keyword_init: true
)

# Resolution entity data model.
#
# @!attribute [rw] aliases
#   @return [Array, nil]
#
# @!attribute [rw] cardLanguage
#   @return [String]
#
# @!attribute [rw] collectorNumber
#   @return [String]
#
# @!attribute [rw] href
#   @return [String]
#
# @!attribute [rw] id
#   @return [String]
#
# @!attribute [rw] image
#   @return [Hash]
#
# @!attribute [rw] kind
#   @return [String]
#
# @!attribute [rw] marketCap
#   @return [Hash]
#
# @!attribute [rw] marketRank
#   @return [Integer]
#
# @!attribute [rw] match
#   @return [String]
#
# @!attribute [rw] name
#   @return [Hash]
#
# @!attribute [rw] officialName
#   @return [String]
#
# @!attribute [rw] populationPsa10
#   @return [Hash]
#
# @!attribute [rw] pricePsa10
#   @return [Hash]
#
# @!attribute [rw] setCode
#   @return [String]
#
# @!attribute [rw] setName
#   @return [Hash]
#
# @!attribute [rw] tcg
#   @return [String]
#
# @!attribute [rw] url
#   @return [String]
Resolution = Struct.new(
  :aliases,
  :cardLanguage,
  :collectorNumber,
  :href,
  :id,
  :image,
  :kind,
  :marketCap,
  :marketRank,
  :match,
  :name,
  :officialName,
  :populationPsa10,
  :pricePsa10,
  :setCode,
  :setName,
  :tcg,
  :url,
  keyword_init: true
)

# Request payload for Resolution#list.
#
# @!attribute [rw] lang
#   @return [String, nil]
#
# @!attribute [rw] q
#   @return [String]
ResolutionListMatch = Struct.new(
  :lang,
  :q,
  keyword_init: true
)

# Search entity data model.
#
# @!attribute [rw] aliases
#   @return [Array, nil]
#
# @!attribute [rw] cardLanguage
#   @return [String]
#
# @!attribute [rw] collectorNumber
#   @return [String]
#
# @!attribute [rw] href
#   @return [String]
#
# @!attribute [rw] id
#   @return [String]
#
# @!attribute [rw] image
#   @return [Hash]
#
# @!attribute [rw] kind
#   @return [String]
#
# @!attribute [rw] marketCap
#   @return [Hash]
#
# @!attribute [rw] marketRank
#   @return [Integer]
#
# @!attribute [rw] match
#   @return [String]
#
# @!attribute [rw] name
#   @return [Hash]
#
# @!attribute [rw] officialName
#   @return [String]
#
# @!attribute [rw] populationPsa10
#   @return [Hash]
#
# @!attribute [rw] pricePsa10
#   @return [Hash]
#
# @!attribute [rw] setCode
#   @return [String]
#
# @!attribute [rw] setName
#   @return [Hash]
#
# @!attribute [rw] tcg
#   @return [String]
#
# @!attribute [rw] url
#   @return [String]
Search = Struct.new(
  :aliases,
  :cardLanguage,
  :collectorNumber,
  :href,
  :id,
  :image,
  :kind,
  :marketCap,
  :marketRank,
  :match,
  :name,
  :officialName,
  :populationPsa10,
  :pricePsa10,
  :setCode,
  :setName,
  :tcg,
  :url,
  keyword_init: true
)

# Request payload for Search#list.
#
# @!attribute [rw] kind
#   @return [String, nil]
#
# @!attribute [rw] lang
#   @return [String, nil]
#
# @!attribute [rw] limit
#   @return [Integer, nil]
#
# @!attribute [rw] q
#   @return [String]
#
# @!attribute [rw] tcg
#   @return [String, nil]
SearchListMatch = Struct.new(
  :kind,
  :lang,
  :limit,
  :q,
  :tcg,
  keyword_init: true
)

