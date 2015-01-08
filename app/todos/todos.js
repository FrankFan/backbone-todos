/**
* Todo App 功能清单
* 1. 添加
* 2. 编辑
* 3. 删除一条、删除多条
* 4. 批量选择
* 5. 统计
*/

// DOM is Ready load the app
$(function(){

    // Todo Model
    var Todo = Backbone.Model.extend({

        // 默认属性
        defaults: function(){
            return{
                title: "empty todo...",
                order: Todos.nextOrder(),
                done: false
            }
        },

        // 切换done状态
        toggle: function(){
            this.save({
                done: !this.get('done')
            });
        }
    });

    // Todo Collection
    var TodoList = Backbone.Collection.extend({

        // 引用model
        model: Todo,

        // 把所有的todo items 保存在 'todos-backbone' 命名空间下
        localStorage: new Backbone.LocalStorage('todos-backbone'),

        // 过滤器
        done: function(){
            return this.where({
                done: true
            });
        },

        // Filter
        remaining: function(){
            return this.without.apply(this, this.done());
        },

        nextOrder: function(){
            if(!this.length) return 1;
            return this.last().get('order') + 1;
        },

        comparator: 'order'
    });

    // Create our global collection of **Todos**.
    var Todos = new TodoList;

    // Todo Item View
    var TodoView = Backbone.View.extend({

        // ... is a list tag
        tagName: 'li',

        // 使用模板缓存单条todo item
        template: _.template($('#item-template').html()),

        // The DOM events
        events: {
            'click .toggle': 'toggleDone', // item view 前面的checkbox
            'dblclick .view': 'edit', // 双击 编辑
            'click a.destroy': 'clear', // 删除一条todo
            'keypress .edit': 'updateOnEnter', //
            'blur .edit': 'close'

        },

        initialize: function(){

            this.listenTo(this.model, 'change', this.render);
            this.listenTo(this.model, 'destroy', this.render);
        },

        render: function(){

            this.$el.html(this.template(this.model.toJSON()));
            this.$el.toggleClass('done', this.model.get('done'));
            this.input = this.$('.edit');
            return this;
        },

        toggleDone: function(){
            this.model.toggle();
        },

        edit: function(){
            this.$el.addClass('editing');
            this.input.focus();
        },

        close: function(){
            var value = this.input.val();
            if(!value){
                this.clear();
            }else{
                this.model.save({
                    title: value
                });
                this.$el.removeClass('editing');
            }
        },

        updateOnEnter: function(e){
            e = e || event;
            if(e.keyCode == 13) this.close();
        },

        clear: function(){
            this.model.destroy();
        }
    });

    // The Application
    var AppView = Backbone.View.extend({
        el: $('#todoapp'),

        statsTemplate: _.template($('#stats-template').html()),

        events: {
            'keypress #new-todo': 'createOnEnter', //创建一条新的todo
            'click #clear-completed': 'clearCompleted',
            'click #toggle-all': 'toggleAllComplete'
        },

        initialize: function() {
            console.log('AppView initialize');

            this.input = this.$('#new-todo');
            this.allCheckbox = this.$('#toggle-all')[0];

            this.listenTo(Todos, 'add', this.addOne);
            this.listenTo(Todos, 'reset', this.addAll);
            this.listenTo(Todos, 'all', this.render);

            this.footer = this.$('footer');
            this.main = $('#main');

            Todos.fetch();
        },

        render: function(){
            var done = Todos.done().length;
            var remaining = Todos.remaining().length;

            if(Todos.length){
                this.main.show();
                this.footer.show();
                this.footer.html(this.statsTemplate({
                    done: done,
                    remaining: remaining
                }));
            }else {
                this.main.hide();
                this.footer.hide();
            }

            this.allCheckbox.checked = !remaining;
        },

        addOne: function(todo){
            var view = new TodoView({
                model: todo
            });
            this.$('#todo-list').append(view.render().el);
        },

        createOnEnter: function(e){
            console.log('createOnEnter');

            e = e || event;
            if(e.keyCode != 13) return;
            if(!this.input.val()) return;

            Todos.create({
                title: this.input.val()
            });
            this.input.val('');
        },

        clearCompleted: function(){
            debugger;
            _.invoke(Todos.done(), 'destroy');
            return false;
        },

        toggleAllComplete: function(){
            var done = this.allCheckbox.checked;
            Todos.each(function(todo){
                todo.save({
                    'done': done
                });
            });
        }


    });

    // Finally, run the app
    var app = new AppView();

});