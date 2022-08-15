"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Util = void 0;
var contract_1 = require("../contract");
var Util = /** @class */ (function () {
    function Util() {
    }
    Util.isComponent = function ($component) {
        return $component instanceof contract_1.CustomComponentInterface || $component instanceof contract_1.FormComponentInterface;
    };
    return Util;
}());
exports.Util = Util;
