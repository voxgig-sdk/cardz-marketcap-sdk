import { CardzMarketcapEntityBase } from '../CardzMarketcapEntityBase';
import type { CardzMarketcapSDK } from '../CardzMarketcapSDK';
import type { Control } from '../types';
import type { Search, SearchListMatch } from '../CardzMarketcapTypes';
declare class SearchEntity extends CardzMarketcapEntityBase<Search> {
    constructor(client: CardzMarketcapSDK, entopts: any);
    make(this: SearchEntity): SearchEntity;
    list(this: any, reqmatch?: SearchListMatch, ctrl?: Control): Promise<SearchEntity[]>;
}
export { SearchEntity };
