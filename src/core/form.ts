import { ElementBootstrap } from "../ui/element/bootstrap";
import { BootstrapInterface, ConfigInterface } from "../contract";
import { Util } from "../utils";

export class Form
{
    protected headers: Record<string, string> = {};

    protected formContentType = 'application/x-www-form-urlencoded';

    /**
     * @var BootstrapInterface
     */
    protected ui: any;

    /**
     * @var array|ConfigInterface
     */
    protected config: any;

    protected action: any;

    protected method = 'POST';

    protected title = 'FormBuilder';

    protected rule: any;

    protected formData: Record<string, any> = {};

    protected dependScript = [
        '<script src="https://unpkg.com/jquery@3.3.1/dist/jquery.min.js"></script>',
        '<script src="https://unpkg.com/vue@2.5.13/dist/vue.min.js"></script>',
        '<script src="https://unpkg.com/@form-create/data@1.0.0/dist/province_city.js"></script>',
        '<script src="https://unpkg.com/@form-create/data@1.0.0/dist/province_city_area.js"></script>'
    ];

    protected template: any;

    /**
     * Form constructor.
     * @param BootstrapInterface ui
     * @param string action
     * @param array rule
     * @param array config
     * @throws FormBuilderException
     */
    protected constructor(ui: BootstrapInterface, action = '', rule = [], config = [])
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
    public append(component: any)
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
    public prepend(component: any)
    {
        this.rule.unshift(component)
        this.checkFieldUnique();
        return this;
    }

    /**
     * @param action
     * @return this
     */
    public setAction(action: string)
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
    public showSubmitBtn(isShow: boolean)
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
    public showResetBtn(isShow: boolean)
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
    public componentGlobalConfig(componentName: string, config: any)
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
              rule['control'].forEach((child: any, i: number) => {
                rule['children'][i] = this.parseFormComponent(child);
                child['rule'].forEach((rule: any, k: number) => {
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
    protected deepSetFormData(formData: any, rule: any)
    {
        if (!formData.length) return rule;
        rule.forEach((item: any, k: any) => {
          if (item) {
            if (item['field'] && formData[item['field']]) {
              item.value = formData[item['field']]
            }
            if (item.children && Array.isArray(item.children) && item.children.length) {
              item['children'] = this.deepSetFormData(formData, item['children']);
            }
            if (item['control'] && item['control'].length) {
              item['control'].forEach((_rule: any, _k: number) => {
                item['control'][_k]['rule'] = this.deepSetFormData(formData, _rule['rule']);
              })
            }
          }
          rule[k] = item
        })
        return rule;
    }

    /**
     * 获取表单生成规则
     *
     * @return array
     */
    public formRule()
    {
        const rules: any[] = [];
        this.rule.forEach((rule: any) => {
          rules.push(this.parseFormComponent(rule))
        })
        return this.deepSetFormData(this.formData, rules);
    }

    /**
     * @return false|string
     */
    public parseFormRule()
    {
        return JSON.stringify(this.formRule());
    }

    /**
     * @return false|string
     */
    public parseFormConfig()
    {
        return JSON.stringify(this.formConfig);
    }

    /**
     * @return string
     */
    public parseDependScript()
    {
        return this.dependScript.join("\r\n");
    }

    /**
     * 获取表单配置
     *
     * @return array
     */
    public formConfig()
    {
        const config = this.config;
        if (config instanceof ConfigInterface) return config.getConfig();
        config.forEach((v: any, k: number) => {
          config[k] = this.parseFormComponent(v)
        })
        return config;
    }


    /**
     * 获取表单创建的 js 代码
     *
     * @return false|string
     */
    public formScript()
    {
        // return this->template(dirname(__FILE__) . DIRECTORY_SEPARATOR . 'Template' . DIRECTORY_SEPARATOR . 'createScript.min.php');
    }

    /**
     * 获取表单视图
     *
     * @return string
     */
    public view()
    {
        // return this->template(this->template);
    }

    /**
     * 自定义表单页面
     *
     * @param templateDir
     * @return false|string
     */
    // public template(templateDir)
    // {
        // ob_start();
        // form = this;
        // require templateDir;
        // html = ob_get_clean();
        // return html;
    // }

    /**
     * 设置模板
     *
     * @param string templateDir
     * @return this
     */
    public setTemplate(templateDir: any)
    {
        // this->template = templateDir;
        // return this;
    }

    /**
     * 检查field 是否重复
     *
     * @param null rules
     * @param array fields
     * @return array
     * @throws FormBuilderException
     */
    protected checkFieldUnique(rules: any = null, fields: any = [])
    {
        if (rules === null) rules = this.rule;

        rules.forEach((rule: any) => {
          rule = this.parseFormComponent(rule);
          const field = rule['field'] ? rule['field'] : null

          if (rule['children'] && rule['children'].lenght) {
            fields = this.checkFieldUnique(rule['children'], fields);
          }
          if (field === null || field === '') {
            return true
          } else if (fields[field]) {
            throw new Error('组件的 field 不能重复')
          } else {
            fields[field] = true;
          }
        })
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
        // return new Form(new IViewBootstrap(), action, rule, config);
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
        // return new self(new IViewBootstrap(4), action, rule, config);
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
        return new Form(new ElementBootstrap(), action, rule, config);
    }
}