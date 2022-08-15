"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var form_1 = require("../core/form");
var base_1 = require("./base");
var Elm = /** @class */ (function (_super) {
    __extends(Elm, _super);
    function Elm() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    /**
     * 创建表单
     *
     * @param string action
     * @param array rule
     * @param array config
     * @return Form
     * @throws FormBuilderException
     */
    Elm.createForm = function (action, rule, config) {
        if (action === void 0) { action = ''; }
        if (rule === void 0) { rule = []; }
        if (config === void 0) { config = []; }
        return form_1.Form.elm(action, rule, config);
    };
    return Elm;
}(base_1.Base));
