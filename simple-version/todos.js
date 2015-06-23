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
	
});