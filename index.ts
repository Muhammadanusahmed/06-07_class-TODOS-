#! /usr/bin/env node

import inquirer from "inquirer";

let todos = [];
let condition = true;


while (condition) {
    let addTask = await inquirer.prompt([
        {
            name: "todo",
            type: "input",
            message: "What do you want to add to your todos?",
        },
        {
            name: "addMore",
            type: "confirm",
            message: "Do you want to add more?",
            default: true
        },
    ]);

    todos.push(addTask.todo);
    condition = addTask.addMore;

    console.log("Your Todos:");
    todos.forEach((todo, index) => {
        console.log(`${index + 1} ${todo}`);
        
    });

    let { action } = await inquirer.prompt([
        {
            name: "action",
            type: "list",
            message: "Choose an action:",
            choices: ["Continue", "Delete", "Update"]
        }
    ]);

    if (action === "Update") {
        let { indexToUpdate, updatedTodo } = await inquirer.prompt([
            {
                name: "indexToUpdate",
                type: "number",
                message: "Enter the number of the todo you want to update:"
            },
            {
                name: "updatedTodo",
                type: "input",
                message: "Enter the updated todo:"
            }
        ]);

        todos[indexToUpdate - 1] = updatedTodo;
    } else if (action === "Delete") {
        let { indexToDelete } = await inquirer.prompt([
            {
                name: "indexToDelete",
                type: "number",
                message: "Enter the number of the todo you want to delete:"
            }
        ]);

        todos.splice(indexToDelete - 1, 1);
    }
}

