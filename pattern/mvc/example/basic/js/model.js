(function(exports) {

    /**@description 객체 초기화
     * @param {Number} value 
     * @return {void}
     */
    function Model(value) {
        this.value = value || 100;
    }

    Model.prototype = {
        /**@description 증가
         * @param {Number} value
         * @return {Number}
         */
        increase: function(value) {
            this.value += value || 1;
            return this.value;
        },
        /**@description 감소
         * @param {Number} value
         * @return {Number}
         */
        decrease: function(value) {
            this.value -= value || 1;
            return this.value;
        },
        /**@description getter
         * @return {Number}
         */
        getData: function() {
            return this.value;
        }
    };

    exports.Model = Model;
})(this);