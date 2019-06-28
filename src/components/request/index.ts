import Taro from '@tarojs/taro';
import { apiUrl } from '../../config';

interface Data {
    [key: string]: any
}

/**
 * 参数
 *
 * @interface IInterceptor
 */
interface IRequestOption extends Partial<Taro.request.Param<string | Data>> {

    /**
     * 启动错误弹窗
     *
     * @type {boolean}
     * @memberof IFetchOption
     */
    showFailToast?: boolean

    /**
     * 是否捕获错误 [接口status错误,阻止代码的继续运行]
     *
     * @type {boolean}
     * @memberof IFetchOption
     */
    isCatchFail?: boolean

}


class APPRequest {

    defaultOptions: IRequestOption = {
        showFailToast: true,
        isCatchFail: true
    }

    private async getHeader() {
        Taro.getStorage
        let token = '';

        try {
            const data = await Taro.getStorage({ key: 'token' });
            token = (data as any).token;
        } catch (error) {

        }

        const headers = {};
        if (token) {
            headers['Authorization'] = token;
        }
        headers['Content-Type'] = 'application/json';
        return headers;
    }


    async request<T>(url: string, data: Data | string = {}, options: IRequestOption): Promise<Taro.request.Promised<T>> {
        url = this.normalizationUrl(url);
        options = { ...this.defaultOptions, ...options };
        let header = await this.getHeader();

        const res = await Taro.request({
            url,
            data,
            header,
            ...options
        });

        if (options.showFailToast) {
            this.failToast(res, url);
        }

        if (options.isCatchFail) {
            await this.catchFail(res);
        }

        return res;
    }

    private normalizationUrl(url: string) {
        if (typeof url === 'string') {

            if (apiUrl[apiUrl.length - 1] === '/') {
                if (url[0] === '/') {
                    url = url.replace('/', '');
                }
            } else {
                if (url[0] !== '/') {
                    url = '/' + url;
                }
            }

            if (!/^https{0,1}:\/\//g.test(url)) {
                url = `${apiUrl}${url}`;
            }
        }

        return url;
    }

    private async failToast(response: Taro.request.Promised, url: string) {
        if (!this.validateStatus(response)) {
            let data = response.data;

            Taro.showToast({
                title: `url:${url.toString()}:, status:${response.statusCode}, responseText:${data}`
            })
        }
    }


    private catchFail(response: Taro.request.Promised) {
        return new Promise<Taro.request.Promised>(async (resolve, reject) => {
            if (this.validateStatus(response)) {
                resolve(response);
            } else {
                reject(response);
            }
        })
    }

    private validateStatus(response: Taro.request.Promised) {
        return response.statusCode >= 200 && response.statusCode < 300
    }
}

let appFetch = new APPRequest();


export function get<T = any>(url: string, data?: Data | string, option: IRequestOption = {}) {
    return appFetch.request<T>(url, data, {
        method: 'GET',
        ...option
    });
}


export function post<T = any>(url: string, data?: Data | string, option: IRequestOption = {}) {
    return appFetch.request<T>(url, data, {
        method: 'POST',
        ...option
    });
}

export function put<T = any>(url: string, data?: Data | string, option: IRequestOption = {}) {
    return appFetch.request<T>(url, data, {
        method: 'PUT',
        ...option
    });
}


export function del<T = any>(url: string, data?: Data | string, option: IRequestOption = {}) {
    return appFetch.request<T>(url, data, {
        method: 'DELETE',
        ...option
    });
}

export default appFetch;