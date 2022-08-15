"use strict";
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ElementBootstrap = void 0;
var ElementBootstrap = /** @class */ (function () {
    function ElementBootstrap() {
    }
    ElementBootstrap.prototype.init = function (form) {
        var dependScript = form.getDependScript();
        dependScript.splice.apply(dependScript, __spreadArray([2, 0], [
            '<link href="https://unpkg.com/element-ui@2.12.0/lib/theme-chalk/index.css" rel="stylesheet">',
            '<script src="https://unpkg.com/element-ui@2.12.0/lib/index.js"></script>',
            '<script src="https://unpkg.com/@form-create/element-ui@1.0.20/dist/form-create.min.js"></script>',
        ], false));
        form.setDependScript(dependScript);
    };
    return ElementBootstrap;
}());
exports.ElementBootstrap = ElementBootstrap;
