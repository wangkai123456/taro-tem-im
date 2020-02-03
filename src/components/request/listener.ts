import request, { get } from '~/components/request';
import { loginUrl, silentAuthorization } from '../../config';
import Taro from '@tarojs/taro';
import { RequestEventEnum } from './const';
import { IRequestData, IRequestOption } from './fetch';

/**
 * 生命周期初始化
 *
 * @export
 */
export function initRequestLifecycle() {
    request.eventEmitter.addListener(RequestEventEnum.WillSend, requestWillMount);
    request.eventEmitter.addListener(RequestEventEnum.DidMount, requestDidMount as any);
}

/**
 * 请求发送开始 可修改请求参数
 *
 * @export
 * @param {(Taro.request.Param<string | any>)} params
 */
export async function requestWillMount(params: Taro.request.Param<string | any>) {
    let token = Taro.getStorageSync('token');

    if (!token) {
        if (silentAuthorization) {
            // 静默授权
            const { code } = await Taro.login();
            const { data: { token: DataToken, openid } } = await get('user/wxauth',
                { code }, {
                unWillSend: true
            });
            token = DataToken;
            Taro.setStorageSync('token', token);
            Taro.setStorageSync('openid', openid);
        } else {
            Taro.navigateTo({
                url: loginUrl
            });
        }
    }

    params.header = {
        ...params.header,
        Authorization: token
    };
}

export async function requestDidMount(response: Taro.request.Promised, params: {
    url: string, data: IRequestData | string, options: IRequestOption
}) {
    if (response.data) {
        switch (response.data.code) {
            case 401:
                Taro.setStorageSync('token', '');

                if (silentAuthorization) {
                    const res = await request.request<any>(params.url, params.data, params.options);
                    return res;
                }

                Taro.navigateTo({
                    url: loginUrl
                });
                break;
        }
    }
}

