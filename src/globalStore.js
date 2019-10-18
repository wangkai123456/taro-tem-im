"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mobx_1 = require("mobx");
exports.observableValue = {
    user: { userName: 'userName', userId: 'xxxxxx' },
    counter: 0,
    list: [{ id: 1, text: '1' }, { id: 2, text: '2' }, { id: 3, text: '3' }],
    listUpdate: 0,
    counterStore() {
        this.counter++;
    },
    increment() {
        this.counter++;
    },
    decrement() {
        this.counter--;
    },
    incrementAsync() {
        setTimeout(() => {
            this.counter++;
        }, 1000);
    }
};
const counterStore = mobx_1.observable(exports.observableValue);
exports.default = counterStore;
//# sourceMappingURL=globalStore.js.map