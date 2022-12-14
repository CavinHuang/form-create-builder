import { BootstrapInterface, ConfigInterface } from "../contract";
export declare class Form {
    protected headers: Record<string, string>;
    protected formContentType: string;
    /**
     * @var BootstrapInterface
     */
    protected ui: any;
    /**
     * @var array|ConfigInterface
     */
    protected config: any;
    protected action: any;
    protected method: string;
    protected title: string;
    protected rule: any;
    protected formData: Record<string, any>;
    protected dependScript: string[];
    protected template: any;
    /**
     * Form constructor.
     * @param BootstrapInterface ui
     * @param string action
     * @param array rule
     * @param array config
     * @throws FormBuilderException
     */
    protected constructor(ui: BootstrapInterface, action?: string, rule?: never[], config?: never[]);
    /**
     * @return string
     */
    getFormContentType(): string;
    /**
     * @param string name
     * @param string value
     * @return this
     */
    setHeader(name: string, value: string): this;
    /**
     * @param array headers
     * @return this
     */
    setHeaders(headers: Record<string, string>): this;
    /**
     * @param array formData
     * @return this
     */
    setFormData(formData: Record<string, any>): this;
    /**
     * @param field
     * @param value
     * @return this
     */
    setValue(field: string, value: any): this;
    /**
     * @return false|string
     */
    parseHeaders(): string;
    /**
     * @param formContentType
     * @return this
     */
    setFormContentType(formContentType: string): this;
    setDependScript(dependScript: string[]): this;
    /**
     * @param string title
     * @return this
     */
    setTitle(title: string): this;
    /**
     * @param string method
     * @return this
     */
    setMethod(method: string): this;
    /**
     * @return string|null
     */
    getTitle(): string;
    /**
     * @return string|null
     */
    getMethod(): string;
    /**
     * @param array rule
     * @return this
     * @throws FormBuilderException
     */
    setRule(rule: any[]): this;
    /**
     * @param array|ConfigInterface config
     * @return this
     */
    setConfig(config: ConfigInterface): this;
    /**
     * ????????????
     *
     * @param component
     * @return this
     * @throws FormBuilderException
     */
    append(component: any): this;
    /**
     * ??????????????????
     *
     * @param component
     * @return this
     * @throws FormBuilderException
     */
    prepend(component: any): this;
    /**
     * @param action
     * @return this
     */
    setAction(action: string): this;
    /**
     * @return string
     */
    getAction(): any;
    /**
     * ????????????????????????
     *
     * @param isShow
     * @return this
     */
    showSubmitBtn(isShow: boolean): this;
    /**
     * ????????????????????????
     *
     * @param isShow
     * @return this
     */
    showResetBtn(isShow: boolean): this;
    /**
     * ????????????????????????
     * @param string componentName
     * @param array config
     * @return this
     */
    componentGlobalConfig(componentName: string, config: any): this;
    protected parseFormComponent(rule: any): any;
    getDependScript(): string[];
    /**
     * @param array formData
     * @param array rule
     * @return array
     */
    protected deepSetFormData(formData: any, rule: any): any;
    /**
     * ????????????????????????
     *
     * @return array
     */
    formRule(): any;
    /**
     * @return false|string
     */
    parseFormRule(): string;
    /**
     * @return false|string
     */
    parseFormConfig(): string;
    /**
     * @return string
     */
    parseDependScript(): string;
    /**
     * ??????????????????
     *
     * @return array
     */
    formConfig(): any;
    /**
     * ????????????????????? js ??????
     *
     * @return false|string
     */
    formScript(): void;
    /**
     * ??????????????????
     *
     * @return string
     */
    view(): void;
    /**
     * ?????????????????????
     *
     * @param templateDir
     * @return false|string
     */
    /**
     * ????????????
     *
     * @param string templateDir
     * @return this
     */
    setTemplate(templateDir: any): void;
    /**
     * ??????field ????????????
     *
     * @param null rules
     * @param array fields
     * @return array
     * @throws FormBuilderException
     */
    protected checkFieldUnique(rules?: any, fields?: any): any;
    /**
     * Iview ??????????????????
     *
     * @param string action
     * @param array rule
     * @param array|ConfigInterface config
     * @return Form
     * @throws FormBuilderException
     */
    static iview(action?: string, rule?: never[], config?: never[]): void;
    /**
     * Iview v4 ??????????????????
     *
     * @param string action
     * @param array rule
     * @param array|ConfigInterface config
     * @return Form
     * @throws FormBuilderException
     */
    static iview4(action?: string, rule?: never[], config?: never[]): void;
    /**
     * element-ui ??????????????????
     *
     * @param string action
     * @param array rule
     * @param array|ConfigInterface config
     * @return Form
     * @throws FormBuilderException
     */
    static elm(action?: string, rule?: never[], config?: never[]): Form;
}
