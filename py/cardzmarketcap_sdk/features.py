# CardzMarketcap SDK feature factory

from cardzmarketcap_sdk.feature.base_feature import CardzMarketcapBaseFeature
from cardzmarketcap_sdk.feature.ratelimit_feature import CardzMarketcapRatelimitFeature
from cardzmarketcap_sdk.feature.retry_feature import CardzMarketcapRetryFeature
from cardzmarketcap_sdk.feature.test_feature import CardzMarketcapTestFeature
from cardzmarketcap_sdk.feature.timeout_feature import CardzMarketcapTimeoutFeature


_FEATURES = {
    "base": lambda: CardzMarketcapBaseFeature(),
    "ratelimit": lambda: CardzMarketcapRatelimitFeature(),
    "retry": lambda: CardzMarketcapRetryFeature(),
    "test": lambda: CardzMarketcapTestFeature(),
    "timeout": lambda: CardzMarketcapTimeoutFeature(),
}


def _make_feature(name):
    factory = _FEATURES.get(name)
    if factory is not None:
        return factory()
    return _FEATURES["base"]()


# True when this SDK was generated with the named feature class - the
# constructor's tolerance for extend-carried features reads this (an
# active name with no generated class must not become a BaseFeature
# stray when an extend instance carries it).
def _has_feature(name):
    return name in _FEATURES
