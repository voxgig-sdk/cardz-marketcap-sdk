"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const node_path_1 = __importDefault(require("node:path"));
const Fs = __importStar(require("node:fs"));
const node_test_1 = require("node:test");
const node_assert_1 = __importDefault(require("node:assert"));
const live_runner_1 = require("../../live-runner");
const live_entity_1 = require("../../live-entity");
const __1 = require("../../..");
const utility_1 = require("../../utility");
(0, utility_1.loadEnvLocal)(__dirname + '/../../../.env.local');
(0, node_test_1.describe)('SearchEntity', async () => {
    // Per-test live pacing. Delay is read from sdk-test-control.json's
    // `test.live.delayMs`; only sleeps when CARDZ_MARKETCAP_TEST_LIVE=TRUE.
    (0, node_test_1.afterEach)((0, utility_1.liveDelay)('CARDZ_MARKETCAP_TEST_LIVE'));
    (0, node_test_1.test)('instance', async () => {
        const testsdk = __1.CardzMarketcapSDK.test();
        const ent = testsdk.Search();
        (0, node_assert_1.default)(null != ent);
    });
    class FailHook extends __1.BaseFeature {
        name = 'failhook';
        version = '0.0.1';
        active = true;
        unexpected = 0;
        init() { }
        PreSpec() { throw new Error('search hook failed'); }
        PreUnexpected() { this.unexpected++; }
    }
    (0, node_test_1.test)('stream-error', async () => {
        const offline = { net: { offline: true } };
        await node_assert_1.default.rejects(async () => {
            for await (const _item of __1.CardzMarketcapSDK.test(offline).Search().stream('list')) { }
        }, /offline/);
        for await (const _item of __1.CardzMarketcapSDK.test(offline).Search()
            .stream('list', undefined, { ctrl: { throw: false } })) { }
        if (null != __1.config.feature?.rbac) {
            const denied = __1.CardzMarketcapSDK.test(undefined, { feature: { rbac: { active: true, deny: true } } });
            await node_assert_1.default.rejects(async () => {
                for await (const _item of denied.Search().stream('list')) { }
            }, (err) => 'rbac_denied' === err.code);
        }
    });
    (0, node_test_1.test)('stream-ctrl', async () => {
        const explain = {};
        const ctrl = { explain };
        for await (const _item of __1.CardzMarketcapSDK.test().Search().stream('list', undefined, { ctrl })) { }
        node_assert_1.default.deepStrictEqual(Object.keys(ctrl), ['explain']);
        (0, node_assert_1.default)(explain === ctrl.explain && 0 < Object.keys(explain).length);
    });
    (0, node_test_1.test)('unexpected', async () => {
        const hook = new FailHook();
        const client = new __1.CardzMarketcapSDK({ feature: { test: { active: true } }, extend: [hook] });
        await node_assert_1.default.rejects(client.Search().list(), /hook failed/);
        (0, node_assert_1.default)(0 < hook.unexpected);
        const fired = hook.unexpected;
        node_assert_1.default.strictEqual(await client.Search().list(undefined, { throw: false }), undefined);
        (0, node_assert_1.default)(fired < hook.unexpected);
    });
    (0, node_test_1.test)('validate', async (t) => {
        if (null == __1.config.feature?.validate) {
            t.skip('feature not present in this SDK: validate');
            return;
        }
        const client = __1.CardzMarketcapSDK.test(undefined, { feature: { validate: { active: true } } });
        await node_assert_1.default.rejects(client.Search().list({ "kind": 1, "q": "x" }), (err) => 'validate_failed' === err.code);
    });
    (0, node_test_1.test)('basic', async (t) => {
        const live = 'TRUE' === process.env.CARDZ_MARKETCAP_TEST_LIVE;
        for (const op of ['list']) {
            if (!live && (0, utility_1.maybeSkipControl)(t, 'entityOp', 'search.' + op, live))
                return;
        }
        const setup = basicSetup();
        if (setup.live) {
            return (0, live_entity_1.runLiveEntity)(setup, { "active": true, "alias": { "field": {} }, "fields": { "aliases": { "a": true, "h": "Aliases", "n": "aliases", "r": false, "sh": "Known nicknames (present on some cards).", "t": "`$ARRAY`", "key$": "aliases", "index$": 0 }, "cardLanguage": { "a": true, "h": "Card Language", "n": "cardLanguage", "r": true, "t": "`$STRING`", "key$": "cardLanguage", "index$": 1 }, "collectorNumber": { "a": true, "h": "Collector Number", "n": "collectorNumber", "r": true, "t": "`$STRING`", "key$": "collectorNumber", "index$": 2 }, "href": { "a": true, "h": "Href", "n": "href", "r": true, "sh": "Site-relative page path.", "t": "`$STRING`", "key$": "href", "index$": 3 }, "id": { "a": true, "h": "Id", "n": "id", "r": true, "sh": "Card id (cmc_...) or box id.", "t": "`$STRING`", "key$": "id", "index$": 4 }, "image": { "a": true, "h": "Image", "n": "image", "r": true, "t": "`$OBJECT`", "key$": "image", "index$": 5 }, "kind": { "a": true, "h": "Kind", "n": "kind", "r": true, "sh": "\"card\" or \"box\".", "t": "`$STRING`", "key$": "kind", "index$": 6 }, "marketCap": { "a": true, "h": "Market Cap", "n": "marketCap", "r": true, "sh": "A published figure with its status and date.", "t": "`$OBJECT`", "key$": "marketCap", "index$": 7 }, "marketRank": { "a": true, "h": "Market Rank", "n": "marketRank", "r": true, "t": "`$INTEGER`", "key$": "marketRank", "index$": 8 }, "match": { "a": true, "h": "Match", "n": "match", "r": true, "sh": "How the query matched, e.g.", "t": "`$STRING`", "key$": "match", "index$": 9 }, "name": { "a": true, "h": "Name", "n": "name", "r": true, "sh": "Text keyed by language code.", "t": "`$OBJECT`", "key$": "name", "index$": 10 }, "officialName": { "a": true, "h": "Official Name", "n": "officialName", "r": true, "t": "`$STRING`", "key$": "officialName", "index$": 11 }, "populationPsa10": { "a": true, "h": "Population Psa10", "n": "populationPsa10", "r": true, "sh": "A published figure with its status and date.", "t": "`$OBJECT`", "key$": "populationPsa10", "index$": 12 }, "pricePsa10": { "a": true, "h": "Price Psa10", "n": "pricePsa10", "r": true, "sh": "A published figure with its status and date.", "t": "`$OBJECT`", "key$": "pricePsa10", "index$": 13 }, "setCode": { "a": true, "h": "Set Code", "n": "setCode", "r": true, "t": "`$STRING`", "key$": "setCode", "index$": 14 }, "setName": { "a": true, "h": "Set Name", "n": "setName", "r": true, "sh": "Text keyed by language code.", "t": "`$OBJECT`", "key$": "setName", "index$": 15 }, "tcg": { "a": true, "h": "Tcg", "n": "tcg", "r": true, "t": "`$STRING`", "key$": "tcg", "index$": 16 }, "url": { "a": true, "h": "Url", "n": "url", "r": true, "sh": "Absolute page URL.", "t": "`$STRING`", "key$": "url", "index$": 17 } }, "id": { "field": "id", "name": "id" }, "name": "search", "op": { "list": { "input": "data", "name": "list", "points": [{ "a": true, "co": { "id": "GET /search", "source": "openapi3", "version": 2 }, "g": { "query": [{ "a": true, "k": "query", "n": "kind", "or": "kind", "r": false, "t": "`$STRING`", "index$": 0 }, { "a": true, "ex": "en", "k": "query", "n": "lang", "or": "lang", "r": false, "t": "`$STRING`", "index$": 1 }, { "a": true, "ex": 3, "k": "query", "n": "limit", "or": "limit", "r": false, "t": "`$INTEGER`", "index$": 2 }, { "a": true, "ex": "pikachu", "k": "query", "n": "q", "or": "q", "r": true, "t": "`$STRING`", "index$": 3 }, { "a": true, "ex": "one-piece", "k": "query", "n": "tcg", "or": "tcg", "r": false, "t": "`$STRING`", "index$": 4 }] }, "k": "http", "m": "GET", "o": "/search", "q": { "exist": ["q"] }, "r": {}, "rs": { "kind": "json", "media": "application/json" }, "s": [{ "lit": "search" }], "t": { "req": "`reqdata`", "res": "`body`" }, "index$": 0 }], "key$": "list" } }, "relations": { "ancestors": [] }, "key$": "search", "name__orig": "search", "Name": "Search", "name_": "search", "name-": "search", "NAME": "SEARCH", "index$": 3 }, { "active": true, "entity": "search", "key$": "BasicSearchFlow", "kind": "basic", "name": "BasicSearchFlow", "param": {}, "step": [{ "a": true, "d": {}, "i": {}, "m": {}, "o": "list", "s": [], "v": [{ "apply": "ItemExists", "def": { "ref": "search_ref01" } }], "index$": 0 }] }, 'Search', { "GET /search": { "protocol": "http", "parameters": [{ "name": "q", "in": "query", "required": true, "description": "Name, nickname or collector number. Missing returns 400.", "schema": { "type": "string" }, "example": "pikachu", "index$": 0 }, { "name": "lang", "in": "query", "required": false, "description": "Language to match names in: en (default), zh-TW, zh-CN, ja, ko.", "schema": { "type": "string", "enum": ["en", "zh-TW", "zh-CN", "ja", "ko"], "default": "en" }, "index$": 1 }, { "name": "kind", "in": "query", "required": false, "description": "Restrict to card or box hits. Omit for all; anything else returns 400.", "schema": { "type": "string", "enum": ["card", "box"] }, "index$": 2 }, { "name": "tcg", "in": "query", "required": false, "description": "Restrict to one TCG; `one-piece` was probed (echoed as \"One Piece\"). `pokemon` is assumed to work as in /market scope, unverified.", "schema": { "type": "string" }, "example": "one-piece", "index$": 3 }, { "name": "limit", "in": "query", "required": false, "description": "Maximum hits to return (default observed: 8; maximum not documented).", "schema": { "type": "integer", "minimum": 1 }, "example": 3, "index$": 4 }] } }, { strict: LIVE_STRICT, t });
        }
        const client = setup.client;
        const struct = setup.struct;
        const isempty = struct.isempty;
        const select = struct.select;
        let search_ref01_data = Object.values(setup.data.existing.search)[0];
        // LIST
        const search_ref01_ent = client.Search();
        const search_ref01_match = {};
        const search_ref01_list = (await search_ref01_ent.list(search_ref01_match)).map((e) => e.data());
    });
});
// main.kit.test.live.strict is true (the default is true): a live
// request that fails, or a live test missing an input it needs,
// fails the test.
// An account with no record for a test to read skips it either way.
const LIVE_STRICT = true;
function basicSetup(extra) {
    // TODO: fix test def options
    const options = {}; // null
    // TODO: needs test utility to resolve path
    const entityDataFile = node_path_1.default.resolve(__dirname, '../../../../.sdk/test/entity/search/SearchTestData.json');
    // TODO: file ready util needed?
    const entityDataSource = Fs.readFileSync(entityDataFile).toString('utf8');
    // TODO: need a xlang JSON parse utility in voxgig/struct with better error msgs
    const entityData = JSON.parse(entityDataSource);
    options.entity = entityData.existing;
    let client = __1.CardzMarketcapSDK.test(options, extra);
    const struct = client.utility().struct;
    const merge = struct.merge;
    const transform = struct.transform;
    let idmap = transform(['search01', 'search02', 'search03'], {
        '`$PACK`': ['', {
                '`$KEY`': '`$COPY`',
                '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
            }]
    });
    const env = (0, utility_1.envOverride)({
        'CARDZ_MARKETCAP_TEST_SEARCH_ENTID': idmap,
        'CARDZ_MARKETCAP_TEST_LIVE': 'FALSE',
        'CARDZ_MARKETCAP_TEST_EXPLAIN': 'FALSE',
    });
    idmap = env['CARDZ_MARKETCAP_TEST_SEARCH_ENTID'];
    const live = 'TRUE' === env.CARDZ_MARKETCAP_TEST_LIVE;
    const transport = (0, live_runner_1.createLiveTransport)();
    if (live) {
        const rawIds = process.env['CARDZ_MARKETCAP_TEST_SEARCH_ENTID'];
        idmap = rawIds && rawIds.trim() ? JSON.parse(rawIds) : {};
        if (!idmap || Array.isArray(idmap) || typeof idmap !== 'object') {
            throw new Error('Live ENTID must be a JSON object');
        }
        client = new __1.CardzMarketcapSDK(merge([
            // FIRST, so the generated fields below win: sdk-test-control.json's
            // test.client.options adds to the live client, it does not redirect it.
            (0, utility_1.liveClientOptions)(),
            {},
            // 'extra || {}', not a bare 'extra': struct.merge returns UNDEFINED when the
            // last entry is undefined, and basicSetup is normally called with no
            // argument at all - so a bare 'extra' silently discarded the apikey
            // and server values above and handed the SDK undefined. Harmless
            // while there was nothing in that object; not harmless now.
            extra || {},
            { system: { fetch: transport.fetch } }
        ]));
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
    };
    return setup;
}
//# sourceMappingURL=SearchEntity.test.js.map