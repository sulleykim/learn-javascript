function View(controller){
    this.controller = controller;
    this.heading = document.getElementById('heading');
    this.heading.innerHTML = this.controller.getModelHeading();
    this.heading.addEventListener('click', controller);
    this.heading.addEventListener('mouseover', controller);
}

function Model() {
    this.heading = "Hello";
}

function Controller(model){
    var self = this;
    this.model = model;
    this.handleEvent = function(e){
        e.stopPropagation();
        switch(e.type){
            case "click":
                console.log("click");
                self.clickHandler(e.target);
                break;
            case "mouseover":
                console.log("mouseover")
                break;
            default:
                console.log(e.target);
        }
    }
    this.getModelHeading = function(){
        return self.model.heading;
    }
    this.clickHandler = function(target){
        self.model.heading = 'World';
        target.innerText = self.getModelHeading();
    }
}

function main(){
    var model = new Model();
    var controller = new Controller(model);
    var view = new View(controller);
} 

main()