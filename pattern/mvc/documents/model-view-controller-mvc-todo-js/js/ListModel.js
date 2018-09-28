(function(exports) {
    
    function ListModel(lists) {
        EventEmitter.call(this);
        this._lists = lists || [];
    }

    ListModel.prototype = Object.create(EventEmitter.prototype);

    ListModel.prototype.constructor = ListModel;

    ListModel.prototype.getLists = function() {
        return this._lists.slice();
    }

    ListModel.prototype.addList = function(list) {
        this._lists.push(list);
        this.emit('listAdd', list);
    }

    ListModel.prototype.removeList = function(index) {
        var removeAt = this._lists[index];
        this._lists.splice(index, 1);

        this.emit('listRemove', removeAt);
    }

    exports.ListModel = ListModel;
}(window));