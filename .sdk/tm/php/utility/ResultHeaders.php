<?php
declare(strict_types=1);

// CardzMarketcap SDK utility: result_headers

class CardzMarketcapResultHeaders
{
    public static function call(CardzMarketcapContext $ctx): ?CardzMarketcapResult
    {
        $response = $ctx->response;
        $result = $ctx->result;
        if ($result) {
            if ($response && is_array($response->headers)) {
                $result->headers = $response->headers;
            } else {
                $result->headers = [];
            }
        }
        return $result;
    }
}
