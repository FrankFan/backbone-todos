最简单的todo app

## 代码结构

vendro/ 所依赖的js类库或框架
index.html 定义DOM结构和template，使用script标签的方式引入js
todo.css 定义页面样式
todo.js 所有的业务逻辑代码
    - AppView 整个webApp的view
    - TodoView 单条todo的view，也就是item view， 包含对每个li的操作
    - Todo Model 每条todo对应一个model
    - TodoList model组成的集合

整个应用程序代码写在jquery的$.ready()方法中，最后通过`new AppView`启动



[参考](http://backbonejs.org/examples/todos/index.html)