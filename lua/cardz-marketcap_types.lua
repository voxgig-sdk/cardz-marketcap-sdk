-- Typed models for the CardzMarketcap SDK (LuaLS annotations).
--
-- GENERATED from the API model: main.kit.entity.<e>.fields{} and per-op
-- params (op.<name>.points[].g.params[]). Field/param types come from the
-- canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
-- @voxgig/apidef VALID_CANON). Annotations only — no runtime effect. Do not
-- edit by hand.

---@class Card
---@field cardLanguage string
---@field collectorNumber string
---@field historyDaily table
---@field historyReference table
---@field id string
---@field image table
---@field marketCap table
---@field marketRank number
---@field name table
---@field officialName string
---@field populationPsa10 table
---@field previousMarketRank? number
---@field pricePsa10 table
---@field priceUngradedReference? any
---@field printingIdentity table
---@field rank number
---@field salesSparkline table
---@field setName table
---@field story table
---@field tcg string
---@field viewRank number
---@field windows table

---@class CardLoadMatch
---@field id string

---@class Market
---@field cardLanguage string
---@field collectorNumber string
---@field historyDaily table
---@field historyReference table
---@field id string
---@field image table
---@field marketCap table
---@field marketRank number
---@field name table
---@field officialName string
---@field populationPsa10 table
---@field previousMarketRank? number
---@field pricePsa10 table
---@field priceUngradedReference? any
---@field printingIdentity table
---@field rank number
---@field salesSparkline table
---@field setName table
---@field story table
---@field tcg string
---@field viewRank number
---@field windows table

---@class MarketListMatch
---@field page? number
---@field page_size? number
---@field scope? string

---@class Resolution
---@field aliases? table
---@field cardLanguage string
---@field collectorNumber string
---@field href string
---@field id string
---@field image table
---@field kind string
---@field marketCap table
---@field marketRank number
---@field match string
---@field name table
---@field officialName string
---@field populationPsa10 table
---@field pricePsa10 table
---@field setCode string
---@field setName table
---@field tcg string
---@field url string

---@class ResolutionListMatch
---@field lang? string
---@field q string

---@class Search
---@field aliases? table
---@field cardLanguage string
---@field collectorNumber string
---@field href string
---@field id string
---@field image table
---@field kind string
---@field marketCap table
---@field marketRank number
---@field match string
---@field name table
---@field officialName string
---@field populationPsa10 table
---@field pricePsa10 table
---@field setCode string
---@field setName table
---@field tcg string
---@field url string

---@class SearchListMatch
---@field kind? string
---@field lang? string
---@field limit? number
---@field q string
---@field tcg? string

local M = {}

return M
