<?php
declare(strict_types=1);

// CardzMarketcap SDK base feature

class CardzMarketcapBaseFeature
{
    public string $version;
    public string $name;
    public bool $active;

    // Positions this feature when added via the client `extend` option:
    // "__before__" / "__after__" / "__replace__" name an already-added
    // feature (mirrors the ts feature `_options`). Declared so setting it
    // on an extension instance avoids the dynamic-property deprecation.
    public ?array $_options = null;

    public function __construct()
    {
        $this->version = '0.0.1';
        $this->name = 'base';
        $this->active = true;
    }

    public function get_version(): string { return $this->version; }
    public function get_name(): string { return $this->name; }
    public function get_active(): bool { return $this->active; }

    public function init(CardzMarketcapContext $ctx, array $options): void {}
    public function PostConstruct(CardzMarketcapContext $ctx): void {}
    public function PostConstructEntity(CardzMarketcapContext $ctx): void {}
    public function SetData(CardzMarketcapContext $ctx): void {}
    public function GetData(CardzMarketcapContext $ctx): void {}
    public function GetMatch(CardzMarketcapContext $ctx): void {}
    public function SetMatch(CardzMarketcapContext $ctx): void {}
    public function PrePoint(CardzMarketcapContext $ctx): void {}
    public function PreSpec(CardzMarketcapContext $ctx): void {}
    public function PreRequest(CardzMarketcapContext $ctx): void {}
    public function PreResponse(CardzMarketcapContext $ctx): void {}
    public function PreResult(CardzMarketcapContext $ctx): void {}
    public function PreDone(CardzMarketcapContext $ctx): void {}
    public function PreUnexpected(CardzMarketcapContext $ctx): void {}
}
