# taro坑点

## 图片过大 css 文件不会转base64. 需要使用 Image标签引入

## mobx 数组在render的编列会导致监听失效

## 含有 JSX 的 switch case 语句必须每种情况都用花括号 `{}` 包裹结果,switch 值必须先建构

## map循环的key 不能新建函数放jsx，会取不到key，会不停的警告

## 组件文件tsx文件不要写函数或者变量导出，另放别的页面去。因为小程序的不支持，。组件必须是默认导出。而且不能在别的文件再导出。会导致报错。很玄学

## map双层循环不能用相同的拼音，2 个value需要改掉一个不然获取不到值。
props.list.map((value, index) => <View key={value.title + index}>
                    {this.renderTitle(value.title)}
                    {value.items.map(value => {
                        console.log(value);
                        return this.renderItem(value);
                    })}
                </View>

## 这样的结构也会报错
    render() {
        const { props } = this;
        return <View>
            {
                props.list.map((item, index) => <View key={item.title + index}>
                    {this.renderTitle(item.title)}
                    {this.itemsMap(item)}
                </View>)
            }
        </View>;
    }

    itemsMap(item) {
        return item.items.map(value => this.renderItem(value));
    }


## 小程序的富文本插件不是官方的那个，必须放在render函数里面不然渲染不出来。
