import { CardzMarketcapEntityBase } from '../CardzMarketcapEntityBase';
import type { CardzMarketcapSDK } from '../CardzMarketcapSDK';
import type { Control } from '../types';
import type { Card, CardLoadMatch } from '../CardzMarketcapTypes';
declare class CardEntity extends CardzMarketcapEntityBase<Card> {
    constructor(client: CardzMarketcapSDK, entopts: any);
    make(this: CardEntity): CardEntity;
    load(this: any, reqmatch?: CardLoadMatch, ctrl?: Control): Promise<CardEntity>;
}
export { CardEntity };
