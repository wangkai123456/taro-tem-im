import Taro from '@tarojs/taro';

/**
 * 生成唯一标识符
 *
 * @export
 * @returns
 */
export function guid() {
    return (S4() + S4() + '-' + S4() + '-' + S4() + '-' + S4() + '-' + S4() + S4() + S4());
}
function S4() {
    return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
}

export const isNewIphone = getisNewIphone();

/**
 * 判断是否是新iphone
 *
 * @export
 * @returns
 */
function getisNewIphone() {
    const info = Taro.getSystemInfoSync();

    if (info.model === 'iPhone X' || info.model === 'iPhone XR' || info.model === 'iPhone 11') {
        return true;
    }
    return false;
}

/**
 * 查询元素大小
 *
 * @export
 * @param {string} name
 * @param {*} scope
 * @returns
 */
export function selectRect(name: string, scope: any) {
    return new Promise<Taro.clientRectElement>((resolve) => {
        const query = Taro.createSelectorQuery().in(scope);
        query.select(name).boundingClientRect((res) => {
            resolve(res as Taro.clientRectElement);
        }).exec();
    });
}
