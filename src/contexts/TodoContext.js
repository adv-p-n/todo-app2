import { createContext, useContext } from "react";

export const TodoContext=createContext({
    todos:[{
        id:1,
        todo:"",
        completed:false
    }],
    addTodo:(todos)=>{},
    deleteTodo:(id)=>{},
    updateTodo:(id,todos)=>{},
    toggleComplete:(id)=>{}
});

export const TodoProvider=TodoContext.Provider;

export default function useTodo(){
    return useContext(TodoContext);
}