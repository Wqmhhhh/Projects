## 安装
```
npm install my-bao
```

## 导入
```js
const my_bao=require('./../包/my-bao')
```

## 格式化时间
```js
// 调用dataFormat函数对时间进行格式化
const q=my_bao.dataFormat(new Date())
```

## 转义html中的特殊字符
```js
const Str='<span><span>'
const htmlstr=my_bao.htmlEscape(Str)
```

## 还原html中的特殊字符
```js
const htmlstr=my_bao.htmlUnEscape(Str)
```

## 开源协议
ISC
