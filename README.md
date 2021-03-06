backbone-todos
==============

a TODO app build with backbone.js, grunt yeaman and bower

### 说明
使用yeoman、bower workflow 开发一个todo

首先你得安装有 `yeoman`,
其次，安装一个 webapp 的生成器；

`$ npm install -g generator-webapp`

`$ yo webapp`

`$ bower install & npm install` (会自动运行这个命令安装依赖包)


在安装一个 backbone 生成器
`$ npm install -g generator-backbone`
可以过上面命令或者 运行 `yo` 按照系统提示安装。

安装完成之后就可以使用如下命令生成 `backbone`开发所需的js文件：

`$ yo backbone:view todo`

`$ yo backbone:router todo`

`$ yo backbone:model todo`

`$ yo backbone:collection todo`


## 运行程序

该程序使用npm、grunt、bower进行管理，所以clone下源代码后需要运行：

```bash
$ npm install  # 安装package.json文件中的依赖
$ bower install # 安装bower.json文件中的依赖
$ grunt serve # 自动在本地起一个server
```

