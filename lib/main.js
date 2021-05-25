"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Meta = void 0;
// 常用类型定义
var Meta = /** @class */ (function () {
    function Meta(code, intro, state) {
        this.code = code;
        this.intro = intro;
        this.state = state;
    }
    return Meta;
}());
exports.Meta = Meta;
// 判断一个值是不是undefined
function isUndefined(value) {
    return typeof value === 'undefined';
}
// 判断一个值是不是null
function isNull(value) {
    return typeof value === 'object' && !value;
}
// 判断值是否为空
function isEmpty(value) {
    return isNull(value) || isUndefined(value);
}
var UltMeta = /** @class */ (function () {
    function UltMeta() {
        this.mapping = new Map();
    }
    UltMeta.prototype.initMapping = function () {
        var _this = this;
        if (Array.from(this.mapping.entries()).length)
            return;
        Object.keys(this).forEach(function (key, i, a) {
            // 初始化每一个def实例
            // @ts-ignore
            if (key === 'mapping')
                return;
            // @ts-ignore
            _this.mapping.set(_this[key].code, _this[key]);
        });
    };
    // 通过code获取intro
    UltMeta.prototype.getIntroByCode = function (code) {
        this.initMapping();
        var def = this.mapping.get(code);
        if (isEmpty(def)) {
            return null;
        }
        return def.intro;
    };
    // 通过code获取state
    UltMeta.prototype.getStateByCode = function (code) {
        this.initMapping();
        var def = this.mapping.get(code);
        if (isEmpty(def) || (!isEmpty(def) && isUndefined(def.state))) {
            return null;
        }
        return def.state;
    };
    return UltMeta;
}());
exports.default = UltMeta;
