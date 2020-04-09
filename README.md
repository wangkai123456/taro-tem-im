# 小程序开发模板

## nodejs 环境要求

[nodejs >= 11.10.1](https://nodejs.org/dist/v11.15.0/)
注意：nodejs v12 版本有bug

## yarn 安装

[yarn >= 1.22.4](https://classic.yarnpkg.com/en/docs/install)

## taro环境安装

yarn add global @tarojs/cli@1.3.38
yarn add global mirror-config-china  

## gulp安装

npm install gulp-cli -g

## git 密钥配置

ssh-keygen -t rsa -C "nideyouxiang@xxx.com"
密钥必须使用一次(git clone ssh://XXXXX 拉一个项目的代码)，不然yarn会安装失败。

## 安装

```sh
yarn
```

## 调试

```sh
yarn dev
```

## 打包

```sh
yarn build
```

## vscode 插件安装

ESLint
CSS Modules
Document This

## 目录结构说明

```text
config:taro 配置  
dist:打包目录  
doc:文档  
node_modules-cover:node_modules覆盖目录  
src:开发目录  
    components:组件（全局组件，全局方法）  
        assets:放置公用静态文件  
        component:组件模板  
        event-emitter:事件  
        request:请求组件  
            index.ts:请求文件  
            listener.ts:token注入  
        taro:taro函数修改  
        utils:公用函数  
    custom-tab-bar：自定义导航
    modules:放置公司做的组件
    pages:页面  
        _template:页面模版  用于复制粘贴生成新页面
        template:页面模版  用于了解基本写法
    types:d.ts 补全
    app.less:样式入口  
    app.tsx:js入口  
    config.ts:配置文件  
    globalStore.ts:全局数据
    index.html:html5项目的入口
tools:工具脚手架
```

## vscode配置

默认vscdoe的eslint不会检测tsx文件，不会自动修复，需要手动开启

```json
"eslint.autoFixOnSave": true,
    "eslint.validate": [
        "javascript",
        "javascriptreact",
        {
            "language": "typescript",
            "autoFix": true
        },
        {
            "language": "typescriptreact",
            "autoFix": true
        }
    ],
```

## 脚手架使用


覆盖node_modules

```sh
gulp cover
```

下载字体，需要配置cookie和url

```sh
gulp iconfont
```

添加前端框架@wmeimob/weapp-design，到src/modules 文件夹下
需要配置git私钥

```sh
gulp add --name=weapp-design
```

监听iconImage 图片添加自动添加样式

```sh
gulp watch
```

## 其他

[前端组件列表](https://git.f.wmeimob.com/Frontend/front-end-catalog/src/master/project.md)

## 资料

<https://wangdoc.com/javascript/>  
<http://es6.ruanyifeng.com/>  
<http://css.cuishifeng.cn/position.html>  
<https://nervjs.github.io/taro/docs/README.html>  
<https://taro-ui.aotu.io/#/docs/introduction>  
<https://react.docschina.org/>  
<https://www.tslang.cn/>  
