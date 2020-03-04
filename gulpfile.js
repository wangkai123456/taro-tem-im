const tools = require('@wmeimob/node-tools');
const iconImageWatch = require('@wmeimob/node-tools/dist/icon-image');

function express() {
    const app = tools.express.run();
    app.get('/user/wxauth', (req, res) => {
        return res.send(JSON.stringify({
            token: '1234567890',
            openid: 'openid'
        }));
    });

    app.get('/login', (req, res) => {
        if (req.get('Authorization') === '1234567890') {
            return res.send(JSON.stringify({
                code: 200,
                msg: '登录成功'
            }));
        } else {
            return res.send(JSON.stringify({
                code: 401
            }));
        }
    });
    return app;
}
exports.express = express;

function cover() {
    return tools.nodeModulesCover.run();
}
exports.cover = cover;

async function iconfont() {
    return tools.iconfont.run({
        path: 'src/modules/@wmeimob/weapp-design/src/components/icon-font',
        ctoken: '5U-_r7qXi-8qdCJX6-JGY9LX',
        pid: '1481689',
        cookie: 'isg=BDU14ODThD6vKOA5n0slUjE6RrfvsunEgASiW7dZ2KyvjlaAegWslcUc3tK41QF8; u=4160790; u.sig=QkhXg0vX7C6fcWiz8VcHs2RYlGTtgfJxw9r0Jwh1ot0; ctoken=5U-_r7qXi-8qdCJX6-JGY9LX; trace=AQAAAMZNihC0FwcA6pngZdj9R3qPfT4W; cna=tItGFlygzBYCAWVXb+AAjXFr; EGG_SESS_ICONFONT=U8AXvqwdm-42-umGXGwgKq_Emj2wuVCkA87TjZ3dn6xm2T4whio3sIKoy4kjkuBSusLMQ-0MhcjWBE1FwhfGmDRN3OrPfvQuMkinXa81udhDMZTMCYwUCcAvdLDKgxnAhGNjf395_yrlFH0eivkWKVo_B00cfEfnw36SOT79ayGnA3ziI4moGzePcZYvOin26SMI80f6j04GoXb43BhUq31IJDgDNlAEWET0FIySSlWk86ILdrl22M5ii3aL_QtB6N2E-nI-z9NwYudwJFuS00s0E08S9P8AXAjEh4-FzbZMwUpqc-ekLVpv8VLHKn1UJYBIdmgBH3qz7htJ3vh4ajSpObPQjrRHFTTpyhu6ht8BpoHPClW_loidowZXU1mAP1RMK_dpMvxCqHQ-4GohYrxCD_MWbimRLakBX_VOsHvKKdpoZ1uyIhMzKQwcZ78VUIv3Ie9J7ytgvraEqFketIUGzscDD0O7GViwn9xiSMf1pcVgGIhRXLGo4wRtYAuTljh0x1yq4937pffhb1EDkNzI8eYh9Ch2uHiom4w6lGmXOWiQYMBkA_5dBwokrEYHySP9jqyZkxhyvEy0EBvbOqumedy2HBjcuJFVKbECTOukdIjzLfK1-hry39Jd1N3VtMhY_U9raAPpXCK-iyl6qBDtSe8wtxflRix7xYpW0tAQCBzG8JsTwpR82RfpzRwoL6E5_Elj5aE5g-PIJXY3AUF9-kxJOHLIBOOJZEmgRqSAMW1kGlnh33obW_zO_smXgrRJtey3_O7UKgLprt48YJgioznmtaWW_7pGta2MG4dUcft4oEm0zHgjaaMmNOYr4rT6rD1zW7NIbpW9nfr3sk8seIiG2Y1Gef7YALL2nAKOISYC59jJrLXCWMJzoaQahC8jU7N0yaNqrVLpWmhykucxT-yOCn7O4YgZ40oYxRcBhwCIbAvnYnUL2NbYIgJ3Dnij6l3d92ORns8JwlKSFtQI1mbQF2kcsi3UO4ApwxqVkBHM5a-xrw-A2zjjFndPxJFQauuP-wW5Xcx9914hnKpfUyHZAt0SS7WgVq5z38iajMr3jNKbyUudpQqigH399arAROUyJQ_sN23uZCtzb24t1KKvh9-W-XfjClllp2QCLdsE68Xod4_N3cyL78Ww_LvMfBL5JMsqpOeR4-Z7uQ=='
    });
}
exports.iconfont = iconfont;

function add() {
    return tools.addComponent.add();
}
exports.add = add;

function watch() {
    return iconImageWatch.default();
}
exports.watch = watch;
