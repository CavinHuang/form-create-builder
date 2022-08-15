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
     * 追加组件
     *
     * @param component
     * @return this
     * @throws FormBuilderException
     */
    append(component: any): this;
    /**
     * 开头插入组件
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
     * 提交按钮显示状态
     *
     * @param isShow
     * @return this
     */
    showSubmitBtn(isShow: boolean): this;
    /**
     * 重置按钮显示状态
     *
     * @param isShow
     * @return this
     */
    showResetBtn(isShow: boolean): this;
    /**
     * 设置组件全局配置
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
     * 获取表单生成规则
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
     * 获取表单配置
     *
     * @return array
     */
    formConfig(): any;
    /**
     * 获取表单创建的 js 代码
     *
     * @return false|string
     */
    formScript(): void;
    /**
     * 获取表单视图
     *
     * @return string
     */
    view(): void;
    /**
     * 自定义表单页面
     *
     * @param templateDir
     * @return false|string
     */
    /**
     * 设置模板
     *
     * @param string templateDir
     * @return this
     */
    setTemplate(templateDir: any): void;
    /**
     * 检查field 是否重复
     *
     * @param null rules
     * @param array fields
     * @return array
     * @throws FormBuilderException
     */
    protected checkFieldUnique(rules?: any, fields?: any): any;
    /**
     * Iview 版表单生成器
     *
     * @param string action
     * @param array rule
     * @param array|ConfigInterface config
     * @return Form
     * @throws FormBuilderException
     */
    static iview(action?: string, rule?: never[], config?: never[]): void;
    /**
     * Iview v4 版表单生成器
     *
     * @param string action
     * @param array rule
     * @param array|ConfigInterface config
     * @return Form
     * @throws FormBuilderException
     */
    static iview4(action?: string, rule?: never[], config?: never[]): void;
    /**
     * element-ui 版表单生成器
     *
     * @param string action
     * @param array rule
     * @param array|ConfigInterface config
     * @return Form
     * @throws FormBuilderException
     */
    static elm(action?: string, rule?: never[], config?: never[]): Form;
}
