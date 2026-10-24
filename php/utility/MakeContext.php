<?php
declare(strict_types=1);

// CardzMarketcap SDK utility: make_context

require_once __DIR__ . '/../core/Context.php';

class CardzMarketcapMakeContext
{
    public static function call(array $ctxmap, ?CardzMarketcapContext $basectx): CardzMarketcapContext
    {
        return new CardzMarketcapContext($ctxmap, $basectx);
    }
}
