import fs from "fs"; //ES6
import { v4 as uuid } from 'uuid';
//const fs = require("fs"); - CommonJS
const DB_FILE_PATH = "./core/db";

console.log('[CRUD]');

type UUID = string;

interface Todo {
    id: UUID;
    date: string;
    content: string;
    done: boolean;
}

function create(content: string): Todo {
    const todo: Todo = {
        id: uuid(),
        date: new Date().toISOString(),
        content: content,
        done: false
    }

    const todos: Array<Todo> = [
        ...read(),
        todo,
    ];

    fs.writeFileSync(DB_FILE_PATH, JSON.stringify({
        todos
    }, null, 2));

    return todo;
}

function read(): Array<Todo> {
    const dbString = fs.readFileSync(DB_FILE_PATH, "utf-8");
    const db = JSON.parse(dbString || "{}");
    if(!db.todos) {
        return [];  
    }
    return db.todos;
}

function clearDB() {
    fs.writeFileSync(DB_FILE_PATH, "");
}


function update(id: UUID, partialTodo: Partial<Todo>): Todo {
    let updatedTodo;
    const todos = read();
    todos.forEach((currentTodo) => {
        const isToUpdate =  currentTodo.id === id;
        if(isToUpdate) {
            updatedTodo = Object.assign(currentTodo, partialTodo);
        }
    });

    fs.writeFileSync(DB_FILE_PATH, JSON.stringify({
        todos,
    }, null, 2));
    
    if(!updatedTodo){
        throw new Error("Please, provide another ID!");
    }
    return updatedTodo;
}

function updatedContentById(id: UUID, content: string): Todo {
    return update(id, {
        content
    });
}

function deleteById(id: UUID) {
    const todos = read();

    const todosWithoutOne = todos.filter((todo) => {
        if(id === todo.id) {
            return false;
        }

        return true;
    });

    fs.writeFileSync(DB_FILE_PATH, JSON.stringify({
        todos: todosWithoutOne,
    }, null, 2));
}


clearDB();

create('Primeiro registro!');
const secondTodo = create('Segundo registro!');

deleteById(secondTodo.id);

const thirdTodo = create('Terceiro registro!');

update(thirdTodo.id, {
    content: "Terceiro registro atualizado",
    done: true
});

updatedContentById(thirdTodo.id, "Atualizada!!");

const todos = read();
console.log(todos.length);
