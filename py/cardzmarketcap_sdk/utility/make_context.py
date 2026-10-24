# CardzMarketcap SDK utility: make_context

from cardzmarketcap_sdk.core.context import CardzMarketcapContext


def make_context_util(ctxmap, basectx):
    return CardzMarketcapContext(ctxmap, basectx)
