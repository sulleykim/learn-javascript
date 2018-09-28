(function(exports) {
    
    function ListView(model, elements) {
        EventEmitter.call(this);
        this._model = model;
        this._elements = elements;
        var self = this;

        this._elements.add.addEventListener("click", function() {
            self.emit('listAddClick');    
        });

        model.on("listAdd", function() {
            self.rendering();
        }).on("listRemove", function() {
            self.rendering();
        });

    }

    ListView.prototype = Object.create(EventEmitter.prototype);

    ListView.prototype.constructor = ListView;

    ListView.prototype.rendering = function() {
        var str = this._model._lists.reduce(function(html, item) {

            html += `<div>${item}</div>`;
            return html;
        }, "");

        this._elements.list.innerHTML = str;
    }

    exports.ListView = ListView;
}(window));