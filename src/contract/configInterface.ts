export abstract class ConfigInterface
{
    abstract info($type);

    abstract formStyle($formStyle);

    abstract row($row);

    abstract submitBtn($submitBtn);

    abstract resetBtn($resetBtn);

    abstract injectEvent($bool);

    /**
     * @param string $componentName
     * @param array $config
     * @return $this
     */
    abstract componentGlobalConfig($componentName, $config: any);

    /**
     * @param array $config
     * @return $this
     */
    abstract componentGlobalCommonConfig($config: any);

    abstract getConfig();
}