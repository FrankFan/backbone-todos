/*global backboneTodos, Backbone, JST*/


(function () {
    'use strict';

    backboneTodos.Views.TodoView = Backbone.View.extend({

        template: JST['app/scripts/templates/todo.ejs'],

        tagName: 'li',

        events: {},

        initialize: function () {
            this.listenTo(this.model, 'change', this.render);
        },

        render: function () {
            this.$el.html(this.template(this.model.toJSON()));

            return this;
        }

    });

})();
