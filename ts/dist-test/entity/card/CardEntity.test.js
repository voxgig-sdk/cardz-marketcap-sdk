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
(0, node_test_1.describe)('CardEntity', async () => {
    // Per-test live pacing. Delay is read from sdk-test-control.json's
    // `test.live.delayMs`; only sleeps when CARDZ_MARKETCAP_TEST_LIVE=TRUE.
    (0, node_test_1.afterEach)((0, utility_1.liveDelay)('CARDZ_MARKETCAP_TEST_LIVE'));
    (0, node_test_1.test)('instance', async () => {
        const testsdk = __1.CardzMarketcapSDK.test();
        const ent = testsdk.Card();
        (0, node_assert_1.default)(null != ent);
    });
    (0, node_test_1.test)('validate', async (t) => {
        if (null == __1.config.feature?.validate) {
            t.skip('feature not present in this SDK: validate');
            return;
        }
        const client = __1.CardzMarketcapSDK.test(undefined, { feature: { validate: { active: true } } });
        await node_assert_1.default.rejects(client.Card().load({ "id": 1 }), (err) => 'validate_failed' === err.code);
    });
    (0, node_test_1.test)('basic', async (t) => {
        const live = 'TRUE' === process.env.CARDZ_MARKETCAP_TEST_LIVE;
        for (const op of ['load']) {
            if (!live && (0, utility_1.maybeSkipControl)(t, 'entityOp', 'card.' + op, live))
                return;
        }
        const setup = basicSetup();
        if (setup.live) {
            return (0, live_entity_1.runLiveEntity)(setup, { "active": true, "alias": { "field": {} }, "fields": { "cardLanguage": { "a": true, "h": "Card Language", "n": "cardLanguage", "r": true, "sh": "Printing language: en, ja, ko, zhCN or zhTW.", "t": "`$STRING`", "key$": "cardLanguage", "index$": 0 }, "collectorNumber": { "a": true, "h": "Collector Number", "n": "collectorNumber", "r": true, "t": "`$STRING`", "key$": "collectorNumber", "index$": 1 }, "historyDaily": { "a": true, "h": "History Daily", "n": "historyDaily", "r": true, "sh": "Daily history.", "t": "`$ARRAY`", "key$": "historyDaily", "index$": 2 }, "historyReference": { "a": true, "h": "History Reference", "n": "historyReference", "r": true, "sh": "Longer reference history.", "t": "`$ARRAY`", "key$": "historyReference", "index$": 3 }, "id": { "a": true, "h": "Id", "n": "id", "r": true, "sh": "Stable public card id (also the /card/{id} page segment).", "t": "`$STRING`", "key$": "id", "index$": 4 }, "image": { "a": true, "h": "Image", "n": "image", "r": true, "t": "`$OBJECT`", "key$": "image", "index$": 5 }, "marketCap": { "a": true, "h": "Market Cap", "n": "marketCap", "r": true, "sh": "A published figure with its status and date.", "t": "`$OBJECT`", "key$": "marketCap", "index$": 6 }, "marketRank": { "a": true, "h": "Market Rank", "n": "marketRank", "r": true, "sh": "Rank by market cap across the whole index.", "t": "`$INTEGER`", "key$": "marketRank", "index$": 7 }, "name": { "a": true, "h": "Name", "n": "name", "r": true, "sh": "Text keyed by language code.", "t": "`$OBJECT`", "key$": "name", "index$": 8 }, "officialName": { "a": true, "h": "Official Name", "n": "officialName", "r": true, "sh": "Canonical printing name.", "t": "`$STRING`", "key$": "officialName", "index$": 9 }, "populationPsa10": { "a": true, "h": "Population Psa10", "n": "populationPsa10", "r": true, "sh": "A published figure with its status and date.", "t": "`$OBJECT`", "key$": "populationPsa10", "index$": 10 }, "previousMarketRank": { "a": true, "h": "Previous Market Rank", "n": "previousMarketRank", "r": false, "sh": "Market rank in the previous snapshot.", "t": "`$INTEGER`", "key$": "previousMarketRank", "index$": 11 }, "pricePsa10": { "a": true, "h": "Price Psa10", "n": "pricePsa10", "r": true, "sh": "A published figure with its status and date.", "t": "`$OBJECT`", "key$": "pricePsa10", "index$": 12 }, "priceUngradedReference": { "a": true, "h": "Price Ungraded Reference", "n": "priceUngradedReference", "r": false, "sh": "Card detail only: ungraded reference price.", "t": "`$ANY`", "key$": "priceUngradedReference", "index$": 13 }, "printingIdentity": { "a": true, "h": "Printing Identity", "n": "printingIdentity", "r": true, "t": "`$OBJECT`", "key$": "printingIdentity", "index$": 14 }, "rank": { "a": true, "h": "Rank", "n": "rank", "r": true, "sh": "Position in this response's ordering.", "t": "`$INTEGER`", "key$": "rank", "index$": 15 }, "salesSparkline": { "a": true, "h": "Sales Sparkline", "n": "salesSparkline", "r": true, "sh": "Recent daily tracked-sales values for a sparkline.", "t": "`$ARRAY`", "key$": "salesSparkline", "index$": 16 }, "setName": { "a": true, "h": "Set Name", "n": "setName", "r": true, "sh": "Text keyed by language code.", "t": "`$OBJECT`", "key$": "setName", "index$": 17 }, "story": { "a": true, "h": "Story", "n": "story", "r": true, "sh": "Card detail only: editorial story text keyed by language code.", "t": "`$OBJECT`", "key$": "story", "index$": 18 }, "tcg": { "a": true, "h": "Tcg", "n": "tcg", "r": true, "sh": "\"Pokémon\" or \"One Piece\".", "t": "`$STRING`", "key$": "tcg", "index$": 19 }, "viewRank": { "a": true, "h": "View Rank", "n": "viewRank", "r": true, "sh": "Rank inside the requested scope.", "t": "`$INTEGER`", "key$": "viewRank", "index$": 20 }, "windows": { "a": true, "h": "Windows", "n": "windows", "r": true, "sh": "Change figures keyed by window: 1d, 7d, 30d, 90d, 180d, 365d.", "t": "`$OBJECT`", "key$": "windows", "index$": 21 } }, "id": { "field": "id", "name": "id" }, "name": "card", "op": { "load": { "input": "data", "name": "load", "points": [{ "a": true, "co": { "id": "GET /cards/{id}", "source": "openapi3", "version": 2 }, "g": { "params": [{ "a": true, "ex": "cmc_fc229f7ae1b256b2119fa79b", "k": "param", "n": "id", "or": "id", "r": true, "t": "`$STRING`", "index$": 0 }] }, "k": "http", "m": "GET", "o": "/cards/{id}", "q": { "exist": ["id"] }, "r": {}, "rs": { "kind": "json", "media": "application/json" }, "s": [{ "lit": "cards" }, { "var": "id" }], "t": { "req": "`reqdata`", "res": "`body`" }, "index$": 0 }], "key$": "load" } }, "relations": { "ancestors": [] }, "key$": "card", "name__orig": "card", "Name": "Card", "name_": "card", "name-": "card", "NAME": "CARD", "index$": 0 }, { "active": true, "entity": "card", "key$": "BasicCardFlow", "kind": "basic", "name": "BasicCardFlow", "param": {}, "step": [{ "a": true, "d": {}, "i": { "ref": "card_ref01", "srcdatavar": "card_ref01_data", "suffix": "_dt0" }, "m": { "id": "card01" }, "o": "load", "s": [], "v": [{ "apply": "TextFieldMark", "def": { "mark": "Mark01-card_ref01" } }], "index$": 0 }] }, 'Card', { "GET /cards/{id}": { "protocol": "http", "parameters": [{ "name": "id", "in": "path", "required": true, "description": "Card id from /market or /search.", "schema": { "type": "string" }, "example": "cmc_fc229f7ae1b256b2119fa79b", "index$": 0 }] } }, { strict: LIVE_STRICT, t });
        }
        const client = setup.client;
        const struct = setup.struct;
        const isempty = struct.isempty;
        const select = struct.select;
        let card_ref01_data = Object.values(setup.data.existing.card)[0];
        // LOAD
        const card_ref01_ent = client.Card();
        const card_ref01_match_dt0 = {};
        card_ref01_match_dt0.id = card_ref01_data.id;
        const card_ref01_data_dt0 = (await card_ref01_ent.load(card_ref01_match_dt0)).data();
        (0, node_assert_1.default)(card_ref01_data_dt0.id === card_ref01_data.id);
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
    const entityDataFile = node_path_1.default.resolve(__dirname, '../../../../.sdk/test/entity/card/CardTestData.json');
    // TODO: file ready util needed?
    const entityDataSource = Fs.readFileSync(entityDataFile).toString('utf8');
    // TODO: need a xlang JSON parse utility in voxgig/struct with better error msgs
    const entityData = JSON.parse(entityDataSource);
    options.entity = entityData.existing;
    let client = __1.CardzMarketcapSDK.test(options, extra);
    const struct = client.utility().struct;
    const merge = struct.merge;
    const transform = struct.transform;
    let idmap = transform(['card01', 'card02', 'card03'], {
        '`$PACK`': ['', {
                '`$KEY`': '`$COPY`',
                '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
            }]
    });
    const env = (0, utility_1.envOverride)({
        'CARDZ_MARKETCAP_TEST_CARD_ENTID': idmap,
        'CARDZ_MARKETCAP_TEST_LIVE': 'FALSE',
        'CARDZ_MARKETCAP_TEST_EXPLAIN': 'FALSE',
    });
    idmap = env['CARDZ_MARKETCAP_TEST_CARD_ENTID'];
    const live = 'TRUE' === env.CARDZ_MARKETCAP_TEST_LIVE;
    const transport = (0, live_runner_1.createLiveTransport)();
    if (live) {
        const rawIds = process.env['CARDZ_MARKETCAP_TEST_CARD_ENTID'];
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
//# sourceMappingURL=CardEntity.test.js.map