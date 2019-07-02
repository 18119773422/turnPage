### turnPage
翻页插件
 **移动端也可以使用**

使用时需要引入
__jQuery__

在你需要使用的位置调用它，如下所示
html code
```html
    <div class="test"></div>

```
js code
```js
    $('.test').turnPage({
        all: 10,//总页数
        cur: 1,//当前页
    })
 ```

使用函数接口，方便操作数据
 ```js
        changePageFun(cur,all) {
            console.log(cur, all);  // 得到当前是页码 和 总页数
        }
 ```
>移动端页码会少于大屏设备
