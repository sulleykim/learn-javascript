(function(exports) {

    function ListModel(items) {
        EventEmitter.call(this);
        this._items = items || [];
        this._selectedIndex = -1;
    }

    ListModel.prototype = Object.create(EventEmitter.prototype);  
    
    ListModel.prototype.constructor = ListModel;
    
    ListModel.prototype.getItems = function() {
        return this._items.slice();
    }

    ListModel.prototype.addItem = function(item) {
        this._items.push(item);
        this.emit('itemAdded', item);
    }

    ListModel.prototype.removeItemAt = function(index) {
        var item = this._items.splice(index, 1)[0];
        this.emit('itemRemoved', item);

        if (index === this._selectedIndex) {
            this._selectedIndex = -1;
        }
    }

    ListModel.prototype.getSelectedIndex = function() {
        return this._selectedIndex;
    }
    
    ListModel.prototype.setSelectedIndex = function(index) {
        var previousIndex = this._selectedIndex;
        this._selectedIndex = index;
        this.emit('selectedIndexChanged', previousIndex);
    }

    exports.ListModel = ListModel;
}(window));