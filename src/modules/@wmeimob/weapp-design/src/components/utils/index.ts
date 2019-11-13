import Taro from '@tarojs/taro';

function getStyleObject(style: string | React.CSSProperties | undefined) {
    if (typeof style === 'string') {
        const styleArray = style.split(';')
            .map(value => value.split(':'))
            .map(value => [value[0].split('-').map((value, index) => {
                let newValue = value;
                if (index !== 0) {
                    newValue = newValue.replace(/^./, value[0].toUpperCase());
                }
                return newValue;
            }).join(''), value[1]]);

        const stylesObj: { [key: string]: string } = {};
        for (const iterator of styleArray) {
            const [key, value] = iterator;
            stylesObj[key] = value;
        }
        return stylesObj;
    } else if (style !== undefined) {
        return style;
    }
    return {};
}

/**
 * 合并styles
 *
 * @export
 * @param {(...(string | React.CSSProperties | undefined)[])} styleArray
 * @returns {React.CSSProperties[]}
 */
export function styles(...styleArray: (string | React.CSSProperties | undefined)[]): React.CSSProperties {
    return Object.assign({}, ...styleArray.map(getStyleObject));
}

export function uuid() {

}

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
