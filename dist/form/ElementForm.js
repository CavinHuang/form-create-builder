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
exports.ElementForm = void 0;
var bootstrap_1 = require("../ui/element/bootstrap");
var form_1 = require("../core/form");
var ElementForm = /** @class */ (function (_super) {
    __extends(ElementForm, _super);
    function ElementForm(action, rule, config) {
        if (action === void 0) { action = ''; }
        if (rule === void 0) { rule = []; }
        if (config === void 0) { config = []; }
        return _super.call(this, new bootstrap_1.ElementBootstrap(), action, rule, config) || this;
    }
    return ElementForm;
}(form_1.Form));
exports.ElementForm = ElementForm;
