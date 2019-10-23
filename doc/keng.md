# taro坑点

## 图片过大 css 文件不会转base64. 需要使用 Image标签引入

## mobx 数组在render的 map会导致监听失效

## 含有 JSX 的 switch case 语句必须每种情况都用花括号 `{}` 包裹结果,switch 值必须先解构，  不能包含 default

## map循环的key 不能新建函数放jsx，会取不到key，会不停的警告

## 一个文件只能导出一个组件，组件和参数不能混着导出，必须分文件

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
