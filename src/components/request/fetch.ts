import Taro from '@tarojs/taro';
import { apiUrl } from '../../config';
import EventEmitter, { IFunction } from '../event-emitter';
import { RequestEventEnum } from './const';

export interface IRequestData {
  [key: string]: any;
}

/**
 * 参数
 *
 * @interface IInterceptor
 */
export interface IRequestOption extends Partial<Taro.request.Option<string | IRequestData>> {

  /**
   * 启动错误弹窗
   *
   * @type {boolean}
   * @memberof IFetchOption
   */
  showFailToast?: boolean;

  /**
   * 是否捕获错误 [接口status错误,阻止代码的继续运行]
   *
   * @type {boolean}
   * @memberof IFetchOption
   */
  isCatchFail?: boolean;

  /**
   * 不发送请求
   *
   * @type {boolean}
   * @memberof IRequestOption
   */
  unWillSend?: boolean

}

export interface RequestEventList extends IFunction {
  [RequestEventEnum.WillSend]: (params: Taro.request.Option<string | IRequestData>) => void;
  [RequestEventEnum.DidMount]: (res: Taro.request.SuccessCallbackResult<any>, params: {
    url: string, data: IRequestData | string, options: IRequestOption
  }) => void | Promise<Taro.request.SuccessCallbackResult<any>>
}

class APPRequest {
  eventEmitter = new EventEmitter<RequestEventList>();

  defaultOptions: IRequestOption = {
    showFailToast: true,
    isCatchFail: true
  };

  async request<T>(url: string, data: IRequestData | string = {}, options: IRequestOption): Promise<Taro.request.Promised<T>> {
    const requestUrl = this.normalizationUrl(url);
    const requestOptions = { ...this.defaultOptions, ...options };
    const header = await this.getHeader();
    const params = {
      url: requestUrl,
      data,
      header,
      ...requestOptions
    };

    if (!options.unWillSend) {
      await this.eventEmitter.emit(RequestEventEnum.WillSend, params);
    }

    let res: Taro.request.SuccessCallbackResult<any> = null as any;
    try {
      res = await Taro.request(params);
    } catch (error) {
      res = {
        statusCode: -1,
        data: {}
      } as any;
    }

    const mountReturn = await this.eventEmitter.emit(RequestEventEnum.DidMount, res, {
      url, data, options
    });

    for (const key in mountReturn) {
      if (mountReturn.hasOwnProperty(key)) {
        const element = mountReturn[key];
        if (element) {
          return element;
        }
      }
    }

    if (requestOptions.showFailToast) {
      this.failToast(res, requestUrl);
    }

    if (requestOptions.isCatchFail) {
      await this.catchFail(res);
    }

    return res;
  }

  private async getHeader() {
    const headers = {};
    headers['Content-Type'] = 'application/json';
    return headers;
  }

  private normalizationUrl(url: string) {
    let requestUrl = url;

    if (apiUrl[apiUrl.length - 1] === '/') {
      if (requestUrl[0] === '/') {
        requestUrl = requestUrl.replace('/', '');
      }
    } else {
      if (requestUrl[0] !== '/' && !/^https{0,1}:\/\//g.test(requestUrl)) {
        requestUrl = '/' + requestUrl;
      }
    }

    if (!/^https{0,1}:\/\//g.test(requestUrl)) {
      requestUrl = `${apiUrl}${requestUrl}`;
    }

    return requestUrl;
  }

  private async failToast(response: Taro.request.SuccessCallbackResult<any>, url: string) {
    if (!this.validateStatus(response)) {
      const { data } = response;

      if (data.code) {
        // 弹出后端报错
        if (data.msg) {
          Taro.showToast({
            icon: 'none',
            title: `${data.msg}`,
            duration: 2500
          });
        }
      } else if (response.statusCode && response.statusCode > 0) {
        Taro.showToast({
          icon: 'none',
          title: `url:${url.toString()},statusCode:${response.statusCode}`,
          duration: 2500
        });
      } else if (response.statusCode && response.statusCode === -1) {
        Taro.showToast({
          icon: 'none',
          title: `网络请求失败，请检查您的网络。`,
          duration: 2500
        });
      } else {
        Taro.showToast({
          icon: 'none',
          title: `未知错误，万分抱歉！`,
          duration: 2500
        });
      }
    }
  }

  private catchFail(response: Taro.request.SuccessCallbackResult<any>) {
    return new Promise<Taro.request.SuccessCallbackResult<any>>((resolve, reject) => {
      if (this.validateStatus(response)) {
        resolve(response);
      } else {
        reject(response);
      }
    });
  }

  private validateStatus(response: Taro.request.SuccessCallbackResult<any>) {
    // 后端有状态码 就会报错
    if (response.data && response.data.code) {
      return false;
    }

    return response.statusCode >= 200 && response.statusCode < 300;
  }
}

const appFetch = new APPRequest();
export default appFetch;
