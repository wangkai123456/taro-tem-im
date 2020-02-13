import Taro from '@tarojs/taro';
import { get } from '~/components/request';

export function uploadImage (tempFile) {
    return new Promise(resolve => {
        get(`https://api.marubeni-cn.net/wx/aliyun/oss-token`).then(res => {
            if (res.data.code) {
                Taro.showToast({ title: res.data.description, icon: 'none' });
                return;
            }
            const postData = {
                'OSSAccessKeyId': res.data.accessid,
                'signature': res.data.signature,
                'policy': res.data.policy,
                'key': res.data.dir + new Date().getTime() + '.png',
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
