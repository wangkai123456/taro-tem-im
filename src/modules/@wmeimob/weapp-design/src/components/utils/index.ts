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

    if (/iPhone 5/.test(info.model) || /iPhone 6/.test(info.model) || /iPhone 7/.test(info.model) || /iPhone 8/.test(info.model)) {
        return false;
    }
    return true;
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
    return new Promise<Taro.NodesRef.BoundingClientRectCallbackResult>((resolve) => {
        const query = Taro.createSelectorQuery().in(scope);
        query.select(name).boundingClientRect((res) => {
            resolve(res as Taro.NodesRef.BoundingClientRectCallbackResult);
        }).exec();
    });
}

/**
 * 获取枚举的key
 *
 * @export
 * @param {*} obj
 * @returns
 */
export function enumKeys(obj: any) {
    const list: string[] = [];

    for (const key in Object.keys(obj)) {
        if (obj.hasOwnProperty(key)) {
            const element = obj[key];
            if (typeof element !== 'number') {
                list.push(element)
            }
        }
    }
    return list;
}

