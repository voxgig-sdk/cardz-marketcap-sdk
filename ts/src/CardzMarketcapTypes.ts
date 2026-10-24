// Typed models for the CardzMarketcap SDK.
//
// GENERATED from the API model: main.kit.entity.<e>.fields{} and per-op
// params (op.<name>.points[].g.params[]). Field/param types come from the
// canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
// @voxgig/apidef VALID_CANON). Do not edit by hand.

export interface Card {
  cardLanguage: string
  collectorNumber: string
  historyDaily: any[]
  historyReference: any[]
  id: string
  image: Record<string, any>
  marketCap: Record<string, any>
  marketRank: number
  name: Record<string, any>
  officialName: string
  populationPsa10: Record<string, any>
  previousMarketRank?: number
  pricePsa10: Record<string, any>
  priceUngradedReference?: any
  printingIdentity: Record<string, any>
  rank: number
  salesSparkline: any[]
  setName: Record<string, any>
  story: Record<string, any>
  tcg: string
  viewRank: number
  windows: Record<string, any>
}

export interface CardLoadMatch {
  id: string
}

export interface Market {
  cardLanguage: string
  collectorNumber: string
  historyDaily: any[]
  historyReference: any[]
  id: string
  image: Record<string, any>
  marketCap: Record<string, any>
  marketRank: number
  name: Record<string, any>
  officialName: string
  populationPsa10: Record<string, any>
  previousMarketRank?: number
  pricePsa10: Record<string, any>
  priceUngradedReference?: any
  printingIdentity: Record<string, any>
  rank: number
  salesSparkline: any[]
  setName: Record<string, any>
  story: Record<string, any>
  tcg: string
  viewRank: number
  windows: Record<string, any>
}

export interface MarketListMatch {
  page?: number
  page_size?: number
  scope?: string
}

export interface Resolution {
  aliases?: any[]
  cardLanguage: string
  collectorNumber: string
  href: string
  id: string
  image: Record<string, any>
  kind: string
  marketCap: Record<string, any>
  marketRank: number
  match: string
  name: Record<string, any>
  officialName: string
  populationPsa10: Record<string, any>
  pricePsa10: Record<string, any>
  setCode: string
  setName: Record<string, any>
  tcg: string
  url: string
}

export interface ResolutionListMatch {
  lang?: string
  q: string
}

export interface Search {
  aliases?: any[]
  cardLanguage: string
  collectorNumber: string
  href: string
  id: string
  image: Record<string, any>
  kind: string
  marketCap: Record<string, any>
  marketRank: number
  match: string
  name: Record<string, any>
  officialName: string
  populationPsa10: Record<string, any>
  pricePsa10: Record<string, any>
  setCode: string
  setName: Record<string, any>
  tcg: string
  url: string
}

export interface SearchListMatch {
  kind?: string
  lang?: string
  limit?: number
  q: string
  tcg?: string
}

