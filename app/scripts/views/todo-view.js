
(function () {
    'use strict';

    backboneApp.Views.TodoView = Backbone.View.extend({

        template: JST['app/scripts/templates/todo.ejs'],

        tagName: 'li',

        events: {
            'click input[type="checkbox"]': 'toggle',
            'dblclick span': 'toggleEdit', // 不要把 dblclick 写成 dbclick
            'submit form': 'toggleEdit'
        },

        initialize: function () {
            this.listenTo(this.model, 'change', this.render);
        },

        render: function () {
            this.$el.html(this.template(this.model.toJSON()));

            return this;
        },

        toggle: function(){
            this.model.toggle();
        },

        toggleEdit: function(){
            var input = this.$('form input');
            var title = input.val().trim();

            if (!title) {
                this.model.destroy();
                this.remove();
                return
            };

            this.$el.toggleClass('editing');

            if (title === this.model.get('title')) {
                // Edit mode
                input.val(title);
                input.focus();
            }else{
                // Done editing
                this.model.set('title', title);
                this.model.save();

                this.render();
            }
        }

    });

})();
