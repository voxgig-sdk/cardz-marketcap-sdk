# CardzMarketcap SDK utility: make_context

from projectname_sdk.core.context import CardzMarketcapContext


def make_context_util(ctxmap, basectx):
    return CardzMarketcapContext(ctxmap, basectx)
