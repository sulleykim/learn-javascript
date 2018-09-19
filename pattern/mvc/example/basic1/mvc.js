function View(controller){
    this.controller = controller;
    this.heading = document.getElementById('heading');
    this.heading.innerHTML = this.controller.getModelHeading();
    this.heading.addEventListener('click', controller);
}

function Model() {
    this.heading = "Hello";
}

function Controller(model){
    this.model = model;
    this.handleEvent = function(e){
        e.stopPropagation();
        switch(e.type){
            case "click":
                console.log("click");
                console.log(this);
                this.clickHandler(e.target);
                break;
            default:
                console.log(e.target);
        }
    }
    this.getModelHeading = function(){
        return this.model.heading;
    }
    this.clickHandler = function(target){
        this.model.heading = 'World';
        target.innerText = this.getModelHeading();
    }
}

function main(){
    var model = new Model();
    var controller = new Controller(model);
    var view = new View(controller);
} 

main()