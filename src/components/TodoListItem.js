import React, { memo, useState } from 'react';
import Swal from 'sweetalert2';
import { useForm } from '../hooks/useForm';
import '../styles/todoApp.css';
import Modal from 'react-modal';
import { useDispatch } from 'react-redux';
import { activeTodo, getTodos, startUploadingNote } from '../actions/todo';
import { useSelector } from 'react-redux';

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
  },
};

Modal.setAppElement('#root');

export const TodoListItem =memo(({todos,handleDelete}) => {

  const dispatch = useDispatch();
  let {active} = useSelector(state => state.todo);
  
  const [modal, setModal] = useState(false);
  
  const [formValues, handleInputChange,reset] = useForm({
    tituloUpdate:'',
    descriptionUpdate: ''
  });

  const {tituloUpdate,descriptionUpdate} = formValues;

  if(!active){
    active = [];
  };

  const openModal = () => {
    setModal(true);
  };
  const closeModal = () => {
    setModal(false);
  };

  const setActiveTodo = (id,t,d) => {

    dispatch(activeTodo(id,{t,d}));
    openModal();
  };

  const handleUpdate = (e) => {

    const exa1 ={
      titulo:tituloUpdate,
      description:descriptionUpdate
    };

    e.preventDefault();
    dispatch(startUploadingNote(active.id,exa1));
    closeModal();
    window.location.reload();
    dispatch(getTodos());
  };



  return (
    <>
    {
      todos.map(todo => (
            
            <li key={todo.id} className="todo__lista">
            <p className='todo__elementos'><span className='todo__titulo'>{todo.titulo}</span>{todo.description}</p>
            
            <button className='todo__editar' onClick={() => setActiveTodo(todo.id,todo.titulo,todo.description)}>
              Editar Todo
            </button>
            <button className='todo__borrar' onClick={() => handleDelete(todo.id)}>
              Eliminar Todo
            </button>

        {/* Inicio del Modal */}
            <Modal
          isOpen={modal}
          onRequestClose={closeModal}
          style={customStyles}
          contentLabel="Example Modal"
      >
        <form className='todo__formulario' onSubmit={handleUpdate}>
          <h4>Por favor actualice los datos que requiera</h4>
          <br/>
        <input 
          className='todo__agregar--titulo' 
          type="text" 
          name='tituloUpdate' 
          placeholder={active.t}
          autoComplete='off' 
          value={tituloUpdate}
          onChange={handleInputChange}/>

        <input className='todo__agregar--description' 
            type="text" 
            name='descriptionUpdate' 
            placeholder={active.d} 
            autoComplete='off' 
            value={descriptionUpdate}
            onChange={handleInputChange}/>

        <button type='submit' className='todo__agregar__Enviar'>Editar Todo</button>
      </form>
      </Modal>

            
            </li>
          ))}
    
    </>
  )
})
