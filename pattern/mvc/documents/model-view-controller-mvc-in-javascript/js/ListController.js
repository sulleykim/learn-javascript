(function(exports) {
    
    function ListController(model, view) {
        EventEmitter.call(this);
        this._model = model;
        this._view = view;
        var self = this;

        view.on('listModified', function(idx) {
            self.updateSelected(idx);
        });
        view.on('addButtonClicked', function() {
            self.addItem();
        });
        view.on('delButtonClicked', function() {
            self.delItem();
        });
    }

    ListController.prototype = Object.create(EventEmitter.prototype);
    
    ListController.prototype.constructor = ListController;

    ListController.prototype.addItem = function() {
        var item = window.prompt('Add item:', '');
        if (item) {
          this._model.addItem(item);
        }
    }
    
    ListController.prototype.delItem = function() {
        var index = this._model.selectedIndex;
        if (index !== -1) {
            this._model.removeItemAt(index);
        }
    }

    ListController.prototype.updateSelected = function(index) {
        this._model.selectedIndex = index;
    }
    
    exports.ListController = ListController;
}(window));