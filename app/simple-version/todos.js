/*
 * @description: todo js
 * @refer: http://backbonejs.org/docs/todos.html
 */

$(function(){

	// TODO model

	var Todo = Backbone.Model.extend({
		defaults: function() {
			return {
				title: 'empty todo...',
				order: Todos.nextOrder(),
				done: false
			};
		},

		toggle: function() {
			this.save({
				done: !this.get('done')
			});
		}
	});

	// TODO list

	var TodoList = Backbone.Collection.extend({
		model: Todo,

		localStorage: new Backbone.LocalStorage('todoapp'),

		done: function() {
			return this.where({
				done: true
			});
		},

		remaining: function() {
			return this.where({
				done: false
			});
		},

		nextOrder: function() {
			if (!this.length) {
				return 1;
			}

			return this.last().get('order') + 1;
		},

		comparator: 'order'
	});

	var Todos = new TodoList;

	// TODO item view

	var TodoView = Backbone.View.extend({

		tagName: 'li',

		template: _.template($('#item-template').html()),

		events: {
			'click .toggle': 'toggleDone',
			'dblclick .view': 'edit',
			'click a.destroy': 'clear',
			'keypress .edit': 'updateOnEnter',
			'blur .edit': 'close'
		},

		initialize: function() {
			console.log('initialize in TodoView');
			
			this.listenTo(this.model, 'change', this.render);
			this.listenTo(this.model, 'destroy', this.remove);
		},

		render: function() {
			this.$el.html(this.template(this.model.toJSON()));
			this.$el.toggleClass('done', this.model.get('done'));
			this.input = this.$('.edit');
			return this;
		},

		toggleDone: function() {
			this.model.toggle();
		},

		edit: function() {
			this.$el.addClass('editing');
			this.input.focus();
		},

		close: function() {
			var value = this.input.val();
			if (!value) {
				this.clear();
			} else{
				this.model.save({
					title: value
				});
				this.$el.removeClass('editing');
			};
		},

		updateOnEnter: function(e) {
			if (e.keyCode == 13) {
				this.close();
			}
		},

		clear: function() {
			this.model.destroy();
		}

	});

	// The application

	var AppView = Backbone.View.extend({

		el: $('todoapp'),

		statsTemplate: _.template($('#stats-template').html()),

		events: {
			'keypress #new-todo': 'createOnEnter',
			'click #clear-completed': 'clearCompleted',
			'click #toggle-all': 'toggleAllComplete'
		},

		initialize: function() {
			console.log('initialize');

			this.input = this.$('#new-todo');
			this.allCheckbox = $('#toggle-all')[0];
			// this.allCheckbox = $('#toggle-all');

			this.footer = this.$('footer');
			this.main = $('#main');

			this.listenTo(Todos, 'add', this.addOne);
			this.listenTo(Todos, 'reset', this.addAll);
			this.listenTo(Todos, 'all', this.render);

			Todos.fetch();
		},

		render: function() {
			console.log('render');
			var done = Todos.done().length;
			var remaining = Todos.remaining().length;

			if(Todos.length) {
				this.main.show();
				this.footer.show();
				this.footer.html(this.statsTemplate({
					done: done,
					remaining: remaining
				}));
			} else {
				this.main.hide();
				this.footer.hide();
			}

			this.allCheckbox.checked = !remaining;
		},

		addOne: function(todo) {
			var view = new TodoView({ model: todo });
			this.$('#todo-list').append(view.render().el);
		},

		addAll: function() {
			Todos.each(this.addOne, this);
		},

		createOnEnter: function(e) {
			console.log('createOnEnter');
			if (e.keyCode != 13)
				return;
			if (!this.input.val())
				return;

			Todos.create({title: this.input.val()});
			this.input.val('');
		},

		clearCompleted: function() {
			_.invoke(Todos.done(), 'destroy');
			return false;
		},

		toggleAllComplete: function() {
			var done = this.allCheckbox.checked;
			Todos.each(function(todo) {
				todo.save({'done': done});
			});
		}
	});


	// Finnaly, creating the App
	var App = new AppView();

});