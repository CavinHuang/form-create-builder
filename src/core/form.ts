import type { BootstrapInterface, ConfigInterface } from "../contract";
import { Util } from "../utils";

export class Form
{
    protected headers: Record<string, string> = {};

    protected formContentType = 'application/x-www-form-urlencoded';

    /**
     * @var BootstrapInterface
     */
    protected ui;

    /**
     * @var array|ConfigInterface
     */
    protected config;

    protected action;

    protected method = 'POST';

    protected title = 'FormBuilder';

    protected rule;

    protected formData: Record<string, any> = {};

    protected dependScript = [
        '<script src="https://unpkg.com/jquery@3.3.1/dist/jquery.min.js"></script>',
        '<script src="https://unpkg.com/vue@2.5.13/dist/vue.min.js"></script>',
        '<script src="https://unpkg.com/@form-create/data@1.0.0/dist/province_city.js"></script>',
        '<script src="https://unpkg.com/@form-create/data@1.0.0/dist/province_city_area.js"></script>'
    ];

    protected template;

    /**
     * Form constructor.
     * @param BootstrapInterface ui
     * @param string action
     * @param array rule
     * @param array config
     * @throws FormBuilderException
     */
    protected __construct(ui: BootstrapInterface, action = '', rule = [], config = [])
    {
        this.action = action;
        this.rule = rule;
        this.config = config;
        this.ui = ui;
        ui.init(this);
        this.checkFieldUnique();
        // this.template = dirname(__FILE__) . DIRECTORY_SEPARATOR . 'Template' . DIRECTORY_SEPARATOR . 'form.php';
    }

    /**
     * @return string
     */
    public getFormContentType()
    {
        return this.formContentType;
    }

    /**
     * @param string name
     * @param string value
     * @return this
     */
    public setHeader(name: string, value: string)
    {
        this.headers[name] = String(value);

        return this;
    }

    /**
     * @param array headers
     * @return this
     */
    public setHeaders(headers: Record<string, string>)
    {
        this.headers = headers;
        return this;
    }

    /**
     * @param array formData
     * @return this
     */
    public setFormData(formData: Record<string, any>)
    {
        this.formData = formData;
        return this;
    }

    /**
     * @param field
     * @param value
     * @return this
     */
    public setValue(field: string, value: any)
    {
        this.formData[field] = value;
        return this;
    }

    /**
     * @return false|string
     */
    public parseHeaders()
    {
        return JSON.stringify(this.headers);
    }

    /**
     * @param formContentType
     * @return this
     */
    public setFormContentType(formContentType: string)
    {
        this.formContentType = String(formContentType);

        return this;
    }

    public setDependScript(dependScript: string[])
    {
        this.dependScript = dependScript;
        return this;
    }

    /**
     * @param string title
     * @return this
     */
    public setTitle(title: string)
    {
        this.title = String(title);

        return this;
    }

    /**
     * @param string method
     * @return this
     */
    public setMethod(method: string)
    {
        this.method = method;
        return this;
    }

    /**
     * @return string|null
     */
    public getTitle()
    {
        return this.title;
    }

    /**
     * @return string|null
     */
    public getMethod()
    {
        return this.method;
    }

    /**
     * @param array rule
     * @return this
     * @throws FormBuilderException
     */
    public setRule(rule: any[])
    {
        this.rule = rule;
        this.checkFieldUnique();
        return this;
    }

    /**
     * @param array|ConfigInterface config
     * @return this
     */
    public setConfig(config: ConfigInterface)
    {
        if (config)
          this.config = config;
        return this;
    }

    /**
     * 追加组件
     *
     * @param component
     * @return this
     * @throws FormBuilderException
     */
    public append(component)
    {
        this.rule.push(component);
        this.checkFieldUnique();
        return this;
    }

    /**
     * 开头插入组件
     *
     * @param component
     * @return this
     * @throws FormBuilderException
     */
    public prepend(component)
    {
        this.rule.unshift(component)
        this.checkFieldUnique();
        return this;
    }

    /**
     * @param action
     * @return this
     */
    public setAction(action)
    {
        this.action = action;
        return this;
    }

    /**
     * @return string
     */
    public getAction()
    {
        return this.action;
    }

    /**
     * 提交按钮显示状态
     *
     * @param isShow
     * @return this
     */
    public showSubmitBtn(isShow)
    {
        if (this.config)
            this.config.submitBtn(!!isShow);
        else
            this.config['submitBtn'] = !!isShow;
        return this;
    }

    /**
     * 重置按钮显示状态
     *
     * @param isShow
     * @return this
     */
    public showResetBtn(isShow)
    {
        if (this.config)
            this.config.resetBtn(!!isShow);
        else
            this.config['resetBtn'] = !!isShow;
        return this;
    }

    /**
     * 设置组件全局配置
     * @param string componentName
     * @param array config
     * @return this
     */
    public componentGlobalConfig(componentName, config)
    {
        if (this.config)
            this.config.componentGlobalConfig(componentName, config);
        else {
            if (!this.config['global']) this.config['global'] = [];
            this.config['global'][componentName] = config;
        }
        return this;
    }

    protected parseFormComponent(rule: any)
    {
        if (Util.isComponent(rule)) {
            rule = rule.build();
        } else {
            if (rule['children'] && Array.isArray(rule['children'])) {
              rule['children'].forEach((child, i) => {
                rule['children'][i] = this.parseFormComponent(child);
              })
            if (rule['control']) {
              rule['control'].forEach((child, i) => {
                rule['children'][i] = this.parseFormComponent(child);
                child['rule'].forEach((rule, k) => {
                  child['rule'][k] = Util.isComponent(rule) ? rule.build() : rule;
                })
                rule['control'][i] = child;
              })
            }
          }
        }
        return rule;
    }

    public getDependScript()
    {
        return this.dependScript;
    }

    /**
     * @param array formData
     * @param array rule
     * @return array
     */
    protected deepSetFormData(formData, rule)
    {
        if (!count(formData)) return rule;
        foreach (rule as k => item) {
            if (is_array(item)) {
                if (isset(item['field']) && isset(formData[item['field']])) {
                    item['value'] = formData[item['field']];
                }
                if (isset(item['children']) && is_array(item['children']) && count(item['children'])) {
                    item['children'] = this->deepSetFormData(formData, item['children']);
                }
                if (isset(item['control']) && count(item['control'])) {
                    foreach (item['control'] as _k => _rule) {
                        item['control'][_k]['rule'] = this->deepSetFormData(formData, _rule['rule']);
                    }
                }
            }
            rule[k] = item;
        }

        return rule;
    }

    /**
     * 获取表单生成规则
     *
     * @return array
     */
    public formRule()
    {
        rules = [];
        foreach (this->rule as rule) {
            rules[] = this->parseFormComponent(rule);
        }
        return this->deepSetFormData(this->formData, rules);
    }

    /**
     * @return false|string
     */
    public parseFormRule()
    {
        return json_encode(this->formRule());
    }

    /**
     * @return false|string
     */
    public parseFormConfig()
    {
        return json_encode((object)this->formConfig());
    }

    /**
     * @return string
     */
    public parseDependScript()
    {
        return implode("\r\n", this->dependScript);
    }

    /**
     * 获取表单配置
     *
     * @return array
     */
    public formConfig()
    {
        config = this->config;
        if (config instanceof ConfigInterface) return config->getConfig();
        foreach (config as k => v) {
            config[k] = this->parseFormComponent(v);
        }
        return config;
    }


    /**
     * 获取表单创建的 js 代码
     *
     * @return false|string
     */
    public formScript()
    {
        return this->template(dirname(__FILE__) . DIRECTORY_SEPARATOR . 'Template' . DIRECTORY_SEPARATOR . 'createScript.min.php');
    }

    /**
     * 获取表单视图
     *
     * @return string
     */
    public view()
    {
        return this->template(this->template);
    }

    /**
     * 自定义表单页面
     *
     * @param templateDir
     * @return false|string
     */
    public template(templateDir)
    {
        ob_start();
        form = this;
        require templateDir;
        html = ob_get_clean();
        return html;
    }

    /**
     * 设置模板
     *
     * @param string templateDir
     * @return this
     */
    public setTemplate(templateDir)
    {
        this->template = templateDir;
        return this;
    }

    /**
     * 检查field 是否重复
     *
     * @param null rules
     * @param array fields
     * @return array
     * @throws FormBuilderException
     */
    protected checkFieldUnique(rules = null, fields = [])
    {
        if (is_null(rules)) rules = this->rule;

        foreach (rules as rule) {
            rule = this->parseFormComponent(rule);
            field = isset(rule['field']) ? rule['field'] : null;

            if (isset(rule['children']) && count(rule['children']))
                fields = this->checkFieldUnique(rule['children'], fields);

            if (is_null(field) || field === '')
                continue;
            else if (isset(fields[field]))
                throw new FormBuilderException('组件的 field 不能重复');
            else
                fields[field] = true;
        }

        return fields;
    }

    /**
     * Iview 版表单生成器
     *
     * @param string action
     * @param array rule
     * @param array|ConfigInterface config
     * @return Form
     * @throws FormBuilderException
     */
    public static iview(action = '', rule = [], config = [])
    {
        return new self(new IViewBootstrap(), action, rule, config);
    }

    /**
     * Iview v4 版表单生成器
     *
     * @param string action
     * @param array rule
     * @param array|ConfigInterface config
     * @return Form
     * @throws FormBuilderException
     */
    public static iview4(action = '', rule = [], config = [])
    {
        return new self(new IViewBootstrap(4), action, rule, config);
    }

    /**
     * element-ui 版表单生成器
     *
     * @param string action
     * @param array rule
     * @param array|ConfigInterface config
     * @return Form
     * @throws FormBuilderException
     */
    public static elm(action = '', rule = [], config = [])
    {
        return new self(new ElmBootstrap(), action, rule, config);
    }
}