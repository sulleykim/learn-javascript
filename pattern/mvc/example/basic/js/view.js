(function(exports) {
    var result = document.getElementById("result");

    /**@description 객체 초기화
     * @return {void}
     */
    function View() {}

    View.prototype = {
        /**@description 결과 화면 표시
         * @param {Number} value 
         * @return {void}
         */
        render: function(value) {
            result.value = value;
        }
    }

    exports.View = View;
})(this);