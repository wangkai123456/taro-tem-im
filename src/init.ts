import Taro, { NavigateArguments } from '@tarojs/taro';
import URLSearchParams from 'url-search-params';
import request, { RequestEventEnum, get } from '~/components/request';

let navigateTo = Taro.navigateTo;
Taro.navigateTo = (parameter: NavigateArguments) => {
    if (parameter.params) {
        parameter.url += '?' + new URLSearchParams(parameter.params).toString();

    }
    return navigateTo(parameter);
};

export function injectionToken(token) {
    request.eventEmitter.addListener(RequestEventEnum.WillSend, (params: Taro.request.Param<string | any>) => {
        params.header = {
            ...params.header,
            Authorization: token
        }
    })
}

function initToken(token = Taro.getStorageSync('token')) {
    if (token !== '') {
        injectionToken(token);
    }
}

export default function init() {
    initToken();
}
