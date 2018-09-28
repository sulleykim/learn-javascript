(function(exports) {
    
    function ListController(model, view) {
        EventEmitter.call(this);
        this._model = model;
        this._view = view;
        var self = this;

        view.on("listAddClick", function() {
            self.addList();
        });
    }

    ListController.prototype = Object.create(EventEmitter.prototype);
    
    ListController.prototype.constructor = ListController;

    ListController.prototype.addList = function() {
        var item = window.prompt('Add item:', '');

        if (item) {
            this._model.addList(item);
        }
    }

    exports.ListController = ListController;
}(window));