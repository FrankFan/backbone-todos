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

		},

		initialize: function() {

		},

		render: function() {

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

		},

		initialize: function() {

		},

		render: function() {

		},

		addOne: function() {

		},

		addAll: function() {

		},

		createOnEnter: function(e) {
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
	var App = new AppView;
	
});