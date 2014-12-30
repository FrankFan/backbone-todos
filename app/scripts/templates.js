this["JST"] = this["JST"] || {};

this["JST"]["app/scripts/templates/todo.ejs"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape, __j = Array.prototype.join;
function print() { __p += __j.call(arguments, '') }
with (obj) {
__p += '<input type="checkbox" ';
 if (completed) { ;
__p += 'checked';
 } ;
__p += '>\n<form>\n    <input type="text" value="' +
((__t = ( title )) == null ? '' : __t) +
'">\n</form>\n<span>\n    ' +
((__t = ( title )) == null ? '' : __t) +
'\n</span>\n';

}
return __p
};

this["JST"]["app/scripts/templates/todos.ejs"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape;
with (obj) {
__p += '<form class="input-append">\n    <input type="text" id="new-todo" placeholder="What do you need to do today?">\n    <input type="submit" class="btn" value="Submit">\n</form>\n<ul>\n    <!-- Where our To Do items will go -->\n</ul>\n';

}
return __p
};