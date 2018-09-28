window.addEventListener("load", function() {
    var model = new ListModel(['study js', 'study nodejs']),
        view = new ListView(model, {
            'add': document.getElementById('add'),
            'list': document.getElementById('list') 
        }),
        controller = new ListController(model, view);
    view.rendering();
})