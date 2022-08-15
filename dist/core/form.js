"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Form = void 0;
var bootstrap_1 = require("../ui/element/bootstrap");
var contract_1 = require("../contract");
var utils_1 = require("../utils");
var Form = /** @class */ (function () {
    /**
     * Form constructor.
     * @param BootstrapInterface ui
     * @param string action
     * @param array rule
     * @param array config
     * @throws FormBuilderException
     */
    function Form(ui, action, rule, config) {
        if (action === void 0) { action = ''; }
        if (rule === void 0) { rule = []; }
        if (config === void 0) { config = []; }
        this.headers = {};
        this.formContentType = 'application/x-www-form-urlencoded';
        this.method = 'POST';
        this.title = 'FormBuilder';
        this.formData = {};
        this.dependScript = [
            '<script src="https://unpkg.com/jquery@3.3.1/dist/jquery.min.js"></script>',
            '<script src="https://unpkg.com/vue@2.5.13/dist/vue.min.js"></script>',
            '<script src="https://unpkg.com/@form-create/data@1.0.0/dist/province_city.js"></script>',
            '<script src="https://unpkg.com/@form-create/data@1.0.0/dist/province_city_area.js"></script>'
        ];
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
    Form.prototype.getFormContentType = function () {
        return this.formContentType;
    };
    /**
     * @param string name
     * @param string value
     * @return this
     */
    Form.prototype.setHeader = function (name, value) {
        this.headers[name] = String(value);
        return this;
    };
    /**
     * @param array headers
     * @return this
     */
    Form.prototype.setHeaders = function (headers) {
        this.headers = headers;
        return this;
    };
    /**
     * @param array formData
     * @return this
     */
    Form.prototype.setFormData = function (formData) {
        this.formData = formData;
        return this;
    };
    /**
     * @param field
     * @param value
     * @return this
     */
    Form.prototype.setValue = function (field, value) {
        this.formData[field] = value;
        return this;
    };
    /**
     * @return false|string
     */
    Form.prototype.parseHeaders = function () {
        return JSON.stringify(this.headers);
    };
    /**
     * @param formContentType
     * @return this
     */
    Form.prototype.setFormContentType = function (formContentType) {
        this.formContentType = String(formContentType);
        return this;
    };
    Form.prototype.setDependScript = function (dependScript) {
        this.dependScript = dependScript;
        return this;
    };
    /**
     * @param string title
     * @return this
     */
    Form.prototype.setTitle = function (title) {
        this.title = String(title);
        return this;
    };
    /**
     * @param string method
     * @return this
     */
    Form.prototype.setMethod = function (method) {
        this.method = method;
        return this;
    };
    /**
     * @return string|null
     */
    Form.prototype.getTitle = function () {
        return this.title;
    };
    /**
     * @return string|null
     */
    Form.prototype.getMethod = function () {
        return this.method;
    };
    /**
     * @param array rule
     * @return this
     * @throws FormBuilderException
     */
    Form.prototype.setRule = function (rule) {
        this.rule = rule;
        this.checkFieldUnique();
        return this;
    };
    /**
     * @param array|ConfigInterface config
     * @return this
     */
    Form.prototype.setConfig = function (config) {
        if (config)
            this.config = config;
        return this;
    };
    /**
     * 追加组件
     *
     * @param component
     * @return this
     * @throws FormBuilderException
     */
    Form.prototype.append = function (component) {
        this.rule.push(component);
        this.checkFieldUnique();
        return this;
    };
    /**
     * 开头插入组件
     *
     * @param component
     * @return this
     * @throws FormBuilderException
     */
    Form.prototype.prepend = function (component) {
        this.rule.unshift(component);
        this.checkFieldUnique();
        return this;
    };
    /**
     * @param action
     * @return this
     */
    Form.prototype.setAction = function (action) {
        this.action = action;
        return this;
    };
    /**
     * @return string
     */
    Form.prototype.getAction = function () {
        return this.action;
    };
    /**
     * 提交按钮显示状态
     *
     * @param isShow
     * @return this
     */
    Form.prototype.showSubmitBtn = function (isShow) {
        if (this.config)
            this.config.submitBtn(!!isShow);
        else
            this.config['submitBtn'] = !!isShow;
        return this;
    };
    /**
     * 重置按钮显示状态
     *
     * @param isShow
     * @return this
     */
    Form.prototype.showResetBtn = function (isShow) {
        if (this.config)
            this.config.resetBtn(!!isShow);
        else
            this.config['resetBtn'] = !!isShow;
        return this;
    };
    /**
     * 设置组件全局配置
     * @param string componentName
     * @param array config
     * @return this
     */
    Form.prototype.componentGlobalConfig = function (componentName, config) {
        if (this.config)
            this.config.componentGlobalConfig(componentName, config);
        else {
            if (!this.config['global'])
                this.config['global'] = [];
            this.config['global'][componentName] = config;
        }
        return this;
    };
    Form.prototype.parseFormComponent = function (rule) {
        var _this = this;
        if (utils_1.Util.isComponent(rule)) {
            rule = rule.build();
        }
        else {
            if (rule['children'] && Array.isArray(rule['children'])) {
                rule['children'].forEach(function (child, i) {
                    rule['children'][i] = _this.parseFormComponent(child);
                });
                if (rule['control']) {
                    rule['control'].forEach(function (child, i) {
                        rule['children'][i] = _this.parseFormComponent(child);
                        child['rule'].forEach(function (rule, k) {
                            child['rule'][k] = utils_1.Util.isComponent(rule) ? rule.build() : rule;
                        });
                        rule['control'][i] = child;
                    });
                }
            }
        }
        return rule;
    };
    Form.prototype.getDependScript = function () {
        return this.dependScript;
    };
    /**
     * @param array formData
     * @param array rule
     * @return array
     */
    Form.prototype.deepSetFormData = function (formData, rule) {
        var _this = this;
        if (!formData.length)
            return rule;
        rule.forEach(function (item, k) {
            if (item) {
                if (item['field'] && formData[item['field']]) {
                    item.value = formData[item['field']];
                }
                if (item.children && Array.isArray(item.children) && item.children.length) {
                    item['children'] = _this.deepSetFormData(formData, item['children']);
                }
                if (item['control'] && item['control'].length) {
                    item['control'].forEach(function (_rule, _k) {
                        item['control'][_k]['rule'] = _this.deepSetFormData(formData, _rule['rule']);
                    });
                }
            }
            rule[k] = item;
        });
        return rule;
    };
    /**
     * 获取表单生成规则
     *
     * @return array
     */
    Form.prototype.formRule = function () {
        var _this = this;
        var rules = [];
        this.rule.forEach(function (rule) {
            rules.push(_this.parseFormComponent(rule));
        });
        return this.deepSetFormData(this.formData, rules);
    };
    /**
     * @return false|string
     */
    Form.prototype.parseFormRule = function () {
        return JSON.stringify(this.formRule());
    };
    /**
     * @return false|string
     */
    Form.prototype.parseFormConfig = function () {
        return JSON.stringify(this.formConfig);
    };
    /**
     * @return string
     */
    Form.prototype.parseDependScript = function () {
        return this.dependScript.join("\r\n");
    };
    /**
     * 获取表单配置
     *
     * @return array
     */
    Form.prototype.formConfig = function () {
        var _this = this;
        var config = this.config;
        if (config instanceof contract_1.ConfigInterface)
            return config.getConfig();
        config.forEach(function (v, k) {
            config[k] = _this.parseFormComponent(v);
        });
        return config;
    };
    /**
     * 获取表单创建的 js 代码
     *
     * @return false|string
     */
    Form.prototype.formScript = function () {
        // return this->template(dirname(__FILE__) . DIRECTORY_SEPARATOR . 'Template' . DIRECTORY_SEPARATOR . 'createScript.min.php');
    };
    /**
     * 获取表单视图
     *
     * @return string
     */
    Form.prototype.view = function () {
        // return this->template(this->template);
    };
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
    Form.prototype.setTemplate = function (templateDir) {
        // this->template = templateDir;
        // return this;
    };
    /**
     * 检查field 是否重复
     *
     * @param null rules
     * @param array fields
     * @return array
     * @throws FormBuilderException
     */
    Form.prototype.checkFieldUnique = function (rules, fields) {
        var _this = this;
        if (rules === void 0) { rules = null; }
        if (fields === void 0) { fields = []; }
        if (rules === null)
            rules = this.rule;
        rules.forEach(function (rule) {
            rule = _this.parseFormComponent(rule);
            var field = rule['field'] ? rule['field'] : null;
            if (rule['children'] && rule['children'].lenght) {
                fields = _this.checkFieldUnique(rule['children'], fields);
            }
            if (field === null || field === '') {
                return true;
            }
            else if (fields[field]) {
                throw new Error('组件的 field 不能重复');
            }
            else {
                fields[field] = true;
            }
        });
        return fields;
    };
    /**
     * Iview 版表单生成器
     *
     * @param string action
     * @param array rule
     * @param array|ConfigInterface config
     * @return Form
     * @throws FormBuilderException
     */
    Form.iview = function (action, rule, config) {
        if (action === void 0) { action = ''; }
        if (rule === void 0) { rule = []; }
        if (config === void 0) { config = []; }
        // return new Form(new IViewBootstrap(), action, rule, config);
    };
    /**
     * Iview v4 版表单生成器
     *
     * @param string action
     * @param array rule
     * @param array|ConfigInterface config
     * @return Form
     * @throws FormBuilderException
     */
    Form.iview4 = function (action, rule, config) {
        if (action === void 0) { action = ''; }
        if (rule === void 0) { rule = []; }
        if (config === void 0) { config = []; }
        // return new self(new IViewBootstrap(4), action, rule, config);
    };
    /**
     * element-ui 版表单生成器
     *
     * @param string action
     * @param array rule
     * @param array|ConfigInterface config
     * @return Form
     * @throws FormBuilderException
     */
    Form.elm = function (action, rule, config) {
        if (action === void 0) { action = ''; }
        if (rule === void 0) { rule = []; }
        if (config === void 0) { config = []; }
        return new Form(new bootstrap_1.ElementBootstrap(), action, rule, config);
    };
    return Form;
}());
exports.Form = Form;
