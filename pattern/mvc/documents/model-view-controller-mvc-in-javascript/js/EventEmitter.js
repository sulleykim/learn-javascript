(function(exports) {
    function EventEmitter() {
        this._events = {};
    }
    
    EventEmitter.prototype = (function() {

        return {
            on: function(event, listener) {
                (this._events[event] || (this._events[event] = [])).push(listener);
                return this;
            },
            emit: function(event, arg) {
                (this._events[event] || []).slice().forEach(function(fn) {
                    fn(arg);
                });
                return this;
            }
        }
    }());

    exports.EventEmitter = EventEmitter;
}(window));