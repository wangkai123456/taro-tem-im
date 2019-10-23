import request, { RequestEventEnum } from '~/components/request';
import { loginUrl } from '../../config';
import Taro from '@tarojs/taro';

function injectionTokenListener(params: Taro.request.Param<string | any>) {
    params.header = {
        ...params.header,
        Authorization: Taro.getStorageSync('token')
    };
}

export function injectionToken(token = Taro.getStorageSync('token')) {
    if (token !== '') {
        Taro.setStorageSync('token', token);
        request.eventEmitter.addListener(RequestEventEnum.WillSend, injectionTokenListener);
    }
}

export function delInjectionToken() {
    Taro.removeStorageSync('token');
    request.eventEmitter.removeListener(RequestEventEnum.WillSend, injectionTokenListener);
}

export function watchRequest() {
    request.eventEmitter.addListener(RequestEventEnum.Receive, (req) => {
        switch (req.statusCode) {
            case 401:
                Taro.navigateTo({
                    url: loginUrl
                });
                break;
        }
    });
}
