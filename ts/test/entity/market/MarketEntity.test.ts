

import Path from 'node:path'
import * as Fs from 'node:fs'

import { test, describe, afterEach } from 'node:test'
import assert from 'node:assert'
import { createLiveTransport } from '../../live-runner'
import { runLiveEntity } from '../../live-entity'


import { CardzMarketcapSDK, BaseFeature, config, stdutil } from '../../..'

import {
  envOverride,
  liveClientOptions,
  liveDelay,
  loadEnvLocal,
  makeCtrl,
  makeMatch,
  makeReqdata,
  makeStepData,
  makeValid,
  maybeSkipControl,
} from '../../utility'


loadEnvLocal(__dirname + '/../../../.env.local')


describe('MarketEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when CARDZ_MARKETCAP_TEST_LIVE=TRUE.
  afterEach(liveDelay('CARDZ_MARKETCAP_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = CardzMarketcapSDK.test()
    const ent = testsdk.Market()
    assert(null != ent)
  })


  class FailHook extends BaseFeature {
    name = 'failhook'
    version = '0.0.1'
    active = true
    unexpected = 0
    init() { }
    PreSpec() { throw new Error('market hook failed') }
    PreUnexpected() { this.unexpected++ }
  }

  test('stream-error', async () => {
    const offline = { net: { offline: true } }
    await assert.rejects(async () => {
      for await (const _item of CardzMarketcapSDK.test(offline).Market().stream('list')) { }
    }, /offline/)

    for await (const _item of CardzMarketcapSDK.test(offline).Market()
      .stream('list', undefined, { ctrl: { throw: false } })) { }

    if (null != (config as any).feature?.rbac) {
      const denied = CardzMarketcapSDK.test(undefined, { feature: { rbac: { active: true, deny: true } } })
      await assert.rejects(async () => {
        for await (const _item of denied.Market().stream('list')) { }
      }, (err: any) => 'rbac_denied' === err.code)
    }
  })

  test('stream-ctrl', async () => {
    const explain: any = {}
    const ctrl: any = { explain }
    for await (const _item of CardzMarketcapSDK.test().Market().stream('list', undefined, { ctrl })) { }
    assert.deepStrictEqual(Object.keys(ctrl), ['explain'])
    assert(explain === ctrl.explain && 0 < Object.keys(explain).length)
  })

  test('unexpected', async () => {
    const hook = new FailHook()
    const client = new CardzMarketcapSDK({ feature: { test: { active: true } }, extend: [hook] })
    await assert.rejects(client.Market().list(), /hook failed/)
    assert(0 < hook.unexpected)

    const fired = hook.unexpected
    assert.strictEqual(await client.Market().list(undefined, { throw: false }), undefined)
    assert(fired < hook.unexpected)
  })

  test('validate', async (t) => {
    if (null == (config as any).feature?.validate) {
      t.skip('feature not present in this SDK: validate')
      return
    }
    const client = CardzMarketcapSDK.test(undefined, { feature: { validate: { active: true } } })
    await assert.rejects(client.Market().list({"page":"x"} as any),
      (err: any) => 'validate_failed' === err.code)
  })



  test('basic', async (t) => {

    const live = 'TRUE' === process.env.CARDZ_MARKETCAP_TEST_LIVE
    for (const op of ['list']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'market.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":{"cardLanguage":{"a":true,"h":"Card Language","n":"cardLanguage","r":true,"sh":"Printing language: en, ja, ko, zhCN or zhTW.","t":"`$STRING`","key$":"cardLanguage","index$":0},"collectorNumber":{"a":true,"h":"Collector Number","n":"collectorNumber","r":true,"t":"`$STRING`","key$":"collectorNumber","index$":1},"historyDaily":{"a":true,"h":"History Daily","n":"historyDaily","r":true,"sh":"Daily history.","t":"`$ARRAY`","key$":"historyDaily","index$":2},"historyReference":{"a":true,"h":"History Reference","n":"historyReference","r":true,"sh":"Longer reference history.","t":"`$ARRAY`","key$":"historyReference","index$":3},"id":{"a":true,"h":"Id","n":"id","r":true,"sh":"Stable public card id (also the /card/{id} page segment).","t":"`$STRING`","key$":"id","index$":4},"image":{"a":true,"h":"Image","n":"image","r":true,"t":"`$OBJECT`","key$":"image","index$":5},"marketCap":{"a":true,"h":"Market Cap","n":"marketCap","r":true,"sh":"A published figure with its status and date.","t":"`$OBJECT`","key$":"marketCap","index$":6},"marketRank":{"a":true,"h":"Market Rank","n":"marketRank","r":true,"sh":"Rank by market cap across the whole index.","t":"`$INTEGER`","key$":"marketRank","index$":7},"name":{"a":true,"h":"Name","n":"name","r":true,"sh":"Text keyed by language code.","t":"`$OBJECT`","key$":"name","index$":8},"officialName":{"a":true,"h":"Official Name","n":"officialName","r":true,"sh":"Canonical printing name.","t":"`$STRING`","key$":"officialName","index$":9},"populationPsa10":{"a":true,"h":"Population Psa10","n":"populationPsa10","r":true,"sh":"A published figure with its status and date.","t":"`$OBJECT`","key$":"populationPsa10","index$":10},"previousMarketRank":{"a":true,"h":"Previous Market Rank","n":"previousMarketRank","r":false,"sh":"Market rank in the previous snapshot.","t":"`$INTEGER`","key$":"previousMarketRank","index$":11},"pricePsa10":{"a":true,"h":"Price Psa10","n":"pricePsa10","r":true,"sh":"A published figure with its status and date.","t":"`$OBJECT`","key$":"pricePsa10","index$":12},"priceUngradedReference":{"a":true,"h":"Price Ungraded Reference","n":"priceUngradedReference","r":false,"sh":"Card detail only: ungraded reference price.","t":"`$ANY`","key$":"priceUngradedReference","index$":13},"printingIdentity":{"a":true,"h":"Printing Identity","n":"printingIdentity","r":true,"t":"`$OBJECT`","key$":"printingIdentity","index$":14},"rank":{"a":true,"h":"Rank","n":"rank","r":true,"sh":"Position in this response's ordering.","t":"`$INTEGER`","key$":"rank","index$":15},"salesSparkline":{"a":true,"h":"Sales Sparkline","n":"salesSparkline","r":true,"sh":"Recent daily tracked-sales values for a sparkline.","t":"`$ARRAY`","key$":"salesSparkline","index$":16},"setName":{"a":true,"h":"Set Name","n":"setName","r":true,"sh":"Text keyed by language code.","t":"`$OBJECT`","key$":"setName","index$":17},"story":{"a":true,"h":"Story","n":"story","r":true,"sh":"Card detail only: editorial story text keyed by language code.","t":"`$OBJECT`","key$":"story","index$":18},"tcg":{"a":true,"h":"Tcg","n":"tcg","r":true,"sh":"\"Pokémon\" or \"One Piece\".","t":"`$STRING`","key$":"tcg","index$":19},"viewRank":{"a":true,"h":"View Rank","n":"viewRank","r":true,"sh":"Rank inside the requested scope.","t":"`$INTEGER`","key$":"viewRank","index$":20},"windows":{"a":true,"h":"Windows","n":"windows","r":true,"sh":"Change figures keyed by window: 1d, 7d, 30d, 90d, 180d, 365d.","t":"`$OBJECT`","key$":"windows","index$":21}},"id":{"field":"id","name":"id"},"name":"market","op":{"list":{"input":"data","name":"list","points":[{"a":true,"co":{"id":"GET /market","source":"openapi3","version":2},"g":{"query":[{"a":true,"ex":1,"k":"query","n":"page","or":"page","r":false,"t":"`$INTEGER`","index$":0},{"a":true,"ex":5,"k":"query","n":"page_size","or":"pageSize","r":false,"t":"`$INTEGER`","index$":1},{"a":true,"ex":"pokemon","k":"query","n":"scope","or":"scope","r":false,"t":"`$STRING`","index$":2}]},"k":"http","m":"GET","o":"/market","q":{},"r":{},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"market"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"list"}},"relations":{"ancestors":[]},"key$":"market","name__orig":"market","Name":"Market","name_":"market","name-":"market","NAME":"MARKET","index$":1}, {"active":true,"entity":"market","key$":"BasicMarketFlow","kind":"basic","name":"BasicMarketFlow","param":{},"step":[{"a":true,"d":{},"i":{},"m":{},"o":"list","s":[],"v":[{"apply":"ItemExists","def":{"ref":"market_ref01"}}],"index$":0}]}, 'Market', {"GET /market":{"protocol":"http","parameters":[{"name":"scope","in":"query","required":false,"description":"Which ranking to page through.","schema":{"type":"string","enum":["all","pokemon","one-piece","watchlist"],"default":"all"},"example":"pokemon","index$":0},{"name":"page","in":"query","required":false,"description":"1-based page number; zero or non-numeric returns 400.","schema":{"type":"integer","minimum":1,"default":1},"example":1,"index$":1},{"name":"pageSize","in":"query","required":false,"description":"Cards per page; clamped to a server maximum (not documented). Default observed: 100.","schema":{"type":"integer","minimum":1},"example":5,"index$":2}]}}, { strict: LIVE_STRICT, t })
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select

    let market_ref01_data = Object.values(setup.data.existing.market)[0] as any

    // LIST
    const market_ref01_ent = client.Market()
    const market_ref01_match: any = {}

    const market_ref01_list = (await market_ref01_ent.list(market_ref01_match)).map((e: any) => e.data())


  })
})



// main.kit.test.live.strict is true (the default is true): a live
// request that fails, or a live test missing an input it needs,
// fails the test.
// An account with no record for a test to read skips it either way.
const LIVE_STRICT = true

function basicSetup(extra?: any) {
  // TODO: fix test def options
  const options: any = {} // null

  // TODO: needs test utility to resolve path
  const entityDataFile =
    Path.resolve(__dirname, 
      '../../../../.sdk/test/entity/market/MarketTestData.json')

  // TODO: file ready util needed?
  const entityDataSource = Fs.readFileSync(entityDataFile).toString('utf8')

  // TODO: need a xlang JSON parse utility in voxgig/struct with better error msgs
  const entityData = JSON.parse(entityDataSource)

  options.entity = entityData.existing

  let client = CardzMarketcapSDK.test(options, extra)
  const struct = client.utility().struct
  const merge = struct.merge
  const transform = struct.transform

  let idmap = transform(
    ['market01','market02','market03'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'CARDZ_MARKETCAP_TEST_MARKET_ENTID': idmap,
    'CARDZ_MARKETCAP_TEST_LIVE': 'FALSE',
    'CARDZ_MARKETCAP_TEST_EXPLAIN': 'FALSE',
  })

  idmap = env['CARDZ_MARKETCAP_TEST_MARKET_ENTID']

  const live = 'TRUE' === env.CARDZ_MARKETCAP_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['CARDZ_MARKETCAP_TEST_MARKET_ENTID']
    idmap = rawIds && rawIds.trim() ? JSON.parse(rawIds) : {}
    if (!idmap || Array.isArray(idmap) || typeof idmap !== 'object') {
      throw new Error('Live ENTID must be a JSON object')
    }
    client = new CardzMarketcapSDK(merge([
      // FIRST, so the generated fields below win: sdk-test-control.json's
      // test.client.options adds to the live client, it does not redirect it.
      liveClientOptions(),
      {
      },
      // 'extra || {}', not a bare 'extra': struct.merge returns UNDEFINED when the
      // last entry is undefined, and basicSetup is normally called with no
      // argument at all - so a bare 'extra' silently discarded the apikey
      // and server values above and handed the SDK undefined. Harmless
      // while there was nothing in that object; not harmless now.
      extra || {},
      { system: { fetch: transport.fetch } }
    ]))
  }

  const setup = {
    idmap,
    env,
    options,
    client,
    struct,
    data: entityData,
    explain: 'TRUE' === env.CARDZ_MARKETCAP_TEST_EXPLAIN,
    live,
    transport,
    now: Date.now(),
  }

  return setup
}
  
