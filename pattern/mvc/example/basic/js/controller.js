(function(exports) {
    var wrapper = document.getElementById("wrapper"),
        callback = {
            "increase": function() {
                this.model.increase();
                this.view.render(this.model.getData());
            },
            "decrease": function() {
                this.model.decrease();
                this.view.render(this.model.getData());
            }
        }

    /**@description 객체 초기화
     * @return {void}
     */
    function Controller() {
        this.model = new Model();
        this.view = new View();
        this.eventHandler();
    }

    Controller.prototype = {
        eventHandler: function() {
            var that = this;

            wrapper.addEventListener("click", function(e) {
                e.preventDefault();
        
                var target = e.target || e.srcElement,
                    dataAttr = target.dataset.attr;
        
                if(dataAttr) {
                    callback[dataAttr].call(that);
                }
            });
        }
    };

    exports.Controller = Controller;
})(this);