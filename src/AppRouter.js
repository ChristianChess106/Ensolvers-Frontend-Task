import React from 'react';
import {Provider} from 'react-redux'
import { TodoApp } from './components/TodoApp';
import { store } from './store/store';

export const AppRouter = () => {
  return (
      <Provider store={store}>
          
          <TodoApp />

      </Provider>
  )
}
