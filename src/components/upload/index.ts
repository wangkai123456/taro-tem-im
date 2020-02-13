import Taro from '@tarojs/taro';
import { get } from '~/components/request';

export function uploadImageAliYun (tempFile: any[]) {
    const suffix = tempFile.substring(tempFile.lastIndexOf('.') + 1);
    return new Promise(resolve => {
        get(`/aliyun/oss-token`).then(res => {
            const postData = {
                'OSSAccessKeyId': res.data.accessid,
                'signature': res.data.signature,
                'policy': res.data.policy,
                'key': res.data.dir + new Date().getTime() + '.' + suffix,
                'success_action_status': 200
            };
            Taro.uploadFile({
                url: res.data.host,
                filePath: tempFile,
                name: 'file',
                formData: postData,
                success () {
                    resolve(`${res.data.host}/${postData.key}`);
                }
            });
        });
    });
}
