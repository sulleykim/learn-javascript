(function(exports) {
    var Model = function() {
        this.todos = [];
    };

    Model.prototype = {
        insert: function(title, callback) {

            var newTodo = {
                title: title.trim(),
                completed: false
            };

            this.todos.push(newTodo);
            callback(this.todos);
        },
        delete: function(index, callback) {
            this.todos.splice(index, 1);

            callback(this.todos);
        }
    };

    exports.Model = Model;
})(window);