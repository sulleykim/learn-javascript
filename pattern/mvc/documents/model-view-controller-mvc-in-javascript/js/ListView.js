(function(exports) {

    function ListView(model, elements) {
        EventEmitter.call(this);
        this._model = model;
        this._elements = elements;
        var self = this;
        model.on("itemAdded", function() {
            self.rebuildList();
        }).on("itemRemoved", function() {
            self.rebuildList();
        });

        elements.list.addEventListener("change", function(e) {
            self.emit('listModified', e.target.selectedIndex);
        });
        elements.addButton.addEventListener("click", function() {
            self.emit('addButtonClicked');
        });
        elements.delButton.addEventListener("click", function() {
            self.emit('delButtonClicked');
        });

    }

    ListView.prototype = Object.create(EventEmitter.prototype);
    
    ListView.prototype.constructor = ListView;

    ListView.prototype.show = function() {
        this.rebuildList();
    }

    ListView.prototype.rebuildList = function() {
        var list = this._elements.list;
        list.options.length = 0;
        this._model.getItems().forEach(function(item) {
            list.options.add(new Option(item));
        });
        this._model.selectedIndex = -1;
    }

    exports.ListView = ListView;
}(window));