import Taro from '@tarojs/taro';
import { get } from '~/components/request';

/**
 * 上传文件到阿里云(单个上传）
 * @param tempFile 图片的本地资源
 * @param sign 后台接口返回的签名信息
 * @param successFun 成功的回调
 * @param failFun 失败的回调
 */

export function uploadImageAliYun (tempFile: string, sign: {}, successFun, failFun) {
    const suffix = tempFile.lastIndexOf('.') + 1;
    const postData = {
        'OSSAccessKeyId': sign.accessid,
        'signature': sign.signature,
        'policy': sign.policy,
        'key': sign.dir + new Date().getTime() + Math.floor(Math.random() * 150) + '.' + suffix, // 当前文件名+时间戳+150以内的随机数+后缀
        'success_action_status': 200
    };
    Taro.uploadFile({
        url: sign.host,
        filePath: tempFile,
        name: 'file',
        formData: postData,
        success () {
            successFun(`${sign.host}/${postData.key}`)
        },
        fail (err) {
            failFun(err)
        }
    });
}
