(function() {

    function Todo() {
        this.model = new Model();
        this.view = new View();
        this.controller = new Controller(this.model, this.view);
    }

    var todo = new Todo();

    function setView() {
        todo.controller.setView(document.location.hash);
    }
    
    window.addEventListener("load", setView);
    window.addEventListener("hashchange", setView);
})();