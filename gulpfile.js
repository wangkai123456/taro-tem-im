const tools = require('@wmeimob/node-tools');

function dts() {
    return tools.dts.run();
}
exports.dts = dts;

function express() {
    return tools.express.run();
}
exports.express = express;

function cover() {
    return tools.nodeModulesCover.run();
}
exports.cover = cover;

async function iconfont() {
    let cookie = 'cna=Iu+MFb+/snkCAbSdmykhAwSV; EGG_SESS_ICONFONT=U8AXvqwdm-42-umGXGwgKq_Emj2wuVCkA87TjZ3dn6xm2T4whio3sIKoy4kjkuBSusLMQ-0MhcjWBE1FwhfGmDRN3OrPfvQuMkinXa81udg5Ynagat7eKcjy_wzhdhIqQ4e_9QagxxYHpsYSCeInDHtAyPzQg70WZleRdFSvwNQyxbty1vTM-UxEATHQEC0w3Yp7FbnEHwNt5Sp702Mxlu_3KJgeZ3ThfLEijghNxCej2wRkle7SpXAzIlwddltC1iGbw9JJkngE9ZMu59nMwR0HI-YK8vvFhNIWwmalnHaxQ1qTw1B9kwK_9uBeUR7p1uKxnOW1VNcdqOOoY6lg8MUmbnxoIn422364jdulYhQCuWMqiqnUPk-LwXs4r36N-PCYD_lIrF-zYXoTEAA7KkMQiRHuiYbYt32N2YULoB0RGBma_vLCxMbvBxB7ozDGKDnPs0NX7ehSwFl-yu3FxAxXP0HDKwHF06LZSQf4RPPqjhcZClAkHdd4YE53s2we5vcxwv3Cjphe6dinjtQV0mvKp4GLkCVPwBM5xbCgt9hc2guisOt04WVy9lRN-4UTeePhlKQr1JfWadOVysB1g1sIppJBVu0EbCTRHYc6W3TiXXKutzFDDt-FAISsrwThlKa4-eLvIFcHaFvthtgyHdQMI7M-_pY2T2NIFmJJGOX5ff-Vrk7v3Y-crRE63xpNE1lhVDbpIL_8fX_3hHWyryjHoWloRgs1zU_lGqHMRPJAgD39YwOc5V3wZXiGS1VGvwUhKgb4NU8zeSesaMTMcyNiC-2e2iDWVPuP3IEG_9uFHv7BDMTmX933kn10RK_gEZKCwhc4lfvvvbdSuv8eqRSRdJnAY-gYIlcBLOtF02p2iOhTcMtQLTVHtZGbqZ8X; UM_distinctid=16c3b6326752a0-0f2f5099b17153-c343162-1fa400-16c3b6326765bc; CNZZDATA1253813504=885919117-1564359442-https%253A%252F%252Fwww.iconfont.cn%252F%7C1564359442; hasViewVideo=true; trace=AQAAAAq84QBPXAcABalOfKkFCYXLnkB3; ctoken=i0fM7lUyltgNTJ8jMSDw3gPX; u=6044439; u.sig=_NF63_tmKUF7iTEx731K7BoBN6_eIok0L-KLRjPrwg4; isg=BMXFM0qDNOFlrhClbHIvoaU-1AFTkEMqLYeB_Mcp8vwLXu3Qjt-z5ywoasINHpHM';
    let url = 'https://www.iconfont.cn/api/project/detail.json?pid=1370954&t=1571116616432&ctoken=i0fM7lUyltgNTJ8jMSDw3gPX';

    tools.iconfont.replace({
        url,
        cookie,
        path: 'src/components/styles/components/iconfont/index.less'
    });

    await tools.iconfont.downFile({
        outDirs: ['src/components/styles/components/iconfont'],
        cookie
    })

    return tools.iconfont.generateIconFontName({
        url: 'https://www.iconfont.cn/api/project/detail.json?pid=1370954&t=1571116616432&ctoken=i0fM7lUyltgNTJ8jMSDw3gPX',
        path: 'src/components/styles/components/iconfont/name.ts',
        cookie
    })
}
exports.iconfont = iconfont;
