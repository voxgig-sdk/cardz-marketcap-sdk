import { CardzMarketcapEntityBase } from '../CardzMarketcapEntityBase';
import type { CardzMarketcapSDK } from '../CardzMarketcapSDK';
import type { Control } from '../types';
import type { Resolution, ResolutionListMatch } from '../CardzMarketcapTypes';
declare class ResolutionEntity extends CardzMarketcapEntityBase<Resolution> {
    constructor(client: CardzMarketcapSDK, entopts: any);
    make(this: ResolutionEntity): ResolutionEntity;
    list(this: any, reqmatch?: ResolutionListMatch, ctrl?: Control): Promise<ResolutionEntity[]>;
}
export { ResolutionEntity };
