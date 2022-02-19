import React, { memo } from 'react';


import '../styles/todoApp.css';

export const TodoListItem =memo(({todos,handleDelete}) => {

  
  return (
    <>
    {
      todos.map(todo => (
            
            <li key={todo.id} className="todo__lista">
            <p className='todo__elementos'><span className='todo__titulo'>{todo.titulo}</span>{todo.description}</p>
            <button className='todo__borrar' onClick={() => handleDelete(todo.id)}>
              Eliminar Todo
            </button>
            
            </li>
          ))}
    
    </>
  )
})
