(function(exports){

    /**@description 이벤트 구독/발행기
     * @returns {void}
     */
    function EventEmitter() {
        this._events = {};
    }

    EventEmitter.prototype = {
        /**@description 이벤트 구독
         * @param {String} eventName
         * @param {Function} listener
         * @returns {Object} EventEmitter
         */
        on: function(eventName, listener) {
            (this._events[eventName] || (this._events[eventName] = [])).push(listener);
            return this;
        },
        /**@description 이벤트 발행
         * @param {String} eventName
         * @param {ArrayLike} arguments
         * @returns {Object} EventEmitter
         */
        emit: function(eventName, arg) {
            (this._events[eventName] || []).slice().forEach(function(fn) {
                fn(arg);
            });
            return this;
        }
    };

    exports.EventEmitter = EventEmitter;
}(window));