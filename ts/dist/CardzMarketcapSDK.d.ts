import { CardEntity } from './entity/CardEntity';
import { MarketEntity } from './entity/MarketEntity';
import { ResolutionEntity } from './entity/ResolutionEntity';
import { SearchEntity } from './entity/SearchEntity';
export type * from './CardzMarketcapTypes';
import { inspect } from 'node:util';
import type { Context, Feature } from './types';
import { config } from './Config';
import { CardzMarketcapEntityBase } from './CardzMarketcapEntityBase';
import { Utility } from './utility/Utility';
import { BaseFeature } from './feature/base/BaseFeature';
declare const stdutil: Utility;
type DirectResult = {
    ok: false;
    err: any;
    status?: undefined;
    headers?: undefined;
    data?: undefined;
} | {
    ok: boolean;
    status: number;
    headers: any;
    data: any;
    err?: any;
};
declare class CardzMarketcapSDK {
    _mode: string;
    _options: any;
    _utility: Utility;
    _features: Feature[];
    _rootctx: Context;
    constructor(options?: any);
    options(): any;
    utility(): any;
    prepare(fetchargs?: any): Promise<any>;
    direct(fetchargs?: any): Promise<DirectResult>;
    _rawRequest(fetchargs?: any): Promise<DirectResult>;
    graphql(query: string, variables?: any, ctrl?: any): Promise<any>;
    Card(entopts?: Record<string, any>): CardEntity;
    Market(entopts?: Record<string, any>): MarketEntity;
    Resolution(entopts?: Record<string, any>): ResolutionEntity;
    Search(entopts?: Record<string, any>): SearchEntity;
    static test(testoptsarg?: any, sdkoptsarg?: any): CardzMarketcapSDK;
    tester(testopts?: any, sdkopts?: any): CardzMarketcapSDK;
    toJSON(): {
        name: string;
    };
    toString(): string;
    [inspect.custom](): string;
}
declare const SDK: typeof CardzMarketcapSDK;
export { stdutil, config, BaseFeature, CardzMarketcapEntityBase, CardzMarketcapSDK, SDK, };
export type { DirectResult };
