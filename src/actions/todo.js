import { fetchApi } from "../helpers/fetch";
import { types } from "../types/types";

export const startLoadingTodo = (todo) => {
    return async(dispatch) => {

        try {

            const resp = await fetchApi('todo',todo,'POST');
            const body = await resp.json();
     
 
            if(body.ok){
                todo.id = body.todoItem.idtodoitem;
                todo.titulo = body.todoItem.titulo;
                todo.description = body.todoItem.description;
                dispatch(addTodo(todo.id,todo));
            }else{
                console.log('algo ha salido mal');
            }
            
        } catch (error) {
            console.log(error);
        }
    };
};

export const startUploadingNote = (id,todo) => {

    return async(dispatch) =>{
        console.log(id);
        console.log(todo);
        
        try {
            const resp = await fetchApi(`todo/${id}`,todo,'PUT');
            const body = await resp.json();
            console.log(body);
            if(body.ok){
                dispatch(getTodos());
            }
            
        } catch (error) {
            console.log(error);
        }

    };
};

export const addTodo = (id,todo) => {

    return{
        type:types.addTodo,
        payload:{
            id,
           ...todo
        }
    }
};

export const loadTodos = () => {
    return async(dispatch) => {
        
       try {
           const todo = {};
           const resp = await fetchApi('todo');
           const body = await resp.json();
           
           if(body.length > 0){
               body.forEach(body => {
                   todo.id = body.idtodoitem;
                   todo.titulo = body.titulo;
                   todo.description = body.description;
                   dispatch(addTodo(todo.id,todo));
    
               })
           }
           else{
               dispatch(getTodos());
           }

           
       } catch (error) {
           console.log(error);
       }
        

    };
};

export const getTodos = () => {
    return{
        type:types.getTodo
    }
};

export const startDeleteTodo = (id) => {

    return async(dispatch) =>{

        try {
          
            const resp = await fetchApi(`todo/${id}`,{},'DELETE');
            const body = await resp.json();
            if (body.ok) {
                dispatch(deleteTodo(id));
                console.log('Todo Eliminado');
            }else{
                console.log('algo ha salido mal, DELETE');
            } 
            // dispatch(getTodos());


        } catch (error) {
            console.log(error);
        }
    }

};

export const activeTodo = (id,todo) => {

    return{
        type:types.activeTodo,
        payload:{
            id,
            ...todo
        }
    }
};

export const deleteTodo = (id) => {

    return{
        type:types.deleteTodo,
        payload:id
    }
};