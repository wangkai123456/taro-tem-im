import request from '~/components/request';
import { loginUrl } from '../../config';
import Taro from '@tarojs/taro';
import { RequestEventEnum } from './const';

/**
 * 生命周期初始化
 *
 * @export
 */
export function initRequestLifecycle() {
    request.eventEmitter.addListener(RequestEventEnum.WillMount, requestWillMount);
    request.eventEmitter.addListener(RequestEventEnum.DidMount, requestDidMount);
}

/**
 * 请求发送开始 可修改请求参数
 *
 * @export
 * @param {(Taro.request.Param<string | any>)} params
 */
export function requestWillMount(params: Taro.request.Param<string | any>) {
    params.header = {
        ...params.header,
        Authorization: Taro.getStorageSync('token')
    };
}

export function requestDidMount(response: Taro.request.Promised) {
    switch (response.statusCode) {
        case 401:
            Taro.navigateTo({
                url: loginUrl
            });
            break;
    }
}
