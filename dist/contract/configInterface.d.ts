export declare abstract class ConfigInterface {
    abstract info($type: any): any;
    abstract formStyle($formStyle: any): any;
    abstract row($row: any): any;
    abstract submitBtn($submitBtn: boolean): void;
    abstract resetBtn($resetBtn: boolean): void;
    abstract injectEvent($bool: boolean): void;
    /**
     * @param string $componentName
     * @param array $config
     * @return $this
     */
    abstract componentGlobalConfig($componentName: any, $config: any): any;
    /**
     * @param array $config
     * @return $this
     */
    abstract componentGlobalCommonConfig($config: any): any;
    abstract getConfig(): any;
}
