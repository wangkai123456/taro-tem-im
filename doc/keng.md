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

## key 为 state 在taro里面会解构不出来 还有 getState。反正不要写state

## get xxx()  xxx 会跑到state里面去

## map 里面的 value 的引用会发生改变 需要使用 bind才固定 onClick={this.onItemClick.bind(this, data)}

    renderData() {
        const { data } = this.props;
        return data.map(value => <View key={value.id}>
            {this.renderItem(value)}
        </View>
        )
    }

    renderItem(data: ICollection) {
        const { selectedIds: selectedId } = this.state;
        switch (data.type) {
            case CollectionType.Commodity: {
                return <View key={data.id} className={styles.item} onClick={this.onItemClick.bind(this, data)}>
                    <View className="flex-a-c">
                        <MMCheckbox checked={selectedId.includes(data.id)}></MMCheckbox>
                        <View className="spacing"></View>
                    </View>
                    <Image className={styles.image} src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1572942939152&di=cc0cc2a94baa86d36f26b2ebea2d2787&imgtype=0&src=http%3A%2F%2Fimg.pconline.com.cn%2Fimages%2Fupload%2Fupc%2Ftx%2Fwallpaper%2F1212%2F10%2Fc1%2F16491245_1355126013759.jpg"></Image>
                    <View className={styles.content}>
                        <View className={styles.title}>{data.title}</View>
                        <View className={styles.intro}>
                            <View className={styles.collection}>{data.count}收藏</View>
                            {
                                data.state === CollectionCommodityState.Default ?
                                    <View className={styles.price}>¥{data.price}</View> :
                                    <View className={styles.collection}>失效</View>
                            }
                        </View>
                    </View>
                </View>;
            }
        }
    }

