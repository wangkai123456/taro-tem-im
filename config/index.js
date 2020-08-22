const path = require('path');
const config = {
  projectName: 'weapp-template',
  date: '2019-7-31',
  designWidth: 750,
  deviceRatio: {
    '640': 2.34 / 2,
    '750': 1,
    '828': 1.81 / 2
  },
  sourceRoot: 'src',
  outputRoot: 'dist',
  plugins: {
    babel: {
      sourceMap: true,
      presets: [
        ['env', {
          modules: false
        }]
      ],
      plugins: [
        'transform-decorators-legacy',
        'transform-class-properties',
        'transform-object-rest-spread'
      ]
    },
    less: {
      javascriptEnabled: true,
      paths: [
        path.resolve(__dirname, "../src/modules"),
        path.resolve(__dirname, "../node_modules")
      ]
    }
  },
  defineConstants: {},
  copy: {
    patterns: [],
    options: {}
  },
  alias: {
    '~': path.resolve(__dirname, '../', 'src'),
    '@wmeimob/weapp-design/src': path.resolve(__dirname, '../src/modules/@wmeimob/weapp-design/src'),
    '@wmeimob/weapp-design': path.resolve(__dirname, '../src/modules/@wmeimob/weapp-design/src/components/index.ts')
  },
  weapp: {
    module: {
      postcss: {
        autoprefixer: {
          enable: true,
          config: {
            browsers: [
              'last 3 versions',
              'Android >= 4.1',
              'ios >= 8'
            ]
          }
        },
        pxtransform: {
          enable: false,
          config: {

          }
        },
        url: {
          enable: true,
          config: {
            limit: 100240 // 设定转换尺寸上限
          }
        },
        cssModules: {
          enable: true, // 默认为 false，如需使用 css modules 功能，则设为 true
          config: {
            namingPattern: 'module', // 转换模式，取值为 global/module
            generateScopedName: '[name]__[local]___[hash:base64:5]'
          }
        }
      }
    }
  },
  h5: {
    publicPath: '/',
    staticDirectory: 'static',
    module: {
      postcss: {
        autoprefixer: {
          enable: true,
          config: {
            browsers: [
              'last 3 versions',
              'Android >= 4.1',
              'ios >= 8'
            ]
          }
        },
        cssModules: {
          enable: false, // 默认为 false，如需使用 css modules 功能，则设为 true
          config: {
            namingPattern: 'module', // 转换模式，取值为 global/module
            generateScopedName: '[name]__[local]___[hash:base64:5]'
          }
        }
      }
    }
  },
  deviceRatio: {
    '750': 1 / 2,
    '375': 1
  },
  mini: {
    compile: {
      exclude: [
        path.resolve(__dirname, '..', 'src/pages/libs/jmessage-wxapplet-sdk-1.4.3.min.js'),
        path.resolve(__dirname, '..', 'src/pages/libs/index.js')
      ]
    }
  }
}

module.exports = function (merge) {
  if (process.env.NODE_ENV === 'development') {
    return merge({}, config, require('./dev'))
  }
  return merge({}, config, require('./prod'))
}
