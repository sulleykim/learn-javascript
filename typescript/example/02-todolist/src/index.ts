window.onload = () => {
    let name = <HTMLInputElement>document.getElementById("todoName");
    let description = <HTMLInputElement>(document.getElementById("todoDescription"));
    let add = <HTMLInputElement>document.getElementById("add");
    let todo = new TodoList();

    add.addEventListener("click", () => {
        todo.createTodoItem(name.value, description.value);
        console.log(TodoList.allTodos);
    });
};

interface ITodo {
    name: string;
    description: string;
    complete: boolean;
}

class Todo implements ITodo {
    constructor(
        public name: string,
        public description: string,
        public complete: boolean
    ) { }
}

class TodoList {
    public static allTodos: Todo[] = new Array();
    public createTodoItem(name: string, description: string): number {
        let newItem = new Todo(name, description, false);
        let todoCount: number = TodoList.allTodos.push(newItem);
        return todoCount;
    }
}
