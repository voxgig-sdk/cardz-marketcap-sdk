

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


describe('SearchEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when CARDZ_MARKETCAP_TEST_LIVE=TRUE.
  afterEach(liveDelay('CARDZ_MARKETCAP_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = CardzMarketcapSDK.test()
    const ent = testsdk.Search()
    assert(null != ent)
  })


  class FailHook extends BaseFeature {
    name = 'failhook'
    version = '0.0.1'
    active = true
    unexpected = 0
    init() { }
    PreSpec() { throw new Error('search hook failed') }
    PreUnexpected() { this.unexpected++ }
  }

  test('stream-error', async () => {
    const offline = { net: { offline: true } }
    await assert.rejects(async () => {
      for await (const _item of CardzMarketcapSDK.test(offline).Search().stream('list')) { }
    }, /offline/)

    for await (const _item of CardzMarketcapSDK.test(offline).Search()
      .stream('list', undefined, { ctrl: { throw: false } })) { }

    if (null != (config as any).feature?.rbac) {
      const denied = CardzMarketcapSDK.test(undefined, { feature: { rbac: { active: true, deny: true } } })
      await assert.rejects(async () => {
        for await (const _item of denied.Search().stream('list')) { }
      }, (err: any) => 'rbac_denied' === err.code)
    }
  })

  test('stream-ctrl', async () => {
    const explain: any = {}
    const ctrl: any = { explain }
    for await (const _item of CardzMarketcapSDK.test().Search().stream('list', undefined, { ctrl })) { }
    assert.deepStrictEqual(Object.keys(ctrl), ['explain'])
    assert(explain === ctrl.explain && 0 < Object.keys(explain).length)
  })

  test('unexpected', async () => {
    const hook = new FailHook()
    const client = new CardzMarketcapSDK({ feature: { test: { active: true } }, extend: [hook] })
    await assert.rejects(client.Search().list(), /hook failed/)
    assert(0 < hook.unexpected)

    const fired = hook.unexpected
    assert.strictEqual(await client.Search().list(undefined, { throw: false }), undefined)
    assert(fired < hook.unexpected)
  })

  test('validate', async (t) => {
    if (null == (config as any).feature?.validate) {
      t.skip('feature not present in this SDK: validate')
      return
    }
    const client = CardzMarketcapSDK.test(undefined, { feature: { validate: { active: true } } })
    await assert.rejects(client.Search().list({"kind":1,"q":"x"} as any),
      (err: any) => 'validate_failed' === err.code)
  })



  test('basic', async (t) => {

    const live = 'TRUE' === process.env.CARDZ_MARKETCAP_TEST_LIVE
    for (const op of ['list']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'search.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":{"aliases":{"a":true,"h":"Aliases","n":"aliases","r":false,"sh":"Known nicknames (present on some cards).","t":"`$ARRAY`","key$":"aliases","index$":0},"cardLanguage":{"a":true,"h":"Card Language","n":"cardLanguage","r":true,"t":"`$STRING`","key$":"cardLanguage","index$":1},"collectorNumber":{"a":true,"h":"Collector Number","n":"collectorNumber","r":true,"t":"`$STRING`","key$":"collectorNumber","index$":2},"href":{"a":true,"h":"Href","n":"href","r":true,"sh":"Site-relative page path.","t":"`$STRING`","key$":"href","index$":3},"id":{"a":true,"h":"Id","n":"id","r":true,"sh":"Card id (cmc_...) or box id.","t":"`$STRING`","key$":"id","index$":4},"image":{"a":true,"h":"Image","n":"image","r":true,"t":"`$OBJECT`","key$":"image","index$":5},"kind":{"a":true,"h":"Kind","n":"kind","r":true,"sh":"\"card\" or \"box\".","t":"`$STRING`","key$":"kind","index$":6},"marketCap":{"a":true,"h":"Market Cap","n":"marketCap","r":true,"sh":"A published figure with its status and date.","t":"`$OBJECT`","key$":"marketCap","index$":7},"marketRank":{"a":true,"h":"Market Rank","n":"marketRank","r":true,"t":"`$INTEGER`","key$":"marketRank","index$":8},"match":{"a":true,"h":"Match","n":"match","r":true,"sh":"How the query matched, e.g.","t":"`$STRING`","key$":"match","index$":9},"name":{"a":true,"h":"Name","n":"name","r":true,"sh":"Text keyed by language code.","t":"`$OBJECT`","key$":"name","index$":10},"officialName":{"a":true,"h":"Official Name","n":"officialName","r":true,"t":"`$STRING`","key$":"officialName","index$":11},"populationPsa10":{"a":true,"h":"Population Psa10","n":"populationPsa10","r":true,"sh":"A published figure with its status and date.","t":"`$OBJECT`","key$":"populationPsa10","index$":12},"pricePsa10":{"a":true,"h":"Price Psa10","n":"pricePsa10","r":true,"sh":"A published figure with its status and date.","t":"`$OBJECT`","key$":"pricePsa10","index$":13},"setCode":{"a":true,"h":"Set Code","n":"setCode","r":true,"t":"`$STRING`","key$":"setCode","index$":14},"setName":{"a":true,"h":"Set Name","n":"setName","r":true,"sh":"Text keyed by language code.","t":"`$OBJECT`","key$":"setName","index$":15},"tcg":{"a":true,"h":"Tcg","n":"tcg","r":true,"t":"`$STRING`","key$":"tcg","index$":16},"url":{"a":true,"h":"Url","n":"url","r":true,"sh":"Absolute page URL.","t":"`$STRING`","key$":"url","index$":17}},"id":{"field":"id","name":"id"},"name":"search","op":{"list":{"input":"data","name":"list","points":[{"a":true,"co":{"id":"GET /search","source":"openapi3","version":2},"g":{"query":[{"a":true,"k":"query","n":"kind","or":"kind","r":false,"t":"`$STRING`","index$":0},{"a":true,"ex":"en","k":"query","n":"lang","or":"lang","r":false,"t":"`$STRING`","index$":1},{"a":true,"ex":3,"k":"query","n":"limit","or":"limit","r":false,"t":"`$INTEGER`","index$":2},{"a":true,"ex":"pikachu","k":"query","n":"q","or":"q","r":true,"t":"`$STRING`","index$":3},{"a":true,"ex":"one-piece","k":"query","n":"tcg","or":"tcg","r":false,"t":"`$STRING`","index$":4}]},"k":"http","m":"GET","o":"/search","q":{"exist":["q"]},"r":{},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"search"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"list"}},"relations":{"ancestors":[]},"key$":"search","name__orig":"search","Name":"Search","name_":"search","name-":"search","NAME":"SEARCH","index$":3}, {"active":true,"entity":"search","key$":"BasicSearchFlow","kind":"basic","name":"BasicSearchFlow","param":{},"step":[{"a":true,"d":{},"i":{},"m":{},"o":"list","s":[],"v":[{"apply":"ItemExists","def":{"ref":"search_ref01"}}],"index$":0}]}, 'Search', {"GET /search":{"protocol":"http","parameters":[{"name":"q","in":"query","required":true,"description":"Name, nickname or collector number. Missing returns 400.","schema":{"type":"string"},"example":"pikachu","index$":0},{"name":"lang","in":"query","required":false,"description":"Language to match names in: en (default), zh-TW, zh-CN, ja, ko.","schema":{"type":"string","enum":["en","zh-TW","zh-CN","ja","ko"],"default":"en"},"index$":1},{"name":"kind","in":"query","required":false,"description":"Restrict to card or box hits. Omit for all; anything else returns 400.","schema":{"type":"string","enum":["card","box"]},"index$":2},{"name":"tcg","in":"query","required":false,"description":"Restrict to one TCG; `one-piece` was probed (echoed as \"One Piece\"). `pokemon` is assumed to work as in /market scope, unverified.","schema":{"type":"string"},"example":"one-piece","index$":3},{"name":"limit","in":"query","required":false,"description":"Maximum hits to return (default observed: 8; maximum not documented).","schema":{"type":"integer","minimum":1},"example":3,"index$":4}]}}, { strict: LIVE_STRICT, t })
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select

    let search_ref01_data = Object.values(setup.data.existing.search)[0] as any

    // LIST
    const search_ref01_ent = client.Search()
    const search_ref01_match: any = {}

    const search_ref01_list = (await search_ref01_ent.list(search_ref01_match)).map((e: any) => e.data())


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
      '../../../../.sdk/test/entity/search/SearchTestData.json')

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
    ['search01','search02','search03'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'CARDZ_MARKETCAP_TEST_SEARCH_ENTID': idmap,
    'CARDZ_MARKETCAP_TEST_LIVE': 'FALSE',
    'CARDZ_MARKETCAP_TEST_EXPLAIN': 'FALSE',
  })

  idmap = env['CARDZ_MARKETCAP_TEST_SEARCH_ENTID']

  const live = 'TRUE' === env.CARDZ_MARKETCAP_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['CARDZ_MARKETCAP_TEST_SEARCH_ENTID']
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
  
