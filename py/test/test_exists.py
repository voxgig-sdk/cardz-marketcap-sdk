# CardzMarketcap SDK exists test

import pytest
from cardzmarketcap_sdk import CardzMarketcapSDK


class TestExists:

    def test_should_create_test_sdk(self):
        testsdk = CardzMarketcapSDK.test(None, None)
        assert testsdk is not None
