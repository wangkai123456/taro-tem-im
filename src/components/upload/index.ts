import Taro from '@tarojs/taro';
import { get } from '~/components/request';

/**
 * 上传文件到阿里云
 * @param fileList 图片的本地资源
 */

export function uploadImageAliYun (fileList: string[]) {
    return new Promise((presolve, preject) => {
        console.log(fileList);
        get(`/aliyun/oss-token`).then(res => {
            const sign = res.data;
            // 新建一个上传队列
            const uploadList = []
            fileList.tempFiles.forEach((item, index) => {
                uploadList[index] = new Promise((resolve, reject) => {
                    const suffix = item.path.substr(item.path.lastIndexOf(".") + 1);
                    const postData = {
                        'OSSAccessKeyId': sign.accessid,
                        'signature': sign.signature,
                        'policy': sign.policy,
                        'key': sign.dir + new Date().getTime() + Math.floor(Math.random() * 150) + '.' + suffix,
                        'success_action_status': 200
                    }
                    Taro.uploadFile({
                        url: sign.host,
                        filePath: item.path,
                        name: 'file',
                        formData: postData,
                        success () {
                            resolve(`${sign.host}/${postData.key}`);
                        }
                    })
                })
            })
            Promise.all(uploadList).then(resc => {
                presolve(resc)
            }).catch(err => {
                preject(err)
                Taro.showToast({
                    title: '上传失败请重试',
                    icon: 'none'
                })
            })
        })
    })
}
