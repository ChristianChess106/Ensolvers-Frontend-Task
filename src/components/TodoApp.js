import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { getTodos, loadTodos, startDeleteTodo, startLoadingTodo } from '../actions/todo';
import { useForm } from '../hooks/useForm';
import '../styles/todoApp.css';
import { TodoListItem } from './TodoListItem';


export const TodoApp = () => {

  // const [todos] = useReducer(todoReducer, initialState);

  const {todos} = useSelector(state => state.todo);
  const dispatch = useDispatch(); 
  
  useEffect(() => {
    dispatch(loadTodos());
    dispatch(getTodos());
  
  }, []);
  

  const [formValues, handleInputChange,reset] = useForm({
    titulo:'',
    description: ''
  });

  const {titulo,description} = formValues;
 
  const handleDelete = (todoId) => {
    dispatch(startDeleteTodo(todoId));
  
  }; 

  const handleSubmit = (e) => {
    e.preventDefault();

    if(titulo.trim().length <1 && description.trim().length <1){
      return;
    };

    dispatch(startLoadingTodo({titulo,description}));
    reset();
  };


  return (
    <>
    <h1>TodoApp ({todos.length})</h1>
    <hr/>
    <div className='todo'>
      <div className='todo__agregar'>
        <h3>Agrega un Todo</h3>
        <hr/>
      
      <form className='todo__formulario' onSubmit={handleSubmit}>
        <input 
          className='todo__agregar--titulo' 
          type="text" 
          name='titulo' 
          placeholder='Tu titulo' 
          autoComplete='off' 
          value={titulo}
          onChange={handleInputChange}/>

        <input className='todo__agregar--description' 
            type="text" 
            name='description' 
            placeholder='Prueba técnica ensolvers' 
            autoComplete='off' 
            value={description}
            onChange={handleInputChange}/>

        <button type='submit' className='todo__agregar__Enviar'>Agregar Todo</button>
      </form>
      </div>

    <div className='todo__lista'>

    <ul className='todo__contenedor'>
    <h3>Listado de tus Todo's</h3>
        {
          <TodoListItem todos={todos} handleDelete={handleDelete}/>
        }
    </ul>
      </div>
    
      </div>
    
    </>
    
  )
}
