"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const taro_1 = require("@tarojs/taro");
const url_search_params_1 = require("url-search-params");
const request_1 = require("~/components/request");
const config_1 = require("./config");
function extendTaroNavigate() {
    function getExtendFuntion(oldFunction) {
        return function extendFunction(parameter) {
            if (parameter.params) {
                parameter.url += '?' + new url_search_params_1.default(parameter.params).toString();
            }
            return oldFunction.bind(this)(parameter);
        };
    }
    taro_1.default.navigateTo = getExtendFuntion(taro_1.default.navigateTo);
    taro_1.default.redirectTo = getExtendFuntion(taro_1.default.redirectTo);
    taro_1.default.reLaunch = getExtendFuntion(taro_1.default.reLaunch);
}
function injectionTokenListener(params) {
    params.header = {
        ...params.header,
        Authorization: taro_1.default.getStorageSync('token')
    };
}
function injectionToken(token = taro_1.default.getStorageSync('token')) {
    if (token !== '') {
        taro_1.default.setStorageSync('token', token);
        request_1.default.eventEmitter.addListener(request_1.RequestEventEnum.WillSend, injectionTokenListener);
    }
}
function delInjectionToken() {
    taro_1.default.removeStorageSync('token');
    request_1.default.eventEmitter.removeListener(request_1.RequestEventEnum.WillSend, injectionTokenListener);
}
function watchRequest() {
    request_1.default.eventEmitter.addListener(request_1.RequestEventEnum.Receive, (req) => {
        switch (req.statusCode) {
            case 401:
                taro_1.default.navigateTo({
                    url: config_1.loginUrl
                });
                break;
        }
    });
}
/**
 * app初始化
 *
 * @export
 */
function mount() {
    extendTaroNavigate();
    injectionToken();
    watchRequest();
}
exports.default = mount;
/**
 * app退出
 *
 * @export
 */
function unMount() {
    delInjectionToken();
}
exports.unMount = unMount;
//# sourceMappingURL=lifeCycle.js.map