
import { List, Map } from 'immutable';

const init = List([]);

export default function(todos=init, action) {
  switch(action.type) {
    case 'ADD_TODO':
      return todos.push(Map(action.payload));

    case 'REMOVE_TODO':
      return todos.filter(t => t.get('id') !== action.payload);
      

    case 'STRIKE_TODO':
      return todos.map(t => {
        if(t.get('id') === action.payload)
          return t.update('isStriked', isStriked => !isStriked);
          
          return t;
    });

    case 'UPDATE_TODO':
      return todos.map(t => {
        if(t.get('id') === action.payload.id)
          return t.set('text', action.payload.text);
          return t;
    });

    default:
      return todos;
  }
}       