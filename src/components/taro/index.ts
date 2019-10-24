import Taro from '@tarojs/taro';
import URLSearchParams from 'url-search-params';

export function extendTaroNavigate() {
    function getExtendFuntion(oldFunction) {
        return function extendFunction(parameter) {
            if (parameter.params) {
                parameter.url += '?' + new URLSearchParams(parameter.params).toString();
            }
            return oldFunction.bind(this)(parameter);
        };
    }

    Taro.navigateTo = getExtendFuntion(Taro.navigateTo);
    Taro.redirectTo = getExtendFuntion(Taro.redirectTo);
    Taro.reLaunch = getExtendFuntion(Taro.reLaunch);
}
