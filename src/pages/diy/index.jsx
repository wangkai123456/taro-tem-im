"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const components_1 = require("@tarojs/components");
const mobx_1 = require("@tarojs/mobx");
const taro_1 = require("@tarojs/taro");
const globalStore_1 = require("../../globalStore");
require("./index.less");
const decorator_1 = require("~/components/decorator");
class DiyComponent extends taro_1.Component {
    render() {
        return (<components_1.View className="content">
                <components_1.Text>DiyComponent</components_1.Text>
            </components_1.View>);
    }
}
let Index = class Index extends taro_1.Component {
    constructor() {
        super(...arguments);
        this.config = {
            navigationBarTitleText: '坑点'
        };
    }
    onClickCouter() {
        globalStore_1.default.counter++;
    }
    onItemClick(id) {
        const obj = globalStore_1.default.list.find(value => value.id === id);
        obj && (obj.text += '+');
    }
    renderIfElse() {
        if (globalStore_1.default.counter > 0) {
            return <components_1.View>
                <components_1.Text>renderIfElse</components_1.Text>
            </components_1.View>;
        }
        else if ((globalStore_1.default.counter <= 0)) {
            return <components_1.Text>renderIfElse</components_1.Text>;
        }
        //  else {
        //   return <Text>renderIfElse</Text>
        // }
    }
    renderSwitch() {
        switch (globalStore_1.default.counter) {
            case 0: {
                return <components_1.View><components_1.Text>renderSwitch1</components_1.Text></components_1.View>;
            }
            case 1: {
                return <components_1.View><components_1.Text>renderSwitch2</components_1.Text></components_1.View>;
            }
            // 不能包含 default
            // default:
            //   { return <View><Text>renderSwitch3</Text></View> }
        }
    }
    render() {
        return (<components_1.View className="content">
                <components_1.Text>{this.config.navigationBarTitleText}</components_1.Text>
                
                <components_1.View onClick={this.onClickCouter}>
                    {globalStore_1.default.counter}
                </components_1.View>
                
                {globalStore_1.default.list.map((value, index) => <components_1.View key={index} onClick={() => this.onItemClick(value.id)}>
                    <components_1.Text>item:{value.text}</components_1.Text>
                </components_1.View>)}

                
                <DiyComponent />

                {this.renderIfElse()}

                {this.renderSwitch()}

            </components_1.View>);
    }
};
Index = __decorate([
    decorator_1.autobind,
    mobx_1.observer
], Index);
exports.default = Index;
//# sourceMappingURL=index.jsx.map