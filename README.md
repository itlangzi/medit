![IT浪子の博客 > Medit](https://cdn.jsdelivr.net/gh/itlangzi/cdn@master/2020/4/0b2d68702b5fbd9580a0da25f67cf6a9768aa6fc.png "IT浪子の博客 > Medit")

# Medit
`Medit` 是一款 `MIT` 开源可嵌入浏览器的 `Markdown` 编辑器， 基于 `codemirror` 、`React`、`markdown-it` 。开箱即用，方便快捷。

# 主要特性
- 支持通用 `Markdown` / `CommonMark` 和 `GFM (GitHub Flavored Markdown)` 风格的语法
- 支持同步滚动、实时预览、全屏模式、预格式文本/代码插入、待办、表格插入、上标、下标、标记、`Emoji`、`Katex` 公式、代码折叠、跳转到行、搜索替换、只读模式、多语言语法高亮等功能
- 支持图片上传、文件上传、拖拽文件上传、拖拽文件直接查看(`Markdown`、`html`、`js`、`css`等)；所有的上传均需要自定义上传到服务器的逻辑。
- 支持设置链接的 `target` 属性, 默认所有的非相对路径/非当前网页`(location.href)`的 `host` 的链接都会设置为`target="_blank"`
- 支持本地缓存，可自定义本地缓存的存储逻辑（比如存储到后台），默认 `Ctrl+S` 临时保存
- 支持 `html` 标签
- 开箱即用，只需要引入单独的 `js` 和 `css`  
- 无缝支持 `React`  

# 下载安装
**直接下载** 
[Medit](https://github.com/itlangzi/medit/releases "Medit")  

**NPM**
```bash
npm i --save @itlangzi/medit
```

**yarn**
```bash
yarn add @itlangzi/medit
```

# 使用
## 浏览器端直接使用
```html
<link href="https://cdn.jsdelivr.net/npm/@itlangzi/medit/lib/skins/default/medit.css">
<script src="https://cdn.jsdelivr.net/npm/@itlangzi/medit/lib/index.min.js"/>
<script>
    window.onload = function () {
            const medit = new Medit({
                image: {
                    upload(file) {
                        return { type: file.type, name: 'it浪子技术博客', url: 'https://www.itlangzi.com/default/assets/images/avatars/avatar.jpg' }
                    }
                },

                file: {
                    upload(files) {
                        if (!Array.isArray(files)) {
                            files = [files]
                        }
                        return files.map(file => ({ type: file.type, name: 'it浪子技术博客', url: 'https://www.itlangzi.com/default/assets/images/avatars/avatar.jpg' }))
                    }
                },
                editorOptions: {
                    placeholder: '写点什么...',
                }
            })
            medit.render('#app')
        }
</script>
```

## 非浏览器
**import/export es6 语法**
```js
import '@itlangzi/medit/lib/skins/default/medit.css'
import Medit from '@itlangzi/medit'
const medit = new Medit(options)
medit.render('#app')
```
**require 语法**
```js
require('@itlangzi/medit/lib/skins/default/medit.css')
const Medit = require('@itlangzi/medit')
const medit = new Medit(options)
medit.render('#app')
```

## `React` 项目使用
```js
import '@itlangzi/medit/lib/skins/default/medit.css'
import MeditComponent from '@itlangzi/medit/lib/react'
const options = {}
ReactDOM.render(<MeditComponent options={options}/>, document.getElementById('app'))
```

## 设置内容
```js
const options = {
    value: '# medit markdown editor'
}
// 或者 
medit.setValue('# medit markdown editor')
```
## 图片上传
在 `options` 中指定配置如下参数
```js
const options = {
    image: {
        upload(file) {
            // sync uplaod
            // support promise
            // const formData = new FormData()
            // formData.append('file', file)
            // return new Promise(resolve => {
            //     return fetch('/upload', formData)
            // })
            return { type: file.type, name: 'it浪子技术博客', url: 'https://www.itlangzi.com/default/assets/images/avatars/avatar.jpg' }
        }
    }
}
```
## 文件上传
>-  支持拖拽文件、复制图片上传  
>- 部分文件拖拽可直接查看

在 `options` 中指定配置如下参数
```js
const options = {
    image:{
        upload(files) {
            // 支持异步，Promise
            if (!Array.isArray(files)) {
                files = [files]
            }
            return files.map(file => ({ type: file.type, name: 'it浪子技术博客', url: 'https://www.itlangzi.com/default/assets/images/avatars/avatar.jpg' }))
        }
    },
}
```
## 获取 `Markdown` 和 `html` 内容
### 通过 `onChange` 监听
```js
const options = {
    onChange(markdown, html){

    }
}
```
或者   

>- 这里将会覆盖 `options` 中的 `onChange`  
>- 必须在 `render` 方法之前  
```js
medit.onChange(function(markdown, html){

})
```

### 直接获取数据
```js
medit.getValue() // Markdown
medit.getHtml() // html
```

## 设置语言
> 目前只支持 `zh-CN`、`en`
```js
const options = {
    language:'en'
}
// 或者
medit.language('en')
```

## 设置为只读
```js
const options = {
    readOnly: true
}
// 或者
medit.readOnly(true) // true 开启 false 关闭, 若为 true 可以省略
```
## 保存为 `Markdown` 文件
> `filename` 为可选参数, 不需要指定后缀名  
```js
medit.saveAsMarkdown([filename])
```
## 保存为 `Html` 文件
```js
medit.saveAsHtml([filename])
```

# 浏览器兼容性
|浏览器|IE|Chrome|Edge|Firefox|Opera|Safari|
|:---|:---:|---|---|---|---|---|
|支持|不支持|>= 49|>=12|>=18|>=36|>=10|

# `License`

MIT License.   
Copyright (c) 2020 Lang zi  

