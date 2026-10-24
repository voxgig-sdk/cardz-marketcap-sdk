<?php
declare(strict_types=1);

// CardzMarketcap SDK utility: prepare_body

require_once __DIR__ . '/Media.php';

class CardzMarketcapPrepareBody
{
    public static function call(CardzMarketcapContext $ctx): mixed
    {
        if ($ctx->op->input === 'data') {
            if (CardzMarketcapMedia::isRawRequest($ctx->point)) {
                return CardzMarketcapMedia::rawBody($ctx->reqdata);
            }
            $body = ($ctx->utility->transform_request)($ctx);
            // PHP cannot tell an empty map from an empty list, and this
            // vendored struct answers [] where the canonical transform
            // answers NO VALUE for a reference that resolves to nothing -
            // collapse both to "no body" (the shared corpus pins the
            // missing-reference case to null).
            return (is_array($body) && 0 === count($body)) ? null : $body;
        }
        return null;
    }
}
