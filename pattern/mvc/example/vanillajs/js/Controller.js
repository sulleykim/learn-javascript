(function(exports) {
    var Controller = function(model, view) {
        var self = this;

        this.model = model;
        this.view = view;

        this.view.bind('insertTodo', function(title) {
            self._insertTodo(title);
        });

        this.view.bind('keyPressInsertTodo', function(title) {
            self._insertTodo(title);
        });

        this.view.bind('deleteTodo', function(index) {
            self._deleteTodo(index);
        });
    };

    Controller.prototype = {
        setView: function(locationHash) {
            var route = locationHash.split('/')[1];
            var page = route || '';
            this._updateFilterState(page);
        },
        _updateFilterState: function(currentPage) {

            this._activeRoute = currentPage;

            if(this._activeRoute === '') {
                this._activeRoute = 'All';
            }

            console.log(this._activeRoute);
        },

        _insertTodo: function(title) {
            var self = this;

            if (title.trim() === '') {
                return;
            }

            self.model.insert(title, function(data) {
                self.view.render('inputTodoClear');
                self.view.render('inputTodoAutoFocus');
                self.view.render('list', self.view.show(data));
            });
        },

        _deleteTodo: function(index) {
            var self = this;

            self.model.delete(index, function(data) {
                self.view.render('list', self.view.show(data));
            });
        }
    };

    exports.Controller = Controller;
})(window);