import { types } from "../types/types";

const initialState = {
    todos:[],
    active:null
}

export const todoReducer = (state = initialState,action) => {

    switch (action.type) {

        case types.activeTodo:
            return {
                ...state,
                active:{
                    ...action.payload
                }
            };

        case types.addTodo:
           return {
               ...state,
               todos:[action.payload,...state.todos]
           };
           case types.getTodo:
               return{
                   ...state,
                   todos:[...state.todos]
               };

        case types.deleteTodo:
            return {
                ...state,
                active:null,
                todos:state.todos.filter(todo => todo.id !== action.payload)
            }
    
        default:
            return state;
    }

};