import { CardzMarketcapEntityBase } from '../CardzMarketcapEntityBase';
import type { CardzMarketcapSDK } from '../CardzMarketcapSDK';
import type { Control } from '../types';
import type { Market, MarketListMatch } from '../CardzMarketcapTypes';
declare class MarketEntity extends CardzMarketcapEntityBase<Market> {
    constructor(client: CardzMarketcapSDK, entopts: any);
    make(this: MarketEntity): MarketEntity;
    list(this: any, reqmatch?: MarketListMatch, ctrl?: Control): Promise<MarketEntity[]>;
}
export { MarketEntity };
