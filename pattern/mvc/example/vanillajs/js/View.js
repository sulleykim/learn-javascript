(function(exports) {
    var View = function() {
        this.todoList = document.getElementById('todo-list');
		this.todoItemCounter = document.getElementById('todo-count');
		this.clearCompleted = document.getElementById('clear-completed');
		this.main = document.getElementById('main');
		this.footer = document.getElementById('footer');
		this.toggleAll = document.getElementById('toggle-all');
        this.inputTodo = document.getElementById('input-todo');
        this.insertTodo = document.getElementById('insert-todo');
        this.todoapp = document.getElementById('todoapp');
        this.defaultTemplate = '<li data-index="{{index}}" class="{{completed}}">'
                            +		'<div class="view">'
                            +			'<label>{{title}}</label>'
                            +			'<button class="destroy">x</button>'
                            +		'</div>'
                            +	'</li>';
    };

    View.prototype = {
        bind: function(event, handler) {
            var self = this;

            if(event === 'insertTodo') {
                self.insertTodo.addEventListener("click", function() {
                    handler(self.inputTodo.value);
                });
            } else if(event === "deleteTodo") {
                self.todoList.addEventListener("click", function(e) {
                    if(e.target.className == 'destroy') {
                        var parent = e.target.parentNode.parentNode;
                        handler(parent.dataset.index);
                    }
                });
            } else if(event === "keyPressInsertTodo") {
                self.inputTodo.addEventListener("keypress", function(e) {
                    var keyCode = e.keyCode;

                    if(keyCode == 13) {
                        handler(self.inputTodo.value);
                    }
                });
            }
        },
        render: function(view, parameter) {
            var self = this;

            var viewCommands = {
                list: function() {
                    self.todoList.innerHTML = parameter;
                },
                inputTodoClear: function() {
                    self.inputTodo.value = "";
                },
                inputTodoAutoFocus: function() {
                    self.inputTodo.focus();
                }
            }

            viewCommands[view]();
        },
        show: function(data) {
            var i, l;
            var view = '';
    
            for (i = 0, l = data.length; i < l; i++) {
                var template = this.defaultTemplate;
    
                template = template.replace('{{index}}', i);
                template = template.replace('{{title}}', data[i].title);
    
                view += template;
            }
    
            return view;
        }
    };

    exports.View = View;
})(window);